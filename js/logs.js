/**
 * SYSTEM LOGS MODULE
 */
const Logs = {
  async load() {
    try {
      const res = await API.request('getSystemLogs');
      if (res.success) {
        const tbody = document.getElementById('tbl-logs');
        tbody.innerHTML = res.data.map(l => `
          <tr>
            <td>${new Date(l.timestamp).toLocaleString('id-ID')}</td>
            <td><strong>${l.username}</strong> (${l.role})</td>
            <td>${l.module}</td>
            <td><code>${l.action}</code></td>
            <td>${l.description}</td>
          </tr>
        `).join('');
      }
    } catch (e) { console.error(e); }
  }
};
