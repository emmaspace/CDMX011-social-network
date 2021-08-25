import { signOutUser } from '../lib/firebase.js';

export const home = (target) => {
  const homeContainer = `
    <header id="header-home">
      <div class="container" id="container-header">
        <img src="./assets/user.png" alt="User image" id="user-image"/>
        <img src="./assets/logo-home.png" alt="Logo de Nova" id="logo-home"/>
        <a href="#" id="back-logout" aria-label="Link para cerrar sesión"><img src="./assets/door.png" alt="Cerrar sesión" id="logout"/></a>
      </div>
    </header>
    <main id="main-home">
      <div class="postButton">
        <a href="#" id="post-link" aria-label="Link para redactar un post"><img src="./assets/new-post.png" alt="Crear un post nuevo" id="new-post"/></a>
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

  const SignOutButton = document.getElementById('back-logout');
  SignOutButton.addEventListener('click', (event) => {
    event.preventDefault();
    signOutUser();
  });
};
