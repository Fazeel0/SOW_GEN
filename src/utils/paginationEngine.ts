import { SOWDocument, SOWModule, SOWFinancialItem, SOWMilestoneStage } from "@/types/sow";

export type BlockType =
  | "doc-header"
  | "client-card"
  | "overview"
  | "section-title"
  | "modules-table-header"
  | "module-row"
  | "financials-table-header"
  | "financial-row"
  | "financials-totals"
  | "amc-section"
  | "milestones-section"
  | "terms-section"
  | "signatures-section";

export interface SOWBlock {
  id: string;
  type: BlockType;
  // Specific data payload depending on block type
  data?: any;
  // Whether this block should never be orphaned at the bottom of a page
  keepWithNext?: boolean;
  // For continuation headers
  continuationTitle?: string;
}

export interface SOWPageData {
  pageNumber: number;
  blocks: SOWBlock[];
}

/**
 * Deconstructs an entire SOW document into granular atomic blocks.
 * Each block can be measured in pixels and placed into pages dynamically.
 */
export function buildDocumentBlocks(doc: SOWDocument): SOWBlock[] {
  const blocks: SOWBlock[] = [];

  // 1. Doc Header (only top of document)
  blocks.push({
    id: "doc-header",
    type: "doc-header",
    data: { meta: doc.meta, branding: doc.branding },
    keepWithNext: true,
  });

  // 2. Client Card
  blocks.push({
    id: "client-card",
    type: "client-card",
    data: { client: doc.client },
    keepWithNext: true,
  });

  // 3. Executive Overview
  if (doc.executiveOverview && (doc.executiveOverview.summaryText || (doc.executiveOverview.bulletPoints && doc.executiveOverview.bulletPoints.length > 0))) {
    blocks.push({
      id: "overview-title",
      type: "section-title",
      data: { title: doc.executiveOverview.title || "1. Executive Overview & Business Workflow" },
      keepWithNext: true,
    });
    blocks.push({
      id: "overview-body",
      type: "overview",
      data: { overview: doc.executiveOverview },
    });
  }

  // 4. Modules Section
  if (doc.modules && doc.modules.length > 0) {
    blocks.push({
      id: "modules-title",
      type: "section-title",
      data: { title: "2. Scope of Work — Modules Included" },
      keepWithNext: true,
    });

    blocks.push({
      id: "modules-table-header",
      type: "modules-table-header",
      keepWithNext: true,
    });

    doc.modules.forEach((mod, idx) => {
      blocks.push({
        id: `mod-${mod.id || idx}`,
        type: "module-row",
        data: { module: mod, index: idx },
      });
    });
  }

  // 5. Financial Quotation Section
  if (doc.financials && doc.financials.items && doc.financials.items.length > 0) {
    blocks.push({
      id: "financials-title",
      type: "section-title",
      data: { title: "3. Financial Quotation & Investment" },
      keepWithNext: true,
    });

    blocks.push({
      id: "financials-table-header",
      type: "financials-table-header",
      keepWithNext: true,
    });

    doc.financials.items.forEach((item, idx) => {
      blocks.push({
        id: `fin-item-${item.id || idx}`,
        type: "financial-row",
        data: { item, index: idx },
      });
    });

    blocks.push({
      id: "financials-totals",
      type: "financials-totals",
      data: { financials: doc.financials },
    });
  }

  // 6. AMC Section
  if (doc.amc) {
    blocks.push({
      id: "amc-section",
      type: "amc-section",
      data: { amc: doc.amc },
    });
  }

  // 7. Payment Milestones
  if (doc.milestones && doc.milestones.stages && doc.milestones.stages.length > 0) {
    blocks.push({
      id: "milestones-section",
      type: "milestones-section",
      data: { milestones: doc.milestones, financials: doc.financials },
    });
  }

  // 8. Terms & Conditions
  if (doc.terms && doc.terms.length > 0) {
    blocks.push({
      id: "terms-section",
      type: "terms-section",
      data: { terms: doc.terms },
    });
  }

  // 9. Signatures
  if (doc.signatures) {
    blocks.push({
      id: "signatures-section",
      type: "signatures-section",
      data: { signatures: doc.signatures, client: doc.client },
    });
  }

  return blocks;
}
