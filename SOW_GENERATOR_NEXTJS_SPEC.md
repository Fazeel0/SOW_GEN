# Project Specification: Standalone SOW & Commercial Quotation Builder

**Platform:** Next.js (App Router) + TypeScript  
**Styling:** Vanilla CSS (Print Preview) + Tailwind CSS (Editor UI)  
**State Management:** Zustand with `persist` middleware (auto localStorage draft saving)  

**Deployment Target:** Vercel (Serverless / Static Edge)  
**Target Output:** Pixel-Perfect 2-Page A4 Printable PDF & Shareable Web Proposals  
**Primary Brand:** SOFTINFOX by Five7 IT Solutions  

---

## 1. Project Goal & Vision

Build an internal web application (hosted on Vercel) that allows our software agency to generate professional, formatted, two-page **Commercial Proposals and Scopes of Work (SOW)** for clients in under 2 minutes.

The tool provides an interactive form on the left, a **live real-time A4 print-preview on the right**, automated financial and milestone math, template presets, and one-click PDF generation via standard browser print dialogs (`Ctrl + P`).

---

## 2. Core Technical Architecture

- **Framework:** Next.js (Latest, App Router)
- **Styling Strategy:**
  - **Print Preview (A4 Document):** Vanilla CSS — exact pixel-perfect match of the reference HTML (`COTTON_ERP_QUOTATION_SOW.html`). No Tailwind utilities in the print DOM. This ensures perfect A4 fidelity, print consistency, and zero class conflicts.
  - **Editor Form & App Chrome:** Tailwind CSS — for rapid UI building of the sidebar form, tabs, buttons, and layout.
  - **Icons:** Lucide React for editor UI. Emoji icons (`⚖️`, `👤`, `💬`) for the SOW document itself (better for print/PDF).
- **State Management:** Zustand with `persist` middleware — single global store holding the `SOWDocument` state. Any component can read/write without prop drilling. The `persist` middleware automatically saves drafts to `localStorage` and reloads them on page open — zero manual boilerplate.
  ```typescript
  // store/useSOWStore.ts
  import { create } from 'zustand';
  import { persist } from 'zustand/middleware';

  export const useSOWStore = create(
    persist(
      (set) => ({
        document: defaultSOW,
        updateField: (path, value) => set((state) => /* deep update */),
        loadPreset: (preset) => set({ document: preset }),
        resetDocument: () => set({ document: defaultSOW }),
      }),
      { name: 'sow-draft' } // auto-saves & auto-loads from localStorage
    )
  );
  ```
- **Data Persistence:** Handled automatically by Zustand's `persist` middleware. JSON import/export for template sharing between team members.
- **Print Engine:** CSS `@media print` with exact A4 dimensions (`210mm × 297mm`) and zero browser print-margins (`@page { size: A4 portrait; margin: 0; }`).

---

## 3. Data Schema & Form Structure

```typescript
interface SOWDocument {
  meta: {
    refNumber: string;          // e.g. "QT-COTTON-2026-01" (Auto-generated)
    proposalDate: string;       // e.g. "August 30, 2026"
    validityDays: number;       // default: 30
    title: string;              // e.g. "Cotton ERP Software Proposal"
    subtitle: string;           // e.g. "Dedicated Cotton Ginning, Weighbridge & Accounts System"
  };
  branding: {
    companyName: string;        // default: "SOFTINFOX"
    parentCompany: string;      // default: "by Five7 IT Solutions"
    tagline: string;            // default: "Enterprise Software & Cloud Engineering"
    badgeText: string;          // default: "Official Quotation & Scope of Work"
  };
  client: {
    clientName: string;         // e.g. "Vaibhav Cotton Industries"
    deploymentType: string;     // e.g. "Dedicated Server & Custom Domain"
  };
  executiveOverview: {
    title: string;              // default: "1. Executive Overview & Business Workflow"
    summaryText: string;
    bulletPoints: string[];     // Array of workflow summaries (HTML allowed for bold/strong)
  };
  modules: Array<{
    id: string;
    icon: string;               // Emoji (e.g. "⚖️") — emojis print better than icon fonts
    name: string;               // e.g. "Cotton Purchase (Weighbridge)"
    description: string;        // Detailed scope text & formulas
    type: "New" | "Existing" | "Existing+" | "Infra" | "Integration";
  }>;
  financials: {
    items: Array<{
      id: string;
      title: string;
      subtitle?: string;
      category: string;
      amount: number;
    }>;
    gstRate: number;            // default: 18 (%)
    taxableItemIds?: string[];  // Which item IDs attract GST (default: development items)
  };
  amc: {
    description: string;        // e.g. "Cloud Server Hosting, Automated Daily Backups & Support"
    frequency: string;          // default: "Yearly (Post Year 1)"
    amount: number;             // e.g. 30000
    gstRate: number;            // default: 18 (%)
  };
  milestones: {
    preset: "60-30-10" | "50-50" | "40-40-20" | "custom";
    stages: Array<{
      percentage: number;
      label: string;            // e.g. "Advance Payment"
      description: string;      // e.g. "Project kickoff & domain setup"
    }>;
  };
  terms: string[];              // List of safety clauses (3rd-party APIs, scope, backups)
  signatures: {
    preparedBy: { name: string; subtitle: string; roleTag: string };
    acceptedBy: { name: string; subtitle: string; roleTag: string };
  };
}
```

---

## 4. Key Automated Math Engine

1. **Subtotal Calculation:**
   $$\text{SubTotal} = \sum \text{financialItem.amount}$$
2. **GST Calculation:**
   $$\text{GST Amount} = \text{TaxableAmount} \times \left(\frac{\text{gstRate}}{100}\right)$$
3. **Total Initial Investment:**
   $$\text{Grand Total} = \text{SubTotal} + \text{GST Amount}$$
4. **AMC Recurring Total:**
   $$\text{AMC Total} = \text{amc.amount} + \left(\text{amc.amount} \times \frac{\text{amc.gstRate}}{100}\right)$$
5. **Milestone Auto-Splits:**
   $$\text{Stage Rupee Amount} = \text{Grand Total} \times \left(\frac{\text{percentage}}{100}\right)$$
   *(Ensures the exact rupee sum matches Grand Total down to the paise).*

### Currency Formatter Utility
```typescript
// utils/currency.ts
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
// Output: "₹30,000.00", "₹84,100.00"
```

---

## 5. UI / UX Features Required

### Left Panel (Editor Form):
- **Tabbed / Accordion Navigation**:
  - `Header & Client Info`
  - `Workflow & Overview`
  - `Modules Matrix (Add/Edit/Reorder/Delete)`
  - `Pricing & Financials (Add Line Items, Set GST)`
  - `AMC & Milestones (Presets & Auto Math)`
  - `Terms & Safety Clauses (Preset checkboxes)`
  - `Signatures & Branding`
- **Preset Selector Dropdown**:
  - "Cotton Ginning & Trading ERP" (Preloads the full Vaibhav Cotton SOW)
  - "Inventory & Retail SaaS"
  - "Custom Web / Mobile Application"
  - "Blank Template"
- **Draft Management**:
  - Auto-save to `localStorage` handled by Zustand persist (automatic on every state change).
  - "Export JSON" & "Import JSON" buttons to share templates between team members.

### Right Panel (Live Preview):
- Live render of the 2-page A4 document matching the exact HTML/CSS design from `COTTON_ERP_QUOTATION_SOW.html`.
- Sticky Top Action Bar:
  - `[ 🖨️ Print / Export PDF ]`
  - `[ 💾 Save Template ]`
  - `[ 🔄 Reset Form ]`
  - Zoom Controls (`75%`, `100%`, `Fit Page`).

---

## 6. Critical Print & CSS Rules (Must Follow)

The print preview and output MUST obey these strict rules to prevent page overflows:

1. **Strict 2-Page Constraint:**
   - Page 1 contains: Header, Client Card, Section 1 (Overview), Section 2 (Modules Table), Page 1 Footer.
   - Page 2 contains: Mini Running Header, Section 3 (Financials Table), Section 4 (AMC Table), Section 5 (Milestone Pills), Section 6 (Terms), Section 7 (Signatures), Page 2 Footer.
2. **Module Overflow Handling:**
   - If modules exceed the available space on Page 1, automatically reduce font size or truncate descriptions to fit.
   - Maximum recommended modules: 8–10 per page. Beyond that, warn the user in the editor.
3. **A4 Exact Dimensions:**
   ```css
   @page {
     size: A4 portrait;
     margin: 0;
   }
   .page {
     width: 210mm;
     height: 297mm;
     overflow: hidden;
     display: flex;
     flex-direction: column;
     padding: 13mm 15mm 9mm 15mm;
     background: #ffffff;
   }
   .page-content {
     flex: 1;
     overflow: hidden;
   }
   .page-footer {
     flex-shrink: 0;
   }
   ```

---

## 7. File Structure

```
sow-builder/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with fonts
│   │   ├── page.tsx                # Main split-panel page
│   │   └── globals.css             # Tailwind imports + print preview vanilla CSS
│   ├── components/
│   │   ├── editor/
│   │   │   ├── EditorPanel.tsx     # Main editor sidebar wrapper
│   │   │   ├── HeaderTab.tsx       # Header & Client Info tab
│   │   │   ├── OverviewTab.tsx     # Executive Overview tab
│   │   │   ├── ModulesTab.tsx      # Modules matrix tab (add/edit/reorder/delete)
│   │   │   ├── FinancialsTab.tsx   # Pricing & financials tab
│   │   │   ├── AmcMilestonesTab.tsx# AMC & milestones tab
│   │   │   ├── TermsTab.tsx        # Terms & conditions tab
│   │   │   └── SignaturesTab.tsx   # Signatures & branding tab
│   │   ├── preview/
│   │   │   ├── PreviewPanel.tsx    # Preview wrapper with zoom/actions bar
│   │   │   ├── SOWPage1.tsx        # Page 1 render (vanilla CSS classes)
│   │   │   └── SOWPage2.tsx        # Page 2 render (vanilla CSS classes)
│   │   └── ui/
│   │       ├── PresetSelector.tsx  # Template preset dropdown
│   │       └── JsonManager.tsx     # Import/Export JSON buttons
│   ├── store/
│   │   └── useSOWStore.ts          # Zustand store with persist middleware
│   ├── data/
│   │   └── presets.ts              # Preset template data (Cotton ERP, Blank, etc.)
│   ├── utils/
│   │   └── currency.ts            # INR formatter utility
│   └── styles/
│       └── sow-print.css          # Vanilla CSS for A4 print preview (from reference HTML)
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 8. Next.js Project Setup

```bash
# 1. Initialize Next.js Project
npx create-next-app@latest sow-builder --typescript --tailwind --app --eslint

# 2. Key Packages to install
npm install lucide-react clsx tailwind-merge zustand

# 3. Development
npm run dev

# 4. Deploy to Vercel
# Connect GitHub repository to Vercel -> Automatic edge deployment
```

---

## 9. Reference Files

- **HTML Reference:** `COTTON_ERP_QUOTATION_SOW.html` — The exact A4 print layout to replicate in the preview panel. All vanilla CSS classes, fonts, spacing, and color tokens must match this file exactly.
- **This Spec:** `SOW_GENERATOR_NEXTJS_SPEC.md` — The source of truth for the project.
