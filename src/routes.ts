import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  RANK: 'rank',
  MAIN: 'main',
  ECO: 'eco-itmo',
  PRO: 'pro-itmo',
  FIT: 'fit-itmo',
  HEALTHY: 'healthy-itmo',
  STORY_DETAIL: 'story-detail',
  ECO_PHOTO: 'echo-photo',
  MAP: 'map',
  STORE: 'store'
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.MAIN, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.RANK, `/${DEFAULT_VIEW_PANELS.RANK}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MAIN, `/${DEFAULT_VIEW_PANELS.MAIN}`, []),
      createPanel(DEFAULT_VIEW_PANELS.ECO, `/${DEFAULT_VIEW_PANELS.ECO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PRO, `/${DEFAULT_VIEW_PANELS.PRO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.FIT, `/${DEFAULT_VIEW_PANELS.FIT}`, []),
      createPanel(DEFAULT_VIEW_PANELS.HEALTHY, `/${DEFAULT_VIEW_PANELS.HEALTHY}`, []),
      createPanel(DEFAULT_VIEW_PANELS.ECO_PHOTO, `/${DEFAULT_VIEW_PANELS.ECO_PHOTO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MAP, `/${DEFAULT_VIEW_PANELS.MAP}`, []),
      createPanel(DEFAULT_VIEW_PANELS.STORE, `/${DEFAULT_VIEW_PANELS.STORE}`, []),
      createPanel(DEFAULT_VIEW_PANELS.STORY_DETAIL, '/story-detail/:id/:title/:description/:imgSrc', []), // Убедитесь, что маршрут настроен для передачи параметров
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
