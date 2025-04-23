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
  "Why do Python programmers have low self-esteem? They're constantly comparing their self to others! 🐍",
  "I would tell you a UDP joke, but you might not get it.",
  "There’s no place like 127.0.0.1.",
  "Why do Java developers wear glasses? Because they don’t C#.",
  "I changed my password to 'incorrect', so whenever I forget it, my computer tells me.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "I told my computer I needed a break, and it said 'No problem, I’ll go to sleep.'",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "I’m not lazy, I’m just on energy-saving mode.",
  "The cloud is just someone else’s computer.",
  "Wi-Fi went down for five minutes, so I had to talk to my family. They seem like nice people.",
  "I would make a joke about JavaScript, but you wouldn’t get the callback.",
  "Why was the computer cold? It left its Windows open.",
  "My code doesn’t always work, but when it does, I don’t know why.",
  "I use tabs and spaces... to start wars.",
  "To err is human, to really screw things up you need a computer.",
  "How do you comfort a JavaScript bug? You console it.",
  "I have a joke about IPv6, but no one uses it.",
  "Computers are like air conditioners: they stop working properly if you open Windows.",
  "I keep hitting the escape key, but I’m still here.",
  "The only thing I test in production is my patience."
];
const jokeButton = document.getElementById('joke-button');
if (jokeButton) {
  jokeButton.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * jokes.length);
    alert(jokes[idx]);
  });
}

// Settings: Cursor emoji options via buttons
let cursorEmoji = null;
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

// Initialize default cursor to regular arrow
document.body.style.cursor = 'auto';

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

// Custom Terminal Functionality
(function() {
  const term = document.getElementById('customTerminal');
  // Initialize terminal state from previous pages
  const savedState = localStorage.getItem('termMinimized');
  if (savedState === 'true') {
    term.classList.add('minimized');
  } else {
    term.classList.remove('minimized');
  }
  const minBtn = document.getElementById('term-min-btn');
  const closeBtn = document.getElementById('term-close-btn');
  const maxBtn = document.getElementById('term-max-btn');
  const body = document.getElementById('termBody');
  const input = document.getElementById('termInput');

  // Ensure the input is inside the fakeScreen for styling and focus
  if (input.parentElement !== body) {
    body.appendChild(input);
  }

  // Set initial minimize/expand button state
  if (term.classList.contains('minimized')) {
    minBtn.textContent = '▢';
    minBtn.title = 'Expand';
  } else {
    minBtn.textContent = '_';
    minBtn.title = 'Minimize';
  }

  // Toggle minimize/expand on click
  minBtn.addEventListener('click', () => {
    const minimized = term.classList.toggle('minimized');
    localStorage.setItem('termMinimized', minimized.toString());
    if (minimized) {
      minBtn.textContent = '▢';
      minBtn.title = 'Expand';
    } else {
      minBtn.textContent = '_';
      minBtn.title = 'Minimize';
    }
  });

  // Expand terminal on green zoom button click
  maxBtn.addEventListener('click', () => {
    if (term.classList.contains('minimized')) {
      term.classList.remove('minimized');
      localStorage.setItem('termMinimized', 'false');
      minBtn.textContent = '_';
      minBtn.title = 'Minimize';
      // Reset terminal: clear history and show initial prompt
      body.innerHTML = '';
      const initP = document.createElement('p');
      initP.textContent = "Type 'help' to see available commands.";
      body.appendChild(initP);
      input.focus();
    }
  });

  // Close terminal
  closeBtn.addEventListener('click', () => {
    term.style.display = 'none';
  });

  // Focus input when clicking anywhere on terminal
  term.addEventListener('click', () => input.focus());

  // Autofocus input if terminal is not minimized
  if (!term.classList.contains('minimized')) {
    input.focus();
  }

  const MAX_LINES = 8;  // cap terminal history to avoid overcrowding
  
  // Utility: print line
  function print(text) {
    const p = document.createElement('p');
    p.textContent = text;
    body.appendChild(p);
    // remove oldest lines if over max
    while (body.children.length > MAX_LINES) {
      body.removeChild(body.firstChild);
    }
    body.scrollTop = body.scrollHeight;
  }

  // Command handler
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') e.preventDefault();
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim();
    const lc = cmd.toLowerCase();
    switch (true) {
      case lc === 'help':
        print('Available: help, date, joke, clear, sandwich, ls, pwd, whoami, sudo, uptime, echo, uname, fortune, sl, cowsay, date -u, cal, htop, rickroll, make coffee, dance, weather, matrix, sudo reboot, ssh, ping, grep, curl, su');
        break;
      case lc === 'date':
        print(new Date().toString());
        break;
      case lc === 'joke':
        print(jokes[Math.floor(Math.random() * jokes.length)]);
        break;
      case lc === 'clear':
        body.innerHTML = '';
        break;
      case lc === 'sandwich':
      case lc === 'sudo make me a sandwich':
        print('Oh, I thought you said "sudo make me a sandwich"! You deserve it though.');
        break;
      case lc === 'ls':
        print('Desktop  Documents  Downloads  Music  Pictures  Videos');
        break;
      case lc === 'pwd':
        print('/home/mehme/projects/iTalent');
        break;
      case lc === 'whoami':
        print('root (but remember: with great power comes great responsibility)');
        break;
      case lc.startsWith('sudo '):
        print('Nice try! Even sudo needs permission from the owner of the universe.');
        break;
      case lc === 'uptime':
        print('up 42 days, 6 hours, 13 minutes — living the dream');
        break;
      case lc.startsWith('echo '):
        print(cmd.substring(5));
        break;
      case lc === 'uname':
        print('Linux iTalent 5.0.0-humor #1 SMP hilarious x86_64');
        break;
      case lc === 'fortune':
        const fortunes = [
          "You will find a bug where there wasn't one.",
          "Tomorrow, you shall commit code that doesn't compile.",
          "A commit a day keeps the support team away.",
          "Your legacy code will one day give rise to AI.",
          "The Cloud is just someone else's computer... again."
        ];
        print(fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;
      case lc === 'sl':
        print('       ====        ________ ');
        print('  ____/ ___\\_____ / __ \\__  \\');
        print(' /    \\___  >____ \\\\  ___/  / /');
        print(' \\______  /     \\/ \\___  >____');
        print('        \\/           \\/');
        break;
      case lc === 'cowsay':
        print(' __________');
        print('< Moochtacular! >');
        print(' ----------');
        print('    \\   ^__^');
        print('     \\  (oo)\\_______');
        print('        (__)\\       )\\/\\');
        print('            ||----w |');
        print('            ||     ||');
        break;
      case lc === 'date -u':
        print(new Date().toUTCString());
        break;
      case lc === 'cal':
        print(' Su Mo Tu We Th Fr Sa');
        print('    1  2  3  4  5');
        print(' 6  7  8  9 10 11 12');
        print('13 14 15 16 17 18 19');
        print('20 21 22 23 24 25 26');
        print('27 28 29 30');
        break;
      case lc === 'htop':
        print('PID USER      CPU% MEM% COMMAND');
        print('1234 root      99.9  1.2 top');
        print('...overloaded...');
        break;
      case lc === 'rickroll':
        print('Never gonna give you up');
        print('Never gonna let you down');
        break;
      case lc === 'make coffee':
        print('Brewing your coffee... ☕️');
        break;
      case lc === 'dance':
        print('<(^_^<)  (>-^)>  \( ^_^)\>');
        break;
      case lc === 'weather':
        print('Today: Sunny with a chance of semicolons.');
        break;
      case lc === 'matrix':
        print('01010100 01101000 01101001 01110011');
        break;
      case lc === 'sudo reboot':
        print('Sorry, the system is busy. Try later.');
        break;
      case lc === 'ssh':
        print('ssh: Permission denied (publickey).');
        break;
      case lc === 'ping':
        print('Pinging google.com 56(84) bytes of data.');
        print('64 bytes from google.com: icmp_seq=1 ttl=115 time=14.2 ms');
        break;
      case lc === 'grep':
        print('grep: pattern not found');
        break;
      case lc === 'curl':
        print('curl: (6) Could not resolve host: example.com');
        break;
      case lc === 'su':
        print('Switching user... not today.');
        break;
      default:
        print(`bash: ${lc}: command not found. Maybe try 'help'? 😜`);
    }
    input.value = '';
    input.focus();
  });
})();