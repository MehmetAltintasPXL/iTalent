// Navigation HTML
const navHTML = `
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About Me</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li>
      <a href="italent.html">iTalent ▾</a>
      <ul>
        <li><a href="italent-internationalization.html">Internationalization</a></li>
        <li><a href="italent-hackathon.html">Hackathon</a></li>
        <li><a href="italent-seminaires.html">Seminaires</a></li>
        <li><a href="italent-pop-sessions.html">Pop Sessions</a></li>
        <li><a href="italent-student-engagement.html">Student Engagement</a></li>
      </ul>
    </li>
  </ul>
  <button class="theme-switcher" id="themeBtn">🌗 Theme</button>
`;

// Inject navigation
const nav = document.getElementById('navbar');
if (nav) nav.innerHTML = navHTML;

// Theme switching
const themeBtn = document.getElementById('themeBtn');
const setTheme = theme => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};
const getTheme = () => localStorage.getItem('theme') || 'light';
setTheme(getTheme());
if (themeBtn) {
  themeBtn.onclick = () => {
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
}

// Highlight active nav link
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
  if (window.location.pathname.endsWith(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});

// --- Language Support ---
const translations = {
  en: {
    nav: [
      'Home', 'About Me', 'Projects', 'iTalent',
      'Internationalization', 'Hackathon', 'Seminaires', 'Pop Sessions', 'Student Engagement'
    ],
    theme: '🌗 Theme',
    lang: '🌐 Language',
    easter: '🎉 You found the easter egg! 🎉',
  },
  nl: {
    nav: [
      'Home', 'Over Mij', 'Projecten', 'iTalent',
      'Internationalisatie', 'Hackathon', 'Seminaries', 'Pop-sessies', 'Studentenbetrokkenheid'
    ],
    theme: '🌗 Thema',
    lang: '🌐 Taal',
    easter: '🎉 Je hebt het paasei gevonden! 🎉',
  },
  pirate: {
    nav: [
      'Homeport', 'Cap’n Bio', 'Booty', 'iTreasure',
      'Sea-farin’', 'Hackin’', 'Parley', 'Shanties', 'Crew Spirit'
    ],
    theme: '🏴‍☠️ Arrr!',
    lang: '🏴‍☠️ Lingo',
    easter: '☠️ Avast! Ye found the secret booty! ☠️',
  }
};
const LANGS = ['en', 'nl', 'pirate'];
const getLang = () => localStorage.getItem('lang') || 'en';
const setLang = lang => {
  localStorage.setItem('lang', lang);
  renderNav();
  translatePage();
};

function renderNav() {
  const lang = getLang();
  const t = translations[lang];
  nav.innerHTML = `
    <ul>
      <li><a href="index.html">${t.nav[0]}</a></li>
      <li><a href="about.html">${t.nav[1]}</a></li>
      <li><a href="projects.html">${t.nav[2]}</a></li>
      <li>
        <a href="italent.html">${t.nav[3]} ▾</a>
        <ul>
          <li><a href="italent-internationalization.html">${t.nav[4]}</a></li>
          <li><a href="italent-hackathon.html">${t.nav[5]}</a></li>
          <li><a href="italent-seminaires.html">${t.nav[6]}</a></li>
          <li><a href="italent-pop-sessions.html">${t.nav[7]}</a></li>
          <li><a href="italent-student-engagement.html">${t.nav[8]}</a></li>
        </ul>
      </li>
    </ul>
    <button class="theme-switcher" id="themeBtn">${t.theme}</button>
    <button class="theme-switcher" id="langBtn">${t.lang}</button>
  `;
  // Re-attach theme/lang events
  document.getElementById('themeBtn').onclick = () => {
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  document.getElementById('langBtn').onclick = () => {
    const current = getLang();
    const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];
    setLang(next);
  };
  // Highlight active nav link
  const links = document.querySelectorAll('nav ul li a');
  links.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

function translatePage() {
  const lang = getLang();
  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });
}

// Initial render
renderNav();
translatePage();

// Easter egg (Konami code)
const egg = document.createElement('div');
egg.className = 'easter-egg';
const getEggText = () => translations[getLang()].easter;
egg.innerText = getEggText();
document.body.appendChild(egg);
const code = [38,38,40,40,37,39,37,39,66,65];
let pos = 0;
window.addEventListener('keydown', e => {
  if (e.keyCode === code[pos]) {
    pos++;
    if (pos === code.length) {
      setLang('pirate');
      egg.innerText = getEggText();
      egg.classList.add('show-egg');
      confetti();
      setTimeout(()=>egg.classList.remove('show-egg'), 4000);
      pos = 0;
    }
  } else {
    pos = 0;
  }
});

// Fun confetti effect
function confetti() {
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.style.position = 'fixed';
    c.style.left = Math.random()*100+'vw';
    c.style.top = '-2vh';
    c.style.width = '10px';
    c.style.height = '10px';
    c.style.background = `hsl(${Math.random()*360},90%,60%)`;
    c.style.borderRadius = '50%';
    c.style.zIndex = 9999;
    c.style.transition = 'top 2.5s linear';
    document.body.appendChild(c);
    setTimeout(()=>c.style.top = '100vh', 10);
    setTimeout(()=>c.remove(), 2600);
  }
}
