/**
 * AUTHENTICATION & SESSION MANAGER
 */
const Auth = {
  STORAGE_KEY: 'SOM_SESSION_DATA',

  getSession() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },

  setSession(sessionData) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  isAdmin() {
    const s = this.getSession();
    return s && s.role === 'ADMIN';
  }
};
