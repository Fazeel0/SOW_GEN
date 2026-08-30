"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { Plus, Trash2, Shield } from "lucide-react";

const COMMON_TERMS = [
  "Third-Party API Charges: WhatsApp Cloud API message credits (Meta/Twilio), SMS gateways, E-Way Bill/E-Invoice GSP portal fees, and payment gateway MDR charges are billed directly by respective providers — not included in this quotation.",
  "Out of Scope: Any feature or module not explicitly listed in Section 2 shall be scoped and quoted as a separate change request.",
  "Data & Backups: Daily automated backups are part of AMC. Client is responsible for business data accuracy and regulatory compliance.",
  "Deployment: Domain & server setup begins upon advance payment receipt. Production credentials handed over upon final payment settlement.",
  "Hardware & Peripherals: Printer, barcode scanner, thermal scale hardware purchases and onsite LAN networking are client responsibility.",
  "Warranty Support: 30 days complimentary post-deployment bug fixing and operational assistance included.",
];

export const TermsTab: React.FC = () => {
  const terms = useSOWStore((state) => state.document.terms);
  const addTerm = useSOWStore((state) => state.addTerm);
  const updateTerm = useSOWStore((state) => state.updateTerm);
  const removeTerm = useSOWStore((state) => state.removeTerm);

  return (
    <div className="space-y-6">
      {/* Terms & Conditions List */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Section 6: Terms &amp; Safety Clauses ({terms.length})
          </h3>
          <button
            onClick={() => addTerm("New operational or safety clause.")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Clause</span>
          </button>
        </div>

        <div className="space-y-3">
          {terms.map((term, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Clause #{idx + 1}</span>
                <button
                  onClick={() => removeTerm(idx)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                  title="Delete clause"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea
                rows={2}
                value={term}
                onChange={(e) => updateTerm(idx, e.target.value)}
                placeholder="Third-Party API Charges..."
                className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Quick Clauses */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          Standard Boilerplate Quick-Add
        </h3>
        <p className="text-[11px] text-slate-500">
          Click any preset clause below to append it to your proposal:
        </p>

        <div className="space-y-2">
          {COMMON_TERMS.map((presetClause, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addTerm(presetClause)}
              className="w-full text-left p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-xs text-slate-700 hover:text-blue-900 transition flex items-start gap-2"
            >
              <Plus className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
              <span className="line-clamp-2">{presetClause}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
