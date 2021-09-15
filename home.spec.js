/**
 * @jest-environment jsdom
 */
import './globals/firebase-test.js';
import { home } from '../src/components/home.js';

describe('home', () => {
  document.body.innerHTML = '<div id="root"></div>';
  it('debería ser una función', () => {
    expect(typeof home).toBe('function');
  });

  it('debería desplegar la pantalla de home', () => {
    const rootDiv = document.getElementById('root');
    home(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
});
