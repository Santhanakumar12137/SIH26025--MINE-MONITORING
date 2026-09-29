import React, { useRef } from 'react';
import { FLOWCHART_NODES } from '../data/infographicData';
import { FlowchartNode } from '../types';
import {
  MineTunnelCartIcon,
  GasTankIcon,
  ThermometerRedIcon,
  PressureGaugeIcon,
  WaterDropsIcon,
  StrainChipIcon,
  TiltArrowsIcon,
  VibrationWaveformIcon,
  Esp32BoardIcon,
  SirenAlarmIcon,
  LoraModuleIcon,
  GatewayIcon,
  CloudServerIcon,
  BrainCircuitIcon,
  GisMapPinIcon,
  MonitorDashboardIcon,
  MobileAlertIcon,
  AmbulanceRescueIcon,
} from './FlatIcons';
import { CheckCircle2, ChevronDown, Info, ShieldAlert, Cpu } from 'lucide-react';

interface Props {
  onSelectNode: (node: FlowchartNode) => void;
  selectedNodeId: string | null;
  pulseAnimation?: boolean;
}

export const InfographicPoster: React.FC<Props> = ({
  onSelectNode,
  selectedNodeId,
  pulseAnimation = true,
}) => {
  const posterRef = useRef<HTMLDivElement>(null);

  // Quick lookup helper
  const getNode = (id: string) => FLOWCHART_NODES.find((n) => n.id === id)!;

  const nodeMine = getNode('underground-mine');
  const nodeSensors = getNode('sensors');
  const nodeEsp32 = getNode('esp32-core');
  const nodeBuzzer = getNode('buzzer-alarm');
  const nodeLora = getNode('lora-send');
  const nodeGateway = getNode('gateway');
  const nodeCloud = getNode('cloud-server');
  const nodeAi = getNode('ai-ml');
  const nodeGis = getNode('gis');
  const nodeDashboard = getNode('dashboard');
  const nodeAlert = getNode('alert');
  const nodeRescue = getNode('rescue');

  return (
    <div
      ref={posterRef}
      id="infographic-export-canvas"
      className="w-full max-w-[1100px] mx-auto bg-white p-6 sm:p-10 lg:p-14 shadow-xl border border-slate-200/80 rounded-3xl transition-all relative select-none"
    >
      {/* Poster Header / Title Banner */}
      <div className="text-center pb-8 border-b border-slate-200 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Technical Architecture & Sensor Telemetry Pipeline
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          UNDERGROUND MINE SUBSIDENCE
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-700 tracking-tight mt-1">
          EARLY WARNING SYSTEM FLOWCHART
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto mt-2 font-medium">
          Comprehensive multi-tier monitoring architecture from in-situ strata sensors to real-time AI/ML failure prediction and emergency rescue dispatch.
        </p>
      </div>

      {/* FLOWCHART BODY */}
      <div className="flex flex-col items-center w-full max-w-[920px] mx-auto space-y-0">
        
        {/* ========================================================= */}
        {/* 1. TOP BOX: UNDERGROUND MINE (Light Blue) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeMine)}
          className={`group w-full bg-sky-50/90 hover:bg-sky-100/90 border-2 border-sky-300 hover:border-sky-500 rounded-2xl p-6 sm:p-8 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'underground-mine' ? 'ring-4 ring-sky-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-sm shrink-0 flex items-center justify-center">
              <MineTunnelCartIcon className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-sky-600 text-white uppercase tracking-wider">
                  Tier 1
                </span>
                <span className="text-xs font-semibold text-sky-800">
                  Subsurface Excavation Strata
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
                UNDERGROUND MINE
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Active coal/mineral extraction zone subjected to geological overburden weight, rock stresses, and hazardous gas emissions.
              </p>
            </div>
            <div className="hidden sm:flex items-center text-sky-600 text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Specs</span>
              <Info className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* ARROW DOWN: 1 -> 2 */}
        <VerticalArrow label="Strata Geotechnical Stresses & Emissions" pulse={pulseAnimation} color="#0284c7" />

        {/* ========================================================= */}
        {/* 2. SENSORS BOX (Green Box - 7 Icons in a row) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeSensors)}
          className={`group w-full bg-emerald-50/90 hover:bg-emerald-100/80 border-2 border-emerald-300 hover:border-emerald-500 rounded-2xl p-5 sm:p-7 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'sensors' ? 'ring-4 ring-emerald-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-600 text-white uppercase tracking-wider">
                Tier 2
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
                SENSORS
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-200">
              7 Multi-Parameter Array
            </span>
          </div>

          {/* 7 Icons in a row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {/* 1. Gas (CH4, CO) */}
            <div className="bg-white p-3 rounded-xl border border-sky-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <GasTankIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Gas</span>
              <span className="text-[11px] font-semibold text-sky-700">(CH4, CO)</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">GPIO 34</span>
            </div>

            {/* 2. Temp (DHT11/DHT22) */}
            <div className="bg-white p-3 rounded-xl border border-rose-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <ThermometerRedIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Temp</span>
              <span className="text-[11px] font-semibold text-rose-700">DHT11/22</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">GPIO 4</span>
            </div>

            {/* 3. Pressure (BMP280) */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <PressureGaugeIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Pressure</span>
              <span className="text-[11px] font-semibold text-cyan-700">BMP280</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">I2C (21,22)</span>
            </div>

            {/* 4. Humid (DHT11/DHT22) */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <WaterDropsIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Humid</span>
              <span className="text-[11px] font-semibold text-blue-700">DHT11/22</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">GPIO 4</span>
            </div>

            {/* 5. Strain (MPU6050) */}
            <div className="bg-white p-3 rounded-xl border border-amber-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <StrainChipIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Strain</span>
              <span className="text-[11px] font-semibold text-amber-700">MPU6050</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">I2C (21,22)</span>
            </div>

            {/* 6. Tilt/Disp (MPU6050) */}
            <div className="bg-white p-3 rounded-xl border border-sky-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <TiltArrowsIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Tilt/Disp</span>
              <span className="text-[11px] font-semibold text-sky-700">MPU6050</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">GPIO 35/I2C</span>
            </div>

            {/* 7. Vibration (Accelerometer) */}
            <div className="bg-white p-3 rounded-xl border border-purple-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow col-span-2 sm:col-span-1 md:col-span-1">
              <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                <VibrationWaveformIcon className="w-10 h-10" />
              </div>
              <span className="font-bold text-xs text-slate-800">Vibration</span>
              <span className="text-[11px] font-semibold text-purple-700">Accel</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">I2C (21,22)</span>
            </div>
          </div>
        </div>

        {/* ARROW DOWN: 2 -> 3 */}
        <VerticalArrow label="Analog ADC & I2C Bus Signals" pulse={pulseAnimation} color="#059669" />

        {/* ========================================================= */}
        {/* 3. ESP32 (CORE) (Purple Box - Board on Left, Bullets on Right) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeEsp32)}
          className={`group w-full bg-purple-50/90 hover:bg-purple-100/80 border-2 border-purple-300 hover:border-purple-500 rounded-2xl p-6 sm:p-7 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'esp32-core' ? 'ring-4 ring-purple-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left side: ESP32 board illustration with WiFi icon */}
            <div className="w-full md:w-5/12 flex flex-col items-center justify-center p-4 bg-white/95 rounded-2xl border border-purple-200 shadow-sm">
              <Esp32BoardIcon className="w-36 h-28 sm:w-44 sm:h-32" />
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                <span className="font-bold text-xs text-purple-900 tracking-wide uppercase">
                  Xtensa Dual-Core LX6 @ 240MHz
                </span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Wokwi Pinout: GPIO 4, 34, 35, 21, 22, 25
              </div>
            </div>

            {/* Right side: Title and exact bullet points */}
            <div className="w-full md:w-7/12">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-purple-600 text-white uppercase tracking-wider">
                  Tier 3
                </span>
                <span className="text-xs font-semibold text-purple-800">Edge Processing & Fail-Safe Core</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-950 tracking-tight mb-3">
                ESP32 (CORE)
              </h3>
              
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  <span>Read all sensors</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  <span>Filter data (avg)</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  <span>Displacement → Velocity</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  <span>Velocity → 1/Velocity</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                  <span>Local threshold check</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. TWO BRANCHING ARROWS FROM ESP32: Left (Buzzer) & Right (LoRa) */}
        {/* ========================================================= */}
        <DualBranchSplitArrow
          pulse={pulseAnimation}
          leftLabel="Instant GPIO 25 Trigger"
          rightLabel="LoRa RF SPI Data"
        />

        {/* 4. Left Box: BUZZER / Right Box: LoRa Send data */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Left: BUZZER (Instant Alarm) - Red Box */}
          <div
            onClick={() => onSelectNode(nodeBuzzer)}
            className={`group bg-rose-50/90 hover:bg-rose-100/80 border-2 border-rose-300 hover:border-rose-500 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
              selectedNodeId === 'buzzer-alarm' ? 'ring-4 ring-rose-400 ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-rose-600 text-white uppercase tracking-wider">
                  Tier 4A · Local
                </span>
                <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                  GPIO 25
                </span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white rounded-xl border border-rose-200 shadow-2xs shrink-0">
                  <SirenAlarmIcon className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-rose-950 tracking-tight">
                    BUZZER
                  </h3>
                  <div className="text-xs font-bold text-rose-700 tracking-wide">
                    (Instant Alarm)
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Zero-latency in-tunnel piezo siren sounds instantly if local threshold (Gas &gt; 500ppm, Tilt &gt; 12°, or 1/v &lt; 0.1) is exceeded, without waiting for network or cloud.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-700 font-semibold">
              <span>Audible Warning (&gt;105dB)</span>
              <span className="text-rose-600 group-hover:underline">Hardware Link →</span>
            </div>
          </div>

          {/* Right: LoRa Send data - Light Blue Box */}
          <div
            onClick={() => onSelectNode(nodeLora)}
            className={`group bg-blue-50/90 hover:bg-blue-100/80 border-2 border-blue-300 hover:border-blue-500 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
              selectedNodeId === 'lora-send' ? 'ring-4 ring-blue-400 ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-blue-600 text-white uppercase tracking-wider">
                  Tier 4B · Uplink
                </span>
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                  868 / 915 MHz
                </span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-2xs shrink-0">
                  <LoraModuleIcon className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 tracking-tight">
                    LoRa Send data
                  </h3>
                  <div className="text-xs font-bold text-blue-700 tracking-wide">
                    Long-Range Subsurface Uplink
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Transmits encoded geotechnical and atmospheric packets across deep rock galleries to the surface gateway with deep penetrative power and low power consumption.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs text-blue-700 font-semibold">
              <span>Encrypted RF Telemetry</span>
              <span className="text-blue-600 group-hover:underline">RF Details →</span>
            </div>
          </div>
        </div>

        {/* ARROW DOWN: From LoRa to GATEWAY */}
        <RightBranchToGatewayArrow pulse={pulseAnimation} />

        {/* ========================================================= */}
        {/* 5. GATEWAY (Light Teal Box) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeGateway)}
          className={`group w-full max-w-xl bg-teal-50/90 hover:bg-teal-100/80 border-2 border-teal-300 hover:border-teal-500 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'gateway' ? 'ring-4 ring-teal-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl border border-teal-200 shadow-2xs shrink-0">
              <GatewayIcon className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-teal-600 text-white uppercase tracking-wider">
                  Tier 5
                </span>
                <span className="text-xs font-semibold text-teal-800">Pithead Concentrator</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-teal-950 tracking-tight">
                GATEWAY
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Shaft-top multi-channel antenna receiving LoRa packets and bridging to high-speed fiber-optic cloud backhaul.
              </p>
            </div>
            <div className="hidden sm:block text-teal-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Specs →
            </div>
          </div>
        </div>

        {/* ARROW DOWN: 5 -> 6 */}
        <VerticalArrow label="Fiber / Cellular TCP-IP Backhaul" pulse={pulseAnimation} color="#0f766e" />

        {/* ========================================================= */}
        {/* 6. CLOUD / SERVER (Light Purple Box) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeCloud)}
          className={`group w-full bg-violet-50/90 hover:bg-violet-100/80 border-2 border-violet-300 hover:border-violet-500 rounded-2xl p-6 sm:p-7 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'cloud-server' ? 'ring-4 ring-violet-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="p-3.5 bg-white rounded-2xl border border-violet-200 shadow-2xs shrink-0">
              <CloudServerIcon className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-violet-600 text-white uppercase tracking-wider">
                  Tier 6
                </span>
                <span className="text-xs font-semibold text-violet-800">
                  Centralized Telemetry Repository
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-violet-950 tracking-tight mb-2">
                CLOUD / SERVER
              </h3>
              
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-sm text-slate-800">
                <li className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-violet-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Data Storage (Database)</span>
                </li>
                <li className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-violet-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Time-series logging</span>
                </li>
                <li className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-violet-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Historical data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ARROW DOWN: 6 -> 7 */}
        <VerticalArrow label="Streaming Time-Series Telemetry Pipeline" pulse={pulseAnimation} color="#7c3aed" />

        {/* ========================================================= */}
        {/* 7. AI / ML ANALYSIS (Light Yellow Box) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeAi)}
          className={`group w-full bg-amber-50/90 hover:bg-amber-100/80 border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-6 sm:p-7 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'ai-ml' ? 'ring-4 ring-amber-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs shrink-0">
              <BrainCircuitIcon className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-amber-600 text-white uppercase tracking-wider">
                  Tier 7
                </span>
                <span className="text-xs font-semibold text-amber-800">
                  Predictive Strata Failure Physics Engine
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight mb-2">
                AI / ML ANALYSIS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 text-sm text-slate-800">
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-amber-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  <span>Noise removal</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-amber-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  <span>Trend analysis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-amber-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  <span>Anomaly detection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-amber-200 font-semibold sm:col-span-1 lg:col-span-1">
                  <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  <span className="text-amber-900 font-bold">Inverse velocity graph</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-100/80 p-2 rounded-lg border border-amber-300 font-bold text-amber-950 sm:col-span-1 lg:col-span-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 animate-pulse" />
                  <span>Time-to-failure predict (1/v → 0)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ARROW DOWN: 7 -> 8 */}
        <VerticalArrow label="Spatial Hazard Coordinates & Subsidence Gradients" pulse={pulseAnimation} color="#d97706" />

        {/* ========================================================= */}
        {/* 8. GIS (Pink Box) */}
        {/* ========================================================= */}
        <div
          onClick={() => onSelectNode(nodeGis)}
          className={`group w-full bg-pink-50/90 hover:bg-pink-100/80 border-2 border-pink-300 hover:border-pink-500 rounded-2xl p-6 sm:p-7 transition-all cursor-pointer shadow-xs hover:shadow-md ${
            selectedNodeId === 'gis' ? 'ring-4 ring-pink-400 ring-offset-2' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="p-3.5 bg-white rounded-2xl border border-pink-200 shadow-2xs shrink-0">
              <GisMapPinIcon className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-pink-600 text-white uppercase tracking-wider">
                  Tier 8
                </span>
                <span className="text-xs font-semibold text-pink-800">
                  Geoinformation & Digital Mine Twin
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-950 tracking-tight mb-2">
                GIS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 text-sm text-slate-800">
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-pink-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0" />
                  <span>Mine map visualization</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-pink-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0" />
                  <span>Sensor location</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-pink-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0" />
                  <span>Risk zones</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-pink-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pink-600 shrink-0" />
                  <span>Subsidence location</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 9. THREE ARROWS FROM GIS TO BOTTOM */}
        {/* ========================================================= */}
        <TripleBranchArrow pulse={pulseAnimation} />

        {/* ========================================================= */}
        {/* 9. BOTTOM THREE BOXES: Left Blue, Middle Green, Right Red */}
        {/* ========================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Left Blue: DASHBOARD (Live + Graph) */}
          <div
            onClick={() => onSelectNode(nodeDashboard)}
            className={`group bg-blue-50/90 hover:bg-blue-100/80 border-2 border-blue-300 hover:border-blue-500 rounded-2xl p-5 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
              selectedNodeId === 'dashboard' ? 'ring-4 ring-blue-400 ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-600 text-white uppercase tracking-wider">
                  Tier 9A · Telemetry
                </span>
                <span className="text-[11px] font-semibold text-blue-800">Control Center</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-white rounded-xl border border-blue-200 shadow-2xs shrink-0">
                  <MonitorDashboardIcon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-blue-950 tracking-tight leading-tight">
                    DASHBOARD
                  </h3>
                  <div className="text-xs font-bold text-blue-700">
                    (Live + Graph)
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Live monitoring consoles rendering streaming time-series graphs, displacement rates, gas ppm trends, and multi-gallery statuses.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-blue-200/60 flex items-center justify-between text-xs text-blue-700 font-semibold">
              <span>Real-Time SCADA</span>
              <span className="group-hover:underline">Open Live Stream →</span>
            </div>
          </div>

          {/* Middle Green: ALERT (SMS/App) */}
          <div
            onClick={() => onSelectNode(nodeAlert)}
            className={`group bg-emerald-50/90 hover:bg-emerald-100/80 border-2 border-emerald-300 hover:border-emerald-500 rounded-2xl p-5 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
              selectedNodeId === 'alert' ? 'ring-4 ring-emerald-400 ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-600 text-white uppercase tracking-wider">
                  Tier 9B · Dispatch
                </span>
                <span className="text-[11px] font-semibold text-emerald-800">Supervisors</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-2xs shrink-0">
                  <MobileAlertIcon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight leading-tight">
                    ALERT
                  </h3>
                  <div className="text-xs font-bold text-emerald-700">
                    (SMS/App)
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Automated emergency SMS, push notifications, and audible siren paging sent directly to shift engineers and mining crew captains.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Cellular & FCM Push</span>
              <span className="group-hover:underline">Notification Log →</span>
            </div>
          </div>

          {/* Right Red: RESCUE (Evacuation) */}
          <div
            onClick={() => onSelectNode(nodeRescue)}
            className={`group bg-rose-50/90 hover:bg-rose-100/80 border-2 border-rose-300 hover:border-rose-500 rounded-2xl p-5 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
              selectedNodeId === 'rescue' ? 'ring-4 ring-rose-400 ring-offset-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-600 text-white uppercase tracking-wider">
                  Tier 9C · Emergency
                </span>
                <span className="text-[11px] font-semibold text-rose-800">Action Protocol</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-white rounded-xl border border-rose-200 shadow-2xs shrink-0">
                  <AmbulanceRescueIcon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-rose-950 tracking-tight leading-tight">
                    RESCUE
                  </h3>
                  <div className="text-xs font-bold text-rose-700">
                    (Evacuation)
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Autonomous evacuation route illumination, cage hoist emergency sequencing, refuge chamber sealing, and rescue team mobilization.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-700 font-semibold">
              <span>Evacuation Route Active</span>
              <span className="group-hover:underline">Safety Checklist →</span>
            </div>
          </div>
        </div>

      </div>

      {/* Poster Footer / Legend */}
      <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700">Mine Safety Standards:</span>
          <span>DGMS Compliance · MSHA Grade · IECEx Certified</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span>Wokwi ESP32 Pinout Validated</span>
          <span>·</span>
          <span>8K Ultra-High Resolution Vector Architecture</span>
        </div>
      </div>
    </div>
  );
};

// =======================================================================
// ARROW SVG CONNECTORS (High precision, responsive, flat, crisp)
// =======================================================================

const VerticalArrow: React.FC<{ label?: string; pulse?: boolean; color?: string }> = ({
  label,
  pulse = true,
  color = '#0284c7',
}) => {
  return (
    <div className="flex flex-col items-center my-1 select-none">
      <div className="h-10 sm:h-12 w-8 relative flex items-center justify-center">
        <svg viewBox="0 0 32 48" className="w-8 h-12 overflow-visible" fill="none">
          <defs>
            <marker
              id={`arrow-${color.replace('#', '')}`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={color} />
            </marker>
          </defs>
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="38"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${color.replace('#', '')})`}
          />
          {pulse && (
            <circle cx="16" cy="12" r="3" fill="#ffffff" stroke={color} strokeWidth="2">
              <animate attributeName="cy" values="4;36;4" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>
      {label && (
        <span className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200 -mt-1.5 z-10 shadow-2xs">
          {label}
        </span>
      )}
    </div>
  );
};

const DualBranchSplitArrow: React.FC<{ pulse?: boolean; leftLabel?: string; rightLabel?: string }> = ({
  pulse = true,
  leftLabel,
  rightLabel,
}) => {
  return (
    <div className="w-full max-w-[800px] h-16 sm:h-20 my-1 relative flex items-center justify-center">
      <svg viewBox="0 0 800 80" className="w-full h-full overflow-visible" fill="none">
        <defs>
          <marker id="branch-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
          </marker>
          <marker id="branch-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
        </defs>

        {/* Stem down from ESP32 */}
        <line x1="400" y1="0" x2="400" y2="24" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" />

        {/* Left branch to Buzzer (Red) */}
        <path
          d="M 400 24 H 200 V 70"
          stroke="#e11d48"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#branch-red)"
        />

        {/* Right branch to LoRa (Blue) */}
        <path
          d="M 400 24 H 600 V 70"
          stroke="#0284c7"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#branch-blue)"
        />

        {/* Joint point */}
        <circle cx="400" cy="24" r="5" fill="#7c3aed" />

        {/* Pulses */}
        {pulse && (
          <>
            <circle cx="200" cy="48" r="3.5" fill="#ffffff" stroke="#e11d48" strokeWidth="2">
              <animate attributeName="cy" values="24;66;24" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="48" r="3.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2">
              <animate attributeName="cy" values="24;66;24" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
      {/* Floating labels */}
      {leftLabel && (
        <span className="hidden sm:inline-block absolute left-[15%] top-5 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          {leftLabel}
        </span>
      )}
      {rightLabel && (
        <span className="hidden sm:inline-block absolute right-[15%] top-5 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          {rightLabel}
        </span>
      )}
    </div>
  );
};

const RightBranchToGatewayArrow: React.FC<{ pulse?: boolean }> = ({ pulse = true }) => {
  return (
    <div className="w-full max-w-[800px] h-14 sm:h-16 relative flex items-center justify-center my-0">
      <svg viewBox="0 0 800 64" className="w-full h-full overflow-visible" fill="none">
        <defs>
          <marker id="branch-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0d9488" />
          </marker>
        </defs>

        {/* Path down from LoRa (x=600) turning inward to center Gateway (x=400) */}
        <path
          d="M 600 0 V 22 H 400 V 54"
          stroke="#0d9488"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#branch-teal)"
        />
        {pulse && (
          <circle cx="400" cy="40" r="3" fill="#ffffff" stroke="#0d9488" strokeWidth="2">
            <animate attributeName="cy" values="24;52;24" dur="1.6s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
      <span className="hidden sm:inline-block absolute right-[28%] top-1 text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
        Over-the-Air LoRa RF Link
      </span>
    </div>
  );
};

const TripleBranchArrow: React.FC<{ pulse?: boolean }> = ({ pulse = true }) => {
  return (
    <div className="w-full max-w-[850px] h-16 sm:h-20 my-1 relative flex items-center justify-center">
      <svg viewBox="0 0 850 80" className="w-full h-full overflow-visible" fill="none">
        <defs>
          <marker id="arrow-bot-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
          <marker id="arrow-bot-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
          </marker>
          <marker id="arrow-bot-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
          </marker>
        </defs>

        {/* Stem down from GIS */}
        <line x1="425" y1="0" x2="425" y2="24" stroke="#db2777" strokeWidth="3.5" strokeLinecap="round" />

        {/* Left: Blue to Dashboard (x=140) */}
        <path
          d="M 425 24 H 140 V 70"
          stroke="#0284c7"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#arrow-bot-blue)"
        />

        {/* Middle: Green to Alert (x=425) */}
        <path
          d="M 425 24 V 70"
          stroke="#059669"
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd="url(#arrow-bot-green)"
        />

        {/* Right: Red to Rescue (x=710) */}
        <path
          d="M 425 24 H 710 V 70"
          stroke="#dc2626"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#arrow-bot-red)"
        />

        {/* Center hub */}
        <circle cx="425" cy="24" r="5" fill="#db2777" />
      </svg>
    </div>
  );
};
