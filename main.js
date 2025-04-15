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

// Easter egg (Konami code)
const egg = document.createElement('div');
egg.className = 'easter-egg';
egg.innerText = '🎉 You found the easter egg! 🎉';
document.body.appendChild(egg);
const code = [38,38,40,40,37,39,37,39,66,65];
let pos = 0;
window.addEventListener('keydown', e => {
  if (e.keyCode === code[pos]) {
    pos++;
    if (pos === code.length) {
      egg.classList.add('show-egg');
      setTimeout(()=>egg.classList.remove('show-egg'), 4000);
      pos = 0;
    }
  } else {
    pos = 0;
  }
});
