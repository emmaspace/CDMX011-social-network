/**
 * @jest-environment jsdom
 */
import './globals/firebase-test.js';
import { logIn } from '../src/components/logIn.js';

const delay = (time = 100) => new Promise((resolve) => setTimeout(resolve, time));

describe('logIn', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');

  const logInForm = (email, password) => {
    document.getElementById('userOrEmail').value = email;
    document.getElementById('password').value = password;
    document.getElementById('logInButton').click();
  };
  it('debería ser una función', () => {
    expect(typeof logIn).toBe('function');
  });

  it('debería desplegar la pantalla de logIn', () => {
    logIn(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });

  it('el logIn fue exitoso', async () => {
    const email = 'test@testing.com';
    const password = 'veamossipasaeltest';
    const user = { email, uid: 'xxxxxxx' };

    const mockSignInWithEmailAndPassword = jest.fn();
    mockSignInWithEmailAndPassword.mockResolvedValue(user);

    const mockFirebaseAuth = {
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
      currentUser: user,
    };

    firebase.auth = () => mockFirebaseAuth;

    logIn(rootDiv);

    logInForm(email, password);

    await delay(100);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });
});
