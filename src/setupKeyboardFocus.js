// TODO: figure out if polyfill is necessary for this
const setupKeyboardFocus = (document, body) => {
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 9) {
      body.classList.add('keyboard-focus');
    }
  });

  document.addEventListener('mousedown', () => {
    body.classList.remove('keyboard-focus');
  });
};

export default setupKeyboardFocus;
