export interface SOWMeta {
  refNumber: string;          // e.g. "QT-COTTON-2026-01"
  proposalDate: string;       // e.g. "August 30, 2026"
  validityDays: number;       // e.g. 30
  title: string;              // e.g. "Cotton ERP Software Proposal"
  subtitle: string;           // e.g. "Dedicated Cotton Ginning, Weighbridge & Accounts System"
}

export interface SOWBranding {
  companyName: string;        // e.g. "SOFTINFOX"
  parentCompany: string;      // e.g. "by Five7 IT Solutions"
  tagline: string;            // e.g. "Enterprise Software & Cloud Engineering"
  badgeText: string;          // e.g. "Official Quotation & Scope of Work"
  confidentialText: string;   // e.g. "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions"
}

export interface SOWClient {
  clientName: string;         // e.g. "Vaibhav Cotton Industries"
  deploymentType: string;     // e.g. "Dedicated Server & Custom Domain"
}

export interface SOWOverview {
  title: string;              // e.g. "1. Executive Overview & Business Workflow"
  summaryText: string;        // intro paragraph
  bulletPoints: {
    label: string;            // bold prefix, e.g. "Procurement (Buying from Farmers):"
    text: string;             // rest of the bullet text
  }[];
}

export type ModuleType = "New" | "Existing" | "Existing+" | "Infra" | "Integration" | "Custom";

export interface SOWModule {
  id: string;
  icon: string;               // Emoji or unicode icon, e.g. "⚖️"
  name: string;               // e.g. "Cotton Purchase (Weighbridge)"
  description: string;        // Detailed scope text & formulas
  type: ModuleType;
}

export interface SOWFinancialItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  amount: number;
  taxable?: boolean;          // whether this line item attracts GST (default true)
}

export interface SOWFinancials {
  items: SOWFinancialItem[];
  gstRate: number;            // default: 18 (%)
}

export interface SOWAmc {
  description: string;        // e.g. "Cloud Server Hosting, Automated Daily Backups & Technical Support"
  frequency: string;          // default: "Yearly (Post Year 1)"
  amount: number;             // e.g. 30000
  gstRate: number;            // default: 18 (%)
}

export interface SOWMilestoneStage {
  percentage: number;
  label: string;              // e.g. "Advance Payment"
  description: string;        // e.g. "Project kickoff, standalone repo & domain provisioning"
}

export interface SOWMilestones {
  preset: "60-30-10" | "50-50" | "40-40-20" | "custom";
  stages: SOWMilestoneStage[];
}

export interface SOWSignatory {
  role: string;               // e.g. "Prepared & Delivered By"
  badge: string;              // e.g. "Technology Partner"
  signLineText: string;       // e.g. "Authorized Signatory & Seal"
  name: string;               // e.g. "SOFTINFOX"
  company: string;            // e.g. "by Five7 IT Solutions"
  subText: string;            // e.g. "Enterprise Software & Cloud Engineering"
}

export interface SOWSignatures {
  preparedBy: SOWSignatory;
  acceptedBy: SOWSignatory;
}

export interface SOWDocument {
  meta: SOWMeta;
  branding: SOWBranding;
  client: SOWClient;
  executiveOverview: SOWOverview;
  modules: SOWModule[];
  financials: SOWFinancials;
  amc: SOWAmc;
  milestones: SOWMilestones;
  terms: string[];
  signatures: SOWSignatures;
}
