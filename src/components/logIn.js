/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { onNavigate } from '../app.js';
import { logInWithUser, logInWithGoogle } from '../lib/firebase.js';

export const logIn = (target) => {
  const logInContainer = `
    <header>
        <img src="./assets/logo.png" alt="Logo de Nova" id="img-login"/>
    </header>
    <main>
    <form class="logIn color-line" id="formLogIn">
      <div id="login-container">
        <label for="userOrEmail">Usuario o e-mail*</label><br>
        <input type="text" id="userOrEmail" required><br>
        <label for="password">Contraseña*</label><br>
        <input type="password" id="password" required><br>         
      </div>
    <button class="logInButton" type="submit" id="logInButton"> Iniciar Sesión </button>    
    </form>
    <p id="messageError"></p>
    <button class="logInGoogleButton" type="submit" id="logInGoogleButton"> <img src="./assets/google.png" alt="Ícono de Google"> Ingresar con Google </button>
    </main>
    <footer>
        <p id="miembro">¿Aún no eres miembro?</p>
        <a href="#" id="register">Regístrate</a>
    </footer>
`;
  target.innerHTML = logInContainer;

  const toSignUp = document.getElementById('register');
  toSignUp.addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/signUp');
  });

  const logInBttn = document.getElementById('logInButton');
  logInBttn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('userOrEmail').value;
    const password = document.getElementById('password').value;
    console.log(email, password);
    logInWithUser(email, password);
    document.getElementById('formLogIn').reset();
  });

  const logInGoogleBttn = document.getElementById('logInGoogleButton');
  logInGoogleBttn.addEventListener('click', (event) => {
    event.preventDefault();
    logInWithGoogle();
  });
};
