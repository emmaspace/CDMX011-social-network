/* eslint-disable quotes */
/* eslint-disable import/no-cycle */

import { signUp } from './components/signUp.js';
import { logIn } from './components/logIn.js';
import { home } from './components/home.js';
import { post } from './components/post.js';
import { edit } from './components/updatePost.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': logIn,
  '/signUp': signUp,
  '/home': home,
  '/post': post,
  '/edit': edit,
};

export const onNavigate = (pathname, info) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  const element = routes[pathname];
  if (element === edit) {
    element(rootDiv, info);
  } else {
    element(rootDiv);
  }
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
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && ((window.location.pathname !== '/') || (window.location.pathname !== '/signUp'))) {
      onNavigate('/');
    }
  });
};
