import React from "react";
import { Image, Form, Input, Icons } from "../../../../antd_components";
import { SignFormContainer, SignForm } from "./styles";
import SignupBanner from "../../../../assets/SignupBanner.svg";

const SignUpForm = () => {
  return (
    <SignFormContainer title='Registrar-se' bordered>
      <SignForm>
        <Image
          src={SignupBanner}
          preview={false}
          alt='SignupBanner'
          height={400}
        />
        <Form layout='vertical'>
          <Form.Item label='Nome completo'>
            <Input allowClear prefix={<Icons.UserOutlined />} />
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </SignForm>
    </SignFormContainer>
  );
};
export default SignUpForm;
