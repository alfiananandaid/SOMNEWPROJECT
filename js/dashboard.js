/**
 * DASHBOARD MODULE
 */
const Dashboard = {
  async load() {
    try {
      const res = await API.request('getDashboard');
      if (res.success) {
        const { metrics, locationSummary } = res.data;
        document.getElementById('dash-total-sku').innerText = metrics.totalItem.toLocaleString();
        document.getElementById('dash-counted').innerText = metrics.counted.toLocaleString();
        document.getElementById('dash-uncounted').innerText = metrics.uncounted.toLocaleString();
        document.getElementById('dash-plus').innerText = metrics.plus.toLocaleString();
        document.getElementById('dash-minus').innerText = metrics.minus.toLocaleString();
        document.getElementById('dash-match').innerText = metrics.match.toLocaleString();
        document.getElementById('dash-progress-pct').innerText = `${metrics.progress}% Progress`;

        // Render Location Table
        const tbody = document.getElementById('tbl-location-summary');
        if (locationSummary.length === 0) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Belum ada data lokasi.</td></tr>';
          return;
        }

        tbody.innerHTML = locationSummary.map(loc => `
          <tr>
            <td><strong>${loc.lokasi}</strong></td>
            <td>${loc.total}</td>
            <td style="color:var(--accent-blue); font-weight:700;">${loc.counted}</td>
            <td style="color:var(--accent-amber);">${loc.uncounted}</td>
            <td style="color:var(--accent-green);">${loc.plus}</td>
            <td style="color:var(--accent-red);">${loc.minus}</td>
            <td>${loc.match}</td>
          </tr>
        `).join('');
      }
    } catch (e) {
      console.error(e);
    }
  }
};
