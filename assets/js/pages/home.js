export function init() {
  console.log('Home page initialized');
  
  // Animaciones de entrada
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => {
    el.classList.add('active');
  });

  // Scroll suave para CTAs
  const ctaButtons = document.querySelectorAll('.hero-ctas a');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(btn.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}