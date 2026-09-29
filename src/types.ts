export interface SensorData {
  gasAdc: number; // GPIO34: 0-4095
  gasPpm: number; // Calculated PPM (CH4 / CO)
  dispAdc: number; // GPIO35: 0-4095
  dispMm: number; // Calculated displacement in mm
  tempC: number; // DHT22 GPIO4
  humidity: number; // DHT22 GPIO4
  pressureHpa: number; // BMP280 I2C 0x76 (SDA 21, SCL 22)
  tiltDeg: number; // MPU6050 I2C 0x68 (pitch/roll angle)
  vibrationG: number; // MPU6050 accelerometer vector magnitude
  velocityMmHr: number; // v = d(disp)/dt (mm/hour)
  invVelocity: number; // 1/v (hours/mm) for Fukuzono slope failure prediction
  buzzerActive: boolean; // GPIO25 state
  alarmState: 'NORMAL' | 'WARNING' | 'CRITICAL';
  alarmReason: string;
}

export interface FlowchartNode {
  id: string;
  stepNumber?: number;
  title: string;
  subtitle?: string;
  category: 'source' | 'sensor' | 'core' | 'alarm' | 'comm' | 'gateway' | 'server' | 'ai' | 'gis' | 'action';
  bgClass: string;
  borderClass: string;
  textClass: string;
  accentClass: string;
  tagClass: string;
  icon: string;
  bullets?: string[];
  subSensors?: {
    id: string;
    label: string;
    sensorModel: string;
    gpio?: string;
    icon: string;
    color: string;
    bgColor: string;
    unit: string;
  }[];
  wokwiPins?: string;
  techDetails?: {
    overview: string;
    samplingRate: string;
    protocol: string;
    equation?: string;
    criticalThreshold: string;
  };
}

export type ViewMode = 'infographic' | 'hardware-lab' | 'ai-gis' | 'wokwi-code';
