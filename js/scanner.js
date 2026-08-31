/**
 * BARCODE CAMERA SCANNER MODULE
 */
const Scanner = {
  html5QrcodeScanner: null,

  init() {
    const btn = document.getElementById('btn-open-scanner');
    if (btn) {
      btn.addEventListener('click', () => this.openScanner());
    }
  },

  openScanner() {
    document.getElementById('modal-scanner').style.display = 'flex';
    this.html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 150 } }, false);
    
    this.html5QrcodeScanner.render((decodedText) => {
      document.getElementById('so-barcode').value = decodedText;
      this.closeScanner();
      StockOpname.lookupBarcode();
    }, (errorMessage) => {
      // Scanning Errors ignored
    });
  },

  closeScanner() {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.clear().catch(e => console.error(e));
    }
    document.getElementById('modal-scanner').style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', () => Scanner.init());
