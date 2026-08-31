const Dashboard = {
  chartInstance: null,

  async load() {
    try {
      const res = await API.request('getDashboard');
      if (res.success) {
        const { metrics, locationSummary } = res.data;
        
        // Render Lokasi yang ADA datanya saja
        const tbody = document.getElementById('tbl-location-summary');
        const activeLocations = locationSummary.filter(loc => loc.total > 0 || loc.counted > 0);
        
        if (activeLocations.length === 0) {
          tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Belum ada aktifitas lokasi.</td></tr>';
        } else {
          tbody.innerHTML = activeLocations.map(loc => `
            <tr>
              <td><strong>${loc.lokasi}</strong></td>
              <td>${loc.total}</td>
              <td style="color:var(--accent-blue); font-weight:700;">${loc.counted}</td>
              <td style="color:var(--text-muted);">${loc.uncounted}</td>
            </tr>
          `).join('');
        }

        // Render Chart.js
        this.renderChart(metrics.counted, metrics.uncounted);
      }
    } catch (e) { console.error(e); }
  },

  renderChart(counted, uncounted) {
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    if (this.chartInstance) this.chartInstance.destroy(); // Reset jika chart sudah ada

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Sudah Dihitung', 'Belum Dihitung'],
        datasets: [{
          data: [counted, uncounted],
          backgroundColor: ['#007aff', '#e5e5ea'],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
  }
};
