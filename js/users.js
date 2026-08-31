/**
 * USER MANAGEMENT MODULE
 */
const Users = {
  async load() {
    try {
      const res = await API.request('getUsers');
      if (res.success) {
        const tbody = document.getElementById('tbl-users');
        tbody.innerHTML = res.data.map(u => `
          <tr>
            <td><strong>${u.username}</strong></td>
            <td>${u.nama}</td>
            <td><span class="badge badge-match">${u.role}</span></td>
            <td><span class="badge ${u.status==='ACTIVE'?'badge-plus':'badge-minus'}">${u.status}</span></td>
            <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleString('id-ID') : '-'}</td>
          </tr>
        `).join('');
      }
    } catch (e) { console.error(e); }
  }
};
