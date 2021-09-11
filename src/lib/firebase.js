/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable import/no-cycle */

export const userProfile = (username) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: username,
    })
    .then()
    .catch();
};

export const signOutUser = () => firebase.auth().signOut();

export const signUpWithPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const logInWithUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const logInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const db = firebase.firestore();
export const addPost = (pelicula, genero, calificacion, comentario) => {
  const user = firebase.auth().currentUser;
  return db.collection("posts").add({
    usuario: user.displayName,
    idUsuario: user.uid,
    fecha: Date.now(),
    pelicula,
    calificacion,
    genero,
    comentario,
    likes: [],
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

export const getPostProfile = async () => {
  const profileUser = firebase.auth().currentUser.uid;
  const posts = [];
  await db
    .collection("posts")
    .orderBy("fecha", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().idUsuario === profileUser) {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        }
      });
    });
  return posts;
};

export const deletePost = (id) => db.collection("posts").doc(id).delete();

export const infoPost = (id) => {
  const docRef = db.collection("posts").doc(id);
  return docRef.get();
};

export const updatePost = (pelicula, comentario, calificacion, genero, id) => db.collection("posts").doc(id).update({
  pelicula,
  comentario,
  calificacion,
  genero,
});
