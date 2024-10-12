import React, { FC } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Avatar,
  Group,
  NavIdProps,
  ButtonGroup,
  Button,
  Div,
  PanelHeaderButton,
  CardGrid,
  CardScroll,
  ContentCard,
  Card,
  Header,
  Text,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import "./MainScreen.css";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export interface MainScreenProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const MainScreen: FC<MainScreenProps> = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>
        <PanelHeaderContent
          before={
            fetchedUser && <Avatar size={32} src={fetchedUser.photo_100} />
          }
        >
          <div style={{ display: "flex", alignItems: "center" }}>BE ITMO</div>
        </PanelHeaderContent>
      </PanelHeader>
      <Div>
        <CardScroll size="s" style={{ paddingTop: "2vh" }}>
          <Card mode="tint" style={{ width: 140 }}>
              <Div>
                  <img 
                      src="https://i.postimg.cc/TKYQMmM5/Vector-5.png" 
                      alt="Beautiful Mountain" 
                      style={{ width: 'auto', height: '110px', objectFit: 'cover' }} 
                  />
                  <Text>Beautiful Mountain</Text>
              </Div>
          </Card>

          <Card mode="outline" style={{ width: 140 }}>
              <Div>
                  <img 
                      src="https://i.postimg.cc/ZCLjMHgh/Vector-4.png" 
                      alt="Beautiful Mountain" 
                      style={{ width: 'auto', height: '110px', objectFit: 'cover' }} 
                  />
                  <Text>Beautiful Mountain</Text>
              </Div>
          </Card>

          <Card mode="shadow" style={{ width: 140 }}>
              <Div>
                  <img 
                      src="https://i.postimg.cc/rzxfSMNs/Star-1.png" 
                      alt="Beautiful Mountain" 
                      style={{ width: 'auto', height: '110px', objectFit: 'cover' }} 
                  />
                  <Text>Beautiful Mountain</Text>
              </Div>
          </Card>

          <Card mode="outline-tint" style={{ width: 140 }}>
              <Div>
                  <img 
                      src="https://i.postimg.cc/w7z02ZwV/Vector-3.png" 
                      alt="Beautiful Mountain" 
                      style={{ width: 'auto', height: '110px', objectFit: 'cover' }} 
                  />
                  <Text>Beautiful Mountain</Text>
              </Div>
          </Card>
        </CardScroll>
      </Div>
      <Group mode="card" header={<Header mode="secondary">QUIZ</Header>} padding='s'>
      <CardGrid size="m" style={{ paddingTop: '2vh'}}>
        <Card onClick={() => routeNavigator.push("eco-itmo")}>
          <div className="custom-card-be-track eco">
            <img
              src="https://i.postimg.cc/w7z02ZwV/Vector-3.png"
              alt=""
              style={{ height: '150px', padding: "3%" }}
            />
            <div className="text-be-track-card">BE ECO</div>
          </div>
        </Card>
        <Card onClick={() => routeNavigator.push("fit-itmo")}>
          <div className="custom-card-be-track fit">
          <img
              src="https://i.postimg.cc/ZCLjMHgh/Vector-4.png"
              alt=""
              style={{ height: '150px', padding: "3%" }}
            />
            <div className="text-be-track-card">BE FIT</div>
          </div>
        </Card>
      </CardGrid>
      <CardGrid size="m" style={{ }}>
        <Card onClick={() => routeNavigator.push("pro-itmo")}>
          <div className="custom-card-be-track pro">
          <img
              src="https://i.postimg.cc/rzxfSMNs/Star-1.png"
              alt=""
              style={{ height: '150px', padding: "3%" }}
            />
            <div className="text-be-track-card">BE PRO</div>
          </div>
        </Card>
        <Card onClick={() => routeNavigator.push("healthy-itmo")}>
          <div className="custom-card-be-track healthy">
          <img
              src="https://i.postimg.cc/TKYQMmM5/Vector-5.png"
              alt=""
              style={{ height: '150px', padding: "3%" }}
            />
            <div className="text-be-track-card">BE HEALTHY</div>
          </div>
        </Card>
      </CardGrid>
      </Group>
      <Group
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <div className="button-group">
          <ButtonGroup
            mode="horizontal"
            gap="s"
            stretched
            style={{ paddingBottom: '1vh' }}
          >
            <Button
              size="m"
              appearance="accent-invariable"
              stretched
              className="custom-card"
              onClick={() => routeNavigator.push("persik")}
            >
              Рейтинг
            </Button>
          </ButtonGroup>
        </div>
      </Group>
    </Panel>
  );
};

export default MainScreen;
