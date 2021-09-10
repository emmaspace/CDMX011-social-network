/* eslint-disable quotes */
/* eslint-disable import/no-cycle */

import { dispatchRoute, onNavigate } from "./routes.js";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/home');
  } else {
    onNavigate('/');
  }
});

dispatchRoute(window.location.pathname);

window.onpopstate = () => {
  dispatchRoute(window.location.pathname);
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && ((window.location.pathname !== '/') || (window.location.pathname !== '/signUp'))) {
      onNavigate('/');
    }
  });
};
