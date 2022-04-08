import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ChatRoomService from "../../../ChatRoom/services/ChatRoom.service";
import * as CreateRoomService from "../../../CreateRoom/services/createroom.service";
import * as SignUpService from "../../services/signup.service";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";
import UserSkills from "./components/UserSkills.component";
import UserBasicInfo from "./components/UserBasicInfo.component";

import { Form, Notification } from "../../../../antd_components";

const SignUpForm = ({ darkPallete, accountType }) => {
  const [validateInput, setValidateInput] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const [userSkills, setUserSkills] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState();
  const [form] = Form.useForm();

  let navigate = useNavigate();

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

  function onSubmit(values) {
    if (!accountType)
      Notification.open({
        type: "error",
        message: "Erro",
        description: "Selecione Novamente o Tipo de Cadastro.",
      });

    const { cpf, email, password, username, newCategory } = values;

    const dto = {
      cpf,
      email,
      password,
      username,
      accountType,
      categoryId: newCategory ? null : userSkills?.category,
      newCategory: newCategory || null,
      userSkills: userSkills?.subCategories,
    };

    debugger;

    SignUpService.userRegister(dto).then(({ data }) => {
      const { message, success } = data;

      if (!success) {
        setValidateInput(data);
      } else {
        setValidateInput(null);
        navigate("/signin");
      }

      Notification.open({
        type: success ? "success" : "error",
        message: success ? "Sucesso" : "Erro",
        description: message,
      });
    });
  }

  return (
    <Form layout='vertical' onFinish={onSubmit} form={form}>
      {accountType === 1 && !userSkills && (
        <UserSkills
          categories={categories}
          handleSelectChange={(value) => handleSelectChange(value)}
          subCategories={subCategories}
          newCategory={newCategory}
          setUserSkills={setUserSkills}
          darkPallete={darkPallete}
          form={form}
        />
      )}

      {(userSkills || accountType === 2) && (
        <UserBasicInfo
          validateInput={validateInput}
          darkPallete={darkPallete}
        />
      )}
    </Form>
  );
};
export default SignUpForm;
