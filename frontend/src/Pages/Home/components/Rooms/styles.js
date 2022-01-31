import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 20px;
`;

export const RoomItem = styled.div`
  position: relative;
  transform: scale(0.95);
  padding: 10px;
  background-color: ${({ background }) => background};
  height: 80px;
  margin-top: ${({ margintop }) => margintop};
  border-radius: 8px;
  transition: all 0.2s ease;

  &&:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;

export const RoomTitle = styled.p`
  color: ${({ color }) => color};
  margin: 0 0 0 10px;
  font-size: 15pt;
`;

export const RoomDescription = styled.p`
  color: ${({ color }) => color};
  margin: 0 0 0 10px;
`;

export const UserCount = styled.p`
  color: ${({ color }) => color};
  position: absolute;
  right: 0;
  margin-right: 10px;
  bottom: -10px;
`;
