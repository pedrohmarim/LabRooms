import React from "react";
import { Button, Row, Tooltip } from "../../../antd_components";
import { TIPO_CADASTRO } from "../../../Helpers/TipoCadastro";

const SignUpType = ({ setAccountType, darkPallete }) => {
  return (
    <Row justify='center'>
      <Row
        style={{ width: "100%", marginTop: "20px" }}
        justify='space-around'
        align='middle'
      >
        <Tooltip
          title='descrição para freelancer'
          color={darkPallete.lightblue}
          placement='bottom'
        >
          <Button
            type='primary'
            onClick={() => setAccountType(TIPO_CADASTRO.FREELANCER)}
          >
            Freelancer
          </Button>
        </Tooltip>

        <Tooltip
          title='descrição para Empresa'
          color={darkPallete.lightblue}
          placement='bottom'
        >
          <Button
            type='primary'
            onClick={() => setAccountType(TIPO_CADASTRO.EMPRESA)}
          >
            Empresa
          </Button>
        </Tooltip>
      </Row>
    </Row>
  );
};
export default SignUpType;
