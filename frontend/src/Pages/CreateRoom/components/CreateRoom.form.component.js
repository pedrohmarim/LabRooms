import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import { InboxOutlined } from "@ant-design/icons";
import CategoriesSubcategoriesSelect from "../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";
import Recaptcha from "../../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledInput, Form, StyledRow } from "../CreateRoom.styled";
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
  Checkbox,
  Tooltip,
  Notification,
} from "../../../antd_components";

const SigninForm = ({ darkPallete, user, getRoomsByOwnerId }) => {
  const { Dragger } = Upload;
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [captcha, setCaptcha] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [invalidType, setInvalidType] = useState(false);
  const recaptchaRef = useRef();

  function resetCaptcha() {
    setCaptcha(null);
    recaptchaRef.current.reset();
  }

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
    let { title, description, category, newCategory, subCategories, visible } =
      values;
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
      captcha,
      subCategories,
      ownerName: user?.username,
      title,
      visible: !visible,
      description: description.isEmpty() ? null : description.toHTML(),
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };
    debugger;
    CreateRoomService.createRoom(dto, token).then(({ data }) => {
      const { message, success } = data;

      if (success){
        resetCaptcha();
        navigate("/");
        getRoomsByOwnerId()
      } 

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
        categories={categories}
        labelMainCategory='Categoria'
        defaultHideNewCategory
        form={form}
      />
      <Tooltip
        placement='leftBottom'
        title='Salas Privadas Não Serão Listadas Publicamente, Usuários Terão Acesso a Esse Projeto por Meio de Link Compartilhado.'
        color={darkPallete.lightblue}
      >
        <FormItem name='visible' valuePropName='checked'>
          <Checkbox>Sala Privada</Checkbox>
        </FormItem>
      </Tooltip>

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

        <StyledRow justify="center">  
          <FormItem>
            <Recaptcha verifyCallback={(verified) => setCaptcha(verified)} ref={recaptchaRef}/>
          </FormItem>
        </StyledRow>

      <StyledButton
        disabled={!captcha}
        type='primary'
        htmlType='submit'
        backgroundcolor={captcha && darkPallete.lightblue}
      >
        Confirmar
      </StyledButton>
    </Form>
  );
};

export default SigninForm;
