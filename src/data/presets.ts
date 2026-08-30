import { SOWDocument } from "@/types/sow";

export const cottonERPPreset: SOWDocument = {
  meta: {
    refNumber: "QT-COTTON-2026-01",
    proposalDate: "August 30, 2026",
    validityDays: 30,
    title: "Cotton ERP Software Proposal",
    subtitle: "Dedicated Cotton Ginning, Weighbridge & Accounts System",
  },
  branding: {
    companyName: "SOFTINFOX",
    parentCompany: "by Five7 IT Solutions",
    tagline: "Enterprise Software & Cloud Engineering",
    badgeText: "Official Quotation & Scope of Work",
    confidentialText: "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions",
  },
  client: {
    clientName: "Vaibhav Cotton Industries",
    deploymentType: "Dedicated Server & Custom Domain",
  },
  executiveOverview: {
    title: "1. Executive Overview & Business Workflow",
    summaryText: "This proposal covers end-to-end engineering of a standalone, dedicated ERP system for Cotton Ginning Mills:",
    bulletPoints: [
      {
        label: "Procurement (Buying from Farmers):",
        text: "Weighbridge Load/Unload gross & tare weight recording, moisture/trash allowances, Sauda rates, Hamali (labor) and Kanta fee deductions with instant printable slips.",
      },
      {
        label: "Corporate Sales (Selling to B2B Companies):",
        text: "Bulk trade invoicing for Cotton Bales, Seeds, and Linters with GST & transport compliance.",
      },
      {
        label: "Returns & Ledger:",
        text: "Two-way return management with live farmer/buyer running balances and party ledger statements.",
      },
    ],
  },
  modules: [
    {
      id: "mod-1",
      icon: "👤",
      name: "Farmer & Company Directory",
      description: "Complete farmer profiles with Aadhaar, Village, Phone, Bank Account & Vehicle No. Corporate buyer profiles with GSTIN, Billing/Shipping Address, State Code & Credit Limits. Instant search & filter by any field.",
      type: "Existing+",
    },
    {
      id: "mod-2",
      icon: "⚖️",
      name: "Cotton Purchase (Weighbridge)",
      description: "Load Weight − Unload (Tare) = Gross Weight → Less Moisture Allowance = Net Quintals → × Sauda Rate − Hamali − Kanta Charges ± Round Off = Net Payable to Farmer. Custom printable procurement voucher with multi-party signatures.",
      type: "New",
    },
    {
      id: "mod-3",
      icon: "🏢",
      name: "Corporate Sales & Invoicing",
      description: "B2B trade invoicing for Cotton Bales, Seeds & Linters. HSN code management, CGST/SGST/IGST tax selection, vehicle/truck no., LR Number, E-Way bill reference, and print-ready trade invoice.",
      type: "New",
    },
    {
      id: "mod-4",
      icon: "🔄",
      name: "Two-Way Returns",
      description: "Purchase Return: weight correction / quality rejection debit notes to farmers with automatic ledger deduction. Sales Return: B2B credit notes from companies with stock re-entry and party balance adjustment.",
      type: "New",
    },
    {
      id: "mod-5",
      icon: "📊",
      name: "Accounts & Party Ledger",
      description: "Real-time Debit/Credit running balance for each Farmer and Company. Cash In/Out tracking with payment mode (Cash, UPI, NEFT, Cheque). Date-range filtered account statements, PDF export.",
      type: "New",
    },
    {
      id: "mod-6",
      icon: "💬",
      name: "WhatsApp Messenger",
      description: "One-click WhatsApp dispatch of purchase vouchers to farmer mobile, sales invoices to company buyer, and payment receipts — directly from within the application on transaction completion.",
      type: "New",
    },
    {
      id: "mod-7",
      icon: "💸",
      name: "Expense Management",
      description: "Categorized mill expense tracking: Hamali labor, vehicle freight & transport, electricity/generator fuel, machine maintenance, and general office overhead with monthly and yearly reports.",
      type: "Existing",
    },
    {
      id: "mod-8",
      icon: "🌐",
      name: "Hosting & Domain",
      description: "Independent standalone codebase & isolated database (no shared infrastructure). Custom domain (.com/.in) registration, DNS configuration, and 1-year SSL/TLS certificate for HTTPS encryption.",
      type: "Infra",
    },
  ],
  financials: {
    items: [
      {
        id: "fin-1",
        title: "Core ERP Base Engine & Platform Licensing",
        subtitle: "Auth, Framework, Dashboard, Security, Baseline Expense Module",
        category: "Existing Engine",
        amount: 30000,
        taxable: true,
      },
      {
        id: "fin-2",
        title: "Custom Cotton Industry Engineering",
        subtitle: "Weighbridge Purchase, Farmer Voucher, B2B Sales, Returns, Party Ledger & WhatsApp",
        category: "Custom Development",
        amount: 40000,
        taxable: true,
      },
      {
        id: "fin-3",
        title: "Custom Domain Registration & SSL Configuration (1 Year)",
        subtitle: undefined,
        category: "Domain & Security",
        amount: 1500,
        taxable: false,
      },
    ],
    gstRate: 18,
  },
  amc: {
    description: "Cloud Server Hosting, Automated Daily Backups & Technical Support",
    frequency: "Yearly (Post Year 1)",
    amount: 30000,
    gstRate: 18,
  },
  milestones: {
    preset: "60-30-10",
    stages: [
      {
        percentage: 60,
        label: "Advance Payment",
        description: "Project kickoff, standalone repo & domain provisioning",
      },
      {
        percentage: 30,
        label: "Mid-Milestone",
        description: "Purchase, Sales & Ledger modules completed",
      },
      {
        percentage: 10,
        label: "Final Delivery",
        description: "WhatsApp, testing & production go-live",
      },
    ],
  },
  terms: [
    "Third-Party API Charges: WhatsApp Cloud API message credits (Meta/Twilio), SMS gateways, E-Way Bill/E-Invoice GSP portal fees, and payment gateway MDR charges are billed directly by respective providers — not included in this quotation.",
    "Out of Scope: Any feature or module not explicitly listed in Section 2 shall be scoped and quoted as a separate change request.",
    "Data & Backups: Daily automated backups are part of AMC. Client is responsible for business data accuracy and regulatory compliance.",
    "Deployment: Domain & server setup begins upon 60% advance receipt. Production credentials handed over upon final payment settlement.",
  ],
  signatures: {
    preparedBy: {
      role: "Prepared & Delivered By",
      badge: "Technology Partner",
      signLineText: "Authorized Signatory & Seal",
      name: "SOFTINFOX",
      company: "by Five7 IT Solutions",
      subText: "Enterprise Software & Cloud Engineering",
    },
    acceptedBy: {
      role: "Accepted & Approved By",
      badge: "Client Authorization",
      signLineText: "Authorized Signatory & Stamp",
      name: "Vaibhav Cotton Industries",
      company: "Management Approval",
      subText: "Date: ________________________",
    },
  },
};

export const retailSaaSPreset: SOWDocument = {
  meta: {
    refNumber: "QT-RETAIL-2026-02",
    proposalDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    validityDays: 30,
    title: "Retail & Inventory POS Software Proposal",
    subtitle: "Cloud-Based Multi-Store Billing, Inventory & Customer Management",
  },
  branding: {
    companyName: "SOFTINFOX",
    parentCompany: "by Five7 IT Solutions",
    tagline: "Enterprise Software & Cloud Engineering",
    badgeText: "Official Quotation & Scope of Work",
    confidentialText: "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions",
  },
  client: {
    clientName: "Apex Retail Mart Ltd.",
    deploymentType: "High-Availability Cloud Cluster",
  },
  executiveOverview: {
    title: "1. Executive Overview & Business Workflow",
    summaryText: "Complete digital point-of-sale and omnichannel inventory synchronization solution:",
    bulletPoints: [
      {
        label: "Point of Sale (POS):",
        text: "Rapid barcode billing, multi-payment tender, thermal invoice printing, customer loyalty reward points.",
      },
      {
        label: "Inventory Management:",
        text: "Central warehouse & store-level stock tracking, low-stock threshold alerts, batch and expiry management.",
      },
      {
        label: "Vendor & Purchase Orders:",
        text: "Supplier quotation comparison, Goods Received Notes (GRN), invoice matching and automated accounts payable.",
      },
    ],
  },
  modules: [
    {
      id: "mod-1",
      icon: "🛒",
      name: "Rapid POS Billing Terminal",
      description: "Touchscreen & barcode scanner-optimized counter checkout with support for GST, discounts, and split payments.",
      type: "New",
    },
    {
      id: "mod-2",
      icon: "📦",
      name: "Centralized Inventory & Stock",
      description: "SKU & Barcode generator, real-time multi-branch stock transfers, minimum stock alerts and automated reordering.",
      type: "New",
    },
    {
      id: "mod-3",
      icon: "🤝",
      name: "Vendor & Purchase Module",
      description: "Vendor ledger, purchase order management, GRN verification against supplier invoices, and payment tracking.",
      type: "Existing+",
    },
    {
      id: "mod-4",
      icon: "👥",
      name: "CRM & Loyalty Programs",
      description: "Customer purchase history, birthday/anniversary SMS greetings, point accrual and redemption engine.",
      type: "New",
    },
    {
      id: "mod-5",
      icon: "📊",
      name: "Real-time Sales Analytics",
      description: "Interactive dashboard featuring gross margins, top-selling items, employee performance and hourly footfall trends.",
      type: "New",
    },
    {
      id: "mod-6",
      icon: "☁️",
      name: "Cloud Deployment & Security",
      description: "Dedicated production instance with automated daily database snapshots, SSL/TLS encryption, and 99.9% uptime SLA.",
      type: "Infra",
    },
  ],
  financials: {
    items: [
      {
        id: "fin-1",
        title: "Retail POS & Inventory Base Platform",
        subtitle: "Core billing engine, barcode sync, and master catalog database",
        category: "Base License",
        amount: 35000,
        taxable: true,
      },
      {
        id: "fin-2",
        title: "Multi-Store Sync & Custom Modules",
        subtitle: "CRM, WhatsApp receipts, and custom accounting exports",
        category: "Development",
        amount: 25000,
        taxable: true,
      },
    ],
    gstRate: 18,
  },
  amc: {
    description: "Cloud Hosting, Database Backups & Dedicated Support",
    frequency: "Yearly (Post Year 1)",
    amount: 24000,
    gstRate: 18,
  },
  milestones: {
    preset: "50-50",
    stages: [
      {
        percentage: 50,
        label: "Advance Payment",
        description: "Project kickoff and environment setup",
      },
      {
        percentage: 50,
        label: "Delivery & Go-Live",
        description: "UAT approval, data migration & training",
      },
    ],
  },
  terms: [
    "Hardware procurement (Barcode scanners, Thermal printers) is client responsibility.",
    "WhatsApp & SMS gateway credits are billed as per actual usage.",
    "Payment milestone terms are strict before production go-live credentials handover.",
  ],
  signatures: {
    preparedBy: {
      role: "Prepared & Delivered By",
      badge: "Technology Partner",
      signLineText: "Authorized Signatory & Seal",
      name: "SOFTINFOX",
      company: "by Five7 IT Solutions",
      subText: "Enterprise Software & Cloud Engineering",
    },
    acceptedBy: {
      role: "Accepted & Approved By",
      badge: "Client Authorization",
      signLineText: "Authorized Signatory & Stamp",
      name: "Apex Retail Mart Ltd.",
      company: "Management Approval",
      subText: "Date: ________________________",
    },
  },
};

export const customWebMobilePreset: SOWDocument = {
  meta: {
    refNumber: "QT-APP-2026-03",
    proposalDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    validityDays: 30,
    title: "Custom Web & Mobile Application Proposal",
    subtitle: "Cross-Platform Mobile App, Admin Dashboard & REST APIs",
  },
  branding: {
    companyName: "SOFTINFOX",
    parentCompany: "by Five7 IT Solutions",
    tagline: "Enterprise Software & Cloud Engineering",
    badgeText: "Official Quotation & Scope of Work",
    confidentialText: "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions",
  },
  client: {
    clientName: "Client Enterprise",
    deploymentType: "Scalable Cloud Architecture",
  },
  executiveOverview: {
    title: "1. Executive Overview & Business Workflow",
    summaryText: "Modern web and mobile application engineering built with high performance and intuitive UX:",
    bulletPoints: [
      {
        label: "User Mobile Experience:",
        text: "Cross-platform iOS and Android mobile app with biometric authentication and push notifications.",
      },
      {
        label: "Admin Command Center:",
        text: "Modern web portal for operations, role-based user management, and real-time business reporting.",
      },
      {
        label: "Backend & API Engine:",
        text: "Scalable microservices backend with secure JWT authentication and third-party integrations.",
      },
    ],
  },
  modules: [
    {
      id: "mod-1",
      icon: "📱",
      name: "Cross-Platform Mobile Application",
      description: "Native-feel Flutter/React Native application for iOS and Android with offline caching, camera access, and push notifications.",
      type: "New",
    },
    {
      id: "mod-2",
      icon: "💻",
      name: "Admin Web Control Portal",
      description: "Responsive Next.js administrative dashboard with role-based access control (RBAC), audit logs, and data exports.",
      type: "New",
    },
    {
      id: "mod-3",
      icon: "⚡",
      name: "Backend REST API Engine",
      description: "Secure, performant Node.js/PostgreSQL architecture with token-based authentication and rate limiting.",
      type: "New",
    },
    {
      id: "mod-4",
      icon: "💳",
      name: "Payment Gateway Integration",
      description: "Razorpay / Stripe integration supporting Credit Cards, UPI, NetBanking with automated webhooks.",
      type: "Integration",
    },
    {
      id: "mod-5",
      icon: "🚀",
      name: "CI/CD & Cloud Infrastructure",
      description: "Automated deployment pipeline, SSL configuration, server monitoring and automated daily database backups.",
      type: "Infra",
    },
  ],
  financials: {
    items: [
      {
        id: "fin-1",
        title: "Frontend Applications (Web Admin + Mobile App)",
        subtitle: "UI/UX design, mobile app development and web portal",
        category: "Frontend Engineering",
        amount: 55000,
        taxable: true,
      },
      {
        id: "fin-2",
        title: "Backend API & Database Architecture",
        subtitle: "Database schema, REST endpoints, auth, payment webhooks",
        category: "Backend Engineering",
        amount: 35000,
        taxable: true,
      },
      {
        id: "fin-3",
        title: "Cloud Deployment & Store Submissions",
        subtitle: "Google Play Store & Apple App Store preparation",
        category: "DevOps & Deployment",
        amount: 10000,
        taxable: true,
      },
    ],
    gstRate: 18,
  },
  amc: {
    description: "Cloud Server Maintenance, Bug Fixes & Monthly Security Patches",
    frequency: "Yearly (Post Year 1)",
    amount: 36000,
    gstRate: 18,
  },
  milestones: {
    preset: "40-40-20",
    stages: [
      {
        percentage: 40,
        label: "Advance Payment",
        description: "Project kickoff, UI/UX wireframes & architecture setup",
      },
      {
        percentage: 40,
        label: "Mid Milestone",
        description: "API completion & core mobile app features implemented",
      },
      {
        percentage: 20,
        label: "Final Delivery",
        description: "UAT approval, app store submission & final handover",
      },
    ],
  },
  terms: [
    "Apple Developer ($99/year) and Google Play ($25 one-time) accounts are client's responsibility.",
    "Third-party SMS, Email, and Payment Gateway transaction fees are billed directly to client.",
    "Warranty period: 30 days of free bug-fixing post final release.",
  ],
  signatures: {
    preparedBy: {
      role: "Prepared & Delivered By",
      badge: "Technology Partner",
      signLineText: "Authorized Signatory & Seal",
      name: "SOFTINFOX",
      company: "by Five7 IT Solutions",
      subText: "Enterprise Software & Cloud Engineering",
    },
    acceptedBy: {
      role: "Accepted & Approved By",
      badge: "Client Authorization",
      signLineText: "Authorized Signatory & Stamp",
      name: "Client Enterprise",
      company: "Management Approval",
      subText: "Date: ________________________",
    },
  },
};

export const blankPreset: SOWDocument = {
  meta: {
    refNumber: `QT-NEW-${new Date().getFullYear()}-01`,
    proposalDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    validityDays: 30,
    title: "Software Development Proposal",
    subtitle: "Custom Application Engineering & Cloud Services",
  },
  branding: {
    companyName: "SOFTINFOX",
    parentCompany: "by Five7 IT Solutions",
    tagline: "Enterprise Software & Cloud Engineering",
    badgeText: "Official Quotation & Scope of Work",
    confidentialText: "CONFIDENTIAL • SOFTINFOX by Five7 IT Solutions",
  },
  client: {
    clientName: "Client Business Name",
    deploymentType: "Dedicated Cloud Setup",
  },
  executiveOverview: {
    title: "1. Executive Overview & Business Workflow",
    summaryText: "Proposal summary and core business problem statement:",
    bulletPoints: [
      {
        label: "Core Workflow 1:",
        text: "Description of first key capability or workflow.",
      },
      {
        label: "Core Workflow 2:",
        text: "Description of second key capability or workflow.",
      },
    ],
  },
  modules: [
    {
      id: "mod-1",
      icon: "✨",
      name: "Core Module 1",
      description: "Detailed description of scope, logic, and delivery requirements.",
      type: "New",
    },
  ],
  financials: {
    items: [
      {
        id: "fin-1",
        title: "Initial Development Scope",
        subtitle: "Core engine, UI/UX and deployment",
        category: "Development",
        amount: 50000,
        taxable: true,
      },
    ],
    gstRate: 18,
  },
  amc: {
    description: "Cloud Server Hosting, Automated Daily Backups & Support",
    frequency: "Yearly (Post Year 1)",
    amount: 20000,
    gstRate: 18,
  },
  milestones: {
    preset: "50-50",
    stages: [
      {
        percentage: 50,
        label: "Advance Payment",
        description: "Project kickoff and setup",
      },
      {
        percentage: 50,
        label: "Final Delivery",
        description: "UAT signoff and deployment",
      },
    ],
  },
  terms: [
    "Out of Scope: Any feature not explicitly listed in Section 2 requires a separate change request.",
    "Third-party messaging, SMS or API gateway charges are directly borne by the client.",
  ],
  signatures: {
    preparedBy: {
      role: "Prepared & Delivered By",
      badge: "Technology Partner",
      signLineText: "Authorized Signatory & Seal",
      name: "SOFTINFOX",
      company: "by Five7 IT Solutions",
      subText: "Enterprise Software & Cloud Engineering",
    },
    acceptedBy: {
      role: "Accepted & Approved By",
      badge: "Client Authorization",
      signLineText: "Authorized Signatory & Stamp",
      name: "Client Business Name",
      company: "Management Approval",
      subText: "Date: ________________________",
    },
  },
};

export const PRESET_OPTIONS = [
  { id: "cotton", label: "Cotton Ginning & Trading ERP (Vaibhav Cotton)", data: cottonERPPreset },
  { id: "retail", label: "Retail & Inventory POS System", data: retailSaaSPreset },
  { id: "custom", label: "Custom Web & Mobile App", data: customWebMobilePreset },
  { id: "blank", label: "Blank SOW Template", data: blankPreset },
];
