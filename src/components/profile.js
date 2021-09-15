/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
  deletePost,
  getPostProfile,
  signOutUser,
  infoPost,
} from '../lib/firebase.js';
import { onNavigate } from '../routes.js';
import { postData } from './getPosts.js';

export const profile = (target) => {
  const profileContainer = `
      <header id="header-home">
        <div class="container" id="container-header">
        <a href="#" id="to-profile" aria-label="Link para ir al perfil personal" title='Ir a mi Perfil'><img src="./assets/user.png" alt="User image" id="user-image"/></a>
        <a href="#" id="to-home" aria-label="Link para ir home" title='Ir a Home'><img src="./assets/logo-home.png" alt="Logo de Nova" id="logo-home"/></a>
        <a href="#" id="back-logout" aria-label="Link para cerrar sesión" title='Cerrar Sesión'><img src="./assets/exit.png" alt="Cerrar sesión" id="logout"/></a>
        </div>
      </header>
      <main id="main-home">
        <div id="container-post"></div>
        <div class="postButton">
          <a href="#" id="post-link" aria-label="Link para redactar un post" ><span> <img src="./assets/new-post.png" alt="Crear un post nuevo" id="new-post"/></span></a>
        </div>
      </main>    
      <footer class= "homeFooter">
        <div id="container-footer">
          <!-- <a href="#" id="home-link" aria-label="Link para home"><img src="./assets/home.png" alt="inicio" id="home-icon"/></a>
          <a href="#" id="search-link" aria-label="Link para busqueda"><img src="./assets/search.png" alt="búsqueda" id="search-icon"/></a>
          <a href="#" id="config-link" aria-label="Link para configuraciones"><img src="./assets/config.png" alt="configuración" id="config-icon"/></a>
          -->
          <p>NOVA©. Laboratoria 2021.</p>
          <p>Creado por Angie, Emma e Isabel.</p>
        </div>
      </footer>
      `;
  target.innerHTML = profileContainer;

  const printPost = async () => {
    const divCont = document.getElementById('container-post');
    const allPosts = await getPostProfile();
    if (divCont.firstElementChild == null) {
      allPosts.forEach((post) => {
        document.getElementById('container-post').appendChild(postData(post));
        const colorsGenre = {
          Acción: '#F49273',
          'Ciencia-Ficción': '#45C3D3',
          Comedia: '#F2D057',
          Melodrama: '#FF6E30',
          Fantasía: '#CD448C',
          Musical: '#4BC565',
          Romance: '#CF4848',
          Suspenso: '#787878',
          Terror: '#8A65BA',
          Documental: '#FFFFFF',
          Animación: '#D680F4',
        };
        document.querySelectorAll('.GenreContainer').forEach((elem) => {
          const color = elem.firstElementChild.className;
          elem.style.color = '#000027';
          elem.style['background-color'] = colorsGenre[color];
        });
      });

      document.querySelectorAll('.userBttns').forEach((elem) => {
        const userID = firebase.auth().currentUser.uid;
        if (userID !== elem.id) {
          elem.style.visibility = 'hidden';
        }
      });
      document.querySelectorAll('.delete-post').forEach((bttn) => {
        bttn.addEventListener('click', (event) => {
          const id = event.target.dataset.id;
          const userConfirm = window.confirm(
            '¿Seguro que deseas eliminar este post?',
          );
          if (userConfirm === true) {
            deletePost(id)
              .then(() => {
                onNavigate('/home');
              })
              .catch((error) => {
                alert('Sucedió un error, no podemos borrar el post', error);
              });
          }
        });
      });
      document.querySelectorAll('.edit-post').forEach((bttn) => {
        bttn.addEventListener('click', (event) => {
          const id = event.target.dataset.id;
          infoPost(id)
            .then((doc) => {
              if (doc.exists) {
                const pelicula = doc.data().pelicula;
                const comentario = doc.data().comentario;
                const calificacion = doc.data().calificacion;
                const genero = doc.data().genero;
                onNavigate('/edit', [
                  pelicula,
                  comentario,
                  calificacion,
                  genero,
                  id,
                ]);
              }
            })
            .catch((error) => {
              throw error;
            });
        });
      });
      document.querySelectorAll('.like-post').forEach((bttn) => {
        bttn.addEventListener('click', (event) => {
          const idWriter = event.target.dataset.id;
          infoPost(idWriter)
            .then((doc) => {
              const idUserLike = firebase.auth().currentUser.uid;
              const db = firebase.firestore();
              if (doc.data().likes.includes(idUserLike)) {
                bttn.firstElementChild.style = 'font-size:20px; color:white;';
                bttn.previousElementSibling.innerText = doc.data().likes.length - 1;
                return db
                  .collection('posts')
                  .doc(idWriter)
                  .update({
                    likes:
                      firebase.firestore.FieldValue.arrayRemove(idUserLike),
                  });
              }
              bttn.firstElementChild.style = 'font-size:20px; color:red;';
              bttn.previousElementSibling.innerText = doc.data().likes.length + 1;
              return db
                .collection('posts')
                .doc(idWriter)
                .update({
                  likes: firebase.firestore.FieldValue.arrayUnion(idUserLike),
                });
            })
            .catch((error) => {
              throw error;
            });
        });
      });
    }
  };

  printPost();

  const SignOutButton = document.getElementById('back-logout');
  SignOutButton.addEventListener('click', (event) => {
    event.preventDefault();
    signOutUser();
    onNavigate('/');
  });

  const writePost = document.getElementById('post-link');
  writePost.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/post');
  });

  const profileButton = document.getElementById('to-profile');
  profileButton.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/profile');
  });

  const logoButton = document.getElementById('to-home');
  logoButton.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/home');
  });
};
