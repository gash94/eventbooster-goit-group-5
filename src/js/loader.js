const preloader = document.querySelector('.preloader');
const body = document.querySelector('body');

// export const fadeEffect = setInterval(() => {
//   if (!preloader.style.opacity) {
//     preloader.style.opacity = 1.7;
//     body.style.overflowY = 'hidden';
//   }
//   if (preloader.style.opacity > 0) {
//     preloader.style.opacity -= 0.05;
//   } else {
//     preloader.remove();
//     body.style.overflowY = 'scroll';
//   }
// }, 100);

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.remove();
    body.style.overflowY = 'scroll';
  }, 1500);
});
