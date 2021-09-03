/* eslint-disable quotes */
/* eslint-disable import/no-cycle */
import { onNavigate } from "../app.js";

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

export const signUpWithPassword = (
  email,
  password,
  repeatPassword,
  username
) => {
  if (password !== repeatPassword) {
    document.getElementById("messageError").innerText =
      "Las contraseñas no coinciden";
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
      window.localStorage.setItem("uid", `${user}`);
      console.log(user);
      onNavigate("/home");
      document.getElementById(
        "message"
      ).innerText = `Bienvenid@ ${user.displayName}`;
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
      const user = result.user;
      console.log(user);
      onNavigate("/home");
      document.getElementById(
        "message"
      ).innerText = `Bienvenid@ ${user.displayName}`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      document.getElementById("messageError").innerText = errorMessage;
      // The email of the user's account used.
      const email = error.email;
      document.getElementById("messageError").innerText = email;
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
export const addPost = (pelicula, genero, calificacion, comentario) => {
  const user = firebase.auth().currentUser;
  db.collection("posts")
    .add({
      usuario: user.displayName,
      idUsuario: user.uid,
      fecha: Date.now(),
      pelicula,
      calificacion,
      genero,
      comentario,
      likes: [],
    })
    .then((algo) => {
      console.log("Bien ya se guardo", algo);
      onNavigate("/home");
    })
    .catch(() => {
      console.log("Problemas en la nave, no se guardo :(");
    });
};

export const getPost = async () => {
  const posts = [];
  await db
    .collection("posts")
    .orderBy("fecha", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        posts.push(post);
      });
    });
  return posts;
};

export const deletePost = (id) => {
  db.collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const infoPost = (id) => {
  const docRef = db.collection("posts").doc(id);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const pelicula = doc.data().pelicula;
        const comentario = doc.data().comentario;
        const calificacion = doc.data().calificacion;
        const genero = doc.data().genero;

        onNavigate("/edit", [pelicula, comentario, calificacion, genero, id]);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export const updatePost = (pelicula, comentario, calificacion, genero, id) => {
  db.collection("posts")
    .doc(id)
    .update({
      pelicula,
      comentario,
      calificacion,
      genero,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

export const likePost = (idWriter, idUserLike) => {
  const docRef = db.collection("posts").doc(idWriter);
  docRef
    .get()
    .then((doc) => {
      if (doc.data().likes.includes(idUserLike)) {
        docRef.update({
          likes: firebase.firestore.FieldValue.arrayRemove(idUserLike),
        });
        console.log("Le quitaste el like");
        onNavigate("/home");
      } else {
        docRef.update({
          likes: firebase.firestore.FieldValue.arrayUnion(idUserLike),
        });
        console.log("Le diste like");
        onNavigate("/home");
      }

      onNavigate("/home");
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  /*db.collection('posts').doc(idWriter).update({
    likes: firebase.firestore.FieldValue.arrayUnion(idUserLike),
  });*/
};

//  db.collection('posts').doc(idWriter).onSnapshot((doc) => { console.log("Current data: ", doc.data()); });
