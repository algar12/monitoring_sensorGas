#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>

// Konfigurasi WiFi
#define WIFI_SSID "IPK1"
#define WIFI_PASSWORD "psdankopi1"

// Konfigurasi Firebase
#define DATABASE_URL "https://iot-4eeae-default-rtdb.firebaseio.com/"  // Ganti sesuai URL kamu
#define DATABASE_SECRET "LwRrvUD1WwcPh1gGKPJtTC86oWCNtgJD3cK2C3i3"         // Database Secret (Legacy Token)

// Objek Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Pin sensor gas
const int gasPin = A0;
const int smokePin = D0; // Pin digital untuk sensor asap

void setup() {
  Serial.begin(115200);
  pinMode(gasPin, INPUT);
  pinMode(smokePin, INPUT);

  // ===========================
  // Koneksi ke WiFi
  // ===========================
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Menghubungkan ke WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.println("WiFi Terhubung!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // ===========================
  // Konfigurasi Firebase
  // ===========================
  config.database_url = DATABASE_URL;

  // Gunakan Legacy Token (Database Secret)
  config.signer.tokens.legacy_token = DATABASE_SECRET;

  // Inisialisasi Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("Firebase siap!");
}

void loop() {
  int gasValue = analogRead(gasPin);
  int smokeValue = digitalRead(smokePin); // 0 = Ada Asap (biasanya active low), 1 = Aman. Sesuaikan dengan sensor.
  // Asumsi sensor MQ-2 module digital output: LOW saat terdeteksi gas/asap, HIGH saat aman.
  // Kita balik logikanya biar enak: 1 = Ada Asap, 0 = Aman
  int isSmokeDetected = (smokeValue == LOW) ? 1 : 0; 

  Serial.print("Nilai Gas: ");
  Serial.print(gasValue);
  Serial.print(" | Asap: ");
  Serial.println(isSmokeDetected == 1 ? "TERDETEKSI" : "AMAN");

  // Kirim nilai ke Firebase (Update parent node biar sekalian)
  FirebaseJson json;
  json.set("nilai", gasValue);
  json.set("asap", isSmokeDetected);

  if (Firebase.RTDB.updateNode(&fbdo, "sensor_gas", &json)) {
    Serial.println("✅ Data terkirim ke Firebase");
  } else {
    Serial.print("❌ Gagal kirim: ");
    Serial.println(fbdo.errorReason());
  }

  delay(2000); // kirim tiap 2 detik
}
