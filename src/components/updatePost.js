/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */

import { updatePost } from "../lib/firebase.js";
import { onNavigate } from "../routes.js";

export const edit = (target, info) => {
  const publicacion = `
  <header id="header-post">
    <a href="#" id="closePost" aria-label="Link para regresar a Home"><span class="iconify" data-icon="carbon:close-filled" style="color:white; font-size: 30px;"></span></a>
  </header>
  <main class= "formPost">

    <form id="form-post">
      <p>Edita tu reseña</p>
      <label for="movie">Película o serie*:</label>
      <input type="text" name="movie" id="movie" class="contornos" required>

      <label for="genre">Género*:</label>
      <select name="genre" id="genero" class="contornos" required>
        <option value = ''>Selecciona una opción</option>
        <option value="Acción">Acción</option>
        <option value="Ciencia-Ficción">Ciencia ficción</option>
        <option value="Comedia">Comedia</option>
        <option value="Melodrama">Melodrama</option>
        <option value="Fantasía">Fantasía</option>
        <option value="Musical">Musical</option>
        <option value="Romance">Romance</option>
        <option value="Suspenso">Suspenso</option>
        <option value="Terror">Terror</option>
        <option value="Documental">Documental</option>
        <option value="Animación">Animación</option>
      </select>

      <label for="score">Calificación*:</label>
      <select name="score" id="calificacion" class="contornos" class="form-control fa" required>
        <option value = ''>Selecciona una opción</option>
        <option value="1">1 estrella</option>
        <option value="2">2 estrellas</option>
        <option value="3">3 estrellas</option>
        <option value="4">4 estrellas</option>
        <option value="5">5 estrellas</option>
      </select>

      <label for="comment">Crítica*:</label>
      <textarea id="comment" name="comment" rows="4" cols="40" class="contornos" required></textarea>
      
      <button type="submit" id="editReview">Confirmar cambios</button>
    </form>
  </main>   
  `;

  target.innerHTML = publicacion;

  document.getElementById("movie").value = info[0];
  document.getElementById("genero").value = info[3];
  document.getElementById("calificacion").value = info[2];
  document.getElementById("comment").value = info[1];

  const closePost = document.getElementById("closePost");
  closePost.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/home");
  });

  const editPost = document.getElementById("editReview");
  editPost.addEventListener("click", (event) => {
    event.preventDefault();

    const pelicula = document.getElementById("movie").value;
    const genero = document.getElementById("genero").value;
    const calif = document.getElementById("calificacion").value;
    const coment = document.getElementById("comment").value;
    const id = info[4];
    if (genero === "" || calif === "" || pelicula === "" || coment === "") {
      alert("Por favor, llena todos los campos");
    } else if (
      pelicula === info[0]
      && genero === info[3]
      && calif === info[2]
      && coment === info[1]
    ) {
      const confirm = window.confirm(
        "No hiciste ningún cambio, ¿quieres continuar?"
      );
      if (confirm === true) {
        onNavigate("/home");
      }
    } else {
      updatePost(pelicula, coment, calif, genero, id)
        .then(() => {
          console.log("Document successfully updated!");
          onNavigate("/home");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  });
};
