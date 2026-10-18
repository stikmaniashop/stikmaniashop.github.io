export function init() {
  console.log('Blog page initialized');

  // Navegación entre artículos
  const navLinks = document.querySelectorAll('.blog-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.location.hash = href.replace('#', '');
    });
  });

  // Tabla de contenidos (si existe)
  const toc = document.querySelector('.table-of-contents');
  if (toc) {
    const headings = document.querySelectorAll('.blog-content h2');
    headings.forEach(heading => {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth' });
      });
      toc.appendChild(link);
    });
  }
}