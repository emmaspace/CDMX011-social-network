/**
 * @jest-environment jsdom
 */
/* eslint-disable quotes */
import "./globals/firebase-test.js";
import { post } from "../src/components/post.js";

describe("post", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it("debería ser una función", () => {
    expect(typeof post).toBe("function");
  });

  it("debería desplegar la pantalla de post", () => {
    const rootDiv = document.getElementById("root");
    post(rootDiv);
    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
});
