/* ── NAV SCROLL SHADOW ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── HAMBURGER MENU ── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

/* Close menu on nav link click */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── SMOOTH SCROLL OFFSET (sticky nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── INTERSECTION OBSERVER — fade-in sections ── */
const fadeEls = document.querySelectorAll(
  '.marre-step, .bonus-card, .program-item, .notfor-item, .stat-row, .results-list li'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity .45s ease ${i * 0.06}s, transform .45s ease ${i * 0.06}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {});

/* Trigger visible class */
document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: none !important; }</style>
`);
