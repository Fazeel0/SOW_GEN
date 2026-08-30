"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { Plus, Trash2, IndianRupee } from "lucide-react";
import { formatINR, calculateFinancials } from "@/utils/currency";

export const FinancialsTab: React.FC = () => {
  const financials = useSOWStore((state) => state.document.financials);
  const addFinancialItem = useSOWStore((state) => state.addFinancialItem);
  const updateFinancialItem = useSOWStore((state) => state.updateFinancialItem);
  const removeFinancialItem = useSOWStore((state) => state.removeFinancialItem);
  const setGstRate = useSOWStore((state) => state.setGstRate);

  const calculations = calculateFinancials(financials.items, financials.gstRate);

  return (
    <div className="space-y-6">
      {/* Live Financial Summary Card */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4 rounded-xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Automated Financial Math
          </span>
          <div className="flex items-center gap-1.5 bg-blue-800/60 px-2.5 py-1 rounded-lg text-xs">
            <span>GST Rate:</span>
            <input
              type="number"
              value={financials.gstRate}
              onChange={(e) => setGstRate(Number(e.target.value) || 0)}
              className="w-12 bg-white text-slate-900 px-1 py-0.5 rounded text-xs font-bold text-center"
            />
            <span>%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-blue-700/50">
          <div>
            <span className="text-[10px] text-blue-200 block uppercase">Sub-Total</span>
            <span className="text-sm font-bold">{formatINR(calculations.subtotal)}</span>
          </div>
          <div>
            <span className="text-[10px] text-blue-200 block uppercase">GST Amount</span>
            <span className="text-sm font-bold">{formatINR(calculations.gstAmount)}</span>
          </div>
          <div>
            <span className="text-[10px] text-blue-200 block uppercase font-bold text-emerald-300">
              Grand Total
            </span>
            <span className="text-sm font-extrabold text-emerald-300">
              {formatINR(calculations.grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Line Items */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Section 3: Investment Deliverables ({financials.items.length})
          </h3>
          <button
            onClick={() => addFinancialItem()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Line Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {financials.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-700">Line Item #{idx + 1}</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.taxable !== false}
                      onChange={(e) => updateFinancialItem(item.id, { taxable: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span className="text-[11px] font-semibold">Attracts GST</span>
                  </label>
                  <button
                    onClick={() => removeFinancialItem(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Deliverable / Scope Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateFinancialItem(item.id, { title: e.target.value })}
                    placeholder="e.g. Core ERP Base Engine & Platform Licensing"
                    className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateFinancialItem(item.id, { amount: Number(e.target.value) || 0 })}
                      placeholder="30000"
                      className="w-full pl-6 pr-2.5 py-1.5 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateFinancialItem(item.id, { category: e.target.value })}
                    placeholder="e.g. Existing Engine / Custom Development"
                    className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Subtitle / Feature Breakdown (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.subtitle || ""}
                    onChange={(e) => updateFinancialItem(item.id, { subtitle: e.target.value })}
                    placeholder="Auth, Framework, Dashboard, Security..."
                    className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
