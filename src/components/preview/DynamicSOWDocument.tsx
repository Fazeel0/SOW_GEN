"use client";

import React, { useLayoutEffect, useState, useRef } from "react";
import { SOWDocument } from "@/types/sow";
import { SOWBlock, buildDocumentBlocks } from "@/utils/paginationEngine";
import { BlockRenderer } from "./BlockRenderer";
import { SOWPage } from "./SOWPage";

interface Props {
  document: SOWDocument;
}

export const DynamicSOWDocument: React.FC<Props> = ({ document }) => {
  const blocks = buildDocumentBlocks(document);
  const [paginatedPages, setPaginatedPages] = useState<SOWBlock[][]>([]);
  const measureContainerRef = useRef<HTMLDivElement>(null);

  // Measure rendered DOM blocks and calculate dynamic A4 pagination
  useLayoutEffect(() => {
    if (!measureContainerRef.current) return;

    const measureEl = measureContainerRef.current;
    const blockElements = measureEl.querySelectorAll<HTMLElement>("[data-block-id]");
    const heightMap: Record<string, number> = {};

    blockElements.forEach((el) => {
      const id = el.getAttribute("data-block-id");
      if (id) {
        // Include full margin-box height in measurement
        const style = window.getComputedStyle(el);
        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;
        heightMap[id] = el.offsetHeight + marginTop + marginBottom;
      }
    });

    // A4 Physical Content Area Budget Calculation:
    // Total 297mm height is rendered inside flex column with 13mm top + 9mm bottom padding.
    // Usable vertical space inside .sow-page-content before footer is pushed:
    // Page 1: ~860px budget (no running header)
    // Page 2+: ~820px budget (accounts for running header + footer)
    const PAGE_1_CAPACITY = 860;
    const PAGE_N_CAPACITY = 820;

    const pages: SOWBlock[][] = [];
    let currentPage: SOWBlock[] = [];
    let currentHeight = 0;
    let pageIndex = 0;

    let activeTableType: "modules" | "financials" | null = null;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const blockHeight = heightMap[block.id] || 35; // sensible fallback
      const pageCapacity = pageIndex === 0 ? PAGE_1_CAPACITY : PAGE_N_CAPACITY;

      // Track table context so we can inject table headers when splitting across pages
      if (block.type === "modules-table-header") activeTableType = "modules";
      else if (block.type === "financials-table-header") activeTableType = "financials";
      else if (block.type === "financials-totals" || block.type === "amc-section") activeTableType = null;

      // Check if this block overflows current page
      const willOverflow = currentHeight + blockHeight > pageCapacity;

      // Keep with next rule: if a section title is at the bottom without room for the next item
      const isOrphanRisk = block.keepWithNext && i + 1 < blocks.length;
      const nextBlockHeight = isOrphanRisk ? (heightMap[blocks[i + 1].id] || 35) : 0;
      const willOrphan = isOrphanRisk && (currentHeight + blockHeight + nextBlockHeight > pageCapacity);

      if ((willOverflow || willOrphan) && currentPage.length > 0) {
        // Push current filled page
        pages.push(currentPage);
        currentPage = [];
        pageIndex++;
        currentHeight = 0;

        // If we split in the middle of a table, auto-insert continuation table header on new page
        if (activeTableType === "modules" && block.type === "module-row") {
          const contHeaderBlock: SOWBlock = {
            id: `modules-table-header-cont-${pageIndex}`,
            type: "modules-table-header",
          };
          currentPage.push(contHeaderBlock);
          currentHeight += heightMap["modules-table-header"] || 28;
        } else if (activeTableType === "financials" && block.type === "financial-row") {
          const contHeaderBlock: SOWBlock = {
            id: `financials-table-header-cont-${pageIndex}`,
            type: "financials-table-header",
          };
          currentPage.push(contHeaderBlock);
          currentHeight += heightMap["financials-table-header"] || 28;
        }
      }

      currentPage.push(block);
      currentHeight += blockHeight;
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    setPaginatedPages(pages);
  }, [document]);

  // Initial fallback while DOM is measuring (renders Page 1 default blocks)
  const displayPages = paginatedPages.length > 0 ? paginatedPages : [blocks];
  const totalPages = displayPages.length;

  return (
    <>
      {/* Hidden Offscreen Measurement Sandbox (exact 210mm width for 100% pixel-perfect text wrapping) */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -99999,
          left: -99999,
          width: "210mm",
          padding: "13mm 15mm 9mm 15mm",
          boxSizing: "border-box",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {blocks.map((block) => (
          <div key={block.id} data-block-id={block.id}>
            <BlockRenderer block={block} document={document} />
          </div>
        ))}
      </div>

      {/* Rendered Dynamic A4 Pages */}
      {displayPages.map((pageBlocks, idx) => (
        <SOWPage
          key={`page-${idx}-${pageBlocks.length}`}
          pageNumber={idx + 1}
          totalPages={totalPages}
          blocks={pageBlocks}
          document={document}
          isFirstPage={idx === 0}
        />
      ))}
    </>
  );
};
