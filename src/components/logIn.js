/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
import { logInWithUser, logInWithGoogle } from "../lib/firebase.js";
import { onNavigate } from "../routes.js";

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
        <label for="password">Contraseña*</label>
        <span id="show"><span class="iconify" data-icon="emojione-monotone:eye" style="color: white;" data-height="26"></span></span>       
        <span id="hide"><span class="iconify" data-icon="akar-icons:eye-closed" style="color: white;" data-height="26"></span></span><br>
        <input type="password" id="password" required>       
      </div>
    <button class="logInButton" type="submit" id="logInButton"> Iniciar Sesión </button>    
    </form>
    <p id="messageError"></p>
    <button class="logInGoogleButton" type="submit" id="logInGoogleButton"><span id='span-boton'> <img src="./assets/google.png" alt="Ícono de Google" id='logo-google'> Ingresar con Google </span></button>
    </main>
    <footer>
        <p id="miembro">¿Aún no eres miembro?</p>
        <a href="#" id="register">Regístrate</a>
    </footer>
`;
  target.innerHTML = logInContainer;

  const toSignUp = document.getElementById("register");
  toSignUp.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/signUp");
  });

  const logInBttn = document.getElementById("logInButton");
  logInBttn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("userOrEmail").value;
    const password = document.getElementById("password").value;
    logInWithUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.$.W);
        onNavigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("messageError").innerText = errorMessage;
      });
  });

  const logInGoogleBttn = document.getElementById("logInGoogleButton");
  logInGoogleBttn.addEventListener("click", (event) => {
    event.preventDefault();
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        onNavigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("messageError").innerText = errorMessage;
        // The email of the user's account used.
        const email = error.email;
        document.getElementById("messageError").innerText += email;
      });
  });

  const password = document.getElementById('password');
  const showButton = document.getElementById('show');
  const hideButton = document.getElementById('hide');

  const showPassword = () => {
    if (password.type === 'password') {
      password.setAttribute('type', 'text');
      showButton.style.display = 'none';
      hideButton.style.display = 'inline-block';
    } else if (password.type === 'text') {
      showButton.style.display = 'inline-block';
      hideButton.style.display = 'none';
      password.setAttribute('type', 'password');
    }
  };
  showButton.addEventListener('click', showPassword);
  hideButton.addEventListener('click', showPassword);
};
