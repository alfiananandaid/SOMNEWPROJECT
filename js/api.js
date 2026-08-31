/**
 * API REQUEST HANDLER
 */
const API = {
  async request(action, payload = {}) {
    if (!CONFIG.API_URL || CONFIG.API_URL.includes("https://script.google.com/macros/s/AKfycbxnnQkAzNgPHwHkDFIgiWxYmZUkwKOTzebIVjKzdAvbpgXlYMN3EQJr_HQ7qWm4ZESqTQ/exec")) {
      throw new Error("URL API Google Apps Script belum dikonfigurasi di js/config.js!");
    }

    const session = Auth.getSession();
    const fullPayload = {
      action: action,
      userId: session ? session.userId : null,
      username: session ? session.username : null,
      role: session ? session.role : null,
      reqUser: session,
      ...payload
    };

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // Apps Script CORS workaround
        },
        body: JSON.stringify(fullPayload)
      });

      const json = await response.json();
      if (!json.success && json.errorCode === 'AUTH_EXPIRED') {
        Auth.logout();
        throw new Error("Sesi login telah berakhir.");
      }

      return json;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }
};
