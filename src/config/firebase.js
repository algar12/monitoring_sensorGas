// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Konfigurasi Firebase berdasarkan Arduino code
const firebaseConfig = {
  databaseURL: 'https://iot-4eeae-default-rtdb.firebaseio.com/',
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan referensi database
export const database = getDatabase(app);
