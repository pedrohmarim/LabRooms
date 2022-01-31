import React from "react";
import {
  Form,
  Icons,
  Input,
  Button,
  Upload,
  Tooltip,
  Notification,
} from "../../../antd_components";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import { acceptedFileTypes, isValidExtension, isValidFileSize } from '../Helper/UploadImage.helper'
const SigninForm = ({ darkPallete }) => {

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function beforeUpload(file) {
    const nameSplit = file.name.trim().split('.');
    const extension = nameSplit[nameSplit.length - 1];

    if (!isValidExtension(extension)) {
      console.log(extension);
      Notification.open({
        type: "error",
        message: "Formato de Arquivo Inválido",
      });
      return Upload.LIST_IGNORE;
    }

    if (!isValidFileSize(file.size, 3)) {
      Notification.open({
        type: "error",
        message: "Arquivos de imagem devem ser menores que 3MB!",
      });
      return Upload.LIST_IGNORE;
    }

    return false;
  }

  function onSubmit(values) {

    const { logo, title, description} = values

    const { file } = logo

    const dto = {
      file,
      title, 
      description
    }

    console.log(dto);
  }

  return (
    <Form
      layout='vertical'
      onFinish={onSubmit}
    >
      <FormItem
        label='Título'
        name='title'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.BankOutlined />}
          placeholder='Título' 
        />
      </FormItem>   
      
      <FormItem
        label='Descrição'
        name='description'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<Icons.EditOutlined />}
          placeholder='Descrição' 
        />
      </FormItem>
      
      <FormItem
        label='Logo'
        name='logo'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
          <Upload
            accept={acceptedFileTypes}
            beforeUpload={beforeUpload}
            multiple={false}
            maxCount={1}
          >
            <Tooltip title="Enviar logo da sala">
              <Button icon={<Icons.UploadOutlined />}>
                Enviar imagem
              </Button>
            </Tooltip>
          </Upload>
      </FormItem>

      <Button
        style={{
          width: "100%",
          height: "45px",
          borderRadius: "8px",
          marginTop: "5px",
          background: darkPallete.lightblue,
        }}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </Button>
    </Form>
  );
};

export default SigninForm;
