import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Persik, Home, MainScreen, EcoScreen, FitScreen, ProScreen, HealthScreen, StoryDetailScreen } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import useOnboardSlides from './hooks/useOnboardSlides';

export const App = () => {
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

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
          <Persik id="persik" />
          <MainScreen id="main" fetchedUser={fetchedUser} />
          <EcoScreen id="eco-itmo" fetchedUser={fetchedUser} />
          <FitScreen id="fit-itmo" fetchedUser={fetchedUser} />
          <ProScreen id="pro-itmo" fetchedUser={fetchedUser} />
          <HealthScreen id="healthy-itmo" fetchedUser={fetchedUser} />
          <StoryDetailScreen id="story-detail" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
