// Nav scroll behaviour
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Fade in on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Active nav link
const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href').replace(/\/$/, '');
  if (path.includes(href) && href !== '/' && href !== '/index.html') a.classList.add('active');
  if ((path === '/' || path.endsWith('index.html')) && (href === '/' || href === '/index.html' || href === 'index.html')) a.classList.add('active');
});

// Contact form AJAX submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    const statusEl = document.getElementById('form-status');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(contactForm)).toString(),
      });

      if (response.ok) {
        statusEl.textContent = 'Thank you! Your message has been sent. I\'ll get back to you within 24 hours.';
        statusEl.classList.add('form-status--success');
        statusEl.style.display = 'block';
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again or email contact@sophieklose.com directly.';
      statusEl.classList.add('form-status--error');
      statusEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
