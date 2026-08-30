"use client";

import React, { useState } from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { DynamicSOWDocument } from "./DynamicSOWDocument";
import { Printer, ZoomIn, ZoomOut, Download, Copy, Check } from "lucide-react";

export const PreviewPanel: React.FC = () => {
  const document = useSOWStore((state) => state.document);
  const zoomLevel = useSOWStore((state) => state.zoomLevel);
  const setZoomLevel = useSOWStore((state) => state.setZoomLevel);

  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 1.5);
    setZoomLevel(Math.round(newZoom * 100) / 100);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(document, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-200">
      {/* Top Floating Control Bar */}
      <header className="sow-no-print h-14 bg-white/95 backdrop-blur border-b border-slate-300 px-4 flex items-center justify-between shadow-xs z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Dynamic A4 Print Preview
          </div>
          <span className="text-xs text-slate-500 font-medium hidden md:inline">
            Auto-paginated (210mm × 297mm)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => handleZoom(-0.1)}
              title="Zoom Out"
              className="p-1.5 hover:bg-white text-slate-600 hover:text-slate-900 rounded transition cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-600 px-2 min-w-[48px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              title="Zoom In"
              className="p-1.5 hover:bg-white text-slate-600 hover:text-slate-900 rounded transition cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              title="Reset Zoom"
              className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 px-1.5 py-1 hover:bg-white rounded transition cursor-pointer"
            >
              100%
            </button>
          </div>

          <button
            onClick={handleCopyJson}
            title="Copy JSON configuration"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy JSON"}</span>
          </button>

          {/* Primary Print / Export Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition hover:shadow cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF (Ctrl+P)</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto custom-scrollbar sow-preview-main" style={{ background: "#c8cdd4" }}>
        <div
          className="sow-preview-wrapper-inner"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
            padding: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DynamicSOWDocument document={document} />
        </div>
      </main>
    </div>
  );
};
