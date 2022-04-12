import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as SignUpService from "../../services/signup.service";
import UserSkills from "./components/UserSkills.component";
import UserBasicInfo from "./components/UserBasicInfo.component";
import { UserContext } from "../../../../Context/UserContext";

import { Form, Notification } from "../../../../antd_components";

const SignUpForm = ({ darkPallete, accountType }) => {
  const [validateInput, setValidateInput] = useState();
  const [userSkills, setUserSkills] = useState();
  const { categories } = useContext(UserContext);

  const [form] = Form.useForm();

  let navigate = useNavigate();

  function onSubmit(values) {
    if (!accountType)
      Notification.open({
        type: "error",
        message: "Erro",
        description: "Selecione Novamente o Tipo de Cadastro.",
      });

    const { cpf, email, password, username } = values;

    const dto = {
      cpf,
      email,
      password,
      username,
      accountType,
      categoryId: userSkills?.newCategory ? undefined : userSkills?.category,
      newCategory: userSkills?.newCategory || undefined,
      subCategories: userSkills?.subCategories,
    };

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
