import React, { useState, useEffect } from "react";
import { RoomTitle } from "../../Home/components/Rooms/styles";
import * as ChatRoomService from "../services/ChatRoom.service";
import { CrownOutlined } from "@ant-design/icons";
import { Loading } from "../../../GlobalComponents/Loading/Loading.component";
import {
  RoomInfoContainer,
  InfoWrapper,
  Layout,
  RoomCategory,
  CategoryText,
  SiderStyled,
  UsernameContainer,
  TitleStyled,
  ChatContainer,
  ChatStyled,
  Message,
  HourMessage,
  MessageOwner,
  TextMessage,
  InputMessage,
  SendMessage,
  RoomDescription,
} from "./styles";
import {
  Image,
  FeatherIcons,
  Row,
  Col,
  Tooltip,
  Input,
  Collapse,
} from "../../../antd_components";

export default function Chat({ darkPallete, currentRoom }) {
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [ownerRoomName, setOwnerRoomName] = useState();
  const { Content } = Layout;
  const { Panel } = Collapse;

  const styleInput = {
    borderRadius: "4px",
    marginLeft: "-10px",
  };

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
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "Pedo Pedro Pedro ",
    },
    {
      name: "utlima",
    },
  ];

  useEffect(() => {
    if (currentRoom) {
      const { categoryId, owner, newCategory } = currentRoom;

      if (!newCategory && categoryId) {
        ChatRoomService.getCategoryById(categoryId).then(({ data }) => {
          setRoomCategoryData(data);
        });
      } else if (newCategory && !categoryId) {
        setRoomCategoryData({ Icon: "repeat", Title: newCategory });
      }

      ChatRoomService.getUserById(owner).then(({ data }) => {
        const { username } = data;
        setOwnerRoomName(username);
      });
    }
  }, [currentRoom]);

  return (
    <Layout>
      <Content>
        {currentRoom && RoomCategoryData && ownerRoomName ? (
          <ChatContainer bordered={false} expandIconPosition='right'>
            <Panel
              header={
                <RoomInfoContainer
                  margintop={window.innerWidth < 1024 ? "15px" : "20px"}
                  background={darkPallete.lightblueOpacity}
                >
                  <Image
                    src={currentRoom.thumb}
                    height={70}
                    width={70}
                    preview
                  />

                  <InfoWrapper>
                    <RoomTitle
                      color={darkPallete.white}
                      style={{ margin: "0 30px 0 10px" }}
                    >
                      {currentRoom.title}
                    </RoomTitle>

                    <RoomCategory color={darkPallete.white}>
                      <Row align='middle'>
                        <FeatherIcons icon={RoomCategoryData?.Icon} size={15} />

                        <CategoryText>{RoomCategoryData?.Title}</CategoryText>
                      </Row>
                    </RoomCategory>
                  </InfoWrapper>
                </RoomInfoContainer>
              }
              key='1'
            >
              <RoomDescription
                color={darkPallete.white}
                dangerouslySetInnerHTML={{ __html: currentRoom?.description }}
              />
            </Panel>

            <ChatStyled background={darkPallete.lightblueOpacity}>
              <Row gutter={[16, 16]}>
                {users &&
                  users.map(({ name }) => (
                    <Col span={24}>
                      <Message background={darkPallete.backgroundBlue}>
                        <MessageOwner>
                          Pedro Henrique Marim Cavelani
                        </MessageOwner>
                        <TextMessage>{name}</TextMessage>
                        <HourMessage justify='end' align='bottom'>
                          12:22
                        </HourMessage>
                      </Message>
                    </Col>
                  ))}
              </Row>
              <InputMessage
                gutter={[15, 15]}
                justify='space-around'
                align='bottom'
                background={darkPallete.backgroundBlue}
              >
                <Col span={23}>
                  <Input placeholder='Mensagem' style={styleInput} />
                </Col>
                <Tooltip title='Enviar' color={darkPallete.lightblue}>
                  <SendMessage span={1} background={darkPallete.white}>
                    <FeatherIcons icon='send' size={25} />
                  </SendMessage>
                </Tooltip>
              </InputMessage>
            </ChatStyled>
          </ChatContainer>
        ) : (
          Loading(darkPallete.white)
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
                <Image src={currentRoom.thumb} preview height={35} width={35} />
                <UsernameContainer>
                  <CrownOutlined
                    style={{
                      fontSize: "20px",
                      marginRight: "5px",
                      color: "yellow",
                    }}
                  />
                  {ownerRoomName}
                </UsernameContainer>
              </Col>
              {users &&
                users.map(({ name }) => (
                  <Col span={24}>
                    <Image
                      src={currentRoom.thumb}
                      preview
                      height={35}
                      width={35}
                    />
                    <UsernameContainer>{name}</UsernameContainer>
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          Loading(darkPallete.white)
        )}
      </SiderStyled>
    </Layout>
  );
}
