import styled from "styled-components";
import { Typography, Col, Divider as StyledDivider, Image } from "antd";

const { Title } = Typography;

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 15px;
`;

export const RoomImage = styled(Image)`
  width: 100% !important;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const TitleStyled = styled(Title)`
  margin-top: ${({ margintop }) => margintop} !important;
  color: ${({ color }) => color} !important;
  display: flex;
  align-items: center;
`;

export const RoomItem = styled.div`
  display: grid;
  grid-template-columns: 100%;
  justify-content: start;
  align-items: center;
  transform: scale(0.95);
  background-color: ${({ background }) => background};
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &&:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;

export const RoomTitle = styled.p`
  overflow: hidden;
  padding-right: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  font-weight: bold;
  margin: 0;
  font-size: 15pt;
`;

export const RoomDescription = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  margin: 0;
  font-size: 10pt;
  font-weight: 500;
`;

export const UserCount = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  position: absolute;
  right: 0;
  margin-right: 10px;
  bottom: 20px;
`;

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const ButtonText = styled.span`
  margin-left: 5px;
`;

export const Divider = styled(StyledDivider)`
  border: solid 1px rgba(255, 255, 255, 0.1);
  margin: 25px 0 0 0;

  @media screen and (max-width: 1024px) {
    margin: 20px 0 5px 0;
  }
`;

export const UsersNumber = styled.span`
  margin: 2.5px 0 0 3px;
`;
