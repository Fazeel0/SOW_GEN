"use client";

import React from "react";
import { SOWDocument } from "@/types/sow";

interface Props {
  document: SOWDocument;
}

export const SOWPage1: React.FC<Props> = ({ document }) => {
  const { meta, branding, client, executiveOverview, modules } = document;

  return (
    <div className="sow-page">
      {/* Document Header */}
      <div className="sow-doc-header">
        <div>
          <div className="sow-doc-badge">{branding.badgeText || "Official Quotation & Scope of Work"}</div>
          <h1>{meta.title || "Software Proposal"}</h1>
          <p>{meta.subtitle || "Commercial Proposal & Scope of Work"}</p>
        </div>
        <div className="sow-meta">
          <div>
            Ref: <strong>{meta.refNumber || "QT-2026-01"}</strong>
          </div>
          <div>
            Date: <strong>{meta.proposalDate || "August 30, 2026"}</strong>
          </div>
          <div>
            Validity: <strong>{meta.validityDays || 30} Days</strong>
          </div>
        </div>
      </div>

      {/* Page 1 Content */}
      <div className="sow-page-content">
        {/* Client Card */}
        <div className="sow-client-card">
          <div className="sow-client-card-item">
            <span>Client / Company</span>
            <strong>{client.clientName || "Client Business"}</strong>
          </div>
          <div className="sow-client-card-item">
            <span>Deployment Architecture</span>
            <strong>{client.deploymentType || "Dedicated Cloud Setup"}</strong>
          </div>
        </div>

        {/* Section 1: Executive Overview */}
        <div className="sow-section-title">{executiveOverview.title || "1. Executive Overview & Business Workflow"}</div>
        <div className="sow-overview-box">
          {executiveOverview.summaryText && <p>{executiveOverview.summaryText}</p>}
          {executiveOverview.bulletPoints && executiveOverview.bulletPoints.length > 0 && (
            <ul>
              {executiveOverview.bulletPoints.map((bullet, idx) => (
                <li key={idx}>
                  {bullet.label && <strong>{bullet.label} </strong>}
                  <span>{bullet.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section 2: Scope of Work - Modules */}
        <div className="sow-section-title">2. Scope of Work — Modules Included</div>
        <table className="sow-modules-table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>#</th>
              <th style={{ width: "27%" }}>Module</th>
              <th>Detailed Scope &amp; Features</th>
              <th style={{ width: "13%" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, idx) => (
              <tr key={mod.id || idx}>
                <td>{idx + 1}</td>
                <td>
                  <span className="sow-mod-name">
                    {mod.icon} {mod.name}
                  </span>
                </td>
                <td>
                  <span className="sow-mod-desc">{mod.description}</span>
                </td>
                <td>
                  <span className="sow-mod-tag">{mod.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="sow-page-footer">
        <span>{branding.confidentialText || "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions"}</span>
        <span>Commercial Proposal — {meta.refNumber || "QT-2026-01"}</span>
        <span>
          Page <strong>1 of 2</strong>
        </span>
      </div>
    </div>
  );
};
