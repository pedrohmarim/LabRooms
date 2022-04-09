import React, { useState, useContext, useEffect } from "react";
import * as CreateRoomService from '../../../CreateRoom/services/createroom.service'
import { Card } from "../../UserProfile.component.styled";
import { UserContext } from "../../../../Context/UserContext";
import { FormStyled } from "../../UserProfile.component.styled";
import { StyledButton } from "../../UserProfile.component.styled";
import * as UserProfileService from "../../services/UserProfile.service";
import PersonalInfo from "./sessions/PersonalInfo.component";
import SocialRegister from "./sessions/SocialsRegister.component";
import UserSkills from "./sessions/UserSkills.component";
import { Row, Notification } from "../../../../antd_components";
import { TIPO_CADASTRO } from "../../../../Helpers/TipoCadastro";
import { TIPO_CATEGORIA } from "../../../../Helpers/TipoCategoria";

const UserInfoTab = ({ darkPallete, user, token, viewMode }) => {
  const [editMode, setEditMode] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState(false);
  const [categories, setCategories] = useState();
  const { setUser } = useContext(UserContext);
  const [form] = FormStyled.useForm();

  const styleInput = {
    color: "gray",
    marginTop: "-1px",
    border: viewMode && "none",
    borderBottom: viewMode && "solid 1px rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleSubmit(values) {
    const {
      username,
      email,
      cpf,
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
      email,
      cpf,
      categoryId: category,
      newCategory,
      subCategories: subCategories,
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

      if(!field) {
        setUser(updatedUser);
        setEditMode(false);
        setInvalidInfo(false)
      } else {
        setInvalidInfo({ field, message})
      }
       
      Notification.open({
        type: status === 200 ? "success" : "error",
        message,
      });
    });
  }

  return (
    <Card bordered={false}>
      {user && categories && (
        <FormStyled
          form={form}
          background={darkPallete.white}
          onFinish={handleSubmit}
          layout='vertical'
          initialValues={{
            username: user.username,
            email: user.email,
            cpf: user?.cpf,
            category: user?.categoryId || TIPO_CATEGORIA.CATEGORIA_CRIADA,
            newCategory: user?.newCategory,
            subCategories: user?.subCategories || [],
            phone: user?.phone,
            celphone: user?.celphone,
            biography: user.biography,
            facebook: user?.socials?.facebook,
            instagram: user?.socials?.instagram,
            twitter: user?.socials?.twitter,
            linkedin: user?.socials?.linkedin,
            github: user?.socials?.github,
          }}
        >
          <PersonalInfo
            invalidInfo={invalidInfo}
            editMode={editMode}
            viewMode={viewMode}
            styleInput={styleInput}
            darkPallete={darkPallete}
            setEditMode={(value) => setEditMode(value)}
          />

          {user?.accountType === TIPO_CADASTRO.FREELANCER && (
            <UserSkills
              fromUserProfile
              editMode={editMode}
              viewMode={viewMode}
              categories={categories}
              categoryIdFromUser={user?.categoryId}
              newCategoryFromUser={user?.newCategory}
              labelMainCategory="Categoria"
              form={form}
            />
          )}

          {!viewMode && (
            <SocialRegister editMode={editMode} styleInput={styleInput} />
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
      )}
    </Card>
  );
};

export default UserInfoTab;
