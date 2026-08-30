"use client";

import React from "react";
import { SOWBlock } from "@/utils/paginationEngine";
import { SOWDocument } from "@/types/sow";
import { BlockRenderer } from "./BlockRenderer";

interface SOWPageProps {
  pageNumber: number;
  totalPages: number;
  blocks: SOWBlock[];
  document: SOWDocument;
  isFirstPage: boolean;
}

export const SOWPage: React.FC<SOWPageProps> = ({
  pageNumber,
  totalPages,
  blocks,
  document,
  isFirstPage,
}) => {
  const { meta, branding, client } = document;

  return (
    <div className="sow-page">
      {/* Running Header for Page 2+ */}
      {!isFirstPage && (
        <div className="sow-running-header">
          <span>
            {branding.companyName || "SOFTINFOX"} • {meta.title || "Software Proposal"}
          </span>
          <span>
            Ref: {meta.refNumber || "QT-COTTON-2026-01"} • {client.clientName || "Client"}
          </span>
        </div>
      )}

      {/* Page Content Stream */}
      <div className="sow-page-content">
        {blocks.map((block, idx) => (
          <BlockRenderer
            key={block.id || idx}
            block={block}
            document={document}
          />
        ))}
      </div>

      {/* Dynamic Footer with Accurate Page X of Y */}
      <div className="sow-page-footer">
        <span>{branding.confidentialText || "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions"}</span>
        <span>Commercial Proposal — {meta.refNumber || "QT-COTTON-2026-01"}</span>
        <span>
          Page <strong>{pageNumber} of {totalPages}</strong>
        </span>
      </div>
    </div>
  );
};
