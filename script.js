/* ===== TYPEWRITER ===== */
const words = ["Software Engineer"];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const el = document.getElementById('typewriter-text');

function typeWriter() {
  const current = words[wordIdx];
  if (isDeleting) {
    el.textContent = current.substring(0, charIdx--);
  } else {
    el.textContent = current.substring(0, charIdx++);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIdx === current.length + 1) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false; charIdx = 0;
    wordIdx = (wordIdx + 1) % words.length;
    delay = 400;
  }
  setTimeout(typeWriter, delay);
}
typeWriter();

/* ===== STICKY HEADER ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === entry.target.id);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-70px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinksEl.classList.remove('open');
    }
  });
});

/* ===== FADE-IN ON SCROLL ===== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ===== CONTACT FORM ===== */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-success').style.display = 'block';
  this.reset();
  setTimeout(() => { document.getElementById('form-success').style.display = 'none'; }, 4000);
});

/* ===== PARTICLES – student/dev theme ===== */
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
document.getElementById('particles-bg').appendChild(canvas);
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize, { passive: true });

// Code symbols for developer/student feel
const codeSymbols = ['{ }', '< />', '[ ]', '( )', '=>', '&&', '//', '01', '++', '/**', ';', '!=', '===', '∑', '∂', '#'];
const DOTS = 35, SYMS = 18;

const dots = Array.from({ length: DOTS }, () => ({
  type: 'dot',
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.4 + 0.4,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  alpha: Math.random() * 0.35 + 0.08,
  color: Math.random() > 0.5 ? '139,92,246' : '6,182,212'
}));

const symbols = Array.from({ length: SYMS }, () => ({
  type: 'sym',
  text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.12,
  vy: (Math.random() - 0.5) * 0.12,
  alpha: Math.random() * 0.09 + 0.04,
  size: Math.random() * 6 + 9,
  color: Math.random() > 0.5 ? '139,92,246' : '6,182,212'
}));

const allParticles = [...dots, ...symbols];

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dots + connecting lines
  dots.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  // Connecting lines between nearby dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 110) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist/110)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw floating code symbols
  symbols.forEach(s => {
    ctx.font = `${s.size}px 'Courier New', monospace`;
    ctx.fillStyle = `rgba(${s.color},${s.alpha})`;
    ctx.fillText(s.text, s.x, s.y);
    s.x += s.vx; s.y += s.vy;
    if (s.x < -40 || s.x > canvas.width + 40)  s.vx *= -1;
    if (s.y < -20 || s.y > canvas.height + 20)  s.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== DANCE PHOTO SLIDESHOW ===== */
const dancePhotos = ['assets/images/dance1.jpg', 'assets/images/dance2.jpg'];
let danceIdx = 0;
const danceBg = document.getElementById('dance-bg');
if (danceBg) {
  danceBg.style.backgroundImage = `url('${dancePhotos[0]}')`;
  setInterval(() => {
    danceBg.style.opacity = '0';
    setTimeout(() => {
      danceIdx = (danceIdx + 1) % dancePhotos.length;
      danceBg.style.backgroundImage = `url('${dancePhotos[danceIdx]}')`;
      danceBg.style.opacity = '1';
    }, 1000);
  }, 4000);
}
