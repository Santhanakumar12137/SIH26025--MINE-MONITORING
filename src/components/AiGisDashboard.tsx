import React, { useState } from 'react';
import { SensorData } from '../types';
import {
  BrainCircuit,
  MapPin,
  Activity,
  AlertTriangle,
  Send,
  ShieldAlert,
  Layers,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Clock,
  Radio,
  FileCheck
} from 'lucide-react';

interface Props {
  sensorData: SensorData;
}

export const AiGisDashboard: React.FC<Props> = ({ sensorData }) => {
  const [selectedZone, setSelectedZone] = useState<'Face-01' | 'Shaft-03' | 'Gallery-04'>('Face-01');
  const [sentAlerts, setSentAlerts] = useState<string[]>([
    '08:42:10 - [INFO] Baseline calibration verified for Gallery-04',
    '08:55:00 - [TELEMETRY] Sensor Node #01: Normal strata deformation rate (0.42 mm/h)'
  ]);
  const [newAlertPhone, setNewAlertPhone] = useState('+1 (555) 019-2834');
  const [alertDispatched, setAlertDispatched] = useState(false);

  // Time-to-failure calculation based on 1/v
  const timeToFailureHours = Math.max(0.1, sensorData.invVelocity * 1.8);
  const tfMinutes = Math.round(timeToFailureHours * 60);

  const handleManualAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    setSentAlerts((prev) => [
      `${time} - [EMERGENCY DISPATCH] Sent to Shift Supervisor (${newAlertPhone}): Critical roof sag alert!`,
      ...prev
    ]);
    setAlertDispatched(true);
    setTimeout(() => setAlertDispatched(false), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              AI / ML Geomechanics & GIS Spatial Twin
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Predictive Subsidence & GIS Mapping
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Inverse Velocity ($1/v \to 0$) extrapolation · Digital mine elevation strata · Multi-channel alert dispatch
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
            sensorData.alarmState === 'CRITICAL'
              ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse'
              : 'bg-emerald-50 border-emerald-300 text-emerald-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>
            Strata Hazard State: {sensorData.alarmState === 'CRITICAL' ? 'IMMINENT FAILURE' : 'STABLE FORMATION'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI / ML Inverse Velocity Graph */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Inverse Velocity Graph (Voight-Fukuzono)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                1/v = {sensorData.invVelocity.toFixed(3)}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When progressive rock failure accelerates in underground headings, the inverse of deformation velocity (1/v) decays linearly toward zero. Extrapolating the regression line to the horizontal axis (1/v = 0) predicts the exact Time-to-Failure ($t_f$).
            </p>

            {/* Custom SVG Inverse Velocity Graph */}
            <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
              <svg viewBox="0 0 400 200" className="w-full h-44 overflow-visible" fill="none">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Axes */}
                <line x1="40" y1="10" x2="40" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="160" x2="380" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Axis Labels */}
                <text x="35" y="24" fill="#94a3b8" fontSize="8" textAnchor="end">3.0</text>
                <text x="35" y="64" fill="#94a3b8" fontSize="8" textAnchor="end">2.0</text>
                <text x="35" y="104" fill="#94a3b8" fontSize="8" textAnchor="end">1.0</text>
                <text x="35" y="144" fill="#94a3b8" fontSize="8" textAnchor="end">0.2</text>
                <text x="35" y="163" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="end">0 (tf)</text>

                <text x="40" y="174" fill="#94a3b8" fontSize="8">t0</text>
                <text x="140" y="174" fill="#94a3b8" fontSize="8">t+1h</text>
                <text x="240" y="174" fill="#94a3b8" fontSize="8">t+2h</text>
                <text x="340" y="174" fill="#ef4444" fontSize="8" fontWeight="bold">Collapse (tf)</text>

                {/* Theoretical Decay Curve */}
                <path
                  d="M 40 40 Q 140 70 240 120 T 340 160"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Extrapolation Dashed Line to 0 */}
                <line
                  x1="240"
                  y1="120"
                  x2="340"
                  y2="160"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Current State Marker Point */}
                {(() => {
                  const clampedInvV = Math.max(0, Math.min(3, sensorData.invVelocity));
                  // 1/v=3.0 -> y=20, 1/v=0 -> y=160
                  const currentY = 160 - (clampedInvV / 3.0) * 140;
                  const currentX = 40 + (1 - clampedInvV / 3.0) * 300;
                  return (
                    <g>
                      <circle cx={currentX} cy={currentY} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                      <line x1={currentX} y1={currentY} x2={currentX} y2="160" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                      <text x={currentX + 8} y={currentY - 4} fill="#ffffff" fontSize="9" fontWeight="bold">
                        Now (1/v = {sensorData.invVelocity.toFixed(2)})
                      </text>
                    </g>
                  );
                })()}

                {/* Zero Failure Point */}
                <circle cx="340" cy="160" r="4" fill="#ef4444" />
              </svg>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Calculated Trend Curve
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Critical Failure Axis (1/v → 0)
                </span>
              </div>
            </div>

            {/* AI Failure Prediction Summary */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-500 font-medium">Deformation Rate</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                  {sensorData.velocityMmHr.toFixed(2)} mm/h
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-[11px] text-amber-800 font-medium">Estimated Time-to-Failure</span>
                <div className="text-lg font-bold text-amber-900 font-mono mt-0.5">
                  {sensorData.invVelocity < 0.15 ? (
                    <span className="text-rose-600 font-extrabold">&lt; 15 mins (Evacuate!)</span>
                  ) : (
                    <span>~ {tfMinutes} minutes</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Alert SMS Dispatcher */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Automated Alert Dispatcher (SMS / App)
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Cellular SMS & FCM
              </span>
            </div>

            <form onSubmit={handleManualAlert} className="flex gap-2">
              <input
                type="text"
                value={newAlertPhone}
                onChange={(e) => setNewAlertPhone(e.target.value)}
                placeholder="Supervisor Mobile Number"
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test Dispatch</span>
              </button>
            </form>

            {alertDispatched && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Emergency notification broadcast successfully!</span>
              </div>
            )}

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {sentAlerts.map((msg, i) => (
                <div key={i} className="text-[11px] font-mono p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: GIS Mine Map & Subsidence Visualizer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  GIS Subsurface Digital Twin
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {(['Face-01', 'Shaft-03', 'Gallery-04'] as const).map((z) => (
                  <button
                    key={z}
                    onClick={() => setSelectedZone(z)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      selectedZone === z
                        ? 'bg-pink-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Mine Cross-Section SVG Diagram */}
            <div className="w-full bg-slate-100 p-4 rounded-xl border border-slate-200 relative overflow-hidden">
              <svg viewBox="0 0 400 240" className="w-full h-56" fill="none">
                {/* Surface Ground Elevation Line */}
                <path d="M 0 40 Q 150 42 220 55 T 400 40" stroke="#15803d" strokeWidth="3" fill="#dcfce7" />
                <text x="10" y="32" fill="#166534" fontSize="9" fontWeight="bold">Surface Topography (0m)</text>

                {/* Overburden Strata (Sandstone / Shale) */}
                <rect x="0" y="45" width="400" height="50" fill="#fef3c7" opacity="0.6" />
                <text x="10" y="70" fill="#b45309" fontSize="8">Sandstone Overburden Strata (-150m)</text>

                {/* Fractured Flexure Zone (Subsidence Trough) */}
                <path
                  d="M 120 45 Q 220 85 300 45"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  fill="rgba(239, 68, 68, 0.15)"
                />
                <text x="210" y="80" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Subsidence Depression Basin
                </text>

                {/* Hard Rock Bedrock Layer */}
                <rect x="0" y="95" width="400" height="55" fill="#e2e8f0" />
                <text x="10" y="115" fill="#475569" fontSize="8">Shale / Siltstone Layer (-320m)</text>

                {/* Coal Extraction Gallery / Seam */}
                <rect x="0" y="150" width="400" height="50" fill="#334155" />
                <text x="10" y="175" fill="#f8fafc" fontSize="8" fontWeight="bold">Active Coal Seam Gallery (-480m)</text>

                {/* Excavated Void / Goaf */}
                <rect x="150" y="150" width="140" height="40" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="220" y="172" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Active Longwall Face {selectedZone}
                </text>

                {/* Underground Mine Cart & Rails */}
                <line x1="20" y1="188" x2="380" y2="188" stroke="#94a3b8" strokeWidth="2" />
                <rect x="90" y="176" width="24" height="12" rx="2" fill="#0284c7" />
                <circle cx="96" cy="189" r="2.5" fill="#1e293b" />
                <circle cx="108" cy="189" r="2.5" fill="#1e293b" />

                {/* Sensor Node Indicator on Roof */}
                <g transform="translate(220, 150)">
                  <circle cx="0" cy="0" r="7" fill={sensorData.alarmState === 'CRITICAL' ? '#ef4444' : '#10b981'} className="animate-pulse" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <text x="12" y="4" fill="#ffffff" fontSize="8" fontWeight="bold">
                    ESP32 Node #01
                  </text>
                  {/* Roof Sag Measurement Vector */}
                  <line x1="0" y1="0" x2="0" y2={Math.min(25, sensorData.dispMm * 0.7)} stroke="#ef4444" strokeWidth="2" markerEnd="url(#branch-red)" />
                </g>

                {/* Pithead Shaft & Gateway Antenna */}
                <rect x="330" y="30" width="25" height="160" fill="#64748b" opacity="0.3" stroke="#475569" strokeDasharray="3 3" />
                <line x1="342" y1="10" x2="342" y2="30" stroke="#0d9488" strokeWidth="3" />
                <circle cx="342" cy="10" r="3" fill="#14b8a6" />
                <text x="350" y="16" fill="#0f766e" fontSize="7" fontWeight="bold">LoRa Gateway</text>
              </svg>

              <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Sensor Node Active (-480m)
                </span>
                <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Subsidence Zone ({sensorData.dispMm.toFixed(1)}mm Roof Sag)
                </span>
              </div>
            </div>

            {/* Risk Zones Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Spatiotemporal Subsidence Risk Classifications
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="font-bold text-emerald-900">Zone A (Stable)</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Disp &lt; 15mm · Safe</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-900">Zone B (Creep)</div>
                  <div className="text-[11px] text-amber-700 mt-0.5">15–35mm · Monitored</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="font-bold text-rose-900">Zone C (Critical)</div>
                  <div className="text-[11px] text-rose-700 mt-0.5">&gt; 35mm · Evacuate</div>
                </div>
              </div>
            </div>

            {/* Rescue Protocol Checklist */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-rose-600" />
                  Autonomous Emergency Evacuation Sequence
                </span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  DGMS Protocol 4B
                </span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Subsurface audible siren triggered on GPIO25</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Emergency green escape path strobes illuminated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Main shaft hoisting cage given emergency descent priority</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Surface rescue brigade standby alert dispatched</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
