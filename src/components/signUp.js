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
        <label for="password">Contraseña*</label><br>
        <input type="password" id="password" required><br>
        <label for="passwordRepeat">Repite tu contraseña*</label><br>
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
    if (password === passwordRepeat) {
      signUpWithPassword(email, password)
        .then(() => {
          // document.getElementById("formRegister").reset();
          const user = document.getElementById("user").value;
          userProfile(user);
          onNavigate('/home');
        })
        .catch((error) => {
          document.getElementById("messageError").innerText = error.message;
        });
    } else {
      document.getElementById("messageError").innerText = "Las contraseñas no coinciden";
    }
  });
};
