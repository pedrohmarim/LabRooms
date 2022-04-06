import React from "react";
import { Button, Row } from "../../../antd_components";
import { TIPO_CADASTRO } from "../../../Helpers/TipoCadastro";

const SignUpType = ({ setAccountType }) => {
  return (
    <Row justify='center'>
      <Row
        style={{ width: "100%", marginTop: "20px" }}
        justify='space-around'
        align='middle'
      >
        <Button
          type='primary'
          onClick={() => setAccountType(TIPO_CADASTRO.FREELANCER)}
        >
          Freelancer
        </Button>

        <Button
          type='primary'
          onClick={() => setAccountType(TIPO_CADASTRO.EMPRESA)}
        >
          Empresa
        </Button>
      </Row>
    </Row>
  );
};
export default SignUpType;
