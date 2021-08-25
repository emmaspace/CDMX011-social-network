/* eslint-disable quotes */
import { onNavigate } from '../app.js';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdBTYZdI7S5lFnwTdlfj3wDXo6QC4eExs",
  authDomain: "red-social-nova.firebaseapp.com",
  projectId: "red-social-nova",
  storageBucket: "red-social-nova.appspot.com",
  messagingSenderId: "596012663423",
  appId: "1:596012663423:web:6b94f492f4baa439baf54a",
  measurementId: "G-QH0SRDMMYS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics(); // no es necesario activar la analitica de data

const userProfile = (username) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: username,
    })
    .then()
    .catch();
};

export const signUpWithPassword = (email, password, repeatPassword, username) => {
  if (password !== repeatPassword) {
    document.getElementById("messageError").innerText = "Las contraseñas no coinciden";
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        userProfile(username);
        onNavigate('/');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        document.getElementById("messageError").innerText = errorMessage;
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
      document.getElementById("message").innerText = `Bienvenid@ ${user.displayName}`;
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      document.getElementById("messageError").innerText = errorMessage;
    });
};

export const logInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      onNavigate('/home');
      document.getElementById("message").innerText = `Bienvenido ${user.displayName}`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      console.log(email);
    });
};

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

const db = firebase.firestore();
db.collection('posts').get().then((snapshot) => {
});
