export class Router {
  constructor() {
    this.routes = {
      '/': 'home',
      '/tienda': 'shop',
      '/empresas': 'empresas',
      '/artesanos': 'artesanos',
      '/galeria': 'gallery',
      '/blog/stickers': 'blog-stickers',
      '/blog/branding': 'blog-branding',
      '/blog/web': 'blog-web'
    };
  }

  start() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  navigate() {
    const path = window.location.hash.slice(1) || '/';
    const page = this.routes[path] || 'home';
    this.loadPage(page);
  }

  async loadPage(page) {
    const main = document.getElementById('main');
    try {
      const response = await fetch(`templates/pages/${page}.html`);
      main.innerHTML = await response.text();
      
      // Cargar JS específico si existe
      try {
        const module = await import(`./pages/${page}.js`);
        if (module.init) module.init();
      } catch (e) {
        // No hay JS específico para esta página
      }
    } catch (e) {
      main.innerHTML = '<p>Página no encontrada</p>';
    }
  }
}