import React from "react";
import { Button, Row, Tooltip } from "../../../antd_components";

const ChooseUserskills = ({ darkPallete, setShowSignUpForm }) => {
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
          <Button type='primary' onClick={() => setShowSignUpForm(true)}>
            Avançar
          </Button>
        </Tooltip>
      </Row>
    </Row>
  );
};
export default ChooseUserskills;
