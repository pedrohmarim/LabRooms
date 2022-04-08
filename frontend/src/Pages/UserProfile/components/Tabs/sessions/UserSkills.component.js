import React from "react";
import { StyledCol } from "../../../UserProfile.component.styled";
import { Row, Typography } from "../../../../../antd_components";
import CategoriesSubcategories from '../../../../../GlobalComponents/Categories&Subcategories/CategoriesSubcategoriesSelect.component'

const UserSkills = ({
  categoryIdFromUser,
  fromUserProfile,
  editMode,
  viewMode,
  categories,
  newCategoryFromUser,
  labelMainCategory,
  form,
}) => {
  const { Title } = Typography;
  return (
    <>
      <Row>
        <StyledCol span={24} marginbottom='0 0 15px 0'>
          <Row justify='space-between'>
            <Title level={4}>Habilidades</Title>
          </Row>
        </StyledCol>
      </Row>

      <CategoriesSubcategories 
        categoryIdFromUser={categoryIdFromUser}
        fromUserProfile={fromUserProfile}
        categories={categories}
        labelMainCategory={labelMainCategory}
        form={form}
        editMode={editMode}
        viewMode={viewMode}
        newCategoryFromUser={newCategoryFromUser}
      />
    </>
  );
};

export default UserSkills;
