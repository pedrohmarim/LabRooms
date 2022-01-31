import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Icons,
  Input,
  Button,
  Upload,
  Checkbox,
  Tooltip,
  Notification,
} from "../../../antd_components";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../Helper/UploadImage.helper";
import Cookie from "js-cookie";
import { createRoom } from "../services/createroom.service";
import Swal from "sweetalert2";

const SigninForm = ({ darkPallete }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [disableCategory, setDisableCategory] = useState(false);

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function beforeUpload(file) {
    const nameSplit = file.name.trim().split(".");
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
    const owner = Cookie.get("ID");
    let { logo, title, description, category } = values;

    const { file } = logo;

    const { uid, name, size, type, lastModified } = file;

    if (!category && disableCategory) category = "$oth";

    const dto = {
      uid,
      name,
      size,
      type,
      lastModified,
      title,
      description,
      category,
      owner,
    };

    createRoom(dto).then((res) => {
      const { message, success } = res.data;

      if (success) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: message,
        }).then(() => {
          navigate("/");
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

  return (
    <Form layout='vertical' onFinish={onSubmit} form={form}>
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
          placeholder='Ex.: Sala destinada à assuntos sobre saúde'
        />
      </FormItem>

      <FormItem
        label='Categoria'
        name='category'
        rules={
          !disableCategory && [
            { required: true, message: "Campo obrigatório." },
          ]
        }
      >
        <Input
          disabled={disableCategory}
          suffix={
            <Tooltip
              defaultVisible={window.innerWidth < 1024}
              color={darkPallete.lightblue}
              title='Desabilitar este campo, fará com que sua sala possua e seja filtrada com categoria de "Outros".'
            >
              <Checkbox
                defaultChecked
                onChange={() => {
                  form.setFieldsValue({
                    category: null,
                  });
                  setDisableCategory((prev) => !prev);
                }}
              />
            </Tooltip>
          }
          style={styleInput}
          allowClear
          prefix={<Icons.EditOutlined />}
          placeholder='Ex.: Alimentos'
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
          <Tooltip title='Enviar logo da sala'>
            <Button icon={<Icons.UploadOutlined />}>Enviar imagem</Button>
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
