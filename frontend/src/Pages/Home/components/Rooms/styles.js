import styled from "styled-components";
import {
  Typography,
  Col,
  Divider as StyledDivider,
  Image,
  Avatar,
} from "../../../../antd_components";

const { Title } = Typography;

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 15px;
`;

export const RoomImage = styled(Image)`
  width: 100%;
  height: auto;
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
  padding: 8px;
  margin-top: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &&:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;

export const RoomOwner = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  font-style: italic;
  margin: 0 0 15px 30px;
  padding-top: 5px;
  font-size: 10pt;
`;

export const RoomTitle = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  font-weight: bold;
  margin: 0 0 5px 0px;
  font-size: 15pt;
`;

export const RoomOwnerImg = styled(Avatar)`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 45px;
  left: 5px;
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
