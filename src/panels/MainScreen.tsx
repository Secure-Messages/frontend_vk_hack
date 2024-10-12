import { FC } from "react";
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
  CardGrid,
  CardScroll,
  Card,
  Header,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import "./MainScreen.css";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import CardStory from "../components/CardStory";

export interface MainScreenProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const MainScreen: FC<MainScreenProps> = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator();
  // const mockData = [
  //   {
  //     imgSrc: 'https://i.postimg.cc/TKYQMmM5/Vector-5.png',
  //     title: 'Beautiful Mountain 1',
  //   },
  //   {
  //     imgSrc: 'https://i.postimg.cc/ZCLjMHgh/Vector-4.png',
  //     title: 'Beautiful Mountain 2',
  //   },
  //   {
  //     imgSrc: 'https://i.postimg.cc/rzxfSMNs/Star-1.png',
  //     title: 'Beautiful Mountain 3',
  //   },
  //   {
  //     imgSrc: 'https://i.postimg.cc/w7z02ZwV/Vector-3.png',
  //     title: 'Beautiful Mountain 4',
  //   }
  // ];
  const mockData = [
    {
      id: '1',
      imgSrc: 'https://i.postimg.cc/TKYQMmM5/Vector-5.png',
      title: 'Beautiful Mountain 1',
      description: 'This is a beautiful mountain located in the heart of the Alps.',
    },
    {
      id: '2',
      imgSrc: 'https://i.postimg.cc/ZCLjMHgh/Vector-4.png',
      title: 'Beautiful Mountain 2',
      description: 'This mountain offers breathtaking views and amazing hiking trails.',
    },
    {
      id: '3',
      imgSrc: 'https://i.postimg.cc/rzxfSMNs/Star-1.png',
      title: 'Beautiful Mountain 1',
      description: 'This is a beautiful mountain located in the heart of the Alps.',
    },
    {
      id: '4',
      imgSrc: 'https://i.postimg.cc/w7z02ZwV/Vector-3.png',
      title: 'Beautiful Mountain 2',
      description: 'This mountain offers breathtaking views and amazing hiking trails.',
    },
  ];
  const handleStoryClick = (story: { id: string; title: string; description: string; imgSrc: string }) => {
    routeNavigator.push(`/story-detail/${story.id}/${encodeURIComponent(story.title)}/${encodeURIComponent(story.description)}/${encodeURIComponent(story.imgSrc)}`);
  };     
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
      <Group mode="card" header={<Header mode="secondary">НОВСТИ</Header>} padding='s' style={{ paddingTop: "2vh" }}>
      <Div>
        <CardScroll size="s">
          {mockData.map((item) => (
              <CardStory key={item.id} imgSrc={item.imgSrc} title={item.title}  onClick={() => handleStoryClick(item)}/>
          ))}
        </CardScroll>
        </Div>
      </Group>
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
