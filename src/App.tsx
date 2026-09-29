import React, { useState } from 'react';
import { ViewMode, FlowchartNode, SensorData } from './types';
import { InfographicPoster } from './components/InfographicPoster';
import { WokwiHardwareLab } from './components/WokwiHardwareLab';
import { AiGisDashboard } from './components/AiGisDashboard';
import { NodeDetailModal } from './components/NodeDetailModal';
import { ExportModal } from './components/ExportModal';
import { buzzerAudio } from './utils/audio';
import {
  Layers,
  Cpu,
  BrainCircuit,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  ShieldAlert,
  Flame,
  Activity
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('infographic');
  const [selectedNode, setSelectedNode] = useState<FlowchartNode | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [pulseAnimation, setPulseAnimation] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Live Telemetry Simulation State across all tabs
  const [sensorData, setSensorData] = useState<SensorData>({
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
  });

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(160, prev + 15));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(70, prev - 15));
  const handleResetZoom = () => setZoomLevel(100);

  const toggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    buzzerAudio.setMuted(next);
  };

  const triggerEmergencySim = () => {
    setSensorData((prev) => ({
      ...prev,
      dispMm: 38.5,
      dispAdc: 3150,
      gasPpm: 680,
      gasAdc: 2780,
      velocityMmHr: 18.4,
      invVelocity: 0.054, // Extremely close to zero -> imminent failure!
      tiltDeg: 14.5,
      vibrationG: 2.4,
      buzzerActive: true,
      alarmState: 'CRITICAL',
      alarmReason: 'CRITICAL: Roof sag > 35mm & 1/v < 0.1 (Fukuzono failure criteria exceeded!)'
    }));
  };

  const resetSafeSim = () => {
    buzzerAudio.stop();
    setSensorData({
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
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & System Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-purple-600 to-rose-500 p-0.5 shadow-xs flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-sky-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  Underground Mine Subsidence
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-sky-100 text-sky-800 border border-sky-200">
                  Early Warning System
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Multi-Tier Geotechnical Strata Monitoring & Predictive Evacuation
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('infographic')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'infographic'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>Flowchart Poster</span>
            </button>
            <button
              onClick={() => setViewMode('hardware-lab')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'hardware-lab'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              <span>Wokwi ESP32 Lab</span>
            </button>
            <button
              onClick={() => setViewMode('ai-gis')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'ai-gis'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
              <span>AI / ML & GIS</span>
            </button>
          </div>

          {/* Global Actions */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-colors ${
                isAudioMuted
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 shadow-2xs'
              }`}
              title={isAudioMuted ? 'Unmute Buzzer Audio' : 'Mute Buzzer Audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Emergency Hazard Demo Toggle */}
            {sensorData.alarmState === 'CRITICAL' ? (
              <button
                onClick={resetSafeSim}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Safe Baseline</span>
              </button>
            ) : (
              <button
                onClick={triggerEmergencySim}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs animate-pulse"
                title="Simulate Immediate Mine Subsidence Crisis"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Test Strata Collapse</span>
              </button>
            )}

            {/* Export Button */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export 8K Infographic</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* VIEW 1: FLOWCHART INFOGRAPHIC POSTER */}
        {viewMode === 'infographic' && (
          <div className="space-y-6">
            {/* Infographic Control Bar (Zoom, Pan, Pulse) */}
            <div className="w-full max-w-[1100px] mx-auto bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Poster Canvas:</span>
                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                  {zoomLevel}%
                </span>
                <div className="flex items-center gap-1 ml-1">
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Reset to 100%"
                  >
                    100%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Data Flow Animation Toggle */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pulseAnimation}
                    onChange={(e) => setPulseAnimation(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span>Flow Animation</span>
                </label>

                <div className="text-xs text-slate-400 hidden sm:block">
                  Click any flowchart box for technical telemetry specs
                </div>
              </div>
            </div>

            {/* Scalable Container for Infographic */}
            <div className="w-full overflow-x-auto pb-8 flex justify-center">
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="shrink-0 w-full"
              >
                <InfographicPoster
                  onSelectNode={(node) => setSelectedNode(node)}
                  selectedNodeId={selectedNode?.id || null}
                  pulseAnimation={pulseAnimation}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: WOKWI ESP32 HARDWARE LAB */}
        {viewMode === 'hardware-lab' && (
          <WokwiHardwareLab
            sensorData={sensorData}
            onUpdateSensorData={setSensorData}
          />
        )}

        {/* VIEW 3: AI / ML & GIS SUBSIDENCE DASHBOARD */}
        {viewMode === 'ai-gis' && (
          <AiGisDashboard sensorData={sensorData} />
        )}
      </main>

      {/* Technical Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onOpenHardwareLab={() => {
          setSelectedNode(null);
          setViewMode('hardware-lab');
        }}
      />

      {/* Export Graphic Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
