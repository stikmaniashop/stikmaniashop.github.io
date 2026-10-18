export class Toast {
  constructor() {
    this.container = document.getElementById('toast-container');
  }

  show(message, type = 'success') {
    if (!this.container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="toast-message">${message}</span>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

window.toast = new Toast();
window.showToast = (message, type) => window.toast.show(message, type);