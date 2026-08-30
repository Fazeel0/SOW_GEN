"use client";

import React from "react";
import { SOWDocument } from "@/types/sow";
import { formatINR, calculateFinancials, calculateAMC, calculateMilestones } from "@/utils/currency";

interface Props {
  document: SOWDocument;
}

export const SOWPage2: React.FC<Props> = ({ document }) => {
  const { meta, branding, client, financials, amc, milestones, terms, signatures } = document;

  const financialCalculations = calculateFinancials(financials.items, financials.gstRate);
  const amcCalculations = calculateAMC(amc.amount, amc.gstRate);
  const milestoneStagesWithAmount = calculateMilestones(
    financialCalculations.grandTotal,
    milestones.stages
  );

  return (
    <div className="sow-page">
      {/* Running Header */}
      <div className="sow-page-running-header">
        <span>
          {branding.companyName || "SOFTINFOX"} • {meta.title || "Software Proposal"}
        </span>
        <span>
          Ref: {meta.refNumber || "QT-2026-01"} • {client.clientName || "Client"}
        </span>
      </div>

      {/* Page 2 Content */}
      <div className="sow-page-content">
        {/* Section 3: Financial Quotation */}
        <div className="sow-section-title">3. Financial Quotation &amp; Investment</div>
        <table className="sow-ptable">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>S.No</th>
              <th>Deliverable / Module Description</th>
              <th style={{ width: "18%" }}>Category</th>
              <th className="sow-tr" style={{ width: "22%" }}>Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            {financials.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{idx + 1}.</td>
                <td>
                  <strong>{item.title}</strong>
                  {item.subtitle && <span className="sow-sub-text">{item.subtitle}</span>}
                </td>
                <td>{item.category}</td>
                <td className="sow-tr">{formatINR(item.amount)}</td>
              </tr>
            ))}
            <tr className="sow-total-row">
              <td colSpan={3} className="sow-tr">
                <strong>Sub-Total (Scope Deliverables):</strong>
              </td>
              <td className="sow-tr">
                <strong>{formatINR(financialCalculations.subtotal)}</strong>
              </td>
            </tr>
            {financials.gstRate > 0 && (
              <tr>
                <td colSpan={3} className="sow-tr">
                  Applicable GST @ {financials.gstRate}%
                  {financialCalculations.taxableAmount !== financialCalculations.subtotal && (
                    <span> (on {formatINR(financialCalculations.taxableAmount, false)} Taxable)</span>
                  )}
                  :
                </td>
                <td className="sow-tr">{formatINR(financialCalculations.gstAmount)}</td>
              </tr>
            )}
            <tr className="sow-grand-row">
              <td colSpan={3} className="sow-tr">
                <strong>TOTAL INITIAL INVESTMENT:</strong>
              </td>
              <td className="sow-tr">
                <strong>{formatINR(financialCalculations.grandTotal)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section 4: AMC */}
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
              <td>
                <strong>{amc.description || "Cloud Server Hosting, Backups & Support"}</strong>
              </td>
              <td>{amc.frequency || "Yearly (Post Year 1)"}</td>
              <td className="sow-tr">{formatINR(amcCalculations.baseAmount)}</td>
            </tr>
            {amc.gstRate > 0 && (
              <tr>
                <td>Applicable GST ({amc.gstRate}%)</td>
                <td>{amc.frequency || "Yearly"}</td>
                <td className="sow-tr">{formatINR(amcCalculations.gstAmount)}</td>
              </tr>
            )}
            <tr className="sow-grand-row">
              <td colSpan={2} className="sow-tr">
                <strong>TOTAL ANNUAL RECURRING CHARGES:</strong>
              </td>
              <td className="sow-tr">
                <strong>{formatINR(amcCalculations.grandTotal)} / year</strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section 5: Payment Milestones */}
        <div className="sow-section-title">5. Payment Schedule &amp; Milestones</div>
        <div className="sow-pills">
          {milestoneStagesWithAmount.map((stage, idx) => (
            <div className="sow-pill" key={idx}>
              <div className="sow-pct">{stage.percentage}%</div>
              <div className="sow-stage">{stage.label}</div>
              <div className="sow-desc">
                {stage.description} — {formatINR(stage.amount, false)}
              </div>
            </div>
          ))}
        </div>

        {/* Section 6: Terms & Conditions */}
        <div className="sow-section-title">6. Terms &amp; Conditions (Service Boundaries)</div>
        <div className="sow-overview-box">
          <ul>
            {terms.map((term, idx) => (
              <li key={idx}>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 7: Signatures */}
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

      {/* Footer */}
      <div className="sow-page-footer">
        <span>{branding.confidentialText || "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions"}</span>
        <span>Commercial Proposal — {meta.refNumber || "QT-2026-01"}</span>
        <span>
          Page <strong>2 of 2</strong>
        </span>
      </div>
    </div>
  );
};
