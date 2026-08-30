"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { Plus, Trash2, ShieldCheck, Milestone } from "lucide-react";
import { formatINR, calculateAMC, calculateFinancials, calculateMilestones } from "@/utils/currency";

export const AmcMilestonesTab: React.FC = () => {
  const amc = useSOWStore((state) => state.document.amc);
  const milestones = useSOWStore((state) => state.document.milestones);
  const financials = useSOWStore((state) => state.document.financials);

  const updateAmc = useSOWStore((state) => state.updateAmc);
  const setMilestonePreset = useSOWStore((state) => state.setMilestonePreset);
  const updateMilestoneStage = useSOWStore((state) => state.updateMilestoneStage);
  const addMilestoneStage = useSOWStore((state) => state.addMilestoneStage);
  const removeMilestoneStage = useSOWStore((state) => state.removeMilestoneStage);

  const financialCalculations = calculateFinancials(financials.items, financials.gstRate);
  const amcCalculations = calculateAMC(amc.amount, amc.gstRate);
  const stagesWithRupees = calculateMilestones(financialCalculations.grandTotal, milestones.stages);

  const totalPercentage = milestones.stages.reduce((sum, s) => sum + (Number(s.percentage) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Section 4: AMC Configuration */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Section 4: AMC &amp; Cloud Maintenance
          </h3>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Total AMC: {formatINR(amcCalculations.grandTotal)} / yr
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            AMC Service Description
          </label>
          <input
            type="text"
            value={amc.description}
            onChange={(e) => updateAmc({ description: e.target.value })}
            placeholder="Cloud Server Hosting, Automated Daily Backups & Support"
            className="w-full px-2.5 py-1.5 text-xs font-medium text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Billing Frequency
            </label>
            <input
              type="text"
              value={amc.frequency}
              onChange={(e) => updateAmc({ frequency: e.target.value })}
              placeholder="Yearly (Post Year 1)"
              className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Base Amount (INR)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ₹
              </span>
              <input
                type="number"
                value={amc.amount}
                onChange={(e) => updateAmc({ amount: Number(e.target.value) || 0 })}
                placeholder="30000"
                className="w-full pl-6 pr-2.5 py-1.5 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              AMC GST Rate (%)
            </label>
            <input
              type="number"
              value={amc.gstRate}
              onChange={(e) => updateAmc({ gstRate: Number(e.target.value) || 0 })}
              placeholder="18"
              className="w-full px-2.5 py-1.5 text-xs font-medium text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Payment Schedule & Milestones */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Section 5: Payment Milestones ({milestones.stages.length})
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">Preset:</span>
            {(["60-30-10", "50-50", "40-40-20"] as const).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setMilestonePreset(preset)}
                className={`px-2 py-1 text-xs font-bold rounded-md border transition ${
                  milestones.preset === preset
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Validation indicator */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg text-xs">
          <span className="text-slate-600 font-medium">
            Total Split Percentage:{" "}
            <strong className={totalPercentage === 100 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
              {totalPercentage}%
            </strong>
          </span>
          {totalPercentage !== 100 && (
            <span className="text-red-600 text-[11px] font-semibold">
              Warning: Percentages must sum to 100%
            </span>
          )}
        </div>

        {/* Milestone Stages List */}
        <div className="space-y-3">
          {stagesWithRupees.map((stage, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-700">Stage #{idx + 1}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-blue-600">
                    {formatINR(stage.amount, false)}
                  </span>
                  <button
                    onClick={() => removeMilestoneStage(idx)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition ml-2"
                    title="Delete stage"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={stage.percentage}
                    onChange={(e) =>
                      updateMilestoneStage(idx, { percentage: Number(e.target.value) || 0 })
                    }
                    placeholder="60"
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-blue-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white text-center"
                  />
                </div>

                <div className="sm:col-span-9">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Stage Name / Label
                  </label>
                  <input
                    type="text"
                    value={stage.label}
                    onChange={(e) => updateMilestoneStage(idx, { label: e.target.value })}
                    placeholder="e.g. Advance Payment"
                    className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Deliverable Trigger Description
                </label>
                <input
                  type="text"
                  value={stage.description}
                  onChange={(e) => updateMilestoneStage(idx, { description: e.target.value })}
                  placeholder="Project kickoff, standalone repo & domain provisioning..."
                  className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => addMilestoneStage()}
          className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Milestone Stage</span>
        </button>
      </div>
    </div>
  );
};
