import React from "react";
import { StyledButton } from "../Signup.form.styled";
import CategoriesSubcategoriesSelect from "../../../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";

const UserSkills = ({ categories, darkPallete, setUserSkills, form }) => {
  function handleVerifyCategories(inputsValues) {
    if (inputsValues?.subCategories?.length === 0)
      inputsValues.subCategories = undefined;

    if (Object.keys(inputsValues).length > 1) {
      if (
        inputsValues?.category &&
        inputsValues?.subCategories === undefined &&
        !inputsValues.newCategory
      ) {
        inputsValues.subCategories = [];
        form.validateFields();
        return false;
      }

      return true;
    }

    form.validateFields();
    return false;
  }

  return (
    <>
      <CategoriesSubcategoriesSelect
        form={form}
        categories={categories}
        labelMainCategory='Qual sua Área de Atuação?'
      />

      <StyledButton
        onClick={() =>
          handleVerifyCategories(form.getFieldsValue(true)) &&
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
