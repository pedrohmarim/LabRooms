import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import { InboxOutlined } from "@ant-design/icons";
import {
  CategoryTitle,
  CategoryInfo,
  StyledInput,
  Form,
} from "../CreateRoom.styled";
import { StyledButton } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../Helper/UploadImage.helper";
import {
  FeatherIcons,
  Row,
  Upload,
  Select,
  BraftEditor,
  Notification,
} from "../../../antd_components";

const SigninForm = ({ darkPallete }) => {
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [invalidType, setInvalidType] = useState(false);

  const draggerProps = {
    name: "file",
    multiple: true,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", aqui vai a url pra post da imgaem
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      // if (status === "done") {
      //   Notification.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   Notification.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
        message: "Arquivos de imagem devem ser menores que 3MB.",
      });
      setInvalidType(true);
      return false;
    }

    setInvalidType(false);
    return true;
  }

  function onSubmit(values) {
    let { title, description, category, newCategory } = values;

    const token = Cookie.get("token");

    const dto = {
      // thumb: {
      //   uid,
      //   lastModified,
      //   lastModifiedDate,
      //   name,
      //   size,
      //   type,
      //   webkitRelativePath,
      // },
      title,
      description: description.isEmpty() ? null : description.toHTML(),
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };

    console.log(dto);

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
        label='Categoria Principal'
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

      <FormItem
        tooltip='Descreva Aqui Objetivos a Serem Alcançados, Requisitos de Habilidades Obrigatórias e Desejáveis para Realização do Projeto, Etapas a Serem seguidas,etc.'
        label='Descrição'
        name='description'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <BraftEditor.Editor
          excludeControls={["media"]}
          language={() => BraftEditor.language}
          textBackgroundColor={false}
        />
      </FormItem>

      <FormItem label='Logo'>
        <Dragger
          {...draggerProps}
          multiple={false}
          list
          maxCount={1}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          accept={acceptedFileTypes}
          beforeUpload={beforeUpload}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
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
