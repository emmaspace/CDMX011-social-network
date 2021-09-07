// la funcion global de firebase
/* eslint-disable quotes */
global.firebase = {
  firestore: () => ({
    collection: () => {},
  }),
  initializeApp: () => {},
  auth: () => ({
    currentUser: () => {},
    onAuthStateChanged: () => {},
  }),
};
