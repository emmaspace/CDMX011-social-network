/**
 * @jest-environment jsdom
 */
import './globals/firebase-test.js';
import { edit } from '../src/components/updatePost.js';

document.body.innerHTML = '<div id="root"></div>';
describe('edit', () => {
  it('debería ser una función', () => {
    expect(typeof edit).toBe('function');
  });

  it('debería desplegar la pantalla de edit', () => {
    const rootDiv = document.getElementById('root');
    edit(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
});
