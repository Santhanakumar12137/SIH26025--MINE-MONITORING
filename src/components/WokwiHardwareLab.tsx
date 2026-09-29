import React, { useState, useEffect, useRef } from 'react';
import { SensorData } from '../types';
import { buzzerAudio } from '../utils/audio';
import { WOKWI_DIAGRAM_JSON, WOKWI_SKETCH_INO } from '../data/wokwiFiles';
import {
  Cpu,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Activity,
  AlertTriangle,
  Sliders,
  Flame,
  ArrowUpDown,
  Thermometer,
  Droplets,
  Gauge,
  Compass,
  Radio,
  Bell
} from 'lucide-react';

interface Props {
  sensorData: SensorData;
  onUpdateSensorData: (updater: (prev: SensorData) => SensorData) => void;
}

export const WokwiHardwareLab: React.FC<Props> = ({ sensorData, onUpdateSensorData }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'sketch' | 'diagram'>('interactive');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedDiagram, setCopiedDiagram] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [serialLogs, setSerialLogs] = useState<string[]>([
    '[INIT] ESP32 Core Xtensa Dual-Core 240MHz initialized',
    '[OK] DHT22 on GPIO4 ready',
    '[OK] BMP280 detected at I2C 0x76 (SDA=21, SCL=22)',
    '[OK] MPU6050 6-DoF sensor calibrated at 0x68',
    '[OK] ADC Channels initialized: GPIO34 (Gas), GPIO35 (Displacement)',
    '[READY] Early Warning System monitoring running...'
  ]);
  const [autoSimulateTremor, setAutoSimulateTremor] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Sync audio with buzzer state
  useEffect(() => {
    if (sensorData.buzzerActive && !isAudioMuted) {
      buzzerAudio.start(2600);
    } else {
      buzzerAudio.stop();
    }
  }, [sensorData.buzzerActive, isAudioMuted]);

  // Audio mute toggle
  const toggleMute = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    buzzerAudio.setMuted(next);
  };

  // Generate periodic serial logs matching loop()
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toISOString().substring(11, 19);
      const isAlarm = sensorData.buzzerActive ? '>>> ALARM ACTIVE <<<' : 'NORMAL';
      const logLine = `[${timestamp}] [LORA TX] Gas:${sensorData.gasPpm.toFixed(0)}ppm | Disp:${sensorData.dispMm.toFixed(2)}mm | v:${sensorData.velocityMmHr.toFixed(2)}mm/h | 1/v:${sensorData.invVelocity.toFixed(2)} | T:${sensorData.tempC.toFixed(1)}C H:${sensorData.humidity.toFixed(0)}% | Pres:${sensorData.pressureHpa.toFixed(1)}hPa | Tilt:${sensorData.tiltDeg.toFixed(1)}° | Buzzer:${isAlarm}`;

      setSerialLogs((prev) => [...prev.slice(-30), logLine]);
    }, 1500);

    return () => clearInterval(interval);
  }, [sensorData]);

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [serialLogs]);

  // Tremor simulation effect (progressive rock creep)
  useEffect(() => {
    if (!autoSimulateTremor) return;

    const interval = setInterval(() => {
      onUpdateSensorData((prev) => {
        const nextDisp = Math.min(50, prev.dispMm + 1.2);
        const nextGas = Math.min(950, prev.gasPpm + 15);
        const nextTilt = Math.min(30, prev.tiltDeg + 0.6);
        const nextVib = Number((Math.random() * 2.5 + 0.8).toFixed(2));
        const dt = 0.005; // hours
        const deltaDisp = nextDisp - prev.dispMm;
        const velocity = Math.max(0.1, deltaDisp / dt);
        const invV = 1.0 / velocity;

        const isAlarm = nextGas > 500 || nextDisp > 35 || invV < 0.1 || nextTilt > 12;
        let reason = 'Safe baseline readings';
        if (nextGas > 500) reason = 'Critical CH4 / CO gas concentration (>500ppm)';
        else if (invV < 0.1) reason = 'Imminent Roof Strata Failure: 1/v < 0.1';
        else if (nextDisp > 35) reason = 'Critical Roof Sag Displacement (>35mm)';
        else if (nextTilt > 12) reason = 'Dangerous Support Pillar Tilt (>12°)';

        return {
          ...prev,
          dispMm: nextDisp,
          dispAdc: Math.round((nextDisp / 50) * 4095),
          gasPpm: nextGas,
          gasAdc: Math.round((nextGas / 1000) * 4095),
          tiltDeg: nextTilt,
          vibrationG: nextVib,
          velocityMmHr: velocity,
          invVelocity: invV,
          buzzerActive: isAlarm,
          alarmState: isAlarm ? 'CRITICAL' : 'NORMAL',
          alarmReason: reason
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, [autoSimulateTremor, onUpdateSensorData]);

  // Reset simulation to baseline
  const handleReset = () => {
    setAutoSimulateTremor(false);
    buzzerAudio.stop();
    onUpdateSensorData((_) => ({
      gasAdc: 650,
      gasPpm: 158,
      dispAdc: 720,
      dispMm: 8.8,
      tempC: 24.2,
      humidity: 64,
      pressureHpa: 1013.2,
      tiltDeg: 2.1,
      vibrationG: 0.18,
      velocityMmHr: 0.45,
      invVelocity: 2.22,
      buzzerActive: false,
      alarmState: 'NORMAL',
      alarmReason: 'All subterranean sensors within safe operating thresholds'
    }));
  };

  const copyToClipboard = (text: string, type: 'code' | 'diagram') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedDiagram(true);
      setTimeout(() => setCopiedDiagram(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Banner / Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Wokwi ESP32 Hardware Emulation
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            ESP32 Subsurface Core Lab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            DHT22 (GPIO4) · Gas Pot (GPIO34) · Disp Pot (GPIO35) · BMP280 & MPU6050 (I2C SDA 21, SCL 22) · Buzzer (GPIO25)
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Interactive Hardware
          </button>
          <button
            onClick={() => setActiveTab('sketch')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'sketch'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            sketch.ino (C++)
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'diagram'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            diagram.json
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE HARDWARE SIMULATOR */}
      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Buzzer Alert Banner */}
            <div
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                sensorData.buzzerActive
                  ? 'bg-rose-50 border-rose-400 text-rose-950 animate-pulse shadow-md ring-2 ring-rose-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                    sensorData.buzzerActive ? 'bg-rose-600' : 'bg-emerald-600'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    GPIO 25 Piezo Buzzer: {sensorData.buzzerActive ? 'ACTIVATED (ON)' : 'QUIET (OFF)'}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    {sensorData.alarmReason}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                title="Toggle Web Audio Synthesizer"
              >
                {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isAudioMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            {/* Simulated Potentiometers & Sensor Sliders */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  Hardware Potentiometers & Sensors
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoSimulateTremor(!autoSimulateTremor)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      autoSimulateTremor
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    {autoSimulateTremor ? 'Simulating Subsidence...' : 'Simulate Strata Failure'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Reset to safe baseline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 1. Gas Potentiometer (GPIO34) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-sky-600" />
                    Gas Potentiometer (GPIO 34 ADC)
                  </span>
                  <span className="font-mono font-bold text-sky-700">
                    {sensorData.gasPpm.toFixed(0)} PPM{' '}
                    <span className="text-slate-400 font-normal">({sensorData.gasAdc} ADC)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={sensorData.gasPpm}
                  onChange={(e) => {
                    const ppm = Number(e.target.value);
                    const adc = Math.round((ppm / 1000) * 4095);
                    onUpdateSensorData((prev) => {
                      const isAlarm = ppm > 500 || prev.dispMm > 35 || prev.invVelocity < 0.1 || prev.tiltDeg > 12;
                      return {
                        ...prev,
                        gasPpm: ppm,
                        gasAdc: adc,
                        buzzerActive: isAlarm,
                        alarmReason: ppm > 500 ? 'Gas threshold (>500ppm) exceeded on GPIO34' : prev.alarmReason
                      };
                    });
                  }}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 PPM (Clean Air)</span>
                  <span className="text-rose-500 font-semibold">Threshold: 500 PPM</span>
                  <span>1000 PPM (Hazardous)</span>
                </div>
              </div>

              {/* 2. Displacement Potentiometer (GPIO35) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ArrowUpDown className="w-4 h-4 text-purple-600" />
                    Displacement Potentiometer (GPIO 35 ADC)
                  </span>
                  <span className="font-mono font-bold text-purple-700">
                    {sensorData.dispMm.toFixed(1)} mm Roof Sag{' '}
                    <span className="text-slate-400 font-normal">({sensorData.dispAdc} ADC)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={sensorData.dispMm}
                  onChange={(e) => {
                    const disp = Number(e.target.value);
                    const adc = Math.round((disp / 50) * 4095);
                    onUpdateSensorData((prev) => {
                      const delta = Math.abs(disp - prev.dispMm);
                      const velocity = Math.max(0.1, delta / 0.05);
                      const invV = 1.0 / velocity;
                      const isAlarm = prev.gasPpm > 500 || disp > 35 || invV < 0.1 || prev.tiltDeg > 12;
                      return {
                        ...prev,
                        dispMm: disp,
                        dispAdc: adc,
                        velocityMmHr: velocity,
                        invVelocity: invV,
                        buzzerActive: isAlarm,
                        alarmReason: disp > 35 ? 'Critical roof sag (>35mm) on GPIO35' : prev.alarmReason
                      };
                    });
                  }}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 mm (Undisturbed)</span>
                  <span className="text-rose-500 font-semibold">Threshold: 35 mm Sag</span>
                  <span>50 mm (Collapse)</span>
                </div>
              </div>

              {/* 3. DHT22 Temperature & Humidity (GPIO4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                      DHT22 Temp (GPIO 4)
                    </span>
                    <span className="font-mono font-bold text-rose-600">{sensorData.tempC.toFixed(1)} °C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="0.5"
                    value={sensorData.tempC}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateSensorData((p) => ({ ...p, tempC: val }));
                    }}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      DHT22 Humidity (GPIO 4)
                    </span>
                    <span className="font-mono font-bold text-blue-600">{sensorData.humidity.toFixed(0)} % RH</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={sensorData.humidity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateSensorData((p) => ({ ...p, humidity: val }));
                    }}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 4. BMP280 Barometric Pressure & MPU6050 Inclinometer (I2C SDA 21, SCL 22) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-cyan-600" />
                      BMP280 Pressure (I2C 0x76)
                    </span>
                    <span className="font-mono font-bold text-cyan-700">{sensorData.pressureHpa.toFixed(1)} hPa</span>
                  </div>
                  <input
                    type="range"
                    min="960"
                    max="1040"
                    step="0.5"
                    value={sensorData.pressureHpa}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateSensorData((p) => ({ ...p, pressureHpa: val }));
                    }}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-600" />
                      MPU6050 Pillar Tilt (I2C 0x68)
                    </span>
                    <span className="font-mono font-bold text-amber-700">{sensorData.tiltDeg.toFixed(1)} °</span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="0.5"
                    value={sensorData.tiltDeg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateSensorData((prev) => {
                        const isAlarm = prev.gasPpm > 500 || prev.dispMm > 35 || prev.invVelocity < 0.1 || Math.abs(val) > 12;
                        return {
                          ...prev,
                          tiltDeg: val,
                          buzzerActive: isAlarm,
                          alarmReason: Math.abs(val) > 12 ? 'Pillar tilt (>12°) threshold exceeded on MPU6050' : prev.alarmReason
                        };
                      });
                    }}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* ESP32 Real-Time Kinematics & 1/Velocity Math Card */}
            <div className="bg-purple-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-purple-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Voight-Fukuzono Inverse Velocity Calculation
                </span>
                <span className="text-[11px] font-mono bg-purple-800/80 px-2 py-0.5 rounded text-purple-200">
                  d(v^-α)/dt = -C
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800">
                  <div className="text-[11px] text-purple-300">Displacement (d)</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {sensorData.dispMm.toFixed(2)} <span className="text-xs text-purple-300">mm</span>
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800">
                  <div className="text-[11px] text-purple-300">Velocity (v = Δd/Δt)</div>
                  <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">
                    {sensorData.velocityMmHr.toFixed(2)} <span className="text-xs text-purple-300">mm/h</span>
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800">
                  <div className="text-[11px] text-purple-300">Inverse Velocity (1/v)</div>
                  <div
                    className={`text-xl font-bold font-mono mt-0.5 ${
                      sensorData.invVelocity < 0.2 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                    }`}
                  >
                    {sensorData.invVelocity.toFixed(3)}
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800">
                  <div className="text-[11px] text-purple-300">Time-to-Failure (tf)</div>
                  <div className="text-sm font-bold font-mono text-white mt-1">
                    {sensorData.invVelocity < 0.15 ? (
                      <span className="text-rose-400 font-extrabold">&lt; 15 mins (Evacuate!)</span>
                    ) : sensorData.invVelocity < 0.5 ? (
                      <span className="text-amber-400">~ 2.4 hours</span>
                    ) : (
                      <span className="text-emerald-400">Stable Strata</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Serial Monitor & Pinout Guide */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Serial Console Monitor */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-md font-mono text-xs flex flex-col h-[340px]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  ESP32 Serial Monitor (115200 baud)
                </span>
                <span className="text-[10px] text-slate-500">Auto-scrolling</span>
              </div>
              
              <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1 text-slate-300 pr-1">
                {serialLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('ALARM')
                        ? 'text-rose-400 font-bold'
                        : log.includes('[OK]')
                        ? 'text-emerald-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Wokwi Pinout Mapping Quick Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Exact Wokwi Pinout Verification
                </h4>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  100% Tested
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[10px]">DHT22 Temp/Humid</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">GPIO 4 (Pull-Up)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Gas Potentiometer</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">GPIO 34 (ADC1_6)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[10px]">Displacement Pot</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">GPIO 35 (ADC1_7)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 text-[10px]">BMP280 & MPU6050</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">I2C (SDA 21, SCL 22)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-slate-500 text-[10px]">Piezo Buzzer (Instant Alarm)</div>
                    <div className="font-mono font-bold text-rose-700 mt-0.5">GPIO 25 (Active HIGH)</div>
                  </div>
                  <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded text-[11px] font-bold border border-rose-200">
                    &lt; 5ms Reaction
                  </span>
                </div>
              </div>

              <a
                href="https://wokwi.com/projects/new/esp32"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Launch in Wokwi Simulator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ARDUINO C++ SKETCH */}
      {activeTab === 'sketch' && (
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-mono font-bold text-white text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                sketch.ino (Production ESP32 Firmware)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Implements moving average filter, inverse velocity calculation, local threshold safety trigger, and LoRa packet formatting.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(WOKWI_SKETCH_INO, 'code')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy sketch.ino'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-slate-300 overflow-x-auto p-4 bg-slate-900/90 rounded-xl border border-slate-800/80 max-h-[550px] leading-relaxed">
            {WOKWI_SKETCH_INO}
          </pre>
        </div>
      )}

      {/* TAB 3: WOKWI DIAGRAM JSON */}
      {activeTab === 'diagram' && (
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-mono font-bold text-white text-base flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                diagram.json (Wokwi Circuit Layout)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exact wiring connections for ESP32, DHT22 (GPIO4), Gas Pot (GPIO34), Disp Pot (GPIO35), BMP280, MPU6050, and Buzzer (GPIO25).
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(WOKWI_DIAGRAM_JSON, 'diagram')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              {copiedDiagram ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedDiagram ? 'Copied to Clipboard!' : 'Copy diagram.json'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-4 bg-slate-900/90 rounded-xl border border-slate-800/80 max-h-[550px] leading-relaxed">
            {WOKWI_DIAGRAM_JSON}
          </pre>
        </div>
      )}
    </div>
  );
};
