/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
import { deletePost, getPost, signOutUser } from "../lib/firebase.js";
import { onNavigate } from "../app.js";
import { postData } from "./getPosts.js";

export const home = (target) => {
  const homeContainer = `
    <header id="header-home">
      <div class="container" id="container-header">
        <img src="./assets/user.png" alt="User image" id="user-image"/>
        <img src="./assets/logo-home.png" alt="Logo de Nova" id="logo-home"/>
        <a href="#" id="back-logout" aria-label="Link para cerrar sesión"><img src="./assets/exit.png" alt="Cerrar sesión" id="logout"/></a>
      </div>
    </header>
    <main id="main-home">
    <p id="message"></p>
      <div id="container-post"></div>
      <div class="postButton">
        <a href="#" id="post-link" aria-label="Link para redactar un post" style="vertical-align:middle"><span> <img src="./assets/new-post.png" alt="Crear un post nuevo" id="new-post"/></span></a>
      </div>
    </main>    
    <footer class= "homeFooter">
      <div class="container" id="container-footer">
        <a href="#" id="home-link" aria-label="Link para home"><img src="./assets/home.png" alt="inicio" id="home-icon"/></a>
        <a href="#" id="search-link" aria-label="Link para busqueda"><img src="./assets/search.png" alt="búsqueda" id="search-icon"/></a>
        <a href="#" id="config-link" aria-label="Link para configuraciones"><img src="./assets/config.png" alt="configuración" id="config-icon"/></a>
      </div>
    </footer>
    `;
  target.innerHTML = homeContainer;

  const printPost = async () => {
    const allPosts = await getPost();
    const divCont = document.getElementById("container-post");
    if (divCont.firstElementChild == null) {
      allPosts.forEach((post) => {
        document.getElementById("container-post").appendChild(postData(post));
        const colorsGenre = {
          Acción: "#F49273",
          "Ciencia-Ficción": "#45C3D3",
          Comedia: "#F2D057",
          Melodrama: "#FF6E30",
          Fantasía: "#CD448C",
          Musical: "#4BC565",
          Romance: "#CF4848",
          Suspenso: "#787878",
          Terror: "#8A65BA",
          Documental: "#FFFFFF",
          Animación: "#D680F4",
        };
        document.querySelectorAll(".GenreContainer").forEach((elem) => {
          const color = elem.firstElementChild.className;
          elem.style.color = "#000027";
          elem.style["background-color"] = colorsGenre[color];
        });
      });
      document.querySelectorAll(".userBttns").forEach((elem) => {
        const userID = firebase.auth().currentUser.uid;
        if (userID !== elem.id) {
          elem.style.visibility = "hidden";
        }
      });
      document.querySelectorAll(".delete-post").forEach((bttn) => {
        bttn.addEventListener('click', (event) => {
          const id = event.target.dataset.id;
          const userConfirm = window.confirm('¿Seguro que deseas eliminar este post?');
          if (userConfirm === true) {
            try {
              deletePost(id);
              onNavigate('/home');
            } catch (error) {
              alert("Sucedió un error, no podemos borrar el post", error);
            }
          }
        });
      });
    }
  };

  printPost();

  const SignOutButton = document.getElementById("back-logout");
  SignOutButton.addEventListener("click", (event) => {
    event.preventDefault();
    signOutUser();
  });

  const writePost = document.getElementById("post-link");
  writePost.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/post");
  });
};
// function genreColors() {
//   const colorsGenre = {
//     Acción: "#F49273",
//     "Ciencia-Ficción": "#45C3D3",
//     Comedia: "#F2D057",
//     Melodrama: "#FF6E30",
//     Fantasía: "#CD448C",
//     Musical: "#4BC565",
//     Romance: "#CF4848",
//     Suspenso: "#787878",
//     Terror: "#8A65BA",
//     Documental: "#FFFFFF",
//     Animación: "#D680F4",
//   };
//   document.querySelectorAll(".GenreContainer").forEach((elem) => {
//     const color = elem.firstElementChild.className;
//     elem.style.color = "#000027";
//     elem.style["background-color"] = colorsGenre[color];
//   });
// }

// function hideBttns() {
//   // let cont2 = 1;
//   document.querySelectorAll(".userBttns").forEach((elem) => {
//     const userID = firebase.auth().currentUser.uid;
//     if (userID !== elem.id) {
//       elem.style.visibility = "hidden";
//     } else {
//       document.querySelectorAll(".delete-post").forEach((bttn) => {
//         bttn.addEventListener('click', (event) => {
//           const id = event.target.dataset.id;
//           const userConfirm = window.confirm('¿Seguro que deseas eliminar este post?');
//           if (userConfirm === true) {
//             try {
//               deletePost(id);
//               onNavigate('/home');
//             } catch (error) {
//               alert("Sucedió un error, no podemos borrar el post", error);
//             }
//           }
//         });
//       });
//       //aqui
//     }
//   });
// }

// export const home = (target) => {
//   const homeContainer = `
//     <header id="header-home">
//       <div class="container" id="container-header">
//         <img src="./assets/user.png" alt="User image" id="user-image" height="50px"/>
//         <img src="./assets/logo-home.png" alt="Logo de Nova" id="logo-home"/>
//         <a href="#" id="back-logout" aria-label="Link para cerrar sesión"><img src="./assets/exit.png" alt="Cerrar sesión" id="logout"/></a>
//       </div>
//     </header>
//     <main id="main-home">
//     <p id="message"></p>
//       <div id="container-post"></div>
//       <div class="postButton">
//         <a href="#" id="post-link" aria-label="Link para redactar un post"><img src="./assets/new-post-desktop.png" alt="Crear un post nuevo" id="new-post"/></a>
//       </div>
//     </main>    
//     <footer class= "homeFooter">
//       <div class="container" id="container-footer">
//         <a href="#" id="home-link" aria-label="Link para home"><img src="./assets/home.png" alt="inicio" id="home-icon"/></a>
//         <a href="#" id="search-link" aria-label="Link para busqueda"><img src="./assets/search.png" alt="búsqueda" id="search-icon"/></a>
//         <a href="#" id="config-link" aria-label="Link para configuraciones"><img src="./assets/config.png" alt="configuración" id="config-icon"/></a>
//       </div>
//     </footer>
//     `;
//   target.innerHTML = homeContainer;

//   const printPost = async () => {
//     const allPosts = await getPost();
//     const divCont = document.getElementById("container-post");
//     if (divCont.firstElementChild == null) {
//       let cont = 1;
//       allPosts.forEach((post) => {
//         document
//           .getElementById("container-post")
//           .appendChild(postData(post, cont));

//         genreColors();

//         cont += 1;
//       });

//       hideBttns();
//     }
//   };

//   printPost();

//   const SignOutButton = document.getElementById("back-logout");
//   SignOutButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     signOutUser();
//   });

//   const writePost = document.getElementById("post-link");
//   writePost.addEventListener("click", (event) => {
//     event.preventDefault();
//     onNavigate("/post");
//   });
// };
