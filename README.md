# STOCK OPNAME MANDIRI — ENTERPRISE WEB APP & PWA

Aplikasi Stock Opname Mandiri Enterprise modern, profesional, responsive, dan ringan. Dikembangkan dengan arsitektur **HTML5 + CSS3 + Vanilla JavaScript (PWA)** pada Frontend dan **Google Sheets + Google Apps Script** sebagai Database & Backend API Serverless.

---

## 🛠️ FITUR UNGGULAN

1. **Enterprise Modern UI/UX**:
   - Inspirasi gabungan iOS Modern, Android Material 3, Glassmorphism, & Dark/Light mode.
   - Mobile-First Bottom Navigation & Desktop Sidebar Navigation.
   - Keyboard Shortcuts bawaan (`F2` Focus Barcode, `F4` Focus Qty, `Ctrl+Enter` Save).

2. **Automated Stock Opname Core**:
   - Auto-lookup Data Master instant via Barcode.
   - Kamera Barcode Scanner bawaan browser (HP/Tablet).
   - Penanganan Artikel Duplikat (**ADD** / **REPLACE** modal confirmation).
   - Mode Blind Count / Sembunyikan Qty System untuk Operator (Setting Admin).
   - Penentuan otomatis status **PLUS (+)**, **MINUS (-)**, dan **MATCH (SESUAI)**.

3. **Multi-User & Role Security**:
   - Otentikasi aman via Google Apps Script (Password Hashing SHA-256).
   - Pembedaan Akses (**ADMIN** vs **OPERATOR**).
   - Immutable Audit System Logs untuk setiap tindakan kritis.

4. **Progressive Web App (PWA)**:
   - Dukungan `manifest.json` & `service-worker.js`.
   - Dapat di-install langsung ke Home Screen HP Android/iOS ("Add to Home Screen").

---

## 🚀 PANDUAN INSTALASI LANGSUNG (STEP-BY-STEP)

### STEP 1: Buat Google Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com) dan buat Spreadsheet baru.
2. Beri nama spreadsheet, contoh: `DATABASE_STOCK_OPNAME_MANDIRI`.

### STEP 2: Pasang Backend Google Apps Script
1. Pada Google Spreadsheet, klik menu **Extensions (Ekstensi)** → **Apps Script**.
2. Hapus kode bawaan `myFunction()`.
3. Buat file-file `.gs` berikut di Apps Script editor dan salin kode dari folder `gas/`:
   - `Code.gs`
   - `Config.gs`
   - `Utils.gs`
   - `Auth.gs`
   - `StockOpname.gs`
   - `Dashboard.gs`
   - `Users.gs`
   - `Settings.gs`
   - `Logs.gs`
   - `DataMaster.gs`

### STEP 3: Jalankan Automatic Spreadsheet Setup
1. Pada Apps Script Editor, pilih fungsi **`setupSpreadsheet`** pada dropdown fungsi di bagian atas.
2. Klik tombol **Run (Jalankan)**.
3. Otentikasi izin akses Google Sheet jika diminta.
4. Fungsi ini akan secara otomatis membuat 10 Sheet database (`DATA_MASTER`, `DATA_INPUT`, `HISTORY`, `USERS`, `SETTINGS`, `LOCATIONS`, dll) lengkap dengan header dan data dummy awal untuk testing.

### STEP 4: Deploy Google Apps Script sebagai Web App API
1. Klik tombol **Deploy** di kanan atas → **New deployment**.
2. Klik ikon gerigi ⚙️ pada *Select type* → pilih **Web app**.
3. Isi konfigurasi:
   - **Description**: `Stock Opname API v1`
   - **Execute as**: `Me (email anda)`
   - **Who has access**: **`Anyone`** *(Sangat penting agar Frontend dapat mengakses API)*
4. Klik **Deploy**.
5. Salin URL **Web App URL** yang dihasilkan (format: `https://script.google.com/macros/s/.../exec`).

### STEP 5: Hubungkan Frontend ke Web App API
1. Buka file `js/config.js` pada project Frontend.
2. Ganti nilai `API_URL` dengan URL yang disalin pada STEP 4:
   ```javascript
   const CONFIG = {
     API_URL: "https://script.google.com/macros/s/AKfycbx.../exec",
     APP_NAME: "STOCK OPNAME MANDIRI"
   };
   ```

### STEP 6: Hosting Frontend di GitHub Pages (Gratis)
1. Buat Repository baru di GitHub.
2. Upload seluruh file Frontend (`index.html`, `manifest.json`, `service-worker.js`, folder `css/`, `js/`, `assets/`).
3. Buka **Settings** repository → **Pages**.
4. Pada bagian *Build and deployment*, pilih **Branch: main** dan folder **/(root)**.
5. Klik **Save**. Dalam 1-2 menit, GitHub Pages akan memberikan URL website Anda!

---

## 🔑 AKUN LOGIN DEFAULT (UNTUK TESTING)

- **Role Admin**:
  - Username: `admin`
  - Password: `admin`
- **Role Operator**:
  - Username: `operator01`
  - Password: `operator123`

---

## 📱 CONTOH DATA MASTER BARCODE TEST

- `899100000001` (Minyak Goreng 2L)
- `899100000002` (Gula Pasir 1kg)
- `899100000003` (Sabun Cuci Piring)
- `899100000004` (Mie Instan)
- `899100000005` (Susu UHT 1L)

---
© 2026 Stock Opname Mandiri Enterprise Application.
