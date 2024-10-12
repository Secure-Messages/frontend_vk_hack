import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
  CardGrid,
  Card,
  CardScroll,
  ContentCard,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}
      <CardGrid size="m" style={{ marginTop: '20px' }}>
        <Card>
          <CardScroll size="m">
            {/* <Card>
              <ContentCard>
                <img src="https://via.placeholder.com/150" alt="placeholder" style={{ width: '100%', height: '100px' }} />
              </ContentCard>
            </Card>
            <Card>
              <ContentCard>
                <img src="https://via.placeholder.com/150" alt="placeholder" style={{ width: '100%', height: '100px' }} />
              </ContentCard>
            </Card> */}
              <ContentCard>
                <img src="https://via.placeholder.com/150" alt="placeholder" style={{ width: '100%', height: '100px' }} />
              </ContentCard>
          </CardScroll>
        </Card>
      </CardGrid>
      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('main')}>
            MAIn, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
