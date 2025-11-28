# 🛡️ Air.Guard - IoT Gas Monitoring System

**Air.Guard** adalah sistem pemantauan kualitas udara cerdas berbasis IoT yang dirancang untuk mendeteksi kebocoran gas dan asap secara real-time. Project ini menggabungkan keandalan hardware ESP8266 dengan antarmuka web modern yang futuristik ("Cyber-Industrial Style").

Sistem ini dibuat untuk meningkatkan keselamatan di lingkungan rumah, laboratorium, atau industri dengan memberikan peringatan dini visual dan data historis yang akurat.

## 🌟 Fitur Utama

- **Real-Time Monitoring**: Pemantauan kadar gas (PPM) dan status asap dengan latensi rendah menggunakan Firebase.
- **Arc Reactor Gauge**: Visualisasi meteran gas yang dinamis dan futuristik menggunakan HTML5 Canvas.
- **Smart Alert System**: Notifikasi visual instan (Aman/Waspada/Bahaya) dengan indikator warna neon.
- **Interactive History**: Grafik riwayat data interaktif untuk menganalisis tren kualitas udara dari waktu ke waktu.
- **Cyber-Industrial UI**: Antarmuka pengguna yang responsif dengan tema gelap, efek glassmorphism, dan animasi halus.
- **Multi-View Dashboard**: Navigasi mudah antara Monitor, Analytics, History, dan Settings.

## 🛠️ Teknologi

Project ini dibangun menggunakan stack teknologi modern:

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS (v4), Lucide React Icons
- **Backend**: Firebase Realtime Database
- **Data Viz**: Chart.js, React-Chartjs-2
- **Hardware (Simulated)**: ESP8266, Sensor MQ-2/MQ-135

## 🔄 Cara Kerja Sistem

1.  **Deteksi**: Sensor gas (MQ-2) mendeteksi konsentrasi gas di udara.
2.  **Transmisi**: Mikrokontroler (ESP8266) membaca data sensor dan mengirimkannya ke Firebase Realtime Database via Wi-Fi.
3.  **Sinkronisasi**: Aplikasi web (React) berlangganan (subscribe) ke perubahan data di Firebase.
4.  **Visualisasi**: Data mentah diolah menjadi status (Aman/Bahaya) dan ditampilkan dalam bentuk grafik dan meteran pada dashboard.

---

## 📁 Struktur Project

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   │   └── layout/
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── MainLayout.jsx
│   │       ├── Navbar.jsx
│   │       └── Sidebar.jsx
│   ├── config/
│   │   ├── designTokens.js
│   │   ├── firebase.js
│   │   └── gasConfig.js
│   ├── features/
│   │   ├── alerts/
│   │   │   └── components/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── history/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   └── settings/
│   │       ├── components/
│   │       └── hooks/
│   ├── hooks/
│   ├── utils/
│   │   ├── dataFilters.js
│   │   ├── exportData.js
│   │   └── gasUtils.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
└── vite.config.js
```

## 📂 Penjelasan Struktur File

Berikut adalah analisis mendalam mengenai struktur direktori dan file dalam project ini:

### 1. `src/config/` (Konfigurasi Pusat)
Direktori ini menyimpan semua konfigurasi statis agar mudah dikelola.
- **`firebase.js`**: Inisialisasi koneksi ke Firebase Realtime Database.
- **`gasConfig.js`**: "Otak" dari logika bisnis. Berisi konstanta untuk:
    - Threshold gas (Batas Aman/Waspada/Bahaya).
    - Definisi warna dan icon untuk setiap status.
    - Konfigurasi animasi chart dan meteran.
- **`designTokens.js`**: Token desain global (jika ada) untuk konsistensi UI.

### 2. `src/features/` (Fitur Modular)
Project ini menggunakan pendekatan **Feature-based Folder Structure** agar scalable.
- **`dashboard/`**: Komponen utama tampilan monitoring.
    - `components/GasMeter.jsx`: Komponen visualisasi gauge "Arc Reactor".
    - `components/SensorCard.jsx`: Kartu status sensor individual.
    - `hooks/useGasSensor.js`: Custom hook untuk real-time subscription ke Firebase.
- **`history/`**: Fitur riwayat data.
    - `components/HistoryChart.jsx`: Grafik data menggunakan Chart.js.
    - `hooks/useGasHistory.js`: Logika untuk menyimpan dan membatasi riwayat data (max 20 poin).
- **`alerts/`**: Sistem peringatan.
    - `components/AlertBanner.jsx`: Banner notifikasi yang muncul saat bahaya.
- **`settings/`**: Pengaturan aplikasi.

### 3. `src/components/` (Komponen UI Reusable)
- **`layout/`**: Struktur tata letak aplikasi.
    - `MainLayout.jsx`: Wrapper utama yang menangani background dan layout dasar.
    - `Sidebar.jsx`: Navigasi samping dengan menu Monitor, Analytics, dll.
    - `Navbar.jsx`: Bar atas untuk status sistem dan waktu.
- **`common/`**: Komponen atomik yang digunakan berulang kali.
    - `Card.jsx`: Container dasar dengan gaya glassmorphism.
    - `Button.jsx`, `Badge.jsx`: Elemen UI standar.

### 4. `src/utils/` (Fungsi Utilitas)
Fungsi bantu murni (pure functions) untuk logika pemrosesan data.
- **`gasUtils.js`**:
    - `getGasStatus(value)`: Menentukan status (Safe/Warning/Danger) berdasarkan nilai sensor.
    - `formatTimestamp(date)`: Memformat waktu untuk tampilan chart.
- **`exportData.js`**: Logika untuk export data ke PDF/Excel.
- **`dataFilters.js`**: Fungsi filtering data berdasarkan rentang waktu.

### 5. `src/` (Root Files)
- **`App.jsx`**: Komponen akar yang mengatur:
    - State global aplikasi (navigasi, data sensor).
    - Routing logika (menampilkan view Dashboard vs Analytics).
- **`index.css`**: Entry point untuk Tailwind CSS dan definisi variabel tema (`@theme`).
- **`main.jsx`**: Titik masuk React ke DOM.

## �🔧 Konfigurasi

### Firebase

### Firebase

Edit `src/config/firebase.js` untuk mengubah database URL jika diperlukan.

### Threshold Gas

Edit `src/config/gasConfig.js` untuk mengubah batas:

- Aman: < 300 PPM
- Waspada: 300-600 PPM
- Bahaya: > 600 PPM

## 🌐 Deployment

```bash
npm run build
```

Deploy folder `dist/` ke hosting pilihan Anda (Firebase Hosting, Vercel, Netlify, dll).



**Developed with ❤️ using React.js, TailwindCSS, and Firebase**
