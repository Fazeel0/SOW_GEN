"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { Plus, Trash2 } from "lucide-react";

export const OverviewTab: React.FC = () => {
  const overview = useSOWStore((state) => state.document.executiveOverview);
  const updateExecutiveOverview = useSOWStore((state) => state.updateExecutiveOverview);
  const addOverviewBullet = useSOWStore((state) => state.addOverviewBullet);
  const updateOverviewBullet = useSOWStore((state) => state.updateOverviewBullet);
  const removeOverviewBullet = useSOWStore((state) => state.removeOverviewBullet);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Section 1: Executive Overview Title &amp; Intro
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={overview.title}
            onChange={(e) => updateExecutiveOverview({ title: e.target.value })}
            placeholder="1. Executive Overview & Business Workflow"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Overview Summary Paragraph
          </label>
          <textarea
            rows={2}
            value={overview.summaryText}
            onChange={(e) => updateExecutiveOverview({ summaryText: e.target.value })}
            placeholder="This proposal covers end-to-end engineering of a standalone..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
          />
        </div>
      </div>

      {/* Bullet Points / Workflow Steps */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Workflow Bullet Points ({overview.bulletPoints?.length || 0})
          </h3>
          <button
            onClick={() => addOverviewBullet("Workflow Step:", "Detailed description of operations.")}
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Point</span>
          </button>
        </div>

        <div className="space-y-3">
          {overview.bulletPoints?.map((bullet, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-600">Point #{idx + 1}</span>
                <button
                  onClick={() => removeOverviewBullet(idx)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                  title="Delete point"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">
                  Bold Header / Prefix
                </label>
                <input
                  type="text"
                  value={bullet.label}
                  onChange={(e) => updateOverviewBullet(idx, e.target.value, bullet.text)}
                  placeholder="e.g. Procurement (Buying from Farmers):"
                  className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-900 rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">
                  Description Text
                </label>
                <textarea
                  rows={2}
                  value={bullet.text}
                  onChange={(e) => updateOverviewBullet(idx, bullet.label, e.target.value)}
                  placeholder="Weighbridge gross and tare weight..."
                  className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-md border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          ))}

          {(!overview.bulletPoints || overview.bulletPoints.length === 0) && (
            <p className="text-xs text-slate-400 italic text-center py-4">
              No bullet points added. Click &quot;Add Point&quot; above to create one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
