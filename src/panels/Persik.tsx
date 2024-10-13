import { FC, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder, Touch } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PersikImage from '../assets/persik.png';

export const Persik: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [swipeStart, setSwipeStart] = useState<number | null>(null);

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

  return (
    <Panel id={id}>
      <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          rank
        </PanelHeader>
        <Placeholder>
          <img width={230} src={PersikImage} alt="rank The Cat" />
        </Placeholder>
      </Touch>
    </Panel>
  );
};
