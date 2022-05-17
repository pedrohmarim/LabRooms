import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as SignUpService from "../../services/signup.service";
import UserSkills from "./components/UserSkills.component";
import UserBasicInfo from "./components/UserBasicInfo.component";
import { UserContext } from "../../../../Context/UserContext";

import { Form, Notification } from "../../../../antd_components";

const SignUpForm = ({ darkPallete, accountType }) => {
  const [validateInput, setValidateInput] = useState();
  const [captcha, setCaptcha] = useState(false);
  const [userSkills, setUserSkills] = useState();
  const { categories } = useContext(UserContext);
  const recaptchaRef = useRef();
  const [form] = Form.useForm();
  let navigate = useNavigate();

  function resetCaptcha() {
    setCaptcha(null);
    recaptchaRef.current.reset();
  }

  function onSubmit(values) {
    if (!accountType)
      Notification.open({
        type: "error",
        message: "Erro",
        description: "Selecione Novamente o Tipo de Cadastro.",
      });

    setValidateInput(null);

    const { cpf, email, password, username, imageFile, cnpj } = values;

    const dto = new FormData();
    dto.append("image-file", imageFile.file.originFileObj);
    if (cpf) dto.append("cpf", cpf);
    else dto.append("cnpj", cnpj);
    dto.append("email", email);
    dto.append("password", password);
    dto.append("username", username);
    dto.append("accountType", accountType);
    dto.append(
      "categoryId",
      userSkills?.newCategory ? undefined : userSkills?.category
    );
    dto.append("newCategory", userSkills?.newCategory || undefined);

    for (var i = 0; i < userSkills?.subCategories?.length; i++) {
      dto.append("subCategories", userSkills?.subCategories[i]);
    }
    dto.set("captcha", captcha);

    SignUpService.userRegister(dto).then(({ data }) => {
      const { message, success } = data;

      if (!success) {
        setValidateInput(data);
        resetCaptcha();
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
          accountType={accountType}
          captcha={captcha}
          recaptchaRef={recaptchaRef}
          setCaptcha={(value) => setCaptcha(value)}
          validateInput={validateInput}
          darkPallete={darkPallete}
        />
      )}
    </Form>
  );
};

export default SignUpForm;
