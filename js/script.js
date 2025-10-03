document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // set footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
  });

  // close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('show')) {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // simple contact form validation
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) {
        formStatus.textContent = 'Please enter a valid name.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }
      if (message.length < 10) {
        formStatus.textContent = 'Message must be at least 10 characters.';
        return;
      }

      // open email client with mailto
      const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:nargesgol01@gmail.com?subject=${subject}&body=${body}`;

      formStatus.textContent = 'Opening your email client...';
      setTimeout(() => {
        window.location.href = mailto;
        formStatus.textContent = 'If your email client did not open, please send directly to nargesgol01@gmail.com';
        form.reset();
      }, 700);
    });
  }
});
