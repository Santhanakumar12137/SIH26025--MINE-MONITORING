export const WOKWI_DIAGRAM_JSON = `{
  "version": 1,
  "author": "Mine Safety Systems",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-esp32-devkit-v1", "id": "esp", "top": 120, "left": 180, "attrs": {} },
    { "type": "wokwi-dht22", "id": "dht22", "top": -80, "left": 60, "attrs": { "temperature": "24.5", "humidity": "65" } },
    { "type": "wokwi-potentiometer", "id": "pot_gas", "top": -80, "left": 280, "attrs": { "label": "Gas (CH4/CO) GPIO34" } },
    { "type": "wokwi-potentiometer", "id": "pot_disp", "top": -80, "left": 460, "attrs": { "label": "Displacement GPIO35" } },
    { "type": "wokwi-bmp280", "id": "bmp280", "top": 240, "left": -70, "attrs": { "i2cAddress": "0x76" } },
    { "type": "wokwi-mpu6050", "id": "mpu6050", "top": 360, "left": -70, "attrs": {} },
    { "type": "wokwi-buzzer", "id": "buzzer", "top": 120, "left": 480, "attrs": { "volume": "0.8" } },
    { "type": "wokwi-resistor", "id": "r_pullup", "top": 0, "left": 130, "attrs": { "resistance": "10000" } }
  ],
  "connections": [
    [ "esp:3V3", "dht22:VCC", "red", [ "v-30", "h-110" ] ],
    [ "esp:GND.1", "dht22:GND", "black", [ "v-40", "h-130" ] ],
    [ "esp:4", "dht22:SDA", "green", [ "v-20", "h-80" ] ],
    [ "esp:3V3", "r_pullup:1", "red", [ "v-30", "h-20" ] ],
    [ "esp:4", "r_pullup:2", "green", [ "v-20", "h-10" ] ],

    [ "esp:3V3", "pot_gas:VCC", "red", [ "v-30", "h70" ] ],
    [ "esp:GND.1", "pot_gas:GND", "black", [ "v-40", "h90" ] ],
    [ "esp:34", "pot_gas:SIG", "orange", [ "v-15", "h40" ] ],

    [ "esp:3V3", "pot_disp:VCC", "red", [ "v-30", "h240" ] ],
    [ "esp:GND.1", "pot_disp:GND", "black", [ "v-40", "h260" ] ],
    [ "esp:35", "pot_disp:SIG", "blue", [ "v-15", "h210" ] ],

    [ "esp:3V3", "bmp280:VCC", "red", [ "h-80", "v80" ] ],
    [ "esp:GND.2", "bmp280:GND", "black", [ "h-90", "v90" ] ],
    [ "esp:21", "bmp280:SDA", "yellow", [ "h-100", "v100" ] ],
    [ "esp:22", "bmp280:SCL", "cyan", [ "h-110", "v110" ] ],

    [ "esp:3V3", "mpu6050:VCC", "red", [ "h-80", "v200" ] ],
    [ "esp:GND.2", "mpu6050:GND", "black", [ "h-90", "v210" ] ],
    [ "esp:21", "mpu6050:SDA", "yellow", [ "h-100", "v220" ] ],
    [ "esp:22", "mpu6050:SCL", "cyan", [ "h-110", "v230" ] ],

    [ "esp:25", "buzzer:1", "purple", [ "h120", "v-10" ] ],
    [ "esp:GND.3", "buzzer:2", "black", [ "h130", "v10" ] ]
  ],
  "dependencies": {}
}`;

export const WOKWI_SKETCH_INO = `/**
 * Underground Mine Subsidence Early Warning System - ESP32 Core
 * 
 * Hardware Pinout:
 *  - DHT22 (Temp & Humidity): GPIO 4 (10k pull-up to 3.3V)
 *  - Gas Potentiometer (CH4 / CO simulation): GPIO 34 (ADC1_CH6)
 *  - Displacement Potentiometer (Mine Roof Sag): GPIO 35 (ADC1_CH7)
 *  - BMP280 Barometric Pressure: I2C SDA GPIO 21, SCL GPIO 22 (0x76)
 *  - MPU6050 Strain/Tilt/Vibration: I2C SDA GPIO 21, SCL GPIO 22 (0x68)
 *  - Piezo Buzzer (Instant Local Alarm): GPIO 25
 * 
 * Core Logic:
 *  1. Read all sensors
 *  2. Filter data (Moving Average Filter)
 *  3. Calculate Displacement -> Velocity (v = delta_d / delta_t)
 *  4. Calculate Velocity -> Inverse Velocity (1 / v) [Fukuzono Slope Failure Method]
 *  5. Local threshold check -> Trigger GPIO25 Buzzer immediately if critical
 *  6. Format LoRa telemetry packet for Gateway transmission
 */

#include <Wire.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_MPU6050.h>

// Pin Definitions
#define PIN_DHT22       4
#define PIN_GAS_ADC     34
#define PIN_DISP_ADC    35
#define PIN_I2C_SDA     21
#define PIN_I2C_SCL     22
#define PIN_BUZZER      25

// Sensor Objects
#define DHTTYPE DHT22
DHT dht(PIN_DHT22, DHTTYPE);
Adafruit_BMP280 bmp;
Adafruit_MPU6050 mpu;

// Safety Thresholds
#define THRESHOLD_GAS_PPM         500.0   // High flammable/toxic gas limit
#define THRESHOLD_DISP_MM          35.0   // Roof sag threshold
#define THRESHOLD_VELOCITY_MM_H    15.0   // Rapid acceleration limit
#define THRESHOLD_INV_VELOCITY      0.1   // 1/v approaching 0 indicates imminent collapse!
#define THRESHOLD_TILT_DEG         12.0   // Structural pillar tilt limit

// Moving Average Filter Buffer
const int FILTER_SAMPLES = 5;
float gasSamples[FILTER_SAMPLES] = {0};
float dispSamples[FILTER_SAMPLES] = {0};
int filterIndex = 0;

// Velocity Tracking (Fukuzono Method)
float prevDisplacement = 0.0;
unsigned long prevTimeMs = 0;

// LoRa Packet Counter
uint32_t packetSequence = 0;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("=================================================="));
  Serial.println(F("UNDERGROUND MINE SUBSIDENCE EARLY WARNING SYSTEM"));
  Serial.println(F("ESP32 Sensor Core Node Initializing..."));
  Serial.println(F("=================================================="));

  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_BUZZER, LOW);
  pinMode(PIN_GAS_ADC, INPUT);
  pinMode(PIN_DISP_ADC, INPUT);

  // Initialize I2C bus
  Wire.begin(PIN_I2C_SDA, PIN_I2C_SCL);

  // Init DHT22
  dht.begin();
  Serial.println(F("[OK] DHT22 on GPIO4 ready"));

  // Init BMP280
  if (!bmp.begin(0x76)) {
    Serial.println(F("[WARN] BMP280 not detected at 0x76, checking 0x77..."));
    if (!bmp.begin(0x77)) {
      Serial.println(F("[FAIL] BMP280 not found!"));
    }
  } else {
    Serial.println(F("[OK] BMP280 I2C (0x76) ready"));
  }

  // Init MPU6050
  if (!mpu.begin(0x68)) {
    Serial.println(F("[FAIL] MPU6050 not detected at 0x68"));
  } else {
    mpu.setAccelerometerRange(MPU6050_RANGE_4_G);
    mpu.setGyroRange(MPU6050_RANGE_500_DEG);
    mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
    Serial.println(F("[OK] MPU6050 6-DoF I2C (0x68) ready"));
  }

  // Quick buzzer self-test beep
  tone(PIN_BUZZER, 2000, 100);
  prevTimeMs = millis();
}

// Function to compute moving average
float computeAverage(float *buffer, int size) {
  float sum = 0;
  for (int i = 0; i < size; i++) sum += buffer[i];
  return sum / size;
}

void loop() {
  unsigned long currentTime = millis();
  float dt_hours = (currentTime - prevTimeMs) / 3600000.0;
  if (dt_hours <= 0) dt_hours = 0.0001; // Avoid divide by zero

  // 1. READ ALL SENSORS
  int rawGasAdc = analogRead(PIN_GAS_ADC);
  int rawDispAdc = analogRead(PIN_DISP_ADC);

  // Convert ADC values (0-4095)
  // Gas scale: 0 to 1000 PPM
  float rawGasPpm = (rawGasAdc / 4095.0) * 1000.0;
  // Displacement scale: 0 to 50 mm
  float rawDispMm = (rawDispAdc / 4095.0) * 50.0;

  // 2. FILTER DATA (Moving Average)
  gasSamples[filterIndex] = rawGasPpm;
  dispSamples[filterIndex] = rawDispMm;
  filterIndex = (filterIndex + 1) % FILTER_SAMPLES;

  float filteredGasPpm = computeAverage(gasSamples, FILTER_SAMPLES);
  float filteredDispMm = computeAverage(dispSamples, FILTER_SAMPLES);

  // Read DHT22
  float tempC = dht.readTemperature();
  float humid = dht.readHumidity();
  if (isnan(tempC)) tempC = 24.5;
  if (isnan(humid)) humid = 60.0;

  // Read BMP280
  float pressureHpa = bmp.readPressure() / 100.0F;
  if (isnan(pressureHpa) || pressureHpa < 500) pressureHpa = 1013.25;

  // Read MPU6050
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  float tiltDeg = atan2(a.acceleration.y, sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.z * a.acceleration.z)) * 180.0 / PI;
  float vibrationG = sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.y * a.acceleration.y + a.acceleration.z * a.acceleration.z) / 9.80665;

  // 3. DISPLACEMENT -> VELOCITY (v = delta_d / delta_t)
  float deltaDisp = filteredDispMm - prevDisplacement;
  // For simulated loop cadence (~1 sec), scale to mm/hour for mining standard
  float velocityMmH = abs(deltaDisp) / dt_hours;

  // 4. VELOCITY -> 1/VELOCITY (Fukuzono Inverse Velocity method)
  float invVelocity = (velocityMmH > 0.05) ? (1.0 / velocityMmH) : 99.99;

  prevDisplacement = filteredDispMm;
  prevTimeMs = currentTime;

  // 5. LOCAL THRESHOLD CHECK (Zero-latency instant safety)
  bool gasAlarm = (filteredGasPpm >= THRESHOLD_GAS_PPM);
  bool dispAlarm = (filteredDispMm >= THRESHOLD_DISP_MM);
  bool collapseAlarm = (invVelocity < THRESHOLD_INV_VELOCITY && filteredDispMm > 10.0);
  bool tiltAlarm = (abs(tiltDeg) >= THRESHOLD_TILT_DEG);

  bool instantAlarmActive = (gasAlarm || dispAlarm || collapseAlarm || tiltAlarm);

  if (instantAlarmActive) {
    // Sound high-pitch intermittent alarm on GPIO25
    tone(PIN_BUZZER, 2600);
    Serial.println(F(">>> [CRITICAL ALARM] LOCAL THRESHOLD EXCEEDED! BUZZER TRIGGERED! <<<"));
  } else {
    noTone(PIN_BUZZER);
  }

  // 6. TRANSMIT TELEMETRY VIA LoRa (Simulated LoRa payload output)
  packetSequence++;
  Serial.print(F("[LORA TX #"));
  Serial.print(packetSequence);
  Serial.print(F("] Gas="));
  Serial.print(filteredGasPpm, 1);
  Serial.print(F("ppm | Disp="));
  Serial.print(filteredDispMm, 2);
  Serial.print(F("mm | v="));
  Serial.print(velocityMmH, 2);
  Serial.print(F("mm/h | 1/v="));
  Serial.print(invVelocity, 3);
  Serial.print(F(" | Temp="));
  Serial.print(tempC, 1);
  Serial.print(F("C | Hum="));
  Serial.print(humid, 1);
  Serial.print(F("% | Pres="));
  Serial.print(pressureHpa, 1);
  Serial.print(F("hPa | Tilt="));
  Serial.print(tiltDeg, 1);
  Serial.print(F("deg | Buzzer="));
  Serial.println(instantAlarmActive ? F("ON") : F("OFF"));

  delay(1000); // 1-second telemetry interval
}
`;
