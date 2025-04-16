// Navigation HTML
const navHTML = `
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About Me</a></li>
    <li><a href="experiences.html">Experiences</a></li>
    <li>
      <a href="italent.html" id="italentNavBtn">iTalent ▾</a>
      <ul class="italent-dropdown">
        <li><a href="italent-internationalization.html">Internationalization</a></li>
        <li><a href="italent-hackathon.html">Hackathon</a></li>
        <li><a href="italent-seminaires.html">Seminaires</a></li>
        <li><a href="italent-pop-sessions.html">Pop Sessions</a></li>
        <li><a href="italent-student-engagement.html">Engagement</a></li>
      </ul>
    </li>
  </ul>
  <div class="nav-actions">
    <button class="theme-switcher" id="themeBtn">🌗 Theme</button>
    <div class="lang-dropdown">
      <button class="theme-switcher" id="langBtn">🌐 Language ▼</button>
      <div class="lang-options" id="langOptions">
        <button data-lang="en">English</button>
        <button data-lang="nl">Nederlands</button>
        <button data-lang="pirate">Pirate</button>
        <button data-lang="memespeak">MemeSpeak</button>
      </div>
    </div>
  </div>
`;

// Inject navigation
const nav = document.getElementById('navbar');
if (nav) nav.innerHTML = navHTML;

// --- Layout & Style Enhancements ---
function applyBeautifulLayout() {
  // Add glassmorphism and shadow to nav
  const navEl = document.querySelector('nav');
  if (navEl) {
    navEl.style.backdropFilter = 'blur(16px) saturate(1.5)';
    navEl.style.background = 'rgba(30, 34, 90, 0.85)';
    navEl.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.18)';
    navEl.style.borderRadius = '18px';
    navEl.style.margin = '1.5rem auto 1rem auto';
    navEl.style.maxWidth = '1100px';
    navEl.style.padding = '0.7rem 2.5rem';
    navEl.style.transition = 'background 0.5s, color 0.5s';
  }
  // Main content
  const main = document.querySelector('main');
  if (main) {
    main.style.background = 'rgba(255,255,255,0.92)';
    main.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.13)';
    main.style.borderRadius = '22px';
    main.style.maxWidth = '900px';
    main.style.margin = '2.5rem auto';
    main.style.padding = '2.5rem 2.5rem 2rem 2.5rem';
    main.style.transition = 'background 0.5s, color 0.5s';
  }
  // Fun fact box
  document.querySelectorAll('.fun-fact').forEach(factBox => {
    factBox.style.background = 'linear-gradient(90deg, #4f8cff 60%, #7fdfff 100%)';
    factBox.style.color = '#fff';
    factBox.style.boxShadow = '0 4px 24px rgba(0,0,0,0.13)';
    factBox.style.borderRadius = '14px';
    factBox.style.fontWeight = '600';
    factBox.style.fontSize = '1.15rem';
  });
}

// --- Dropdown Fixes ---
function setupDropdowns() {
  // iTalent dropdown
  document.querySelectorAll('.italent-dropdown').forEach(drop => {
    const parent = drop.parentElement;
    if (parent) {
      let dropdownTimeout;
      parent.onmouseenter = () => {
        clearTimeout(dropdownTimeout);
        drop.style.display = 'flex';
      };
      parent.onmouseleave = () => {
        dropdownTimeout = setTimeout(() => drop.style.display = 'none', 200);
      };
      drop.onmouseenter = () => {
        clearTimeout(dropdownTimeout);
        drop.style.display = 'flex';
      };
      drop.onmouseleave = () => {
        dropdownTimeout = setTimeout(() => drop.style.display = 'none', 200);
      };
    }
  });
  // Close dropdowns on outside click
  document.addEventListener('click', e => {
    document.querySelectorAll('.italent-dropdown').forEach(drop => {
      if (!drop.contains(e.target) && !drop.parentElement.contains(e.target)) {
        drop.style.display = 'none';
      }
    });
    document.querySelectorAll('.lang-options').forEach(drop => {
      if (!drop.contains(e.target) && !drop.parentElement.contains(e.target)) {
        drop.classList.remove('show-lang');
      }
    });
    document.querySelectorAll('.theme-options').forEach(drop => {
      if (!drop.contains(e.target) && !drop.parentElement.contains(e.target)) {
        drop.classList.remove('show-theme');
      }
    });
  });
}

// --- Text Color Adaptation ---
function adaptTextColor() {
  // Improved contrast logic
  const getContrastYIQ = hex => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x=>x+x).join('');
    const r = parseInt(hex.substr(0,2),16), g = parseInt(hex.substr(2,2),16), b = parseInt(hex.substr(4,2),16);
    return ((r*299)+(g*587)+(b*114))/1000 >= 140 ? '#222' : '#fff';
  };
  let bg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim();
  let navBg = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();
  let accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  let navText = getContrastYIQ(navBg.replace('rgba','').replace('(','').replace(')','').split(',')[0].length>3?navBg:'#fff');
  let mainText = getContrastYIQ(bg.replace('rgba','').replace('(','').replace(')','').split(',')[0].length>3?bg:'#fff');
  // Nav
  const navEl = document.querySelector('nav');
  if (navEl) navEl.style.color = navText;
  document.querySelectorAll('nav a, nav ul li a, .nav-actions, .theme-switcher, .lang-options button, .theme-options button').forEach(el => {
    el.style.color = navText;
    el.style.background = 'none';
  });
  document.querySelectorAll('.italent-dropdown, .lang-options, .theme-options').forEach(drop => {
    drop.style.background = navBg;
    drop.style.color = navText;
    drop.style.boxShadow = '0 4px 24px rgba(0,0,0,0.13)';
  });
  // Main
  const main = document.querySelector('main');
  if (main) main.style.color = mainText;
  // Fun fact and easter egg
  document.querySelectorAll('.fun-fact, .easter-egg').forEach(box => {
    box.style.color = getContrastYIQ(accent);
    box.style.background = accent;
  });
}

// --- Translation Fixes ---
function translateAll() {
  translatePage();
  // Also translate nav after render
  setTimeout(() => translatePage(), 100);
}

// Theme switching
const THEME_OPTIONS = [
  { key: 'light', label: { en: 'Light', nl: 'Licht', memespeak: 'L1t', pirate: 'Sunlit' } },
  { key: 'dark', label: { en: 'Dark', nl: 'Donker', memespeak: 'D4rk', pirate: 'Moonlit' } },
  { key: 'palette', label: { en: 'Palette', nl: 'Palet', memespeak: 'C0l0rz', pirate: 'Rainbow' } },
];

const PALETTES = [
  { name: 'Ocean', colors: { '--primary-bg': '#e0f7fa', '--primary-text': '#01579b', '--accent': '#00bcd4', '--nav-bg': '#b2ebf2', '--nav-text': '#01579b' } },
  { name: 'Sunset', colors: { '--primary-bg': '#fff3e0', '--primary-text': '#bf360c', '--accent': '#ff7043', '--nav-bg': '#ffe0b2', '--nav-text': '#bf360c' } },
  { name: 'Forest', colors: { '--primary-bg': '#e8f5e9', '--primary-text': '#1b5e20', '--accent': '#43a047', '--nav-bg': '#c8e6c9', '--nav-text': '#1b5e20' } },
  { name: 'Candy', colors: { '--primary-bg': '#ffe6fa', '--primary-text': '#d72660', '--accent': '#f46036', '--nav-bg': '#f7b2ad', '--nav-text': '#d72660' } },
  { name: 'Cyber', colors: { '--primary-bg': '#0f2027', '--primary-text': '#f5f7fa', '--accent': '#2c5364', '--nav-bg': '#203a43', '--nav-text': '#f5f7fa' } },
  { name: 'Lime', colors: { '--primary-bg': '#f4ff81', '--primary-text': '#33691e', '--accent': '#aeea00', '--nav-bg': '#d4e157', '--nav-text': '#33691e' } },
  { name: 'Bubblegum', colors: { '--primary-bg': '#ffb6b9', '--primary-text': '#6a0572', '--accent': '#f67280', '--nav-bg': '#c06c84', '--nav-text': '#6a0572' } },
];

function renderThemeDropdown() {
  const lang = getLang();
  let theme = getTheme();
  let html = `<div class="theme-dropdown"><button class="theme-switcher" id="themeBtn">${translations[lang].theme} ▼</button><div class="theme-options" id="themeOptions">`;
  THEME_OPTIONS.forEach(opt => {
    html += `<button data-theme="${opt.key}">${opt.label[lang] || opt.label['en']}</button>`;
  });
  html += `</div></div>`;
  return html;
}

function setTheme(theme, paletteIdx) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'palette') {
    const idx = paletteIdx !== undefined ? paletteIdx : getPaletteIdx();
    Object.entries(PALETTES[idx].colors).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
    localStorage.setItem('paletteIdx', idx);
  } else {
    // Reset palette
    Object.keys(PALETTES[0].colors).forEach(k => document.documentElement.style.removeProperty(k));
    localStorage.removeItem('paletteIdx');
  }
}
function getTheme() { return localStorage.getItem('theme') || 'light'; }
function getPaletteIdx() { return parseInt(localStorage.getItem('paletteIdx') || '0', 10); }

setTheme(getTheme());

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
      'Home', 'About Me', 'Experiences', 'iTalent',
      'Internationalization', 'Hackathon', 'Seminaires', 'Pop Sessions', 'Engagement'
    ],
    theme: '🌗 Theme',
    lang: '🌐 Language',
    easter: '🎉 You found the easter egg! 🎉',
    about_title: 'About Me',
    about_p1: 'I’m an enthusiastic IT student who enjoys learning by doing. I’ve worked on various projects involving cloud, automation, and security, and I like finding practical solutions to technical challenges. I’m active in the student council and enjoy being involved in projects that make a difference.',
    about_p2: 'Outside of school, I like going to the gym, traveling, going out with friends, and discovering new things. I’m always open to new experiences and love working with others to build creative ideas.',
    pop_sessions_title: 'Pop Sessions',
    pop_poping_title: 'POP Session 2TIN: POPing',
    pop_poping_desc: 'Session about communication and feedback in teamwork, with interactive exercises.',
    pop_brain_title: 'POP Session 2TIN: Brain at Work! Do Not Disturb!',
    pop_brain_desc: 'Session about the influence of technology on behavior, concentration, and productivity.',
    pop_team_title: 'POP Session 3TIN: My team and I',
    pop_team_desc: 'Session about communication and feedback in group work, with practical exercises.',
  },
  nl: {
    nav: [
      'Home', 'Over Mij', 'Ervaringen', 'iTalent',
      'Internationalisatie', 'Hackathon', 'Seminaries', 'Pop-sessies', 'Betrokkenheid'
    ],
    theme: '🌗 Thema',
    lang: '🌐 Taal',
    easter: '🎉 Je hebt het paasei gevonden! 🎉',
    about_title: 'Over Mij',
    about_p1: 'Ik ben een enthousiaste IT-student die graag leert door te doen. Ik heb aan verschillende projecten gewerkt rond cloud, automatisering en security, en vind het leuk om praktische oplossingen te zoeken voor technische uitdagingen. Ik ben actief in de studentenraad en werk graag mee aan projecten die het verschil maken.',
    about_p2: 'Buiten school ga ik graag naar de fitness, reis ik, ga ik uit met vrienden en ontdek ik nieuwe dingen. Ik sta altijd open voor nieuwe ervaringen en werk graag samen aan creatieve ideeën.',
    pop_sessions_title: 'Pop-sessies',
    pop_poping_title: 'POP-sessie 2TIN: POPing',
    pop_poping_desc: 'Sessie over communicatie en feedback in teamwerk, met interactieve oefeningen.',
    pop_brain_title: 'POP-sessie 2TIN: Brein aan het werk! Niet storen!',
    pop_brain_desc: 'Sessie over de invloed van technologie op gedrag, concentratie en productiviteit.',
    pop_team_title: 'POP-sessie 3TIN: My team and I',
    pop_team_desc: 'Sessie over communicatie en feedback in groepswerk, met praktijkgerichte oefeningen.',
  },
  pirate: {
    nav: [
      'Homeport', 'Cap’n Bio', 'Booty', 'iTreasure',
      'Sea-farin’', 'Hackin’', 'Parley', 'Shanties', 'Crew Spirit'
    ],
    theme: '🏴‍☠️ Arrr!',
    lang: '🏴‍☠️ Lingo',
    easter: '☠️ Avast! Ye found the secret booty! ☠️',
    about_title: 'Cap’n Bio',
    about_p1: 'Arrr! This be a hearty IT buccaneer, learnin’ by doin’! Sailed many a project on the cloud, automation, and security seas. Loves findin’ clever fixes for techy troubles. Sits on the crew council and helps chart new courses.',
    about_p2: 'When not at sea, enjoys the gym, explorin’ new lands, revelin’ with mates, and seekin’ new adventures. Always ready for a new voyage and creatin’ grand ideas with the crew!',
  },
  memespeak: {
    nav: [
      'H0m3', 'Wh0?', 'Pr0j3ctz', 'iTal3nt',
      'G0bbl3dYg00k', 'H4ckz', 'S3m1n4rz', 'P0pZ', 'Eng4g3'
    ],
    theme: '🧠🦠',
    lang: '🧬 M3m3Sp34k',
    easter: '💀 M3m3Sp34k m0d3 4ct1v4t3d 💀',
    about_title: 'Wh0?',
    about_p1: '1T n3rd, l0v3z d0in stuf. D1d cl0ud, aut0, s3c, fixin’ pr0bl3mz. StUd3nt c0uncil, mak3z d1ff.',
    about_p2: 'Gym, tr4v3l, fri3ndz, n3w stuf. Alw4ys up 4 xp, b1g br41nst0rmz w/ t3am.',
  },
};
const LANGS = ['en', 'nl', 'pirate', 'memespeak'];
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
      <li><a href="experiences.html">${t.nav[2]}</a></li>
      <li>
        <a href="italent.html" id="italentNavBtn">${t.nav[3]} ▾</a>
        <ul class="italent-dropdown">
          <li><a href="italent-internationalization.html">${t.nav[4]}</a></li>
          <li><a href="italent-hackathon.html">${t.nav[5]}</a></li>
          <li><a href="italent-seminaires.html">${t.nav[6]}</a></li>
          <li><a href="italent-pop-sessions.html">${t.nav[7]}</a></li>
          <li><a href="italent-student-engagement.html">${t.nav[8]}</a></li>
        </ul>
      </li>
    </ul>
    <div class="nav-actions">
      ${renderThemeDropdown()}
      <div class="lang-dropdown">
        <button class="theme-switcher" id="langBtn">${t.lang} ▼</button>
        <div class="lang-options" id="langOptions">
          <button data-lang="en">English</button>
          <button data-lang="nl">Nederlands</button>
          <button data-lang="pirate">Pirate</button>
          <button data-lang="memespeak">MemeSpeak</button>
        </div>
      </div>
    </div>
  `;
  // Theme dropdown events
  document.getElementById('themeBtn').onclick = () => {
    document.getElementById('themeOptions').classList.toggle('show-theme');
  };
  document.querySelectorAll('.theme-options button').forEach((btn, i) => {
    btn.onclick = e => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      if (theme === 'palette') showPalettePicker();
      document.getElementById('themeOptions').classList.remove('show-theme');
    };
  });
  // Re-attach lang events
  document.getElementById('langBtn').onclick = () => {
    document.getElementById('langOptions').classList.toggle('show-lang');
  };
  document.querySelectorAll('.lang-options button').forEach(btn => {
    btn.onclick = e => {
      setLang(btn.getAttribute('data-lang'));
      document.getElementById('langOptions').classList.remove('show-lang');
    };
  });
  // Highlight active nav link
  const links = document.querySelectorAll('nav ul li a');
  links.forEach(link => {
    if (window.location.pathname.endswith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

function showPalettePicker() {
  let idx = getPaletteIdx();
  let html = '<div class="palette-picker">';
  PALETTES.forEach((p, i) => {
    html += `<button class="palette-btn${i===idx?' selected':''}" data-idx="${i}" style="background:${p.colors['--accent']};color:${p.colors['--primary-text']}">${p.name}</button>`;
  });
  html += '</div>';
  const picker = document.createElement('div');
  picker.innerHTML = html;
  picker.className = 'palette-modal';
  document.body.appendChild(picker);
  picker.querySelectorAll('.palette-btn').forEach(btn => {
    btn.onclick = () => {
      setTheme('palette', parseInt(btn.getAttribute('data-idx')));
      document.body.removeChild(picker);
    };
  });
  picker.onclick = e => { if (e.target === picker) document.body.removeChild(picker); };
}

function translatePage() {
  const lang = getLang();
  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  // Translate list items and article content with data-i18n-list
  document.querySelectorAll('[data-i18n-list]').forEach(el => {
    const key = el.getAttribute('data-i18n-list');
    if (translations[lang][key] && Array.isArray(translations[lang][key])) {
      el.innerHTML = '';
      translations[lang][key].forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item;
        el.appendChild(li);
      });
    }
  });
}

// Initial render
renderNav();
translateAll();
setupDropdowns();
adaptTextColor();
applyBeautifulLayout();

// Re-apply on theme/lang change
window.addEventListener('storage', () => {
  adaptTextColor();
  applyBeautifulLayout();
  translateAll();
});

const origSetTheme = setTheme;
setTheme = function(theme, paletteIdx) {
  origSetTheme(theme, paletteIdx);
  adaptTextColor();
  applyBeautifulLayout();
};
const origSetLang = setLang;
setLang = function(lang) {
  origSetLang(lang);
  adaptTextColor();
  applyBeautifulLayout();
};

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
      setLang('memespeak');
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

// Fun fact: show a new random fun fact every page load
async function showFunFact() {
  try {
    const res = await fetch('funfacts.json');
    const facts = await res.json();
    const idx = Math.floor(Math.random() * facts.length);
    let fact = facts[idx];
    let factBox = document.createElement('div');
    factBox.className = 'fun-fact';
    factBox.innerHTML = `<b>💡 Fun Fact:</b> ${fact}`;
    document.body.appendChild(factBox);
    setTimeout(()=>factBox.classList.add('show-fact'), 100);
    applyBeautifulLayout();
  } catch {}
}
showFunFact();

(function(){
  let terminalOpen = false;
  let terminalDiv;
  let history = [];
  let histIdx = 0;
  function openTerminal() {
    if (terminalOpen) return;
    terminalOpen = true;
    terminalDiv = document.createElement('div');
    terminalDiv.id = 'secret-terminal';
    terminalDiv.style.position = 'fixed';
    terminalDiv.style.bottom = '0';
    terminalDiv.style.left = '0';
    terminalDiv.style.width = '100vw';
    terminalDiv.style.height = '320px';
    terminalDiv.style.background = '#181a1b';
    terminalDiv.style.color = '#4f8cff';
    terminalDiv.style.fontFamily = 'monospace';
    terminalDiv.style.zIndex = 99999;
    terminalDiv.style.boxShadow = '0 -4px 32px #0008';
    terminalDiv.innerHTML = '<div style="padding:8px 16px;font-weight:bold;">$ iTalent Terminal <span style="float:right;cursor:pointer;color:#ffb347;" id="close-term">[x]</span></div><div id="term-out" style="height:200px;overflow-y:auto;padding:0 16px 8px 16px;"></div><div style="padding:0 16px 8px 16px;"><span style="color:#ffb347;">$</span> <input id="term-in" style="background:#23272f;color:#fff;border:none;font-size:1em;width:80%;outline:none;" autocomplete="off"></div>';
    document.body.appendChild(terminalDiv);
    document.getElementById('close-term').onclick = () => { terminalDiv.remove(); terminalOpen = false; };
    const input = document.getElementById('term-in');
    const out = document.getElementById('term-out');
    input.focus();
    input.onkeydown = function(e) {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (!cmd) return;
        history.push(cmd); histIdx = history.length;
        out.innerHTML += `<div><span style="color:#ffb347;">$</span> ${cmd}</div>`;
        let resp = '';
        if (cmd === 'about') resp = 'Enthusiastic IT student, coffee-powered, loves cloud, automation, and memes.';
        else if (cmd === 'skills') resp = 'Skills: JavaScript, Cloud, Automation, Debugging, Meme Generation.';
        else if (cmd === 'sudo party') { resp = '🎉 Party mode activated!'; disco(); playMusic(); }
        else if (cmd === 'help') resp = 'Commands: about, skills, sudo party, help, clear, exit';
        else if (cmd === 'clear') { out.innerHTML = ''; resp = ''; }
        else if (cmd === 'exit') { terminalDiv.remove(); terminalOpen = false; return; }
        else resp = 'Unknown command. Try help.';
        if (resp) out.innerHTML += `<div>${resp}</div>`;
        out.scrollTop = out.scrollHeight;
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (histIdx > 0) { histIdx--; input.value = history[histIdx] || ''; }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (histIdx < history.length-1) { histIdx++; input.value = history[histIdx] || ''; } else { input.value = ''; histIdx = history.length; }
        e.preventDefault();
      }
    };
    function disco() {
      let discoInt = setInterval(()=>{
        terminalDiv.style.background = `hsl(${Math.random()*360},80%,20%)`;
      }, 120);
      setTimeout(()=>{ clearInterval(discoInt); terminalDiv.style.background = '#181a1b'; }, 3500);
    }
    function playMusic() {
      let audio = document.createElement('audio');
      audio.src = 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae5b2.mp3';
      audio.autoplay = true;
      audio.onended = ()=>audio.remove();
      terminalDiv.appendChild(audio);
    }
  }
  window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.altKey && e.shiftKey && e.key.toLowerCase() === 't') || e.key === '`') {
      openTerminal();
    }
  });
})();

(function(){
  let retroActive = false;
  function enableRetro() {
    if (retroActive) return;
    retroActive = true;
    const style = document.createElement('style');
    style.id = 'retro-style';
    style.innerHTML = `
      body, main, nav, .fun-fact, .easter-egg, .italent-card, .experiences-list li, .palette-modal, .palette-picker, .gallery-card, .quote-section, .funfact-carousel {
        font-family: 'Courier New', Courier, monospace !important;
        background: #008080 !important;
        color: #fff !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      nav, main, .fun-fact, .easter-egg, .italent-card, .experiences-list li, .palette-modal, .palette-picker, .gallery-card, .quote-section, .funfact-carousel {
        border: 2px solid #fff !important;
        background: #222 !important;
        color: #0ff !important;
      }
      nav ul, nav ul li, nav ul li a, .nav-actions, .theme-switcher, .lang-options button, .theme-options button {
        background: #222 !important;
        color: #0ff !important;
        border-radius: 0 !important;
      }
      .fun-fact, .easter-egg, .palette-modal, .palette-picker, .gallery-card, .quote-section, .funfact-carousel {
        background: #111 !important;
        color: #ff0 !important;
      }
      a, a:visited, a:hover {
        color: #ff0 !important;
        text-decoration: underline !important;
      }
      .retro-title {
        font-size: 2.2em;
        color: #ff0;
        margin: 1em 0 0.5em 0;
        text-shadow: 2px 2px 0 #000;
      }
    `;
    document.head.appendChild(style);
    const retroBanner = document.createElement('div');
    retroBanner.className = 'retro-title';
    retroBanner.innerText = 'RETRO MODE: Welcome to 1999!';
    document.body.insertBefore(retroBanner, document.body.firstChild);
  }
  window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'r') {
      enableRetro();
    }
  });
})();
