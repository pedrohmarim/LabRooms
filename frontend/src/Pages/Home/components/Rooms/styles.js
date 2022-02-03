import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  width: 97%;
  margin: 0 auto;
  padding: 15px;
`;

export const RoomItem = styled.div`
  display: flex;
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
  padding: 0 70px 0 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  color: ${({ color }) => color};
  font-weight: bold;
  margin: 0 0 0 10px;
  font-size: 15pt;
`;

export const RoomDescription = styled.p`
  padding: 0 115px 0 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  color: ${({ color }) => color};
  margin: 0 0 0 10px;
  font-size: 10pt;
  font-weight: 500;
`;

export const UserCount = styled.p`
  color: ${({ color }) => color};
  position: absolute;
  right: 0;
  margin-right: 10px;
  bottom: -10px;
`;
export const RoomCategory = styled.p`
  color: ${({ color }) => color};
  position: absolute;
  top: 10px;
  right: 0;
  margin-right: 10px;
`;
