import 'jquery';
import '../scss/main.scss';
import { showBtnElem, showPElem } from './dom';

window.$ = $;
window.jQuery = $;

/* eslint-disable no-console */
console.log('main.js', process.env.NODE_ENV);

function buttonToggle() {
  // const showBtnElem = document.getElementById('show-btn');
  // const showPElem = document.getElementById('show-p');

  let isShow = false;
  showPElem.style.display = 'none';

  function toggleState() {
    isShow = !isShow;
    if (isShow) {
      showBtnElem.textContent = 'Hide';
      showPElem.style.display = 'block';
    } else {
      showBtnElem.textContent = 'Show';
      showPElem.style.display = 'none';
    }
  }

  showBtnElem.addEventListener('click', toggleState);
}

buttonToggle();
