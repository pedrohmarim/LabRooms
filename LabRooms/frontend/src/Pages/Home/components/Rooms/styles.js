import styled from "styled-components";
import {
  Typography,
  Col,
  Divider as StyledDivider,
  Image,
  Avatar,
  Row,
} from "../../../../antd_components";

const { Title } = Typography;

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 15px;
`;

export const RoomImage = styled(Image)`
  width: 200px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
`;

export const StyledRowTags = styled(Row)`
  margin: ${({ margin }) => margin || "3px 0 0 0"};
  width: 100%;
  overflow-x: auto;
  display: inline-block;
  white-space: nowrap;

  ::-webkit-scrollbar {
    height: ${({ scrollHeight }) => scrollHeight || "6px"};
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
  }
`;

export const TitleStyled = styled(Title)`
  margin-top: ${({ margintop }) => margintop} !important;
  color: ${({ color }) => color} !important;
  display: flex;
  align-items: center;
`;

export const RoomItem = styled.div`
  width: ${({ width }) => width} !important;
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

export const CategorieProject = styled(Row)`
  margin-top: 8px;
  color: ${({ color }) => color};
  text-align: center;
`;

export const RoomOwner = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  font-style: italic;
  padding-top: 5px;
  font-size: 10pt;
`;

export const RoomTitle = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  font-weight: bold;
  margin: ${({ margin }) => margin};
  font-size: 15pt;
`;

export const RoomOwnerImg = styled(Avatar)`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 45px;
  left: 5px;
`;

export const ProgressIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  color: #fff;

  &&:hover {
    color: #fff;
  }
`;

export const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const ButtonText = styled.span`
  margin-left: 5px;
  color: ${({ color }) => color};
`;

export const StaticticSubtitle = styled(Typography)`
  color: ${({ color }) => color};
`;

export const RoomTitleRecommendation = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: underline;
  margin-bottom: 10px;

  &&:hover {
    color: ${({ hovercolor }) => hovercolor};
  }
`;

export const ScoreList = styled.span`
  color: ${({ color }) => color};
  margin-top: 5px;
`;

export const Divider = styled(StyledDivider)`
  border: solid 1px rgba(255, 255, 255, 0.1);
  margin: 25px 0 0 0;

  @media screen and (max-width: 1024px) {
    margin: 20px 0 5px 0;
  }
`;
