import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 15px;
`;

export const RoomItem = styled.div`
  display: grid;
  grid-template-columns: auto 85%;
  justify-content: start;
  align-items: center;
  padding: 10px;
  transform: scale(0.95);
  background-color: ${({ background }) => background};
  height: 90px;
  margin-top: ${({ margintop }) => margintop};
  border-radius: 8px;
  transition: all 0.2s ease;

  &&:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;

export const RoomTitle = styled.p`
  overflow: hidden;
  padding: 0 10px 0 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  font-weight: bold;
  margin: 0 0 0 0;
  font-size: 15pt;
`;

export const RoomDescription = styled.p`
  padding: 0 60px 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  margin: 0 0 0 0;
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
  bottom: -10px;
`;
