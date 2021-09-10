/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
import { signUpWithPassword, userProfile } from "../lib/firebase.js";
import { onNavigate } from "../routes.js";

export const signUp = (target) => {
  const signUpContainer = `
    <header>
        <img src="./assets/logo.png" alt="Logo de Nova" id="img-signup"/>
    </header>
    <main>
    <form class= "signUp color-line" id="formRegister">
      <div class = "formContainer">
        <label for="email">e-mail*</label><br>
        <input type="email" id="email" required><br>
        <label for="user">Nombre de usuario*</label><br>
        <input type="text" id="user" required><br>
        <label for="password">Contraseña*</label>
        <span id="show"><span class="iconify" data-icon="emojione-monotone:eye" style="color: white;" data-height="26"></span></span>       
        <span id="hide"><span class="iconify" data-icon="akar-icons:eye-closed" style="color: white;" data-height="26"></span></span><br>
        <input type="password" id="password" required><br>
        <label for="passwordRepeat">Repite tu contraseña*</label>
        <span id="showRepeat"><span class="iconify" data-icon="emojione-monotone:eye" style="color: white;" data-height="26"></span></span>       
        <span id="hideRepeat"><span class="iconify" data-icon="akar-icons:eye-closed" style="color: white;" data-height="26"></span></span><br>
        <input type="password" id="passwordRepeat" required><br>  
      </div>
      <p id="messageError"></p>
      <button class="signUpButton" type ="submit" id = "signUpButton"> Registrarse </button>
    </form>
    </main>    
    <footer class= "signUpFooter">
      <a href="#" id="back" aria-label="Link para regresar"><img src="./assets/back.png" alt="Ícono para regresar"></a>
    </footer>
`;

  target.innerHTML = signUpContainer;

  const toLogIn = document.getElementById("back");
  toLogIn.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/");
  });

  const signUpBttn = document.getElementById("signUpButton");
  signUpBttn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;
    let user = document.getElementById("user").value;
    if (password === passwordRepeat) {
      if (user !== "") {
        signUpWithPassword(email, password)
          .then(() => {
            // document.getElementById("formRegister").reset();
            user = document.getElementById("user").value;
            userProfile(user);
            onNavigate("/home");
          })
          .catch((error) => {
            document.getElementById("messageError").innerText = error.message;
          });
      } else {
        document.getElementById("messageError").innerText = "Ingresa un nombre de usuario";
      }
    } else {
      document.getElementById("messageError").innerText = "Las contraseñas no coinciden";
    }
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

  const passwordRepeat = document.getElementById('passwordRepeat');
  const showButtonRepeat = document.getElementById('showRepeat');
  const hideButtonRepeat = document.getElementById('hideRepeat');

  const showPasswordRepeat = () => {
    if (passwordRepeat.type === 'password') {
      passwordRepeat.setAttribute('type', 'text');
      showButtonRepeat.style.display = 'none';
      hideButtonRepeat.style.display = 'inline-block';
    } else if (passwordRepeat.type === 'text') {
      showButtonRepeat.style.display = 'inline-block';
      hideButtonRepeat.style.display = 'none';
      passwordRepeat.setAttribute('type', 'password');
    }
  };
  showButtonRepeat.addEventListener('click', showPasswordRepeat);
  hideButtonRepeat.addEventListener('click', showPasswordRepeat);
};
