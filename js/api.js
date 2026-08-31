const API = {
  async request(action, payload = {}) {
    if (!CONFIG.API_URL || CONFIG.API_URL.includes("YOUR_APPS_SCRIPT")) throw new Error("API_URL belum dikonfigurasi!");

    const session = Auth.getSession();
    const fullPayload = { action, userId: session?.userId, username: session?.username, ...payload };

    // Jika Perangkat OFFLINE dan sedang melakukan SAVE SO
    if (!navigator.onLine && action === 'saveStockOpname') {
      let offlineQueue = JSON.parse(localStorage.getItem('som_offline_queue') || '[]');
      offlineQueue.push(fullPayload);
      localStorage.setItem('som_offline_queue', JSON.stringify(offlineQueue));
      this.updateOfflineBadge();
      return { success: true, offline: true, message: "Tersimpan Offline. Akan disinkronkan saat online." };
    }

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(fullPayload)
      });
      
      // Proses sinkronisasi otomatis jika ada data offline saat online kembali
      if (action === 'getDashboard') this.syncOfflineData();

      return await response.json();
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  },

  async syncOfflineData() {
    let offlineQueue = JSON.parse(localStorage.getItem('som_offline_queue') || '[]');
    if (offlineQueue.length > 0 && navigator.onLine) {
      for (const payload of offlineQueue) {
        await fetch(CONFIG.API_URL, { method: 'POST', body: JSON.stringify(payload) });
      }
      localStorage.removeItem('som_offline_queue');
      this.updateOfflineBadge();
      App.toast("Data offline berhasil disinkronkan ke server!", "success");
    }
  },

  updateOfflineBadge() {
    const q = JSON.parse(localStorage.getItem('som_offline_queue') || '[]');
    const banner = document.getElementById('offline-banner');
    if (q.length > 0) {
      banner.style.display = 'block';
      document.getElementById('offline-count').innerText = q.length;
    } else {
      banner.style.display = 'none';
    }
  }
};
