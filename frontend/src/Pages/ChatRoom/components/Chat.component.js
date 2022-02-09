import React, { useState, useEffect } from "react";
import { RoomTitle, RoomDescription } from "../../Home/components/Rooms/styles";
import * as ChatRoomService from "../services/ChatRoom.service";
import { CrownOutlined } from "@ant-design/icons";
import {
  RoomInfoContainer,
  InfoWrapper,
  Layout,
  RoomCategory,
  CategoryText,
  SiderStyled,
  UsernameContainer,
  ExpandButton,
  TitleStyled,
  ChatContainer,
  ChatStyled,
  Message,
  HourMessage,
  MessageOwner,
  TextMessage,
} from "./styles";
import {
  Image,
  FeatherIcons,
  Row,
  Tooltip,
  Col,
} from "../../../antd_components";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";

export default function Chat({ darkPallete, currentRoom }) {
  const [toggle, setToggle] = useState(false);
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [ownerRoomName, setOwnerRoomName] = useState();
  const { Content } = Layout;

  const users = [
    {
      name: "o ",
    },
    {
      name: "Pedro Pedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Peedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedroedro Pedro ",
    },
    {
      name: "Ped Pedro Pedro ",
    },
    {
      name: "Pe Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro PedroPedroPedroPedroPedroPedroPedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
    {
      name: "Pedro Pedro Pedro Pedro Pedro Pedro ",
    },
  ];

  useEffect(() => {
    if (currentRoom) {
      const { categoryId, owner } = currentRoom;

      ChatRoomService.getCategoryById(categoryId).then(({ data }) => {
        setRoomCategoryData(data);
      });

      ChatRoomService.getUserById(owner).then(({ data }) => {
        const { username } = data;
        setOwnerRoomName(username);
      });
    }
  }, [currentRoom]);

  function loadRoomThumb(thumb) {}

  function expandInfo() {
    const elements = document.getElementsByClassName("expandable");
    setToggle((prev) => !prev);

    if (!toggle) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].className += " expandText";
      }
    } else {
      for (i = 0; i < elements.length; i++) {
        elements[i].classList.remove("expandText");
      }
    }
  }

  return (
    <Layout>
      <Content>
        {currentRoom && RoomCategoryData && ownerRoomName ? (
          <ChatContainer>
            <RoomInfoContainer
              margintop={window.innerWidth < 1024 ? "15px" : "20px"}
              background={darkPallete.lightblueOpacity}
            >
              <Image
                src={loadRoomThumb(currentRoom.thumb)}
                height={70}
                width={70}
              />

              <InfoWrapper>
                <RoomTitle
                  className='expandable'
                  color={darkPallete.white}
                  style={{ marginRight: "60px" }}
                >
                  {currentRoom.title}
                </RoomTitle>

                <RoomDescription
                  className='expandable'
                  color={darkPallete.white}
                  style={{ marginRight: "10px" }}
                >
                  {currentRoom.description}
                </RoomDescription>

                <RoomCategory color={darkPallete.white}>
                  <Row align='middle'>
                    <FeatherIcons icon={RoomCategoryData.Icon} size={15} />

                    <CategoryText>{RoomCategoryData.Title}</CategoryText>
                  </Row>

                  <Tooltip
                    title={toggle ? "Retrair" : "Expandir"}
                    color={darkPallete.lightblue}
                    placement='bottom'
                  >
                    <ExpandButton ghost onClick={expandInfo}>
                      <FeatherIcons
                        icon={toggle ? "chevron-up" : "chevron-down"}
                        size={25}
                      />
                    </ExpandButton>
                  </Tooltip>
                </RoomCategory>
              </InfoWrapper>
            </RoomInfoContainer>

            <ChatStyled background={darkPallete.lightblueOpacity}>
              <Row gutter={[16, 16]}>
                {users &&
                  users.map(({ name }) => (
                    <Col span={24}>
                      <Message>
                        <MessageOwner>
                          Pedro Henrique Marim Cavelani
                        </MessageOwner>
                        <TextMessage>{name}</TextMessage>
                        <HourMessage>12:22</HourMessage>
                      </Message>
                    </Col>
                  ))}
              </Row>
            </ChatStyled>
          </ChatContainer>
        ) : (
          Loading
        )}
      </Content>

      <SiderStyled
        background={darkPallete.lightblueOpacity}
        color={darkPallete.white}
      >
        {users && ownerRoomName ? (
          <>
            <TitleStyled level={4} color={darkPallete.white}>
              Disponíveis - 9
            </TitleStyled>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Image
                  src={loadRoomThumb(currentRoom.thumb)}
                  height={35}
                  width={35}
                />
                <UsernameContainer>
                  {ownerRoomName}
                  <CrownOutlined
                    style={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "yellow",
                    }}
                  />
                </UsernameContainer>
              </Col>
              {users &&
                users.map(({ name }) => (
                  <Col span={24}>
                    <Image
                      src={loadRoomThumb(currentRoom.thumb)}
                      height={35}
                      width={35}
                    />
                    <UsernameContainer>{name}</UsernameContainer>
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          Loading
        )}
      </SiderStyled>
    </Layout>
  );
}
