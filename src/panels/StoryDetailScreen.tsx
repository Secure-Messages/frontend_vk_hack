import { FC, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, Div, Text, Card, Button, Touch } from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';

interface StoryDetailScreenProps {
  id: string;
}

export const StoryDetailScreen: FC<StoryDetailScreenProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  // Извлекаем параметры из URL, включая imgSrc
  const params = useParams<'id' | 'title' | 'description' | 'imgSrc'>();

  // Логирование для отладки
  console.log('Received Params:', params);

  const title = params?.title;
  const description = params?.description;
  const imgSrc = params?.imgSrc;

  // Если параметры отсутствуют, выводим сообщение об ошибке
  if (!params?.id || !title || !description || !imgSrc) {
    return <Div>Ошибка: данные истории не найдены</Div>;
  }
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
        {title}
      </PanelHeader>
      
      <Group>
        <Div>
          <Card mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
            <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Отображение изображения истории */}
              <img 
                src={`https://vk-back.sm2.fun/api/v1/be_itmo/stories_photo/${imgSrc}`} 
                alt={title} 
                style={{ 
                  width: 'auto', 
                  height: '170px', 
                  objectFit: 'cover', 
                  display: 'block', 
                  maxWidth: '100%', 
                  margin: '0 auto' 
                }}
              />
              {/* Название истории */}
              <Text style={{ marginTop: '8px', textAlign: 'center' }}>{title}</Text>
              {/* Описание истории */}
              <div style={{ fontSize: '14px', marginTop: '4px', color: 'gray', textAlign: 'center', width: '80%' }}>{description}</div>
            </Div>
          </Card>
        </Div>
      </Group>
    <Div>
      <Group
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Button
          size="m"
          appearance="accent-invariable"
          stretched
          onClick={() => routeNavigator.back()}
        >
          Назад
        </Button>
      </Group>
      </Div>
      </Touch>
    </Panel>
  );
};

export default StoryDetailScreen;
