import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import * as ChatRoomService from "../../ChatRoom/services/ChatRoom.service";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import { InboxOutlined } from "@ant-design/icons";
import CategoriesSubcategoriesSelect from "../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";
import { StyledInput, Form } from "../CreateRoom.styled";
import { StyledButton } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../Helper/UploadImage.helper";
import {
  FeatherIcons,
  Upload,
  BraftEditor,
  Notification,
} from "../../../antd_components";

const SigninForm = ({ darkPallete, user }) => {
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState([]);
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
    let { title, description, category, newCategory, subCategories } = values;

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
      subCategories,
      ownerName: user?.username,
      title,
      description: description.isEmpty() ? null : description.toHTML(),
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };

    CreateRoomService.createRoom(dto, token).then(({ data }) => {
      const { message, success } = data;

      if (success) navigate("/");

      Notification.open({
        type: success ? "success" : "error",
        message,
        style: {
          zIndex: 999,
        },
        duration: 2,
      });
    });
  }

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleSelectChange(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);

    form.setFieldsValue({
      subCategories: [],
    });

    if (
      value !== TIPO_CATEGORIA.CATEGORIA_OUTRAS &&
      value !== TIPO_CATEGORIA.CATEGORIA_CRIADA &&
      value !== TIPO_CATEGORIA.CATEGORIA_TODAS
    ) {
      ChatRoomService.getCategoryById(value).then(({ data }) => {
        const { SubCategories } = data;
        setSubCategories(SubCategories);
      });
    }
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

      <CategoriesSubcategoriesSelect
        handleSelectChange={handleSelectChange}
        categories={categories}
        newCategory={newCategory}
        subCategories={subCategories}
        labelMainCategory='Categoria'
      />

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
