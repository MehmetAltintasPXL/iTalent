// Theme toggle script
const btn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

applyTheme(currentTheme);

btn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  // calculate slide width including margins
  const slideStyle = getComputedStyle(slides[0]);
  const slideWidth = slides[0].getBoundingClientRect().width +
    parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
  // position slides
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });
  let currentIndex = 0;
  function updateButtons(index) {
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
  }
  function moveTo(index) {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
    updateButtons(index);
  }
  // initial state
  moveTo(0);
  // handlers
  prevButton.addEventListener('click', () => moveTo(currentIndex - 1));
  nextButton.addEventListener('click', () => moveTo(currentIndex + 1));
});