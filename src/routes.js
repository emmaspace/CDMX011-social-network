import { home } from './components/home.js';
import { logIn } from './components/logIn.js';
import { post } from './components/post.js';
import { signUp } from './components/signUp.js';
import { edit } from './components/updatePost.js';
import { profile } from './components/profile.js';

const routes = {
  '/': logIn,
  '/signUp': signUp,
  '/home': home,
  '/post': post,
  '/edit': edit,
  '/profile': profile,
};

export const dispatchRoute = (pathname, info) => {
  const rootDiv = document.getElementById('root');
  const element = routes[pathname];
  if (element === edit) {
    element(rootDiv, info);
  } else {
    element(rootDiv);
  }
};

export const onNavigate = (pathname, info) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  dispatchRoute(pathname, info);
};
