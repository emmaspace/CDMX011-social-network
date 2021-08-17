/* eslint-disable quotes */
import { signUp, logIn } from './templates.js';

const rootDiv = document.getElementById('root');

export const routes = {
  '/': logIn,
  '/registro': signUp,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  const element = routes[pathname];
  element(rootDiv);
};

const element = routes[window.location.pathname];
element(rootDiv);

window.onpopstate = () => {
  const path = routes[window.location.pathname];
  path(rootDiv);
};
