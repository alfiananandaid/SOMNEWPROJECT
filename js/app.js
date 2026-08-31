/**
 * MAIN APP CONTROLLER & NAVIGATION
 */
const App = {
  init() {
    lucide.createIcons();
    this.bindEvents();
    this.checkAuth();
    this.setupKeyboardShortcuts();
  },

  checkAuth() {
    if (Auth.isLoggedIn()) {
      const session = Auth.getSession();
      document.getElementById('view-login').style.display = 'none';
      document.getElementById('view-app').style.display = 'flex';
      
      document.getElementById('user-greeting').innerText = `Hello, ${session.nama} 👋`;
      document.getElementById('user-role-badge').innerText = session.role;

      // Filter admin views
      if (!Auth.isAdmin()) {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
      }

      this.navigate('dashboard');
    } else {
      document.getElementById('view-login').style.display = 'flex';
      document.getElementById('view-app').style.display = 'none';
    }
  },

  bindEvents() {
    // Login form
    document.getElementById('form-login').addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = document.getElementById('login-username').value;
      const p = document.getElementById('login-password').value;
      
      try {
        const res = await API.request('login', { username: u, password: p });
        if (res.success) {
          Auth.setSession(res.data);
          this.toast('Login berhasil!', 'success');
          this.checkAuth();
        } else {
          this.toast(res.message, 'error');
        }
      } catch (err) {
        this.toast('Gagal terhubung ke server Google Apps Script.', 'error');
      }
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => Auth.logout());

    // Navigation clicks
    document.querySelectorAll('.nav-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-target');
        this.navigate(target);
      });
    });

    // Theme Toggle
    document.getElementById('btn-theme-toggle').addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
    });
  },

  navigate(pageId) {
    document.querySelectorAll('.app-page').forEach(page => page.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    const pageEl = document.getElementById(`page-${pageId}`);
    if (pageEl) {
      pageEl.style.display = 'block';
      document.querySelectorAll(`.nav-item[data-target="${pageId}"]`).forEach(n => n.classList.add('active'));

      // Lazy load module data
      if (pageId === 'dashboard') Dashboard.load();
      if (pageId === 'history') History.load();
      if (pageId === 'users' && Auth.isAdmin()) Users.load();
      if (pageId === 'logs' && Auth.isAdmin()) Logs.load();
      if (pageId === 'settings' && Auth.isAdmin()) Settings.load();
    }
  },

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        const barcodeInput = document.getElementById('so-barcode');
        if (barcodeInput) barcodeInput.focus();
      }
      if (e.key === 'F4') {
        e.preventDefault();
        const qtyInput = document.getElementById('so-qty');
        if (qtyInput && !qtyInput.disabled) qtyInput.focus();
      }
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        const btnSave = document.getElementById('btn-save-so');
        if (btnSave && !btnSave.disabled) btnSave.click();
      }
    });
  },

  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
