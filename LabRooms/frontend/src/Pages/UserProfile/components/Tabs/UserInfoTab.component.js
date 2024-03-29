import React, { useState, useContext } from "react";
import { Card } from "../../UserProfile.component.styled";
import { UserContext } from "../../../../Context/UserContext";
import { FormStyled } from "../../UserProfile.component.styled";
import { StyledButton } from "../../UserProfile.component.styled";
import * as UserProfileService from "../../services/UserProfile.service";
import PersonalInfo from "./sessions/PersonalInfo.component";
import SocialRegister from "./sessions/SocialsRegister.component";
import UserSkills from "./sessions/UserSkills.component";
import UserPrice from "./sessions/UserPrice.component";
import { Row, Notification } from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";
import { Loading } from "../../../../GlobalComponents/Loading/Loading.component";

const UserInfoTab = ({ darkPallete, user, token, viewMode }) => {
  const [editMode, setEditMode] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState(false);
  const { setUser, categories, screenSize } = useContext(UserContext);
  const [form] = FormStyled.useForm();

  const styleInput = {
    color: "gray",
    marginTop: "-1px",
    width: "100%",
    padding: "3px",
    border: viewMode ? "none" : "1px solid lightgray",
    outline: "none",
    borderBottom: viewMode
      ? "solid 1px rgba(0, 0, 0, 0.1)"
      : "solid 1px lightgray",
  };

  function handleSubmit(values) {
    const {
      username,
      hourprice,
      email,
      cpf,
      cnpj,
      category,
      newCategory,
      subCategories,
      phone,
      celphone,
      biography,
      facebook,
      instagram,
      twitter,
      linkedin,
      github,
    } = values;

    const dto = {
      username,
      hourprice,
      email,
      cpf: cpf || undefined,
      cnpj: cnpj || undefined,
      categoryId: category || undefined,
      newCategory: newCategory || undefined,
      subCategories: subCategories || undefined,
      phone: phone || undefined,
      celphone: celphone || undefined,
      biography: biography || undefined,
      socials: {
        facebook: facebook || undefined,
        instagram: instagram || undefined,
        twitter: twitter || undefined,
        linkedin: linkedin || undefined,
        github: github || undefined,
      },
    };

    UserProfileService.UpdateUserInfo(dto, token).then(({ data }) => {
      const { message, status, updatedUser, field } = data;

      if (!field) {
        setUser(updatedUser);
        setEditMode(false);
        setInvalidInfo(false);
      } else {
        setInvalidInfo({ field, message });
      }

      Notification.open({
        type: status === 200 ? "success" : "error",
        message,
      });
    });
  }

  return (
    <Card bordered={false}>
      {user && categories ? (
        <FormStyled
          form={form}
          background={darkPallete.white}
          onFinish={handleSubmit}
          layout='vertical'
          initialValues={{
            username: user?.username,
            email: user?.email,
            cpf: user?.cpf || undefined,
            cnpj: user?.cnpj || undefined,
            category: user?.categoryId || TIPO_CATEGORIA.CATEGORIA_CRIADA,
            newCategory: user?.newCategory,
            subCategories: user?.subCategories || undefined,
            phone: user?.phone,
            celphone: user?.celphone,
            biography: user?.biography,
            facebook: user?.socials?.facebook,
            instagram: user?.socials?.instagram,
            twitter: user?.socials?.twitter,
            linkedin: user?.socials?.linkedin,
            github: user?.socials?.github,
          }}
        >
          <PersonalInfo
            accountType={user?.accountType}
            invalidInfo={invalidInfo}
            editMode={editMode}
            viewMode={viewMode}
            styleInput={styleInput}
            darkPallete={darkPallete}
            setEditMode={(value) => setEditMode(value)}
          />

          {user?.accountType === TIPO_CADASTRO.FREELANCER && (
            <>
              <UserSkills
                darkPallete={darkPallete}
                styleInput={styleInput}
                fromUserProfile
                editMode={editMode}
                viewMode={viewMode}
                categories={categories}
                categoryIdFromUser={user?.categoryId}
                newCategoryFromUser={user?.newCategory}
                labelMainCategory='Categoria'
                form={form}
              />

              <UserPrice
                screenSize={screenSize?.dynamicWidth}
                form={form}
                userPrice={user?.hourprice}
                darkPallete={darkPallete}
                fromUserProfile
                editMode={editMode}
                viewMode={viewMode}
              />
            </>
          )}

          {!viewMode && (
            <SocialRegister
              editMode={editMode}
              styleInput={styleInput}
              screenSize={screenSize?.dynamicWidth}
            />
          )}

          {editMode && (
            <Row justify='end'>
              <StyledButton
                htmlType='submit'
                backgroundcolor={darkPallete.lightblue}
                height='35'
                width='200'
                color={darkPallete.white}
              >
                Confirmar
              </StyledButton>
            </Row>
          )}
        </FormStyled>
      ) : (
        <>
          {Loading(
            screenSize?.dynamicWidth < 1024 ? darkPallete.white : "#000"
          )}
        </>
      )}
    </Card>
  );
};

export default UserInfoTab;
