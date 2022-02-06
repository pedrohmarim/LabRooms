import React, { useState, useEffect } from "react";
import {
  RoomInfoContainer,
  InfoWrapper,
  Layout,
  RoomCategory,
  CategoryText,
  SiderStyled,
  UsernameContainer,
  ExpandButton,
} from "./styles";
import {
  Image,
  FeatherIcons,
  Row,
  Tooltip,
  Typography,
  Col,
} from "../../../antd_components";
import { RoomTitle, RoomDescription } from "../../Home/components/Rooms/styles";
import * as ChatRoomService from "../services/ChatRoom.service";
import { CrownOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

export default function Chat({ darkPallete, currentRoom }) {
  const { Title } = Typography;
  const [toggle, setToggle] = useState(false);
  const [RoomCategoryData, setRoomCategoryData] = useState();
  const [ownerRoomName, setOwnerRoomName] = useState();
  const { Content } = Layout;

  const users = [
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

  const Loading = (
    <>
      <LoadingOutlined
        style={{ marginRight: "5px", color: darkPallete.white }}
      />
      <span style={{ color: darkPallete.white }}>Carregando...</span>
    </>
  );

  return (
    <Layout>
      <Content>
        {currentRoom && RoomCategoryData && ownerRoomName ? (
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
            <Title level={4} style={{ color: darkPallete.white }}>
              Disponíveis - 9
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Image
                  src={loadRoomThumb(currentRoom.thumb)}
                  height={35}
                  width={35}
                />
                <UsernameContainer>
                  {ownerRoomName}
                  <CrownOutlined style={{ fontSize: "20px" }} />
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
