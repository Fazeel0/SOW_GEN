"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { ModuleType } from "@/types/sow";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

const MODULE_TYPES: ModuleType[] = ["New", "Existing", "Existing+", "Infra", "Integration", "Custom"];
const SUGGESTED_ICONS = ["⚖️", "👤", "🏢", "🔄", "📊", "💬", "💸", "🌐", "🛒", "📦", "🤝", "👥", "☁️", "📱", "💻", "⚡", "💳", "🚀", "✨"];

export const ModulesTab: React.FC = () => {
  const modules = useSOWStore((state) => state.document.modules);
  const addModule = useSOWStore((state) => state.addModule);
  const updateModule = useSOWStore((state) => state.updateModule);
  const removeModule = useSOWStore((state) => state.removeModule);
  const reorderModules = useSOWStore((state) => state.reorderModules);

  const moveUp = (index: number) => {
    if (index > 0) reorderModules(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index < modules.length - 1) reorderModules(index, index + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add button */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Section 2: Scope of Work Matrix ({modules.length})
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Add as many modules as needed. Pages will dynamically paginate automatically.
            </p>
          </div>

          <button
            onClick={() => addModule()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Module</span>
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((mod, index) => (
          <div
            key={mod.id || index}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-3 transition hover:border-slate-300"
          >
            {/* Header / Reorder / Delete Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {mod.icon} {mod.name || "Untitled Module"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => moveUp(index)}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === modules.length - 1}
                  onClick={() => moveDown(index)}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded transition cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeModule(mod.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition ml-1 cursor-pointer"
                  title="Delete Module"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={mod.icon}
                  onChange={(e) => updateModule(mod.id, { icon: e.target.value })}
                  placeholder="⚖️"
                  className="w-full text-center px-2 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="sm:col-span-7">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Module Name
                </label>
                <input
                  type="text"
                  value={mod.name}
                  onChange={(e) => updateModule(mod.id, { name: e.target.value })}
                  placeholder="e.g. Cotton Purchase (Weighbridge)"
                  className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Type Tag
                </label>
                <select
                  value={mod.type}
                  onChange={(e) => updateModule(mod.id, { type: e.target.value as ModuleType })}
                  className="w-full px-2 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {MODULE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Icon quick picker */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] text-slate-400 mr-1">Quick emoji:</span>
              {SUGGESTED_ICONS.slice(0, 10).map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => updateModule(mod.id, { icon: emoji })}
                  className="w-6 h-6 flex items-center justify-center text-xs hover:bg-slate-100 rounded border border-transparent hover:border-slate-200 transition cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Detailed Scope Description &amp; Math Logic
              </label>
              <textarea
                rows={2}
                value={mod.description}
                onChange={(e) => updateModule(mod.id, { description: e.target.value })}
                placeholder="Load Weight − Unload (Tare) = Gross Weight..."
                className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
              />
            </div>
          </div>
        ))}

        {modules.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-xs text-slate-500">No modules added yet.</p>
            <button
              onClick={() => addModule()}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              + Add First Module
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
