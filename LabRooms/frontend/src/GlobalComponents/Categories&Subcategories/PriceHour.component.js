import React from "react";
import {CurrencyInput, Form,Typography } from '../../antd_components'

const PriceHour = ({viewMode,editMode,fromSignup,form,userPrice}) => {
  return (
    <Form.Item
    rules={
      !viewMode && [{ required: true, message: "Campo obrigatório." }]
    }
    name='hourprice'
    label={
      <Typography>
        <b>Preço/Hora</b>
      </Typography>
    }
  >
 
               <CurrencyInput
               defaultValue={userPrice && userPrice}
               onValueChange={(value) => {
                    form.setFieldsValue({
                      hourprice: value,
                    });
                  }
                }
                maxLength={4}
                readOnly={viewMode}
                disabled={!editMode && !viewMode && !fromSignup}
                style={{ padding: "5px", border: "1px solid #d9d9d9", borderBottom: "1px solid #d9d9d9", outline: 'none'}}
                prefix="R$ "
                placeholder="Preço/Hora"
                decimalsLimit={2}
              />;
    </Form.Item>
  );
};

export default PriceHour;
