import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Mine Tunnel with Cart
export const MineTunnelCartIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Rock Arch Outline */}
    <path
      d="M6 56V32C6 17.64 17.64 6 32 6C46.36 6 58 17.64 58 32V56"
      stroke="#0284c7"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Tunnel Interior Shadow */}
    <path
      d="M12 56V32C12 20.95 20.95 12 32 12C43.05 12 52 20.95 52 32V56H12Z"
      fill="#e0f2fe"
    />
    {/* Timber Support Beams */}
    <path d="M12 22L32 12L52 22" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 24V56M48 24V56" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" />
    <path d="M16 38H48" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
    {/* Mine Rail Tracks */}
    <line x1="8" y1="56" x2="56" y2="56" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    <line x1="14" y1="56" x2="16" y2="52" stroke="#64748b" strokeWidth="2" />
    <line x1="26" y1="56" x2="28" y2="52" stroke="#64748b" strokeWidth="2" />
    <line x1="38" y1="56" x2="40" y2="52" stroke="#64748b" strokeWidth="2" />
    <line x1="48" y1="56" x2="50" y2="52" stroke="#64748b" strokeWidth="2" />
    {/* Mine Cart Body */}
    <path
      d="M20 36L23 48H41L44 36H20Z"
      fill="#0284c7"
      stroke="#0369a1"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Ore Heap inside Cart */}
    <path
      d="M22 36C24 32 29 30 32 30C35 30 40 32 42 36H22Z"
      fill="#f59e0b"
      stroke="#d97706"
      strokeWidth="1.5"
    />
    {/* Cart Wheels */}
    <circle cx="25" cy="51" r="3.5" fill="#334155" stroke="#f8fafc" strokeWidth="1.5" />
    <circle cx="39" cy="51" r="3.5" fill="#334155" stroke="#f8fafc" strokeWidth="1.5" />
    {/* Lantern / Light Beam */}
    <polygon points="32,20 27,27 37,27" fill="#fbbf24" opacity="0.8" />
    <circle cx="32" cy="19" r="2.5" fill="#f59e0b" />
  </svg>
);

// 2. Gas Tank (CH4, CO) - Blue Gas Tank
export const GasTankIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Valve / Cap */}
    <rect x="20" y="4" width="8" height="4" rx="1.5" fill="#0284c7" />
    <rect x="22" y="8" width="4" height="4" fill="#0369a1" />
    {/* Tank Body */}
    <path
      d="M14 20C14 14.477 18.477 10 24 10C29.523 10 34 14.477 34 20V38C34 41.314 31.314 44 28 44H20C16.686 44 14 41.314 14 38V20Z"
      fill="#38bdf8"
      stroke="#0284c7"
      strokeWidth="2.5"
    />
    {/* Tank Base */}
    <rect x="17" y="42" width="14" height="3" rx="1.5" fill="#0369a1" />
    {/* Gas Hazard Badge */}
    <rect x="18" y="22" width="12" height="12" rx="2" fill="#ffffff" />
    <path d="M24 24L28.5 31.5H19.5L24 24Z" fill="#f59e0b" />
    <text x="24" y="30.5" fill="#1e293b" fontSize="5" fontWeight="bold" textAnchor="middle">CH4</text>
    {/* Highlight shine */}
    <path d="M17 18C17 14 20 12 24 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// 3. Thermometer - Red
export const ThermometerRedIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Glass Tube Background */}
    <rect x="21" y="6" width="6" height="26" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    {/* Bulb Bottom */}
    <circle cx="24" cy="35" r="7" fill="#ef4444" stroke="#dc2626" strokeWidth="2.5" />
    {/* Mercury Fill */}
    <rect x="22.5" y="16" width="3" height="15" rx="1.5" fill="#ef4444" />
    <circle cx="24" cy="35" r="4.5" fill="#b91c1c" />
    {/* Ticks */}
    <line x1="28" y1="12" x2="31" y2="12" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="16" x2="32" y2="16" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="20" x2="31" y2="20" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="24" x2="32" y2="24" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />
    {/* Reflection */}
    <ellipse cx="22.5" cy="33.5" rx="1.5" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-30 22.5 33.5)" />
  </svg>
);

// 4. Pressure Gauge - BMP280
export const PressureGaugeIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Bottom fitting */}
    <rect x="22" y="38" width="4" height="6" fill="#0e7490" />
    <rect x="20" y="42" width="8" height="3" rx="1" fill="#155e75" />
    {/* Outer Rim */}
    <circle cx="24" cy="22" r="16" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
    {/* Inner Dial Face */}
    <circle cx="24" cy="22" r="13" fill="#ffffff" stroke="#cffafe" strokeWidth="1" />
    {/* Scale Arc */}
    <path d="M15 28C13 24 13.5 18 17 14C20.5 10 27.5 10 31 14C34.5 18 35 24 33 28" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 2.5" />
    {/* Warning red sector */}
    <path d="M29 12C32 15 33.5 19 33 23" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    {/* Gauge Needle */}
    <line x1="24" y1="22" x2="31" y2="15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="22" r="2.5" fill="#0f172a" />
    {/* Pressure units label */}
    <text x="24" y="30" fill="#0891b2" fontSize="4" fontWeight="bold" textAnchor="middle">hPa</text>
  </svg>
);

// 5. Water Drops - Humidity
export const WaterDropsIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Main Drop */}
    <path
      d="M24 6C24 6 14 20 14 28C14 33.523 18.477 38 24 38C29.523 38 34 33.523 34 28C34 20 24 6 24 6Z"
      fill="#60a5fa"
      stroke="#2563eb"
      strokeWidth="2.5"
    />
    {/* Reflection Highlight */}
    <path
      d="M19 26C19 22 21 17 23 14"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="20" cy="30" r="1.5" fill="#ffffff" opacity="0.8" />
    {/* Secondary Smaller Drop */}
    <path
      d="M34 26C34 26 29 33 29 37C29 39.761 31.239 42 34 42C36.761 42 39 39.761 39 37C39 33 34 26 34 26Z"
      fill="#93c5fd"
      stroke="#1d4ed8"
      strokeWidth="1.5"
    />
    <path d="M32 35C32 33 33 30 34 28" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// 6. Strain Sensor - Yellow Chip
export const StrainChipIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Chip Body */}
    <rect x="14" y="14" width="20" height="20" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
    {/* Strain Gauge Meander Pattern */}
    <path
      d="M18 20H30V23H18V26H30V29H18"
      stroke="#b45309"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Solder Pins Left */}
    <line x1="8" y1="18" x2="14" y2="18" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="24" x2="14" y2="24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="30" x2="14" y2="30" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    {/* Solder Pins Right */}
    <line x1="34" y1="18" x2="40" y2="18" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="24" x2="40" y2="24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="30" x2="40" y2="30" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    {/* Micro-strain label */}
    <text x="24" y="38" fill="#d97706" fontSize="4.5" fontWeight="bold" textAnchor="middle">με</text>
  </svg>
);

// 7. Tilt / Displacement Arrows - Blue
export const TiltArrowsIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Horizontal Horizon Baseline */}
    <line x1="8" y1="36" x2="40" y2="36" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
    {/* Tilted Plane / Beam */}
    <line x1="10" y1="40" x2="38" y2="22" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
    {/* Inclinometer Angle Arc */}
    <path d="M26 36C26 33.5 27 30 29 28" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <text x="33" y="32" fill="#0369a1" fontSize="5" fontWeight="bold">θ°</text>
    {/* Bidirectional Tilt Displacement Curved Arrows */}
    <path
      d="M14 16C18 10 30 10 34 16"
      stroke="#0284c7"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polygon points="12,18 18,17 15,12" fill="#0284c7" />
    <polygon points="36,18 30,17 33,12" fill="#0284c7" />
    {/* Center Pivot Point */}
    <circle cx="24" cy="31" r="3" fill="#0369a1" stroke="#ffffff" strokeWidth="1.5" />
  </svg>
);

// 8. Vibration Waveform - Accelerometer
export const VibrationWaveformIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Background Circle */}
    <circle cx="24" cy="24" r="18" fill="#ede9fe" />
    {/* Axis Line */}
    <line x1="8" y1="24" x2="40" y2="24" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Seismic / Accelerometer Waveform */}
    <path
      d="M8 24H14L17 14L21 34L25 8L29 38L32 18L35 27H40"
      stroke="#7c3aed"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Vibration Crest Markers */}
    <circle cx="25" cy="8" r="2" fill="#ef4444" />
    <circle cx="29" cy="38" r="2" fill="#ef4444" />
  </svg>
);

// 9. ESP32 Board Illustration with WiFi Icon
export const Esp32BoardIcon: React.FC<IconProps> = ({ className = 'w-24 h-24', size }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Black / Dark Slate PCB Board */}
    <rect x="10" y="8" width="80" height="64" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
    {/* Golden Pin Headers Top */}
    <line x1="16" y1="12" x2="84" y2="12" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="2 3" strokeLinecap="round" />
    {/* Golden Pin Headers Bottom */}
    <line x1="16" y1="68" x2="84" y2="68" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="2 3" strokeLinecap="round" />
    {/* Metal RF Shield / ESP-WROOM-32 Module */}
    <rect x="34" y="20" width="38" height="40" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <text x="53" y="36" fill="#0f172a" fontSize="6.5" fontWeight="bold" textAnchor="middle">ESP32</text>
    <text x="53" y="44" fill="#475569" fontSize="4" fontWeight="600" textAnchor="middle">WROOM-32</text>
    {/* Micro USB Port */}
    <rect x="6" y="32" width="6" height="16" rx="1.5" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
    {/* Onboard Antenna Trace */}
    <path
      d="M78 26H84V30H78V34H84V38H78V42H84V46H78V50H84"
      stroke="#b45309"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Reset & Boot Push Buttons */}
    <circle cx="20" cy="24" r="2.5" fill="#dc2626" />
    <circle cx="20" cy="56" r="2.5" fill="#3b82f6" />
    {/* Blue Status LED */}
    <circle cx="28" cy="24" r="2" fill="#38bdf8" />
    {/* Prominent WiFi Broadcast Symbol */}
    <g transform="translate(18, 33)">
      <path d="M0 8C3 4 9 4 12 8" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      <path d="M2.5 11C4.5 9 7.5 9 9.5 11" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="6" cy="14" r="1.5" fill="#9333ea" />
    </g>
  </svg>
);

// 10. Buzzer (Instant Alarm) - Red Siren Icon
export const SirenAlarmIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Siren Pedestal Base */}
    <rect x="18" y="44" width="28" height="8" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="2" />
    <line x1="14" y1="52" x2="50" y2="52" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    {/* Siren Dome Cover */}
    <path
      d="M20 44V30C20 23.373 25.373 18 32 18C38.627 18 44 23.373 44 30V44H20Z"
      fill="#ef4444"
      stroke="#b91c1c"
      strokeWidth="2.5"
    />
    {/* Internal Rotating Reflector */}
    <polygon points="32,22 26,40 38,40" fill="#fecaca" opacity="0.6" />
    {/* Sound Waves Left */}
    <path d="M12 26C9 30 9 36 12 40" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M7 22C3 28 3 40 7 46" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
    {/* Sound Waves Right */}
    <path d="M52 26C55 30 55 36 52 40" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M57 22C61 28 61 40 57 46" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
    {/* Flash Rays Top */}
    <line x1="32" y1="6" x2="32" y2="12" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="44" y1="10" x2="40" y2="14" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="20" y1="10" x2="24" y2="14" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 11. LoRa Module & Wireless Icon - Light Blue
export const LoraModuleIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Subsurface LoRa Transceiver Card */}
    <rect x="12" y="16" width="34" height="40" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
    {/* Metal Shielding */}
    <rect x="18" y="24" width="22" height="24" rx="2" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
    <text x="29" y="36" fill="#0369a1" fontSize="5.5" fontWeight="bold" textAnchor="middle">LoRa</text>
    <text x="29" y="43" fill="#0284c7" fontSize="4" fontWeight="600" textAnchor="middle">SX1276</text>
    {/* Antenna Stem */}
    <rect x="42" y="10" width="3" height="12" fill="#334155" />
    <rect x="41.5" y="4" width="4" height="6" rx="2" fill="#0f172a" />
    {/* Wireless Signal Emission Waves */}
    <path d="M47 8C52 11 54 17 52 23" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M52 4C58 8 61 17 58 26" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pin Connectors Bottom */}
    <line x1="16" y1="56" x2="42" y2="56" stroke="#fbbf24" strokeWidth="3" strokeDasharray="3 3" strokeLinecap="round" />
  </svg>
);

// 12. Gateway - Light Teal Antenna Tower
export const GatewayIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Gateway Enclosure Box */}
    <rect x="18" y="34" width="28" height="24" rx="3" fill="#0d9488" stroke="#115e59" strokeWidth="2" />
    {/* Status LEDs */}
    <circle cx="24" cy="40" r="2" fill="#4ade80" />
    <circle cx="30" cy="40" r="2" fill="#38bdf8" />
    <circle cx="36" cy="40" r="2" fill="#facc15" />
    {/* Gateway Label */}
    <text x="32" y="52" fill="#ffffff" fontSize="4.5" fontWeight="bold" textAnchor="middle">GATEWAY</text>
    {/* Central Mast */}
    <line x1="32" y1="12" x2="32" y2="34" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
    {/* Antenna Dipole Elements */}
    <line x1="22" y1="18" x2="42" y2="18" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="26" y1="24" x2="38" y2="24" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
    {/* Top Antenna Beacon */}
    <circle cx="32" cy="11" r="3" fill="#14b8a6" stroke="#115e59" strokeWidth="1.5" />
    {/* Radiating Waves from Gateway Antenna */}
    <path d="M22 8C27 4 37 4 42 8" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 4C24 -1 40 -1 48 4" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 13. Cloud / Server - Cloud with Database Icon
export const CloudServerIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Cloud Body Shape */}
    <path
      d="M18 36C13.582 36 10 32.418 10 28C10 23.94 13.01 20.58 17 20.08C18.66 14.32 23.97 10 30.5 10C38.16 10 44.43 15.93 44.97 23.44C49.52 24.08 53 28.02 53 32.8C53 37.88 48.88 42 43.8 42H18"
      fill="#ede9fe"
      stroke="#7c3aed"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Database Cylinder Stack Inside Cloud */}
    {/* Disk 1 Top */}
    <path d="M24 30C24 28 28 26.5 33 26.5C38 26.5 42 28 42 30C42 32 38 33.5 33 33.5C28 33.5 24 32 24 30Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
    {/* Disk 2 Middle */}
    <path d="M24 35C24 37 28 38.5 33 38.5C38 38.5 42 37 42 35" stroke="#6d28d9" strokeWidth="1.5" />
    <path d="M24 30V35C24 37 28 38.5 33 38.5C38 38.5 42 37 42 35V30" fill="#a78bfa" opacity="0.7" />
    {/* Disk 3 Bottom */}
    <path d="M24 40C24 42 28 43.5 33 43.5C38 43.5 42 42 42 40" stroke="#6d28d9" strokeWidth="1.5" />
    <path d="M24 35V40C24 42 28 43.5 33 43.5C38 43.5 42 42 42 40V35" fill="#a78bfa" opacity="0.7" />
    <circle cx="28" cy="35" r="1" fill="#4ade80" />
    <circle cx="28" cy="40" r="1" fill="#4ade80" />
  </svg>
);

// 14. AI / ML Analysis - Brain with Circuit Icon
export const BrainCircuitIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Brain Left Hemisphere */}
    <path
      d="M30 12C24 12 18 16 18 22C15 23 13 26 13 30C13 33 15 36 17 38C15 41 16 46 20 49C23 51 27 50 30 48"
      fill="#fef3c7"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Brain Right Hemisphere (Circuit style) */}
    <path
      d="M34 12C40 12 46 16 46 22C49 23 51 26 51 30C51 33 49 36 47 38C49 41 48 46 44 49C41 51 37 50 34 48"
      fill="#fef3c7"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Central Division */}
    <line x1="32" y1="12" x2="32" y2="48" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
    {/* Neural Network Nodes & Circuit Traces */}
    <circle cx="24" cy="24" r="2.5" fill="#f59e0b" />
    <circle cx="40" cy="24" r="2.5" fill="#d97706" />
    <circle cx="23" cy="36" r="2.5" fill="#f59e0b" />
    <circle cx="41" cy="36" r="2.5" fill="#d97706" />
    <circle cx="32" cy="30" r="3" fill="#b45309" />
    {/* Connections */}
    <path d="M24 24L32 30L40 24M23 36L32 30L41 36" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
    {/* 1/v equation hint */}
    <rect x="22" y="52" width="20" height="9" rx="2" fill="#d97706" />
    <text x="32" y="58.5" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle">1/v → 0</text>
  </svg>
);

// 15. GIS - Map with Pin Icon (Pink Box)
export const GisMapPinIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Folded Map Panels */}
    <polygon points="10,18 24,12 24,50 10,56" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="24,12 38,18 38,56 24,50" fill="#f472b6" stroke="#db2777" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="38,18 52,12 52,50 38,56" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" strokeLinejoin="round" />
    {/* Contour Lines / Mining Drift lines on Map */}
    <path d="M13 32C17 28 20 36 24 30" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M26 32C30 38 33 26 36 32" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 30C44 26 47 34 50 28" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" />
    {/* Hazard Heatmap Zone Circle */}
    <ellipse cx="38" cy="38" rx="8" ry="4" fill="#ef4444" opacity="0.4" />
    {/* Prominent Red Pin */}
    <path
      d="M38 12C33.58 12 30 15.58 30 20C30 25.5 38 36 38 36C38 36 46 25.5 46 20C46 15.58 42.42 12 38 12Z"
      fill="#e11d48"
      stroke="#9f1239"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="38" cy="20" r="3" fill="#ffffff" />
  </svg>
);

// 16. Dashboard - Monitor with Map & Live Graph Icon (Left Blue)
export const MonitorDashboardIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Monitor Screen Frame */}
    <rect x="8" y="10" width="48" height="34" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
    {/* Display Glass */}
    <rect x="12" y="14" width="40" height="26" rx="2" fill="#0f172a" />
    {/* Live Chart Line (Displacement Velocity) */}
    <path
      d="M14 34L20 30L26 32L32 24L38 27L44 18L50 20"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Strip chart fill */}
    <path d="M14 34L20 30L26 32L32 24L38 27L44 18L50 20V36H14Z" fill="#0284c7" opacity="0.3" />
    {/* Mini Mine Map Grid in Screen corner */}
    <rect x="15" y="17" width="10" height="8" rx="1" fill="#1e293b" stroke="#0ea5e9" strokeWidth="0.8" />
    <circle cx="20" cy="21" r="1.5" fill="#ef4444" />
    {/* Stand & Base */}
    <rect x="29" y="44" width="6" height="8" fill="#475569" />
    <rect x="20" y="52" width="24" height="4" rx="2" fill="#334155" />
  </svg>
);

// 17. Alert - Mobile with Warning Icon (Middle Green)
export const MobileAlertIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Smartphone Frame */}
    <rect x="18" y="8" width="28" height="48" rx="6" fill="#059669" stroke="#047857" strokeWidth="2.5" />
    {/* Screen */}
    <rect x="21" y="14" width="22" height="36" rx="2" fill="#ffffff" />
    {/* Speaker notch & home line */}
    <rect x="28" y="11" width="8" height="1.5" rx="0.75" fill="#a7f3d0" />
    <line x1="28" y1="47" x2="36" y2="47" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
    {/* Alert Warning Triangle inside Screen */}
    <polygon points="32,20 40,34 24,34" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="32" cy="30.5" r="1" fill="#78350f" />
    <line x1="32" y1="24" x2="32" y2="28" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    {/* SMS notification bubble badge */}
    <circle cx="44" cy="14" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
    <text x="44" y="17" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">!</text>
  </svg>
);

// 18. Rescue - Ambulance Icon (Right Red)
export const AmbulanceRescueIcon: React.FC<IconProps> = ({ className = 'w-12 h-12', size }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={size ? { width: size, height: size } : undefined}>
    {/* Ambulance Vehicle Body */}
    <path
      d="M10 26C10 23.79 11.79 22 14 22H38V44H10V26Z"
      fill="#ffffff"
      stroke="#dc2626"
      strokeWidth="2.5"
    />
    {/* Cabin Front Hood */}
    <path
      d="M38 28H46L54 36V44H38V28Z"
      fill="#fee2e2"
      stroke="#dc2626"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Windshield */}
    <polygon points="40,30 45,30 50,36 40,36" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
    {/* Red Cross Symbol on Side */}
    <rect x="22" y="30" width="8" height="2.5" fill="#dc2626" />
    <rect x="24.75" y="27.25" width="2.5" height="8" fill="#dc2626" />
    {/* Emergency Strobe Light */}
    <rect x="24" y="18" width="6" height="4" rx="1.5" fill="#ef4444" />
    <path d="M22 17L20 14M32 17L34 14" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    {/* Red Stripe Side */}
    <rect x="10" y="38" width="44" height="2.5" fill="#ef4444" />
    {/* Wheels */}
    <circle cx="20" cy="46" r="5" fill="#334155" stroke="#ffffff" strokeWidth="2" />
    <circle cx="20" cy="46" r="2" fill="#94a3b8" />
    <circle cx="44" cy="46" r="5" fill="#334155" stroke="#ffffff" strokeWidth="2" />
    <circle cx="44" cy="46" r="2" fill="#94a3b8" />
  </svg>
);
