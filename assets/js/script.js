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

// Joke button logic
const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How many programmers does it take to change a light bulb? None, that's a hardware issue! 💡",
  "Why do Java developers wear glasses? Because they don't see sharp! 🤓",
  "What's a programmer's favorite hangout place? Foo Bar! 🍻",
  "Why do Python programmers have low self-esteem? They're constantly comparing their self to others! 🐍"
];
const jokeButton = document.getElementById('joke-button');
if (jokeButton) {
  jokeButton.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * jokes.length);
    alert(jokes[idx]);
  });
}

// Settings: Cursor emoji and toggles
const cursorSelect = document.getElementById('cursor-emoji-select');
const confettiCheckbox = document.getElementById('confetti-checkbox');
const trailCheckbox = document.getElementById('trail-checkbox');
let cursorEmoji = cursorSelect ? cursorSelect.value : '●';
if (cursorSelect) {
  cursorSelect.addEventListener('change', () => {
    cursorEmoji = cursorSelect.value;
  });
}

// Confetti on header click (conditional)
const headerElem = document.querySelector('header');
headerElem.addEventListener('click', () => {
  if (!confettiCheckbox.checked) return;
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.textContent = ['🎉','✨','💥','🥳'][Math.floor(Math.random()*4)];
    Object.assign(confetti.style, {
      position: 'fixed',
      left: Math.random() * window.innerWidth + 'px',
      top: Math.random() * window.innerHeight + 'px',
      fontSize: '1.5rem',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 1s ease-out, transform 1s ease-out'
    });
    document.body.appendChild(confetti);
    requestAnimationFrame(() => {
      confetti.style.opacity = '0';
      confetti.style.transform = 'translateY(-50px)';
    });
    setTimeout(() => document.body.removeChild(confetti), 1000);
  }
});

// Mouse trail effect (conditional with chosen emoji)
document.addEventListener('mousemove', e => {
  if (!trailCheckbox.checked) return;
  const trail = document.createElement('span');
  trail.className = 'cursor-trail';
  trail.textContent = cursorEmoji;
  Object.assign(trail.style, {
    position: 'absolute',
    left: e.pageX + 'px',
    top: e.pageY + 'px',
    fontSize: '24px',
    opacity: '1',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.5s ease-out'
  });
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 500);
});

// Bird spawn on tree click
const treesImg = document.getElementById('trees-img');
treesImg && treesImg.addEventListener('click', e => {
  if (document.body.classList.contains('dark-theme')) return;
  const bird = document.createElement('div');
  bird.className = 'bird';
  bird.textContent = '🐦';
  bird.style.left = `${e.pageX}px`;
  bird.style.top = `${e.pageY}px`;
  document.body.appendChild(bird);
  setTimeout(() => document.body.removeChild(bird), 3000);
});