import { FC, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
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
  const [stories, setStories] = useState<
    { id: string; title: string; description: string; image_name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const routeNavigator = useRouteNavigator();

  // Функция для загрузки данных с сервера
  const fetchStories = async () => {
    try {
      const response = await fetch(
        "https://vk-back.sm2.fun/api/v1/be_itmo/get_all_stories",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStories(data); // Сохраняем истории в состоянии
        setIsLoading(false);
      } else {
        console.error("Ошибка загрузки данных с сервера");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  // Функция для регистрации пользователя
  const registerUser = async (user: UserInfo) => {
    try {
      const response = await fetch(
        "https://vk-back.sm2.fun/api/v1/be_itmo/registrate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: user.id, // id пользователя
            first_name: user.first_name,
            photo_100: user.photo_100,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Пользователь зарегистрирован или уже существует:", data);
        localStorage.setItem("isRegistered", "true"); // Записываем в localStorage, что пользователь зарегистрирован
      } else {
        console.error("Ошибка регистрации пользователя");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса регистрации:", error);
    }
  };

  useEffect(() => {
    if (fetchedUser) {
      const isRegistered = localStorage.getItem("isRegistered"); // Проверяем, есть ли запись о регистрации в localStorage
      if (!isRegistered) {
        registerUser(fetchedUser); // Если пользователь еще не зарегистрирован, отправляем запрос на регистрацию
      }
    }
    fetchStories(); // Выполняем загрузку данных при монтировании компонента
  }, [fetchedUser]);

  const handleStoryClick = (story: {
    id: string;
    title: string;
    description: string;
    image_name: string;
  }) => {
    routeNavigator.push(
      `/story-detail/${story.id}/${encodeURIComponent(story.title)}/${encodeURIComponent(
        story.description
      )}/${encodeURIComponent(story.image_name)}`
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader 
        before={
          fetchedUser && <Avatar size={32} src={fetchedUser.photo_100} />
        }
      >
        BE ITMO
      </PanelHeader>
      <Group mode="card" header={<Header mode="primary">НОВОСТИ</Header>} padding="s">
        <Div>
          {isLoading ? (
            <div>Загрузка...</div> // Показать индикатор загрузки, пока данные не загружены
          ) : (
            <CardScroll size="s">
              {stories.map((story) => (
                <CardStory
                  key={story.id}
                  imgSrc={`https://vk-back.sm2.fun/api/v1/be_itmo/stories_photo/${story.image_name}`} // Указание пути к изображению
                  title={story.title}
                  onClick={() => handleStoryClick(story)}
                />
              ))}
            </CardScroll>
          )}
        </Div>
      </Group>
      <Group mode="card" header={<Header mode="primary">ТРЕКИ</Header>} padding='s'>
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
      <Div>
        <ButtonGroup
          mode="horizontal"
          gap="s"
          stretched
        >
          <Button
            size="m"
            appearance="accent-invariable"
            stretched
            style={{height: '50px', marginBottom:'2vh'}}
            onClick={() => routeNavigator.push("rank")}
          >
            Рейтинг
          </Button>
        </ButtonGroup>
      </Div>
    </Panel>
  );
};

export default MainScreen;
