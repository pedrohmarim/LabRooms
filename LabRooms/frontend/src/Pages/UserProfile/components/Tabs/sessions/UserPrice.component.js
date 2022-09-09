import React from "react";
import { StyledCol } from "../../../UserProfile.component.styled";
import { Row, Typography, Col } from "../../../../../antd_components";
import PriceHour from "../../../../../GlobalComponents/Categories&Subcategories/PriceHour.component";

const UserPrice = ({ editMode, viewMode, form, userPrice, screenSize }) => {
  const { Title } = Typography;

  return (
    <>
      <Row>
        <StyledCol span={24} marginbottom='0 0 15px 0'>
          <Row justify='space-between'>
            <Title level={4}>Preço/Hora</Title>
          </Row>
        </StyledCol>
      </Row>

      <Row gutter={screenSize < 1024 ? 0 : [16, 16]}>
        <Col span={screenSize < 1024 ? 24 : 8}>
          <PriceHour
            editMode={editMode}
            viewMode={viewMode}
            form={form}
            userPrice={userPrice}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserPrice;
