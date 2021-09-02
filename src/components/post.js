/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */

import { onNavigate } from "../app.js";
import { addPost } from "../lib/firebase.js";

export const post = (target) => {
  const publicacion = `
  <header id="header-post">
    <a href="#" id="closePost" aria-label="Link para regresar a Home"><span class="iconify" data-icon="carbon:close-filled" style="color:white; font-size: 30px;"></span></a>
  </header>
  <main class= "formPost">

    <form id="form-post">
      <p>Escribe tu comentario</p>
      <label for="movie">Película*:</label>
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

      <label for="comment">Comentario*:</label>
      <textarea id="comment" name="comment" rows="4" cols="40" class="contornos" required></textarea>
      
      <button type="submit" id="submitReview">Publicar</button>
    </form>
  </main>   
  `;

  target.innerHTML = publicacion;

  const closePost = document.getElementById("closePost");
  closePost.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/home");
  });

  const publishPost = document.getElementById("submitReview");
  publishPost.addEventListener("click", (event) => {
    event.preventDefault();
    const pelicula = document.getElementById("movie").value;
    const genero = document.getElementById("genero").value;
    const calif = document.getElementById("calificacion").value;
    const coment = document.getElementById("comment").value;
    if (genero === '' || calif === '' || pelicula === '' || coment === '') {
      alert('Por favor, llena todos los campos');
    } else {
      addPost(pelicula, genero, calif, coment);
    }
  });
};
