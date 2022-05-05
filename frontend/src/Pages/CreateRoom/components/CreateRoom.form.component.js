import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import CategoriesSubcategoriesSelect from "../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";
import Recaptcha from "../../../GlobalComponents/Recaptcha/Recaptcha.component";
import { StyledInput, Form, StyledRow } from "../CreateRoom.styled";
import { StyledButton } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  FeatherIcons,
  BraftEditor,
  Checkbox,
  Tooltip,
  Notification,
} from "../../../antd_components";

const SigninForm = ({ darkPallete, user, getRoomsByOwnerId }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [captcha, setCaptcha] = useState(false);
  const recaptchaRef = useRef();

  function resetCaptcha() {
    setCaptcha(null);
    recaptchaRef.current.reset();
  }

  function onSubmit(values) {
    let { title, description, category, newCategory, subCategories, visible } =
      values;

    const token = Cookie.get("token");

    const dto = {
      captcha,
      subCategories,
      ownerName: user?.username,
      imagePath: user?.imagePath,
      title,
      visible: !visible,
      description: description.isEmpty() ? null : description.toHTML(),
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };

    CreateRoomService.createRoom(dto, token).then(({ data }) => {
      const { message, success } = data;

      if (success) {
        resetCaptcha();
        navigate("/");
        getRoomsByOwnerId();
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

      <StyledRow justify='center'>
        <FormItem>
          <Recaptcha
            verifyCallback={(verified) => setCaptcha(verified)}
            ref={recaptchaRef}
          />
        </FormItem>
      </StyledRow>

      <StyledButton
        disabled={!captcha}
        backgroundcolor={captcha && darkPallete.lightblue}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </StyledButton>
    </Form>
  );
};

export default SigninForm;
