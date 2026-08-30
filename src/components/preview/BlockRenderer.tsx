"use client";

import React from "react";
import { SOWBlock } from "@/utils/paginationEngine";
import { SOWDocument } from "@/types/sow";
import { formatINR, calculateFinancials, calculateAMC, calculateMilestones } from "@/utils/currency";

interface BlockRendererProps {
  block: SOWBlock;
  document: SOWDocument;
  isContinuation?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, document }) => {
  const { meta, branding, client, executiveOverview, financials, amc, milestones, terms, signatures } = document;

  switch (block.type) {
    case "doc-header":
      return (
        <div className="sow-doc-header">
          <div>
            <div className="sow-doc-badge">{branding.badgeText || "Official Quotation & Scope of Work"}</div>
            <h1>{meta.title || "Software Proposal"}</h1>
            <p>{meta.subtitle || "Commercial Proposal & Scope of Work"}</p>
          </div>
          <div className="sow-meta">
            <div>Ref: <strong>{meta.refNumber || "QT-2026-01"}</strong></div>
            <div>Date: <strong>{meta.proposalDate || "August 30, 2026"}</strong></div>
            <div>Validity: <strong>{meta.validityDays || 30} Days</strong></div>
          </div>
        </div>
      );

    case "client-card":
      return (
        <div className="sow-client-card">
          <div className="sow-client-card-item">
            <span>Client / Company</span>
            <strong>{client.clientName || "Client Business"}</strong>
          </div>
          <div className="sow-client-card-item">
            <span>Deployment Architecture</span>
            <strong>{client.deploymentType || "Dedicated Server Setup"}</strong>
          </div>
        </div>
      );

    case "section-title":
      return (
        <div className="sow-section-title">
          {block.data.title}
        </div>
      );

    case "overview":
      return (
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
      );

    case "modules-table-header":
      return (
        <table className="sow-modules-table sow-table-header-only">
          <thead>
            <tr>
              <th style={{ width: "6%", textAlign: "center" }}>#</th>
              <th style={{ width: "27%" }}>Module</th>
              <th>Detailed Scope &amp; Features</th>
              <th style={{ width: "12%" }}>Type</th>
            </tr>
          </thead>
        </table>
      );

    case "module-row": {
      const mod = block.data.module;
      const idx = block.data.index;
      return (
        <table className="sow-modules-table sow-row-only">
          <tbody>
            <tr>
              <td style={{ width: "6%", textAlign: "center" }}>{idx + 1}</td>
              <td style={{ width: "27%" }}>
                <span className="sow-mod-name">{mod.icon} {mod.name}</span>
              </td>
              <td>
                <span className="sow-mod-desc">{mod.description}</span>
              </td>
              <td style={{ width: "12%" }}>
                <span className="sow-mod-tag">{mod.type}</span>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    case "financials-table-header":
      return (
        <table className="sow-ptable sow-table-header-only">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>S.No</th>
              <th>Deliverable / Module Description</th>
              <th style={{ width: "18%" }}>Category</th>
              <th className="sow-tr" style={{ width: "22%" }}>Amount (INR)</th>
            </tr>
          </thead>
        </table>
      );

    case "financial-row": {
      const item = block.data.item;
      const idx = block.data.index;
      return (
        <table className="sow-ptable sow-row-only">
          <tbody>
            <tr>
              <td style={{ width: "6%" }}>{idx + 1}.</td>
              <td>
                <strong>{item.title}</strong>
                {item.subtitle && <span className="sow-sub-text">{item.subtitle}</span>}
              </td>
              <td style={{ width: "18%" }}>{item.category}</td>
              <td className="sow-tr" style={{ width: "22%" }}>{formatINR(item.amount)}</td>
            </tr>
          </tbody>
        </table>
      );
    }

    case "financials-totals": {
      const finCalc = calculateFinancials(financials.items, financials.gstRate);
      return (
        <table className="sow-ptable sow-row-only">
          <tbody>
            <tr className="sow-total-row">
              <td colSpan={3} className="sow-tr" style={{ width: "78%" }}>
                <strong>Sub-Total (Scope Deliverables):</strong>
              </td>
              <td className="sow-tr" style={{ width: "22%" }}>
                <strong>{formatINR(finCalc.subtotal)}</strong>
              </td>
            </tr>
            {financials.gstRate > 0 && (
              <tr>
                <td colSpan={3} className="sow-tr" style={{ width: "78%" }}>
                  Applicable GST @ {financials.gstRate}%
                  {finCalc.taxableAmount !== finCalc.subtotal &&
                    ` (on ${formatINR(finCalc.taxableAmount, false)} Taxable)`}:
                </td>
                <td className="sow-tr" style={{ width: "22%" }}>
                  {formatINR(finCalc.gstAmount)}
                </td>
              </tr>
            )}
            <tr className="sow-grand-row">
              <td colSpan={3} className="sow-tr" style={{ width: "78%" }}>
                <strong>TOTAL INITIAL INVESTMENT:</strong>
              </td>
              <td className="sow-tr" style={{ width: "22%" }}>
                <strong>{formatINR(finCalc.grandTotal)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    case "amc-section": {
      const amcCalc = calculateAMC(amc.amount, amc.gstRate);
      return (
        <div className="sow-section-block">
          <div className="sow-section-title">4. Annual Cloud Hosting &amp; Maintenance (AMC)</div>
          <table className="sow-ptable">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style={{ width: "22%" }}>Frequency</th>
                <th className="sow-tr" style={{ width: "22%" }}>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{amc.description || "Cloud Server Hosting, Backups & Support"}</strong></td>
                <td>{amc.frequency || "Yearly (Post Year 1)"}</td>
                <td className="sow-tr">{formatINR(amcCalc.baseAmount)}</td>
              </tr>
              {amc.gstRate > 0 && (
                <tr>
                  <td>Applicable GST ({amc.gstRate}%)</td>
                  <td>{amc.frequency || "Yearly"}</td>
                  <td className="sow-tr">{formatINR(amcCalc.gstAmount)}</td>
                </tr>
              )}
              <tr className="sow-grand-row">
                <td colSpan={2} className="sow-tr"><strong>TOTAL ANNUAL RECURRING CHARGES:</strong></td>
                <td className="sow-tr"><strong>{formatINR(amcCalc.grandTotal)} / year</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    case "milestones-section": {
      const finCalc = calculateFinancials(financials.items, financials.gstRate);
      const milestoneStages = calculateMilestones(finCalc.grandTotal, milestones.stages);
      return (
        <div className="sow-section-block">
          <div className="sow-section-title">5. Payment Schedule &amp; Milestones</div>
          <div className="sow-pills">
            {milestoneStages.map((stage, idx) => (
              <div className="sow-pill" key={idx}>
                <div className="sow-pct">{stage.percentage}%</div>
                <div className="sow-stage">{stage.label}</div>
                <div className="sow-desc">{stage.description} — {formatINR(stage.amount, false)}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "terms-section":
      return (
        <div className="sow-section-block">
          <div className="sow-section-title">6. Terms &amp; Conditions (Service Boundaries)</div>
          <div className="sow-overview-box">
            <ul>
              {terms.map((term, idx) => (
                <li key={idx}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "signatures-section":
      return (
        <div className="sow-section-block">
          <div className="sow-section-title">7. Acceptance &amp; Authorization</div>
          <div className="sow-sigs">
            <div className="sow-sig-card">
              <div className="sow-sig-top">
                <span className="sow-sig-role">{signatures.preparedBy?.role || "Prepared & Delivered By"}</span>
                <span className="sow-sig-badge">{signatures.preparedBy?.badge || "Technology Partner"}</span>
              </div>
              <div className="sow-sig-line">{signatures.preparedBy?.signLineText || "Authorized Signatory & Seal"}</div>
              <div className="sow-sig-name">{signatures.preparedBy?.name || "SOFTINFOX"}</div>
              <div className="sow-sig-co">{signatures.preparedBy?.company || "by Five7 IT Solutions"}</div>
              <div className="sow-sig-sub">{signatures.preparedBy?.subText || "Enterprise Software & Cloud Engineering"}</div>
            </div>
            <div className="sow-sig-card">
              <div className="sow-sig-top">
                <span className="sow-sig-role">{signatures.acceptedBy?.role || "Accepted & Approved By"}</span>
                <span className="sow-sig-badge">{signatures.acceptedBy?.badge || "Client Authorization"}</span>
              </div>
              <div className="sow-sig-line">{signatures.acceptedBy?.signLineText || "Authorized Signatory & Stamp"}</div>
              <div className="sow-sig-name">{signatures.acceptedBy?.name || client.clientName || "Client"}</div>
              <div className="sow-sig-co">{signatures.acceptedBy?.company || "Management Approval"}</div>
              <div className="sow-sig-sub">{signatures.acceptedBy?.subText || "Date: ________________________"}</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
