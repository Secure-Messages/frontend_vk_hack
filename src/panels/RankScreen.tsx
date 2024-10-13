import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spinner,
  Avatar,
  Group,
  Div,
  Touch,
  Title,
  Text,
  Button,
} from '@vkontakte/vkui';
import bridge, { UserInfo } from '@vkontakte/vk-bridge'; // Для работы с VK Bridge
import { NavIdProps } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface UserRank {
  first_name: string;
  photo_100: string;
  id: number;
  points: number;
}

interface RankProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Rank: FC<RankProps & { fetchedUser?: unknown }> = ({ id, fetchedUser }) => {
  const [rankData, setRankData] = useState<UserRank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const routeNavigator = useRouteNavigator();
  const [swipeStart, setSwipeStart] = useState<number | null>(null);

  // Функция для получения данных рейтинга
  const fetchRankData = async () => {
    try {
      const response = await fetch('https://vk-back.sm2.fun/api/v1/be_itmo/rating', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRankData(data);
      } else {
        console.error('Ошибка загрузки рейтинга');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Выполнение запроса при монтировании компонента
  useEffect(() => {
    fetchRankData();
  }, []);

  // Обрабатываем начало свайпа
  const handleSwipeStart = (e: { startX: number }) => {
    setSwipeStart(e.startX); // Сохраняем начальную позицию свайпа
  };

  // Обрабатываем движение свайпа
  const handleSwipeMove = (e: { shiftX: number }) => {
    if (swipeStart !== null && e.shiftX > 100) { // Если свайп вправо больше 100px
      routeNavigator.back(); // Переход назад
    }
  };

  // Функция для шаринга истории
  const handleShareToStories = async () => {
    if (!fetchedUser) return;

    try {
      await bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: fetchedUser.photo_100, // Используем фото пользователя как фон
      });
    } catch (error) {
      console.error('Ошибка при публикации истории:', error);
    }
  };

  return (
    <Panel id={id}>
      <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Рейтинг
        </PanelHeader>

        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <Group>
            <Div>
              {rankData.length > 0 ? (
                rankData.map((user, index) => (
                  <Div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <Avatar src={user.photo_100} size={48} />
                    <Div style={{ flex: 1, marginLeft: '12px' }}>
                      <Title level="3" weight="2">{user.first_name}</Title>
                      <Text weight='1' style={{ color: 'gray' }}>Очки: {user.points}</Text>
                    </Div>
                    <Text weight="2" style={{ marginLeft: 'auto', color: 'gray',marginRight:'5px' }}>#{index + 1}</Text>

                    {/* Кнопка для шаринга только для текущего пользователя */}
                    {fetchedUser && fetchedUser.id === user.id && (
                      <Button size="m" mode="primary" onClick={handleShareToStories}>
                        Поделиться
                      </Button>
                    )}
                  </Div>
                ))
              ) : (
                <Div>Нет данных для отображения</Div>
              )}
            </Div>
          </Group>
        )}
      </Touch>
    </Panel>
  );
};

export default Rank;
