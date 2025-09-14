// ===== Typing animation =====
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing');

  if (typingElement) {
    let textIndex = 0;
    let charIndex = 0;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const delayBetween = 1400;

    function type() {
      if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(erase, delayBetween);
      }
    }
    function erase() {
      if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, eraseSpeed);
      } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
      }
    }
    setTimeout(type, 500);
  }

  // ===== Theme toggle with persistence =====
  const themeToggle = document.getElementById('theme-toggle');
  const prefersLight = localStorage.getItem('theme') === 'light';
  if (prefersLight) document.body.classList.add('light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // ===== Mobile nav toggle =====
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      navToggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }

  // ===== Smooth scrolling for internal anchors and auto-close mobile menu =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      // Prevent when not internal
      if (!href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // close mobile nav if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
