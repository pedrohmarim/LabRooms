import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
import ImgCrop from "antd-img-crop";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import { CategoryTitle, CategoryInfo, StyledInput } from "../CreateRoom.styled";
import { StyledButton } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../Helper/UploadImage.helper";
import {
  Form,
  FeatherIcons,
  Row,
  Upload,
  Select,
  Notification,
} from "../../../antd_components";

const SigninForm = ({ darkPallete }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [invalidType, setInvalidType] = useState(false);

  function beforeUpload(file) {
    const nameSplit = file.name.trim().split(".");
    const extension = nameSplit[nameSplit.length - 1];

    if (!isValidExtension(extension)) {
      Notification.open({
        type: "error",
        message: "Formato de Arquivo Inválido",
      });
      setInvalidType(true);
      return false;
    }

    if (!isValidFileSize(file.size, 3)) {
      Notification.open({
        type: "error",
        message: "Arquivos de imagem devem ser menores que 3MB!",
      });
      setInvalidType(true);
      return false;
    }

    setInvalidType(false);
    return true;
  }

  function onSubmit(values) {
    let { title, description, category, newCategory } = values;
    const { originFileObj } = fileList[0];

    const token = Cookie.get("token");
    console.log(originFileObj);

    const {
      uid,
      lastModified,
      lastModifiedDate,
      name,
      size,
      type,
      webkitRelativePath,
    } = originFileObj;

    const dto = {
      thumb: {
        uid,
        lastModified,
        lastModifiedDate,
        name,
        size,
        type,
        webkitRelativePath,
      },
      title,
      description,
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };

    CreateRoomService.createRoom(dto, token).then((res) => {
      const { message, success } = res.data;

      if (success) {
        navigate("/");

        Notification.open({
          type: "success",
          message,
          style: {
            zIndex: 999,
          },
          duration: 2,
        });
      } else {
        Notification.open({
          type: "error",
          message: "Erro",
          description: message,
        });
      }
    });
  }

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleOtherCategories(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
  }

  const onChange = ({ fileList: newFileList }) => {
    !invalidType && setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Form layout='vertical' onFinish={onSubmit} form={form}>
      <FormItem
        label='Título'
        name='title'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <StyledInput
          allowClear
          prefix={<FeatherIcons icon='type' size={15} />}
          placeholder='Título'
        />
      </FormItem>

      <FormItem
        label='Descrição'
        name='description'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <StyledInput
          allowClear
          prefix={<FeatherIcons icon='edit' size={15} />}
          placeholder='Ex.: Sala destinada à assuntos sobre saúde'
        />
      </FormItem>

      <FormItem
        label='Categoria'
        name='category'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Select
          allowClear
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder='Ex.: Alimentos'
          onChange={handleOtherCategories}
        >
          {categories &&
            categories
              .sort((a, b) =>
                a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
              )
              .map(({ Title, _id, Icon }) => (
                <Select.Option key={_id} value={_id}>
                  <Row align='middle' justify='start'>
                    <FeatherIcons icon={Icon} size={15} />
                    <CategoryTitle>{Title}</CategoryTitle>
                  </Row>
                </Select.Option>
              ))}
          <Select.Option key={11} value={11}>
            <Row align='middle' justify='start'>
              <FeatherIcons icon='repeat' size={15} />
              <CategoryTitle>
                Outras
                <CategoryInfo>- Poderá criar uma nova categoria</CategoryInfo>
              </CategoryTitle>
            </Row>
          </Select.Option>
        </Select>
      </FormItem>

      {newCategory && (
        <FormItem
          label='Nova Categoria'
          name='newCategory'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <StyledInput
            allowClear
            prefix={<FeatherIcons icon='tag' size={15} />}
            placeholder='Ex.: Construções'
          />
        </FormItem>
      )}

      <FormItem label='Logo'>
        <ImgCrop rotate beforeCrop={beforeUpload}>
          <Upload
            multiple={false}
            maxCount={1}
            accept={acceptedFileTypes}
            listType='picture-card'
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "Enviar imagem"}
          </Upload>
        </ImgCrop>
      </FormItem>

      <StyledButton
        type='primary'
        htmlType='submit'
        backgroundcolor={darkPallete.lightblue}
      >
        Confirmar
      </StyledButton>
    </Form>
  );
};

export default SigninForm;
