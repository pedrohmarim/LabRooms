import React, { useState } from "react";
import { validateBr } from "js-brasil";
import { StyledButton } from "../Signup.form.styled";
import Recaptcha from "../../../../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledRow } from "../../../../CreateRoom/CreateRoom.styled";
import { FormItem } from "../Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../../../../../Helpers/UploadImage.helper";
import {
  FeatherIcons,
  Input,
  InputMask,
  Upload,
  Notification,
} from "../../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../../Helpers/TipoCadastro";

const UserBasicInfo = ({
  validateInput,
  darkPallete,
  recaptchaRef,
  setCaptcha,
  captcha,
  accountType,
}) => {
  const [fileList, setFileList] = useState([]);

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const { status, name } = fileList;

    if (status === "done") {
      Notification.open({
        type: "success",
        message: `${name} file uploaded successfully.`,
      });
    } else if (status === "error") {
      Notification.open({
        type: "error",
        message: `${name} file uploaded successfully.`,
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
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

  function beforeUpload(file) {
    const nameSplit = file.name.trim().split(".");
    const extension = nameSplit[nameSplit.length - 1];

    if (!isValidExtension(extension)) {
      Notification.open({
        type: "error",
        message: "Formato de Arquivo Inválido",
      });
      return false;
    }

    if (!isValidFileSize(file.size, 3)) {
      Notification.open({
        type: "error",
        message: "Arquivos de imagem devem ser menores que 3MB.",
      });
      return false;
    }

    return file;
  }

  return (
    <>
      <FormItem
        label='Nome completo'
        name='username'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='user' size={15} />}
          placeholder='Nome completo'
        />
      </FormItem>

      <FormItem
        label='E-mail'
        name='email'
        rules={[
          { required: true, message: "Campo obrigatório." },
          { type: "email", message: "E-mail inválido." },
        ]}
        help={validateInput?.field === "email" ? validateInput.message : null}
        validateStatus={validateInput?.field === "email" ? "error" : null}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='mail' size={15} />}
          placeholder='E-mail'
        />
      </FormItem>

      {accountType === TIPO_CADASTRO.FREELANCER ? (
        <FormItem
          label='CPF'
          name='cpf'
          rules={[
            { required: true, message: "Campo obrigatório." },
            () => ({
              validator(_, value) {
                if (!value || validateBr.cpf(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("CPF Inválido."));
              },
            }),
          ]}
          help={validateInput?.field === "cpf" ? validateInput.message : null}
          validateStatus={validateInput?.field === "cpf" ? "error" : null}
        >
          <InputMask
            mask='111.111.111-11'
            style={styleInput}
            allowClear
            prefix={<FeatherIcons icon='credit-card' size={15} />}
            placeholder='CPF'
          />
        </FormItem>
      ) : (
        <FormItem
          label='CNPJ'
          name='cnpj'
          rules={[
            { required: true, message: "Campo obrigatório." },
            () => ({
              validator(_, value) {
                if (!value || validateBr.cnpj(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("CNPJ Inválido."));
              },
            }),
          ]}
          help={validateInput?.field === "cnpj" ? validateInput.message : null}
          validateStatus={validateInput?.field === "cnpj" ? "error" : null}
        >
          <InputMask
            mask='11.111.111/1111-11'
            style={styleInput}
            allowClear
            prefix={<FeatherIcons icon='credit-card' size={15} />}
            placeholder='CNPJ'
          />
        </FormItem>
      )}

      <FormItem
        label='Senha'
        name='password'
        rules={[
          { required: true, message: "Campo obrigatório." },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres.",
          },
        ]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='lock' size={15} />}
          iconRender={(visible) =>
            visible ? (
              <FeatherIcons icon='eye' size={15} />
            ) : (
              <FeatherIcons icon='eye-off' size={15} />
            )
          }
          placeholder='Senha'
        />
      </FormItem>

      <FormItem
        label='Confirmar Senha'
        name='confirmPassword'
        rules={[
          { required: true, message: "Campo obrigatório." },
          {
            type: "string",
            min: 6,
            message: "Senha deve possuir no mínimo 6 caracteres.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Senhas não coincidem."));
            },
          }),
        ]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='lock' size={15} />}
          iconRender={(visible) =>
            visible ? (
              <FeatherIcons icon='eye' size={15} />
            ) : (
              <FeatherIcons icon='eye-off' size={15} />
            )
          }
          placeholder='Confirmar Senha'
        />
      </FormItem>

      <FormItem
        label='Imagem de Perfil'
        name='imageFile'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Upload
          multiple={false}
          beforeUpload={beforeUpload}
          customRequest={dummyRequest}
          progress
          accept={acceptedFileTypes}
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Enviar"}
        </Upload>
      </FormItem>

      <StyledRow justify='center'>
        <Recaptcha
          verifyCallback={(verified) => setCaptcha(verified)}
          ref={recaptchaRef}
        />
      </StyledRow>

      <StyledButton
        height='45px'
        margin='5px 0 0 0'
        disabled={!captcha}
        backgroundcolor={captcha && darkPallete.lightblue}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </StyledButton>
    </>
  );
};
export default UserBasicInfo;
