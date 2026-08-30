"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";

export const HeaderTab: React.FC = () => {
  const meta = useSOWStore((state) => state.document.meta);
  const client = useSOWStore((state) => state.document.client);
  const branding = useSOWStore((state) => state.document.branding);
  
  const updateMeta = useSOWStore((state) => state.updateMeta);
  const updateClient = useSOWStore((state) => state.updateClient);
  const updateBranding = useSOWStore((state) => state.updateBranding);

  return (
    <div className="space-y-6">
      {/* Proposal Metadata */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Document Metadata
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proposal Reference No.
            </label>
            <input
              type="text"
              value={meta.refNumber}
              onChange={(e) => updateMeta({ refNumber: e.target.value })}
              placeholder="e.g. QT-COTTON-2026-01"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proposal Date
            </label>
            <input
              type="text"
              value={meta.proposalDate}
              onChange={(e) => updateMeta({ proposalDate: e.target.value })}
              placeholder="e.g. August 30, 2026"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Validity (Days)
            </label>
            <input
              type="number"
              value={meta.validityDays}
              onChange={(e) => updateMeta({ validityDays: Number(e.target.value) || 0 })}
              placeholder="30"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Header Badge Text
            </label>
            <input
              type="text"
              value={branding.badgeText}
              onChange={(e) => updateBranding({ badgeText: e.target.value })}
              placeholder="Official Quotation & Scope of Work"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Proposal Title
          </label>
          <input
            type="text"
            value={meta.title}
            onChange={(e) => updateMeta({ title: e.target.value })}
            placeholder="e.g. Cotton ERP Software Proposal"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subtitle / System Category
          </label>
          <input
            type="text"
            value={meta.subtitle}
            onChange={(e) => updateMeta({ subtitle: e.target.value })}
            placeholder="e.g. Dedicated Cotton Ginning, Weighbridge & Accounts System"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          Client &amp; Target Setup
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Client / Company Name
          </label>
          <input
            type="text"
            value={client.clientName}
            onChange={(e) => updateClient({ clientName: e.target.value })}
            placeholder="e.g. Vaibhav Cotton Industries"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Deployment Architecture
          </label>
          <input
            type="text"
            value={client.deploymentType}
            onChange={(e) => updateClient({ deploymentType: e.target.value })}
            placeholder="e.g. Dedicated Server & Custom Domain"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Agency Branding & Confidentiality */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-600"></span>
          Agency Branding &amp; Footer
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              value={branding.companyName}
              onChange={(e) => updateBranding({ companyName: e.target.value })}
              placeholder="SOFTINFOX"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Parent Entity
            </label>
            <input
              type="text"
              value={branding.parentCompany}
              onChange={(e) => updateBranding({ parentCompany: e.target.value })}
              placeholder="by Five7 IT Solutions"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Footer Confidentiality Notice
          </label>
          <input
            type="text"
            value={branding.confidentialText}
            onChange={(e) => updateBranding({ confidentialText: e.target.value })}
            placeholder="CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>
    </div>
  );
};
