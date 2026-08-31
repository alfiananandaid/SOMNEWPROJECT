/**
 * STOCK OPNAME MODULE
 */
const StockOpname = {
  currentMaster: null,
  existingInput: null,

  init() {
    const barcodeInput = document.getElementById('so-barcode');
    barcodeInput.addEventListener('change', () => this.lookupBarcode());

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
    if (!barcode) return;

    try {
      const res = await API.request('lookupBarcode', { barcode });
      if (res.success) {
        this.currentMaster = res.data.master;
        this.existingInput = res.data.existingInput;

        // Display Product Info
        document.getElementById('so-product-info').style.display = 'block';
        document.getElementById('info-deskripsi').innerText = this.currentMaster.deskripsi;
        document.getElementById('info-sku').innerText = this.currentMaster.sku;
        document.getElementById('info-kls').innerText = this.currentMaster.kls;
        document.getElementById('info-dept').innerText = this.currentMaster.departemen;
        document.getElementById('info-vendor').innerText = this.currentMaster.vendor;
        document.getElementById('info-qty-system').innerText = this.currentMaster.qtySystem;

        // Enable inputs
        document.getElementById('so-qty').disabled = false;
        document.getElementById('so-note').disabled = false;
        document.getElementById('btn-save-so').disabled = false;

        document.getElementById('so-qty').focus();
      } else {
        App.toast(res.message, 'error');
        this.resetForm(false);
      }
    } catch (e) {
      App.toast('Gagal lookup barcode.', 'error');
    }
  },

  async handleSave(actionType) {
    const lokasi = document.getElementById('so-lokasi').value;
    const barcode = document.getElementById('so-barcode').value.trim();
    const qty = document.getElementById('so-qty').value;
    const note = document.getElementById('so-note').value;

    if (this.existingInput && actionType === 'NEW') {
      // Prompt modal duplicate choice
      document.getElementById('dup-prev-qty').innerText = this.existingInput.qtyPrevious;
      document.getElementById('dup-prev-user').innerText = this.existingInput.username;
      document.getElementById('modal-duplicate').style.display = 'flex';
      return;
    }

    try {
      const res = await API.request('saveStockOpname', {
        lokasi, barcode, qty: Number(qty), note, actionType
      });

      if (res.success) {
        App.toast(res.message, 'success');
        this.resetForm(true);
      } else {
        App.toast(res.message, 'error');
      }
    } catch (e) {
      App.toast('Gagal menyimpan stock opname.', 'error');
    }
  },

  resetForm(keepLocation = true) {
    if (!keepLocation) document.getElementById('so-lokasi').value = '';
    document.getElementById('so-barcode').value = '';
    document.getElementById('so-qty').value = '';
    document.getElementById('so-note').value = '';
    document.getElementById('so-product-info').style.display = 'none';

    document.getElementById('so-qty').disabled = true;
    document.getElementById('so-note').disabled = true;
    document.getElementById('btn-save-so').disabled = true;

    this.currentMaster = null;
    this.existingInput = null;

    document.getElementById('so-barcode').focus();
  }
};

document.addEventListener('DOMContentLoaded', () => StockOpname.init());
