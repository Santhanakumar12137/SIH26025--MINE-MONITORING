import React from 'react';
import { FlowchartNode } from '../types';
import { X, Cpu, Zap, AlertTriangle, ArrowRight, Activity, Radio, Database, Shield } from 'lucide-react';

interface Props {
  node: FlowchartNode | null;
  onClose: () => void;
  onOpenHardwareLab: () => void;
}

export const NodeDetailModal: React.FC<Props> = ({ node, onClose, onOpenHardwareLab }) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className={`p-6 border-b ${node.borderClass} ${node.bgClass} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${node.accentClass}`}>
              {node.stepNumber ?? '!'}
            </span>
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${node.textClass}`}>
                {node.title}
              </h3>
              {node.subtitle && (
                <p className="text-xs font-medium text-slate-500 mt-0.5">{node.subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white/80 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technical Architecture Overview</h4>
            <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-800">
              {node.techDetails?.overview || 'Core stage of the Underground Mine Subsidence Early Warning System.'}
            </p>
          </div>

          {/* Subsensors if available (Green Sensors box) */}
          {node.subSensors && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Monitored Channels ({node.subSensors.length} Real-Time Sensors)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {node.subSensors.map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{s.label}</div>
                      <div className="text-xs text-slate-500">{s.sensorModel}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {s.gpio || s.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wokwi Pinout Connection if specified */}
          {node.wokwiPins && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-600" />
                Hardware Wiring & Pinout
              </h4>
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl font-mono text-xs text-purple-900">
                {node.wokwiPins}
              </div>
            </div>
          )}

          {/* Key Functions / Bullets */}
          {node.bullets && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Operations & Algorithms</h4>
              <ul className="space-y-1.5">
                {node.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${node.accentClass}`} />
                    <span className="text-slate-800 font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Geotechnical / Scientific Formula */}
          {node.techDetails?.equation && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600" />
                Underground Failure Physics Formula
              </h4>
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl font-mono text-sm text-amber-950 flex items-center justify-between">
                <span>{node.techDetails.equation}</span>
                <span className="text-xs text-amber-700 font-sans font-semibold">Voight / Fukuzono Method</span>
              </div>
            </div>
          )}

          {/* Threshold Specifications */}
          {node.techDetails?.criticalThreshold && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Emergency Trigger Safety Threshold
              </h4>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{node.techDetails.criticalThreshold}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            System Node: <span className="font-semibold text-slate-700">{node.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenHardwareLab();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5" />
              Simulate in Wokwi Lab
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
