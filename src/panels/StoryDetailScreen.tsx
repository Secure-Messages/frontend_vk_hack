import { FC } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, Div, Text, Card, Button } from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';

interface StoryDetailScreenProps {
  id: string;
}

export const StoryDetailScreen: FC<StoryDetailScreenProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

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

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        {title}
      </PanelHeader>
      
      <Group>
        <Div>
          <Card mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
            <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Отображение изображения истории */}
              <img 
                src={imgSrc} 
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
              <Text style={{ marginTop: '4px', color: 'gray', textAlign: 'center', width: '80%' }}>{description}</Text>
            </Div>
          </Card>
        </Div>
      </Group>

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
          onClick={() => routeNavigator.back()} // Кнопка для возврата
        >
          Назад
        </Button>
      </Group>
    </Panel>
  );
};

export default StoryDetailScreen;
