import React, { useState } from "react";
import { StyledButton } from "../Signup.form.styled";
import CategoriesSubcategoriesSelect from "../../../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";
import PriceHour from "../../../../../GlobalComponents/Categories&Subcategories/PriceHour.component";

const UserSkills = ({ categories, darkPallete, setUserSkills, form }) => {
  const [showPrice, setShowPrice] = useState();

  function handleValidateInputs(inputsValues) {

    if (inputsValues.newCategory){
      if (inputsValues?.hourprice && inputsValues?.category)  return true;
    } else if ((inputsValues?.category || inputsValues.newCategory) && inputsValues?.hourprice && inputsValues?.subCategories.length > 0) {
      return true;
    }

    form.validateFields();
    return false;

  }

  return (
    <>
      <CategoriesSubcategoriesSelect
      setShowPrice={value => setShowPrice(value)}
        form={form}
        categories={categories}
        labelMainCategory='Qual sua Área de Atuação?'
        defaultHideNewCategory
      />

      {showPrice && <PriceHour fromSignup form={form}/>}

      <StyledButton
        onClick={() =>
          handleValidateInputs(form.getFieldsValue(true)) &&
          setUserSkills(form.getFieldsValue(true))
        }
        height='45px'
        margin='15px 0 0 0'
        backgroundcolor={darkPallete.lightblue}
        type='primary'
      >
        Avançar
      </StyledButton>
    </>
  );
};
export default UserSkills;
