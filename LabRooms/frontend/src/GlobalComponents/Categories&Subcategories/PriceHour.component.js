import React, { useEffect } from "react";
import { CurrencyInput, Form, Typography } from "../../antd_components";

const PriceHour = ({
  viewMode,
  editMode,
  fromCreateForm,
  form,
  tooltip,
  editModeFromTabRoom,
  userPrice,
}) => {
  useEffect(() => {
    if (userPrice)
      form.setFieldsValue({
        hourprice: userPrice,
      });
  }, [form, userPrice]);

  return (
    <Form.Item
      tooltip={tooltip ?? null}
      rules={!viewMode && [{ required: true, message: "Campo obrigatório." }]}
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
        }}
        maxLength={4}
        readOnly={viewMode}
        disabled={
          editModeFromTabRoom || (!editMode && !viewMode && !fromCreateForm)
        }
        style={{
          padding: "5px",
          border: "1px solid #d9d9d9",
          borderBottom: "1px solid #d9d9d9",
          outline: "none",
        }}
        prefix='R$ '
        placeholder='Preço/Hora'
        decimalsLimit={2}
      />
      ;
    </Form.Item>
  );
};

export default PriceHour;
