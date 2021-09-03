/* eslint-disable quotes */
export const postData = (post) => {
  const divPadre = document.createElement("div");
  let score = post.calificacion;
  let styleHeart = 'font-size:20px; color:white;';
  const idUserLike = firebase.auth().currentUser.uid;
  if (score === "1") {
    score = "&#xf005;";
  } else if (score === "2") {
    score = "&#xf005; &#xf005;";
  } else if (score === "3") {
    score = "&#xf005; &#xf005; &#xf005;";
  } else if (score === "4") {
    score = "&#xf005; &#xf005; &#xf005; &#xf005;";
  } else if (score === "5") {
    score = "&#xf005; &#xf005; &#xf005; &#xf005; &#xf005;";
  }
  if (post.likes.includes(idUserLike)) {
    styleHeart = 'font-size:20px; color:red;';
  } else {
    styleHeart = 'font-size:20px; color:white;';
  }
  divPadre.className = "postTemplate";
  divPadre.innerHTML = `
  <div class = 'postContainer' id ='${post.id}'> 
    <div class="imag-container">
      <img src='./assets/user.png' alt='User image' id='user-image-${post.idUsuario}'/>
    </div>
    <div class="info-container">
      <h2 class='userName' id = '${post.idUsuario}-user'> ${post.usuario}</h2>
      <p class= 'postDate info-spacing'>${new Date(post.fecha).toLocaleString()}</p>
      <div class='GenreContainer'>
        <p class='${post.genero}'>${post.genero}</p>
      </div>
      <h3 class = 'postMovie'>Película:</h3>
      <p class='movieTitle info-spacing'>${post.pelicula}</p>
      <h3 class ='postComment'>Crítica:</h3>
      <p class = 'Comment info-spacing'>${post.comentario}</p>
      <h3 class='postScore'>Calificación:</h3>
      <p class = 'ScoreNumber info-spacing fa'>${score}</p>
      <div class='postScoreStars'></div>
      <div class='postBttns'>
        <div class='userBttns' id='${post.idUsuario}'>
          <button class='delete-post' aria-label='Borrar publicación'>
            <i class="fa fa-trash-o" data-id='${post.id}' aria-hidden="true" style='font-size:20px; color:white;'></i>             
          </button>
          <button class='edit-post' aria-label='Editar publicación'>
            <i class="fa fa-pencil" data-id='${post.id}' data-user='${post.idUsuario}' aria-hidden="true" style='font-size:20px; color:white;'></i>
          </button>
        </div>
        <div class='postLikes'>
          <p class='likes-number'>${post.likes.length}</p>
          <button class='like-post fa' aria-label='Me gusta la publicación' data-id='${post.id}'>            
            <i class="fa fa-heart" aria-hidden="true" style='${styleHeart}' data-id='${post.id}' id='heart-${post.id}'></i>
          </button>
        </div>
      </div>
    </div>
</div>`;
  
  return divPadre;
};
