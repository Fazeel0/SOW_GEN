"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";

export const SignaturesTab: React.FC = () => {
  const signatures = useSOWStore((state) => state.document.signatures);
  const client = useSOWStore((state) => state.document.client);
  const updateSignature = useSOWStore((state) => state.updateSignature);

  return (
    <div className="space-y-6">
      {/* Prepared By (Technology Partner) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Left Signatory: Prepared &amp; Delivered By
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Signatory Role Header
            </label>
            <input
              type="text"
              value={signatures.preparedBy.role}
              onChange={(e) => updateSignature("preparedBy", { role: e.target.value })}
              placeholder="Prepared & Delivered By"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Badge Tag
            </label>
            <input
              type="text"
              value={signatures.preparedBy.badge}
              onChange={(e) => updateSignature("preparedBy", { badge: e.target.value })}
              placeholder="Technology Partner"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company / Brand Name
            </label>
            <input
              type="text"
              value={signatures.preparedBy.name}
              onChange={(e) => updateSignature("preparedBy", { name: e.target.value })}
              placeholder="SOFTINFOX"
              className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Legal Entity Subtitle
            </label>
            <input
              type="text"
              value={signatures.preparedBy.company}
              onChange={(e) => updateSignature("preparedBy", { company: e.target.value })}
              placeholder="by Five7 IT Solutions"
              className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sign Line Label
            </label>
            <input
              type="text"
              value={signatures.preparedBy.signLineText}
              onChange={(e) => updateSignature("preparedBy", { signLineText: e.target.value })}
              placeholder="Authorized Signatory & Seal"
              className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Domain / Industry Tagline
            </label>
            <input
              type="text"
              value={signatures.preparedBy.subText}
              onChange={(e) => updateSignature("preparedBy", { subText: e.target.value })}
              placeholder="Enterprise Software & Cloud Engineering"
              className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Accepted By (Client Authorization) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Right Signatory: Accepted &amp; Approved By (Client)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Signatory Role Header
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.role}
              onChange={(e) => updateSignature("acceptedBy", { role: e.target.value })}
              placeholder="Accepted & Approved By"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Badge Tag
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.badge}
              onChange={(e) => updateSignature("acceptedBy", { badge: e.target.value })}
              placeholder="Client Authorization"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client Company Name
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.name}
              onChange={(e) => updateSignature("acceptedBy", { name: e.target.value })}
              placeholder={client.clientName || "Vaibhav Cotton Industries"}
              className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Signatory Designation
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.company}
              onChange={(e) => updateSignature("acceptedBy", { company: e.target.value })}
              placeholder="Management Approval"
              className="w-full px-2.5 py-1.5 text-xs text-slate-700 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sign Line Label
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.signLineText}
              onChange={(e) => updateSignature("acceptedBy", { signLineText: e.target.value })}
              placeholder="Authorized Signatory & Stamp"
              className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date Line / Subtext
            </label>
            <input
              type="text"
              value={signatures.acceptedBy.subText}
              onChange={(e) => updateSignature("acceptedBy", { subText: e.target.value })}
              placeholder="Date: ________________________"
              className="w-full px-2.5 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
