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
  PERSIK: 'persik',
  MAIN: 'main',
  ECO: 'eco-itmo',
  PRO: 'pro-itmo',
  FIT: 'fit-itmo',
  HEALTHY: 'healthy-itmo',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.MAIN, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.PERSIK, `/${DEFAULT_VIEW_PANELS.PERSIK}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MAIN, `/${DEFAULT_VIEW_PANELS.MAIN}`, []),
      createPanel(DEFAULT_VIEW_PANELS.ECO, `/${DEFAULT_VIEW_PANELS.ECO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PRO, `/${DEFAULT_VIEW_PANELS.PRO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.FIT, `/${DEFAULT_VIEW_PANELS.FIT}`, []),
      createPanel(DEFAULT_VIEW_PANELS.HEALTHY, `/${DEFAULT_VIEW_PANELS.HEALTHY}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
