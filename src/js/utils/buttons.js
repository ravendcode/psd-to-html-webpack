const showBtnElem = document.getElementById('show-btn');
const showPElem = document.getElementById('show-p');

export default {
  buttonToggle() {
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
  },
};
