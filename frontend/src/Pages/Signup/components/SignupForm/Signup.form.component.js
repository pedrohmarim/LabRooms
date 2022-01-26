import React from "react";
import { Form, Input, Icons } from "../../../../antd_components";

const SignUpForm = () => {
  return (
    <Form layout='vertical'>
      <Form.Item label='Nome completo'>
        <Input allowClear prefix={<Icons.UserOutlined />} />
      </Form.Item>
    </Form>
  );
};
export default SignUpForm;
