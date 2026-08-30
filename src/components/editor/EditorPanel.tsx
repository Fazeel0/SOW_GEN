"use client";

import React from "react";
import { useSOWStore } from "@/store/useSOWStore";
import { HeaderTab } from "./HeaderTab";
import { OverviewTab } from "./OverviewTab";
import { ModulesTab } from "./ModulesTab";
import { FinancialsTab } from "./FinancialsTab";
import { AmcMilestonesTab } from "./AmcMilestonesTab";
import { TermsTab } from "./TermsTab";
import { SignaturesTab } from "./SignaturesTab";
import { TemplateControls } from "../ui/TemplateControls";
import {
  FileText,
  Layers,
  TableProperties,
  IndianRupee,
  CalendarClock,
  ShieldCheck,
  PenTool,
} from "lucide-react";

const TABS = [
  { id: "header", label: "1. Header & Client", icon: FileText },
  { id: "overview", label: "2. Workflow Overview", icon: Layers },
  { id: "modules", label: "3. Modules Matrix", icon: TableProperties },
  { id: "financials", label: "4. Pricing & GST", icon: IndianRupee },
  { id: "amc", label: "5. AMC & Milestones", icon: CalendarClock },
  { id: "terms", label: "6. Terms & Scope", icon: ShieldCheck },
  { id: "signatures", label: "7. Signatures", icon: PenTool },
];

export const EditorPanel: React.FC = () => {
  const activeTab = useSOWStore((state) => state.activeTab);
  const setActiveTab = useSOWStore((state) => state.setActiveTab);

  return (
    <div className="w-full lg:w-[460px] xl:w-[500px] h-screen flex flex-col bg-slate-100 border-r border-slate-300 sow-no-print shrink-0 overflow-hidden">
      {/* Top Header & Preset Loader */}
      <TemplateControls />

      {/* Navigation Tabs (Scrollable horizontal pill bar) */}
      <div className="bg-white border-b border-slate-200 px-2 py-1.5 flex items-center gap-1 overflow-x-auto custom-scrollbar shrink-0 shadow-2xs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-100">
        {activeTab === "header" && <HeaderTab />}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "modules" && <ModulesTab />}
        {activeTab === "financials" && <FinancialsTab />}
        {activeTab === "amc" && <AmcMilestonesTab />}
        {activeTab === "terms" && <TermsTab />}
        {activeTab === "signatures" && <SignaturesTab />}
      </div>
    </div>
  );
};
