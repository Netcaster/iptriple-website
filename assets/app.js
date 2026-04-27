// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(8,15,24,0.97)'
    : 'rgba(8,15,24,0.85)';
});

// ── Mobile nav toggle ──
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ── Intersection Observer for reveal animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Contact form submission ──
const form = document.getElementById('contact-form');
form?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  const data = new FormData(form);
  try {
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
      form.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; btn.style.background = ''; }, 4000);
    } else {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — Try Again';
    btn.disabled = false;
  }
});
