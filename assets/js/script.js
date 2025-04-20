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

// Settings: Cursor emoji options via buttons
let cursorEmoji = '●';
const cursorButtons = document.querySelectorAll('.cursor-option');

// Function to generate and set CSS cursor from emoji
function updateCursor(emoji) {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.font = '28px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.clearRect(0, 0, size, size);
  ctx.fillText(emoji, size / 2, size / 2);
  const url = canvas.toDataURL('image/png');
  document.body.style.cursor = `url(${url}) ${size / 2} ${size / 2}, auto`;
}

cursorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    cursorEmoji = btn.dataset.emoji;
    updateCursor(cursorEmoji);
  });
});

// Initialize cursor on page load
updateCursor(cursorEmoji);

// Fun feature controls
document.addEventListener('DOMContentLoaded', () => {
  const confettiCheckbox = document.getElementById('confetti-checkbox');
  const trailCheckbox = document.getElementById('trail-checkbox');
  const headerElem = document.querySelector('header');

  // Confetti on header click
  if (headerElem) {
    headerElem.addEventListener('click', () => {
      if (!confettiCheckbox || !confettiCheckbox.checked) return;
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
  }

  // Color trail effect
  const colorPicker = document.getElementById('trail-color-picker');
  document.addEventListener('mousemove', e => {
    if (!trailCheckbox || !trailCheckbox.checked) return;
    const dot = document.createElement('div');
    dot.className = 'color-trail';
    dot.style.background = colorPicker ? colorPicker.value : '#ffcc00';
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    document.body.appendChild(dot);
    setTimeout(() => {
      dot.remove();
    }, 500);
  });
});