import { FlowchartNode } from '../types';

export const FLOWCHART_NODES: FlowchartNode[] = [
  {
    id: 'underground-mine',
    stepNumber: 1,
    title: 'UNDERGROUND MINE',
    subtitle: 'Active Subsurface Working Faces & Gallery Strata',
    category: 'source',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-300',
    textClass: 'text-sky-950',
    accentClass: 'bg-sky-600',
    tagClass: 'text-sky-700 bg-sky-100 border border-sky-200',
    icon: 'mine-tunnel',
    bullets: [
      'Subsurface excavation gallery (depth: 200m – 800m)',
      'Coal / Ore seam extraction inducing stress redistribution',
      'Overburden strata flexing and micro-fracture accumulation'
    ],
    techDetails: {
      overview: 'The primary physical monitoring environment where mining excavation triggers stress redistribution across overburden rock layers. Roof strata sag and pillar compression are the earliest physical precursors to dangerous ground subsidence.',
      samplingRate: 'Continuous continuous geomechanical strata response',
      protocol: 'In-situ physical phenomena',
      criticalThreshold: 'Roof sag rate > 5 mm/hr or explosive gas accumulation'
    }
  },
  {
    id: 'sensors',
    stepNumber: 2,
    title: 'SENSORS',
    subtitle: '7 Multi-Parameter Geotechnical & Atmospheric Sensor Array',
    category: 'sensor',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
    textClass: 'text-emerald-950',
    accentClass: 'bg-emerald-600',
    tagClass: 'text-emerald-700 bg-emerald-100 border border-emerald-200',
    icon: 'sensor-array',
    subSensors: [
      {
        id: 'gas',
        label: 'Gas (CH4, CO)',
        sensorModel: 'MQ-4 / MQ-7 / Pot',
        gpio: 'GPIO 34 (ADC1_CH6)',
        icon: 'gas-tank',
        color: '#0284c7',
        bgColor: '#e0f2fe',
        unit: 'PPM'
      },
      {
        id: 'temp',
        label: 'Temp',
        sensorModel: 'DHT11 / DHT22',
        gpio: 'GPIO 4',
        icon: 'thermometer',
        color: '#dc2626',
        bgColor: '#fee2e2',
        unit: '°C'
      },
      {
        id: 'pressure',
        label: 'Pressure',
        sensorModel: 'BMP280',
        gpio: 'I2C (SDA 21, SCL 22)',
        icon: 'pressure-gauge',
        color: '#0891b2',
        bgColor: '#cffafe',
        unit: 'hPa'
      },
      {
        id: 'humid',
        label: 'Humid',
        sensorModel: 'DHT11 / DHT22',
        gpio: 'GPIO 4',
        icon: 'water-drops',
        color: '#2563eb',
        bgColor: '#dbeafe',
        unit: '% RH'
      },
      {
        id: 'strain',
        label: 'Strain',
        sensorModel: 'MPU6050',
        gpio: 'I2C (SDA 21, SCL 22)',
        icon: 'strain-chip',
        color: '#d97706',
        bgColor: '#fef3c7',
        unit: 'με'
      },
      {
        id: 'tilt',
        label: 'Tilt / Disp',
        sensorModel: 'MPU6050 / Pot',
        gpio: 'GPIO 35 + I2C 21/22',
        icon: 'tilt-arrows',
        color: '#0284c7',
        bgColor: '#e0f2fe',
        unit: 'deg / mm'
      },
      {
        id: 'vibration',
        label: 'Vibration',
        sensorModel: 'Accelerometer (MPU)',
        gpio: 'I2C (SDA 21, SCL 22)',
        icon: 'waveform',
        color: '#7c3aed',
        bgColor: '#ede9fe',
        unit: 'g / Hz'
      }
    ],
    techDetails: {
      overview: 'Robust multi-sensor cluster monitoring both atmospheric parameters (explosive methane, toxic carbon monoxide, ambient barometric pressure drop preceding rockbursts) and geotechnical movement (roof displacement, pillar tilt angles, micro-vibrations).',
      samplingRate: '10 Hz raw acquisition; 1 Hz averaged report',
      protocol: 'Analog ADC (12-bit) & I2C Bus @ 400kHz',
      criticalThreshold: 'CH4 > 1.25%, CO > 50 ppm, Displacement > 35 mm, Tilt > 12°'
    }
  },
  {
    id: 'esp32-core',
    stepNumber: 3,
    title: 'ESP32 (CORE)',
    subtitle: 'Ultra-Low Power Dual-Core Subsurface Telemetry Node',
    category: 'core',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-300',
    textClass: 'text-purple-950',
    accentClass: 'bg-purple-600',
    tagClass: 'text-purple-700 bg-purple-100 border border-purple-200',
    icon: 'esp32-board',
    wokwiPins: 'DHT22: GPIO4 | Gas: GPIO34 | Disp: GPIO35 | I2C: 21,22 | Buzzer: GPIO25',
    bullets: [
      'Read all sensors',
      'Filter data (avg)',
      'Displacement → Velocity',
      'Velocity → 1/Velocity',
      'Local threshold check'
    ],
    techDetails: {
      overview: 'Industrial ESP32 dual-core Xtensa LX6 microprocessor executing low-latency edge edge-intelligence. It filters analog noise via moving average buffers, derives displacement velocity, calculates the inverse velocity (1/v) metric for instant local fail-safe reaction, and packages payloads for LoRa transmission.',
      samplingRate: 'Edge processing cycle: 1000ms loop with sub-millisecond interrupt safety',
      protocol: 'Internal I2C/ADC bus + SPI LoRa transceiving',
      equation: 'v = Δd / Δt;   Inv_v = 1.0 / v',
      criticalThreshold: 'Sub-millisecond fail-safe trigger threshold logic'
    }
  },
  {
    id: 'buzzer-alarm',
    stepNumber: 4,
    title: 'BUZZER (Instant Alarm)',
    subtitle: 'Direct In-Tunnel Audible & Visual Evacuation Sounder',
    category: 'alarm',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-300',
    textClass: 'text-rose-950',
    accentClass: 'bg-rose-600',
    tagClass: 'text-rose-700 bg-rose-100 border border-rose-200',
    icon: 'siren',
    wokwiPins: 'GPIO 25 (High-Output Piezo / Strobe)',
    bullets: [
      'Zero-latency edge actuation (< 5ms)',
      '110 dB high-penetration acoustic warning',
      'Strobe beacon trigger for miners in face zone'
    ],
    techDetails: {
      overview: 'Directly wired to ESP32 GPIO25. Even if underground cables or wireless telemetry are severed by seismic tremors or collapse, the in-situ buzzer sounds immediately when displacement accelerates beyond critical safety limits.',
      samplingRate: 'Hardware immediate toggle (no network dependency)',
      protocol: 'GPIO PWM / Digital HIGH active output',
      criticalThreshold: 'Immediate local trigger on gas > 500ppm, tilt > 12°, or 1/v < 0.1'
    }
  },
  {
    id: 'lora-send',
    stepNumber: 4,
    title: 'LoRa Send data',
    subtitle: 'Long-Range Subsurface-to-Surface RF Uplink',
    category: 'comm',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-300',
    textClass: 'text-blue-950',
    accentClass: 'bg-blue-600',
    tagClass: 'text-blue-700 bg-blue-100 border border-blue-200',
    icon: 'lora-module',
    bullets: [
      'Sub-GHz LoRa modulation (868 / 915 MHz)',
      'Long-distance tunnel waveguide propagation',
      'AES-128 encrypted sensor payload packets'
    ],
    techDetails: {
      overview: 'SX1276 / SX1262 LoRa spread-spectrum transceiver module capable of penetrating curved underground drifts and multi-level boreholes with high link budget (+168 dB).',
      samplingRate: '1 packet per 1–5 seconds (adaptive on anomaly event)',
      protocol: 'LoRaWAN Class A / P2P LoRa',
      criticalThreshold: 'RSSI > -120 dBm, SNR > -10 dB'
    }
  },
  {
    id: 'gateway',
    stepNumber: 5,
    title: 'GATEWAY',
    subtitle: 'Mine Shaft / Surface LoRaWAN Concentrator Station',
    category: 'gateway',
    bgClass: 'bg-teal-50',
    borderClass: 'border-teal-300',
    textClass: 'text-teal-950',
    accentClass: 'bg-teal-600',
    tagClass: 'text-teal-700 bg-teal-100 border border-teal-200',
    icon: 'antenna-gateway',
    bullets: [
      'Multi-channel 868/915 MHz RF receiver array',
      'Mine drift repeater mesh integration',
      'Fiber-optic / 4G/5G surface backhaul uplink'
    ],
    techDetails: {
      overview: 'Industrial gateway situated at tunnel intersections and pithead shafts. It aggregates packets from all distributed underground sensor nodes and relays them via redundant fiber-optic backhaul to the surface cloud.',
      samplingRate: 'Multi-node concurrent packet demodulation',
      protocol: 'Semtech SX1302 Concentrator + MQTT/HTTPS uplink',
      criticalThreshold: 'Uptime > 99.999% with battery backup'
    }
  },
  {
    id: 'cloud-server',
    stepNumber: 6,
    title: 'CLOUD / SERVER',
    subtitle: 'Enterprise Scalable Time-Series Data Infrastructure',
    category: 'server',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-300',
    textClass: 'text-violet-950',
    accentClass: 'bg-violet-600',
    tagClass: 'text-violet-700 bg-violet-100 border border-violet-200',
    icon: 'cloud-database',
    bullets: [
      'Data Storage (Database)',
      'Time-series logging',
      'Historical data'
    ],
    techDetails: {
      overview: 'High-throughput time-series database (e.g. InfluxDB / TimescaleDB) storing millions of structural observations. Maintains immutable audit logs for regulatory compliance and historical subsidence trend baselines.',
      samplingRate: 'Microsecond timestamp indexing',
      protocol: 'MQTT Broker, REST API, TimescaleDB SQL',
      criticalThreshold: 'Zero data loss with automated geo-replication'
    }
  },
  {
    id: 'ai-ml',
    stepNumber: 7,
    title: 'AI / ML ANALYSIS',
    subtitle: 'Fukuzono Inverse-Velocity & Predictive Subsidence Engine',
    category: 'ai',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-300',
    textClass: 'text-amber-950',
    accentClass: 'bg-amber-600',
    tagClass: 'text-amber-700 bg-amber-100 border border-amber-200',
    icon: 'brain-circuit',
    bullets: [
      'Noise removal',
      'Trend analysis',
      'Anomaly detection',
      'Inverse velocity graph',
      'Time-to-failure predict'
    ],
    techDetails: {
      overview: 'Applies the acclaimed Voight-Fukuzono inverse velocity model: d(v^(-α))/dt = -C. When progressive creep accelerates, the inverse velocity (1/v) asymptotically decays toward zero. The linear or polynomial extrapolation of the 1/v curve gives an accurate forecast of the exact Time-to-Failure (tf).',
      samplingRate: 'Rolling regression analysis every 30 seconds',
      protocol: 'Kalman filtering + Linear/Nonlinear extrapolation',
      equation: '1/v(t) → 0  as  t → t_failure',
      criticalThreshold: 'Predicted Time-to-Failure (tf - t) < 30 minutes triggers evacuation'
    }
  },
  {
    id: 'gis',
    stepNumber: 8,
    title: 'GIS',
    subtitle: 'Spatiotemporal Mine Geoinformatics & Subsurface Mapping',
    category: 'gis',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-300',
    textClass: 'text-pink-950',
    accentClass: 'bg-pink-600',
    tagClass: 'text-pink-700 bg-pink-100 border border-pink-200',
    icon: 'gis-map',
    bullets: [
      'Mine map visualization',
      'Sensor location',
      'Risk zones',
      'Subsidence location'
    ],
    techDetails: {
      overview: '3D/2D digital twin geoinformation system mapping strata layers, faults, gallery coordinates, and real-time subsidence troughs. Color-codes risk polygons from Green (Stable) to Orange (Moderate Creep) and Red (Imminent Collapse).',
      samplingRate: 'Real-time spatial layer refresh',
      protocol: 'GeoJSON / OGC WMS / 3D BIM coordinate mapping',
      criticalThreshold: 'Subsidence basin displacement gradient > 3mm/m'
    }
  },
  {
    id: 'dashboard',
    stepNumber: 9,
    title: 'DASHBOARD (Live + Graph)',
    subtitle: 'Surface SCADA & Real-Time Engineering Telemetry',
    category: 'action',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-300',
    textClass: 'text-blue-950',
    accentClass: 'bg-blue-600',
    tagClass: 'text-blue-700 bg-blue-100 border border-blue-200',
    icon: 'monitor-dashboard',
    bullets: [
      'Real-time strip charts for all 7 sensors',
      'Live 1/v failure trajectory tracking',
      'Multi-gallery bird-eye status overview'
    ],
    techDetails: {
      overview: 'Central control room console rendering real-time streaming charts, displacement velocity graphs, and sensor telemetry health for dispatch engineers.',
      samplingRate: '1 sec live WebSocket feed',
      protocol: 'WebSocket / SSE stream',
      criticalThreshold: 'Operator visual & audio acknowledgement within 15 seconds'
    }
  },
  {
    id: 'alert',
    stepNumber: 9,
    title: 'ALERT (SMS/App)',
    subtitle: 'Automated Multi-Channel Notification Dispatcher',
    category: 'action',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
    textClass: 'text-emerald-950',
    accentClass: 'bg-emerald-600',
    tagClass: 'text-emerald-700 bg-emerald-100 border border-emerald-200',
    icon: 'mobile-alert',
    bullets: [
      'Instant SMS alert broadcast to shift supervisors',
      'Mobile push notifications with GPS pin & hazard tier',
      'Automated voice emergency paging'
    ],
    techDetails: {
      overview: 'Dispatches targeted emergency notifications to safety supervisors, ventilation engineers, and shift crew leaders via cellular SMS, high-priority app push, and automated voice alarms.',
      samplingRate: 'Dispatched < 2 seconds from event trigger',
      protocol: 'Twilio SMS / Firebase FCM / PagerDuty / Webhook',
      criticalThreshold: 'Guaranteed delivery with multi-carrier failover'
    }
  },
  {
    id: 'rescue',
    stepNumber: 9,
    title: 'RESCUE (Evacuation)',
    subtitle: 'Underground Evacuation & Rapid Emergency Response',
    category: 'action',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-300',
    textClass: 'text-rose-950',
    accentClass: 'bg-rose-600',
    tagClass: 'text-rose-700 bg-rose-100 border border-rose-200',
    icon: 'ambulance-rescue',
    bullets: [
      'Emergency refuge chamber activation',
      'Automated hoist & cage evacuation priority',
      'Search & rescue team standby deployment'
    ],
    techDetails: {
      overview: 'Autonomous protocol triggering underground evacuation routes, flashing green exit guide lights, opening emergency ventilation bypasses, and mobilizing mine rescue teams to the designated shaft.',
      samplingRate: 'Instant emergency protocol execution',
      protocol: 'PLC Interlock / Mine Evacuation Warning Siren',
      criticalThreshold: 'Evacuate all personnel within calculated time-to-failure window'
    }
  }
];
