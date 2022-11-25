const preloader = document.querySelector('.preloader');

export const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 2;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.05;
  } else {
    preloader.remove();
  }
}, 100);