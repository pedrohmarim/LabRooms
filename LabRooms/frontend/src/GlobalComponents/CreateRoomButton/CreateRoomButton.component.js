import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { ButtonText } from "../../Pages/Home/components/Rooms/styles";
import { Link } from "react-router-dom";
import { Button, FeatherIcons, Tooltip } from "../../antd_components";
import { TIPO_CADASTRO } from "../../Helpers/TipoCadastro";

const CreateRoomButton = ({ color, margin, backgroundcolor, tooltip }) => {
  const { user, screenSize } = useContext(UserContext);
  const [accountType, setAccountType] = useState();

  useEffect(() => {
    if (!user) return;

    const { accountType } = user;
    setAccountType(accountType);
  }, [user]);

  return (
    <>
      {accountType === TIPO_CADASTRO.EMPRESA && (
        <Link to='/createroom'>
          <Tooltip
            title='Crie um Novo Projeto'
            color={tooltip || backgroundcolor}
          >
            <Button
              margin={
                margin || (screenSize?.dynamicWidth > 1024 && "0 0 0 15px")
              }
              color={color}
              backgroundcolor={backgroundcolor}
              icon={<FeatherIcons icon='plus' size={20} />}
            >
              <ButtonText>Criar Projeto</ButtonText>
            </Button>
          </Tooltip>
        </Link>
      )}
    </>
  );
};

export default CreateRoomButton;
