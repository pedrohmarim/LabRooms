import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import CreateRoomButton from "../CreateRoomButton/CreateRoomButton.component";
import {
  FeatherIcons,
  Select,
  Row,
  Col,
  Form,
  Tooltip,
} from "../../antd_components";
import { TIPO_CATEGORIA } from "../../Helpers/TipoCategoria";
import {
  StyledOption,
  UserInfoTitle,
} from "../../Pages/UserProfile/UserProfile.component.styled";

const HeaderTabRoomsCandidacies = ({
  darkPallete,
  handleFilterRoom,
  tabRooms,
  headerTitle,
  fromCandidacies,
}) => {
  const { screenSize } = useContext(UserContext);

  return (
    <>
      <Col span={screenSize?.dynamicWidth > 1024 ? 18 : 24}>
        <Row justify='space-between'>
          <UserInfoTitle level={4}>
            {headerTitle} {!fromCandidacies && `(${tabRooms?.array.length})`}
          </UserInfoTitle>

          {!fromCandidacies && (
            <CreateRoomButton
              color={darkPallete.white}
              backgroundcolor={darkPallete.lightblue}
            />
          )}
        </Row>
      </Col>

      <Col span={screenSize?.dynamicWidth > 1024 ? 6 : 24}>
        <Tooltip
          color={darkPallete.lightblue}
          placement='top'
          title='Selecionar Projeto'
        >
          <Form.Item name='roomFilter'>
            <Select
              placeholder='Selecionar Projeto'
              defaultValue={
                !fromCandidacies ? TIPO_CATEGORIA.CATEGORIA_TODAS : null
              }
              onChange={handleFilterRoom}
            >
              {!fromCandidacies && (
                <Select.Option
                  key={TIPO_CATEGORIA.CATEGORIA_TODAS}
                  value={TIPO_CATEGORIA.CATEGORIA_TODAS}
                >
                  <FeatherIcons icon='list' size={18} className='iconMargin' />
                  <StyledOption>Todos</StyledOption>
                </Select.Option>
              )}

              {tabRooms &&
                tabRooms?.array.map(({ title, _id, Icon }) => (
                  <Select.Option key={_id} value={_id}>
                    <FeatherIcons
                      icon={Icon}
                      size={18}
                      className='iconMargin'
                    />
                    <StyledOption>{title}</StyledOption>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Tooltip>
      </Col>
    </>
  );
};

export default HeaderTabRoomsCandidacies;
