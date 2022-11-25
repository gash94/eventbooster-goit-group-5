const preloader = document.querySelector('.preloader');

export const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 3;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.15;
  } 
}, 150);


