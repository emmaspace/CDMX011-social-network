/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
import './globals/firebase-test.js';
import { signUp } from '../src/components/signUp.js';

const delay = (timeInMs = 100) => new Promise((resolve) => setTimeout(resolve, timeInMs));

describe('signUp', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });
  const signUpForm = (email, password, passwordRepeat, user) => {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('passwordRepeat').value = passwordRepeat;
    document.getElementById('user').value = user;
    document.getElementById('signUpButton').click();
  };

  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function');
  });

  it('debería desplegar la pantalla de signUp', () => {
    const rootDiv = document.getElementById('root');
    signUp(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });

  it('registro del usuario exitoso', async () => {
    const rootDiv = document.getElementById('root');

    const email = 'test@test.com';
    const password = '123456';
    const passwordRepeat = '123456';
    const user = 'Newt Scamander';
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
