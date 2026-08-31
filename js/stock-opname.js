const StockOpname = {
  currentMaster: null,
  existingInput: null,

  init() {
    const barcodeInput = document.getElementById('so-barcode');
    // Memicu pencarian ketika user menekan enter di input barcode
    barcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.lookupBarcode(); }
    });

    document.getElementById('form-stock-opname').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSave('NEW');
    });

    document.getElementById('btn-dup-add').addEventListener('click', () => {
      document.getElementById('modal-duplicate').style.display = 'none';
      this.handleSave('ADD');
    });

    document.getElementById('btn-dup-replace').addEventListener('click', () => {
      document.getElementById('modal-duplicate').style.display = 'none';
      this.handleSave('REPLACE');
    });
  },

  async lookupBarcode() {
    const barcode = document.getElementById('so-barcode').value.trim();
    const lokasi = document.getElementById('so-lokasi').value.trim();
    if (!barcode || !lokasi) {
      App.toast("Isi Lokasi dan Barcode terlebih dahulu!", "error");
      return;
    }

    try {
      // Kirim barcode beserta lokasi saat ini untuk cek duplicate di lokasi yg sama
      const res = await API.request('lookupBarcode', { barcode, lokasi });
      
      this.existingInput = res.data.existingInput;

      if (res.data.isUnknown) {
        App.toast("Data Master tidak ditemukan. Mode UNKNOWN aktif.", "warning");
      }

      this.currentMaster = res.data.master;

      document.getElementById('so-product-info').style.display = 'block';
      document.getElementById('info-deskripsi').innerText = this.currentMaster.deskripsi;
      document.getElementById('info-sku').innerText = this.currentMaster.sku;
      document.getElementById('info-kls').innerText = this.currentMaster.kls;
      document.getElementById('info-dept').innerText = this.currentMaster.departemen;
      document.getElementById('info-qty-system').innerText = this.currentMaster.qtySystem;

      document.getElementById('so-qty').disabled = false;
      document.getElementById('btn-save-so').disabled = false;
      document.getElementById('so-qty').focus();
      
    } catch (e) {
      App.toast('Koneksi terputus. Data akan disimpan offline jika dilanjutkan.', 'error');
    }
  },

  async handleSave(actionType) {
    const lokasi = document.getElementById('so-lokasi').value.trim();
    const barcode = document.getElementById('so-barcode').value.trim();
    const qty = document.getElementById('so-qty').value;

    // Hanya tampilkan popup DUPLICATE jika lokasi sebelumnya SAMA persis
    if (this.existingInput && actionType === 'NEW' && this.existingInput.lokasi === lokasi) {
      document.getElementById('dup-prev-qty').innerText = this.existingInput.qtyPrevious;
      document.getElementById('dup-prev-user').innerText = this.existingInput.username;
      document.getElementById('modal-duplicate').style.display = 'flex';
      return;
    }

    try {
      const res = await API.request('saveStockOpname', {
        lokasi, barcode, qty: Number(qty), actionType
      });

      if (res.success || res.offline) {
        App.toast(res.message, 'success');
        this.resetForm(true); // Biarkan lokasi tetap terisi
      } else {
        App.toast(res.message, 'error');
      }
    } catch (e) {
      App.toast('Gagal menyimpan.', 'error');
    }
  },

  resetForm(keepLocation = true) {
    if (!keepLocation) document.getElementById('so-lokasi').value = '';
    document.getElementById('so-barcode').value = '';
    document.getElementById('so-qty').value = '';
    document.getElementById('so-product-info').style.display = 'none';
    document.getElementById('so-qty').disabled = true;
    document.getElementById('btn-save-so').disabled = true;
    this.currentMaster = null;
    this.existingInput = null;
    document.getElementById('so-barcode').focus();
  }
};
