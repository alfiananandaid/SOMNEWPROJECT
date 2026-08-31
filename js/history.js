/**
 * HISTORY MODULE
 */
const History = {
  async load() {
    try {
      const res = await API.request('getHistory');
      if (res.success) {
        const tbody = document.getElementById('tbl-history');
        if (res.data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Belum ada history.</td></tr>';
          return;
        }

        tbody.innerHTML = res.data.map(item => `
          <tr>
            <td>${new Date(item.timestamp).toLocaleString('id-ID')}</td>
            <td><strong>${item.lokasi}</strong></td>
            <td><code>${item.barcode}</code></td>
            <td>${item.deskripsi}</td>
            <td>${item.qtyOld} → <strong>${item.qtyNew}</strong></td>
            <td><span class="badge badge-match">${item.action}</span></td>
            <td>${item.username}</td>
          </tr>
        `).join('');
      }
    } catch (e) {
      console.error(e);
    }
  }
};

