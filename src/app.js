/* eslint-disable quotes */
import { signUp } from './components/signUp.js';
import { logIn } from './components/logIn.js';
import { home } from './components/home.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': logIn,
  '/signUp': signUp,
  '/home': home,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  const element = routes[pathname];
  element(rootDiv);
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/home');
  } else {
    onNavigate('/');
  }
});

const element = routes[window.location.pathname];
element(rootDiv);

window.onpopstate = () => {
  const path = routes[window.location.pathname];
  path(rootDiv);
};
