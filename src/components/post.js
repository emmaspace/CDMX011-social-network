/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

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
      <label for="movie">Película<span>*</span>:</label>
      <input type="text" name="movie" id="movie" class="contornos">

      <label for="genre">Género:</label>
      <select name="genre" id="genero" class="contornos">
        <option selected disabled>Selecciona una opción</option>
        <option value="action">Acción</option>
        <option value="sciFi">Ciencia ficción</option>
        <option value="comedy">Comedia</option>
        <option value="melodrama">Melodrama</option>
        <option value="fantasy">Fantasía</option>
        <option value="musical">Musical</option>
        <option value="romance">Romance</option>
        <option value="suspense">Suspenso</option>
        <option value="terror">Terror</option>
        <option value="documentary">Documental</option>
        <option value="animation">Animación</option>
      </select>

      <label for="score">Calificación:</label>
      <select name="score" id="calificacion" class="contornos">
        <option selected disabled>Selecciona una opción</option>
        <option value="1">1 estrella</option>
        <option value="2">2 estrellas</option>
        <option value="3">3 estrellas</option>
        <option value="4">4 estrellas</option>
        <option value="5">5 estrellas</option>
      </select>

      <label for="comment">Comentario:</label>
      <textarea id="comment" name="comment" rows="4" cols="40" class="contornos"></textarea>
      
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
  publishPost.addEventListener('click', (event) => {
    const pelicula = document.getElementById('movie').value;
    const genero = document.getElementById('genero').value;
    const calif = document.getElementById('calificacion').value;
    const coment = document.getElementById('comment').value;
    addPost(pelicula, genero, calif, coment);
    event.preventDefault();
  });
};
