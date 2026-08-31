/**
 * SETTINGS MODULE
 */
const Settings = {
  async load() {
    try {
      const res = await API.request('getSettings');
      if (res.success) {
        document.getElementById('setting-show-qty').value = res.data.SHOW_QTY_SYSTEM || 'ON';
      }
    } catch (e) { console.error(e); }
  }
};
