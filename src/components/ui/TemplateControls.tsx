"use client";

import React, { useRef, useState } from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { PRESET_OPTIONS } from "@/data/presets";
import { Download, Upload, RotateCcw, Check, Sparkles } from "lucide-react";

export const TemplateControls: React.FC = () => {
  const document = useSOWStore((state) => state.document);
  const loadPreset = useSOWStore((state) => state.loadPreset);
  const resetDocument = useSOWStore((state) => state.resetDocument);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imported, setImported] = useState(false);

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(document, null, 2));
    const downloadAnchor = window.document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    const safeRef = (document.meta.refNumber || "SOW_QUOTATION").replace(/[^a-zA-Z0-9-_]/g, "_");
    downloadAnchor.setAttribute("download", `${safeRef}.json`);
    window.document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.meta && json.financials) {
          loadPreset(json);
          setImported(true);
          setTimeout(() => setImported(false), 2000);
        } else {
          alert("Invalid SOW JSON structure.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 bg-slate-900 text-white border-b border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
            S
          </div>
          <div>
            <h1 className="text-xs font-black tracking-wide uppercase">SOW &amp; Quotation Engine</h1>
            <p className="text-[10px] text-slate-400">SOFTINFOX • 2-Page A4 PDF Builder</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm("Reset current form back to default Cotton ERP proposal?")) {
              resetDocument();
            }
          }}
          title="Reset to default"
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset template selector */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Load Template Preset:
        </label>
        <select
          onChange={(e) => {
            const found = PRESET_OPTIONS.find((p) => p.id === e.target.value);
            if (found) loadPreset(found.data);
          }}
          defaultValue="cotton"
          className="w-full bg-slate-800 text-slate-100 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
        >
          {PRESET_OPTIONS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* JSON Import & Export Tools */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-xs">
        <button
          onClick={handleExportJson}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition border border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition border border-slate-700"
        >
          {imported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Upload className="w-3.5 h-3.5" />}
          <span>{imported ? "Imported!" : "Import JSON"}</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJson}
          className="hidden"
        />
      </div>
    </div>
  );
};
