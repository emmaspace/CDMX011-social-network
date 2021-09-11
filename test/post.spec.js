/**
 * @jest-environment jsdom
 */
/* eslint-disable quotes */
//  import { onNavigate } from '../src/app.js';
import "./globals/firebase-test.js";
import { post } from "../src/components/post.js";

const delay = (timeInMs = 100) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));

describe("post", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });
  const postForm = (pelicula, genero, calif, coment) => {
    document.getElementById("movie").value = pelicula;
    document.getElementById("genero").value = genero;
    document.getElementById('calificacion').value = calif;
    document.getElementById('comment').value = coment;
    document.getElementById("submitReview").click();
  };
  
  it("debería ser una función", () => {
    expect(typeof post).toBe("function");
  });

  it("debería desplegar la pantalla de post", () => {
    const rootDiv = document.getElementById("root");
    post(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });

  it('registro del usuario exitoso', async () => {
    const rootDiv = document.getElementById('root');
    const pelicula = 'Harry Potter y el Caliz de Fuego';
    const genero = 'Fantasía';
    const calif = '5';
    const coment = 'Muy buena película';
    const userConsole = { email, uid: 'xxxxxxx' };

    const mockCreateUserWithEmailAndPassword = jest.fn();
    mockCreateUserWithEmailAndPassword.mockResolvedValue(userConsole);

    const mockFirebaseAuth = {
      createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
      currentUser: userConsole,
    };

    firebase.auth = () => mockFirebaseAuth;

    signUp(rootDiv);
    signUpForm(email, password, passwordRepeat, user);

    await delay(100);

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

});
