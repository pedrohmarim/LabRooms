import React from "react";
import { StyledButton } from "../Signup.form.styled";
import CategoriesSubcategoriesSelect from "../../../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component";

const UserSkills = ({
  categories,
  handleSelectChange,
  subCategories,
  newCategory,
  darkPallete,
  setUserSkills,
  form,
}) => {
  return (
    <>
      <CategoriesSubcategoriesSelect
        handleSelectChange={handleSelectChange}
        categories={categories}
        newCategory={newCategory}
        subCategories={subCategories}
        labelMainCategory='Qual sua Área de Atuação?'
      />

      <StyledButton
        onClick={() => setUserSkills(form.getFieldsValue(true))}
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
