import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon28NewsfeedOutline, Icon28PlaceOutline, Icon28StorefrontOutline } from '@vkontakte/icons';

import { Home, MainScreen, EcoScreen, FitScreen, ProScreen, HealthScreen, StoryDetailScreen, Rank, EcoPhotoScreen, MapScreen, StoreScreen } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import useOnboardSlides from './hooks/useOnboardSlides';

export const App = () => {
  const [activeStory, setActiveStory] = useState<string>('main'); // Управляет текущей историей (разделом)
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  useOnboardSlides();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const onStoryChange = (e: React.MouseEvent<HTMLElement>) => {
    const story = e.currentTarget.dataset.story || 'default-story'; // Замена на значение по умолчанию, если story не определено
    setActiveStory(story);
  };    

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <Epic
          activeStory={activeStory}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'main'}
                data-story="main"
                text="Главная"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'map'}
                data-story="map"
                text="Карта"
              >
                <Icon28PlaceOutline />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'store'}
                data-story="store"
                text="Магазин"
              >
                <Icon28StorefrontOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <View id="main" activePanel={activePanel}>
            <Home id="home" fetchedUser={fetchedUser} />
            <Rank id="rank" />
            <MainScreen id="main" fetchedUser={fetchedUser} />
            <EcoScreen id="eco-itmo" fetchedUser={fetchedUser} />
            <FitScreen id="fit-itmo" fetchedUser={fetchedUser} />
            <ProScreen id="pro-itmo" fetchedUser={fetchedUser} />
            <HealthScreen id="healthy-itmo" fetchedUser={fetchedUser} />
            <StoryDetailScreen id="story-detail" />
            <EcoPhotoScreen id="echo-photo" fetchedUser={fetchedUser} />
          </View>
          
          <View id="map" activePanel="map">
            <MapScreen id="map" />
          </View>
          <View id="store" activePanel="store">
            <StoreScreen id="store" />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
