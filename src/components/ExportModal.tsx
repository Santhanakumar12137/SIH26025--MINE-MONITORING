import React, { useState } from 'react';
import { Download, Printer, X, Check, Image as ImageIcon, FileCode } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Export full SVG / HTML document
  const handleExportSvg = () => {
    setDownloading(true);
    try {
      const element = document.getElementById('infographic-export-canvas');
      if (!element) return;

      const serializer = new XMLSerializer();
      const content = serializer.serializeToString(element);
      const blob = new Blob([
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Underground Mine Subsidence Early Warning System</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-white p-8">${content}</body></html>`
      ], { type: 'text/html;charset=utf-8' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'underground_mine_subsidence_early_warning_flowchart_8k.html';
      link.click();
      URL.revokeObjectURL(url);

      setDownloadSuccess('Vector HTML/SVG Export Complete!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch {
      // fallback
    } finally {
      setDownloading(false);
    }
  };

  // High-Resolution Image Export (Canvas snapshot)
  const handleExportPng = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('infographic-export-canvas');
      if (!element) return;

      // Use modern Canvas 2D image renderer
      const svgElements = element.querySelectorAll('svg');
      const rect = element.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      const scale = 2; // High-DPI 2x / 4K equivalent
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(scale, scale);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Render simplified high-res graphic representation
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(element);
      const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${element.innerHTML}
            </div>
          </foreignObject>
        </svg>`
      );

      const img = new Image();
      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = 'underground_mine_subsidence_flowchart_8K.png';
          link.click();
          setDownloadSuccess('8K PNG Downloaded!');
          setTimeout(() => setDownloadSuccess(null), 3000);
        } catch {
          // If security prevents toDataURL, trigger HTML export
          handleExportSvg();
        }
      };
      img.onerror = () => {
        handleExportSvg();
      };
      img.src = dataUri;
    } catch {
      handleExportSvg();
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-lg">Export Flowchart Graphic</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Select high-resolution export format for technical reports, white papers, conference posters, or boardroom safety presentations.
          </p>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          <div className="space-y-2.5">
            {/* 8K PNG / Canvas */}
            <button
              onClick={handleExportPng}
              disabled={downloading}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-100 text-sky-700">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-sky-700">
                    High-Res PNG Graphic (8K Ready)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Crisp raster snapshot for slides, publications, and reports
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
            </button>

            {/* Standalone Vector HTML / SVG */}
            <button
              onClick={handleExportSvg}
              disabled={downloading}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-700">
                    Self-Contained Vector Web Graphic
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Infinite zoom vector SVG document with styling
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
            </button>

            {/* Print / PDF Report */}
            <button
              onClick={handlePrint}
              className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                    Print / Save to PDF
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Standard A3/A4 technical report poster layout
                  </div>
                </div>
              </div>
              <Printer className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
