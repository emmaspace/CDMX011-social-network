/* eslint-disable import/no-cycle */
import { onNavigate } from '../app.js';

const userProfile = (username) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: username,
    })
    .then()
    .catch();
};

export const signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      onNavigate("/");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
      alert("sucedió un error, intenta de nuevo");
    });
};

export const signUpWithPassword = (email, password, repeatPassword, username) => {
  if (password !== repeatPassword) {
    document.getElementById('messageError').innerText = 'Las contraseñas no coinciden';
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        userProfile(username);
        signOutUser();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        document.getElementById('messageError').innerText = errorMessage;
        // ..
      });
  }
};

export const logInWithUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.localStorage.setItem('uid', `${user}`);
      console.log(user);
      onNavigate('/home');
      document.getElementById('message').innerText = `Bienvenid@ ${user.displayName}`;
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      document.getElementById('messageError').innerText = errorMessage;
    });
};

export const logInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      onNavigate('/home');
      document.getElementById('message').innerText = `Bienvenid@ ${user.displayName}`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      document.getElementById('messageError').innerText = errorMessage;
      // The email of the user's account used.
      const email = error.email;
      document.getElementById('messageError').innerText = email;
    });
};

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log(user);
//   } else if ((window.location.pathname !== '/') || (window.location.pathname !== '/signUp')) {
//     console.log('usuario no conectado');
//     onNavigate('/');
//   }
// });

const db = firebase.firestore();
db.collection('posts').get().then((snapshot) => {
  console.log(snapshot.docs);

export const signOutUser = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    onNavigate('/');
  }).catch((error) => {
    // An error happened.
    console.log(error);
    alert("sucedió un error, intenta de nuevo");
  });
};
});
