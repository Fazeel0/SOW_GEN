import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SOWDocument, SOWModule, SOWFinancialItem, SOWMilestoneStage } from "@/types/sow";
import { cottonERPPreset } from "@/data/presets";

interface SOWState {
  document: SOWDocument;
  zoomLevel: number; // 0.75, 0.9, 1, 1.1, etc.
  activeTab: string;

  // Actions
  setDocument: (doc: SOWDocument) => void;
  updateMeta: (meta: Partial<SOWDocument["meta"]>) => void;
  updateBranding: (branding: Partial<SOWDocument["branding"]>) => void;
  updateClient: (client: Partial<SOWDocument["client"]>) => void;
  updateExecutiveOverview: (overview: Partial<SOWDocument["executiveOverview"]>) => void;
  
  // Bullets in Overview
  addOverviewBullet: (label?: string, text?: string) => void;
  updateOverviewBullet: (index: number, label: string, text: string) => void;
  removeOverviewBullet: (index: number) => void;

  // Modules Matrix
  addModule: (module?: Partial<SOWModule>) => void;
  updateModule: (id: string, module: Partial<SOWModule>) => void;
  removeModule: (id: string) => void;
  reorderModules: (startIndex: number, endIndex: number) => void;

  // Financial Items
  addFinancialItem: (item?: Partial<SOWFinancialItem>) => void;
  updateFinancialItem: (id: string, item: Partial<SOWFinancialItem>) => void;
  removeFinancialItem: (id: string) => void;
  setGstRate: (rate: number) => void;

  // AMC
  updateAmc: (amc: Partial<SOWDocument["amc"]>) => void;

  // Milestones
  setMilestonePreset: (preset: "60-30-10" | "50-50" | "40-40-20" | "custom") => void;
  updateMilestoneStage: (index: number, stage: Partial<SOWMilestoneStage>) => void;
  addMilestoneStage: () => void;
  removeMilestoneStage: (index: number) => void;

  // Terms & Conditions
  addTerm: (term?: string) => void;
  updateTerm: (index: number, text: string) => void;
  removeTerm: (index: number) => void;

  // Signatures
  updateSignature: (party: "preparedBy" | "acceptedBy", signatory: Partial<SOWDocument["signatures"]["preparedBy"]>) => void;

  // UI state
  setZoomLevel: (zoom: number) => void;
  setActiveTab: (tab: string) => void;
  loadPreset: (preset: SOWDocument) => void;
  resetDocument: () => void;
}

export const useSOWStore = create<SOWState>()(
  persist(
    (set) => ({
      document: cottonERPPreset,
      zoomLevel: 1,
      activeTab: "header",

      setDocument: (document) => set({ document }),

      updateMeta: (meta) =>
        set((state) => ({
          document: { ...state.document, meta: { ...state.document.meta, ...meta } },
        })),

      updateBranding: (branding) =>
        set((state) => ({
          document: { ...state.document, branding: { ...state.document.branding, ...branding } },
        })),

      updateClient: (client) =>
        set((state) => ({
          document: { ...state.document, client: { ...state.document.client, ...client } },
        })),

      updateExecutiveOverview: (overview) =>
        set((state) => ({
          document: {
            ...state.document,
            executiveOverview: { ...state.document.executiveOverview, ...overview },
          },
        })),

      addOverviewBullet: (label = "New Point:", text = "Description of the workflow step.") =>
        set((state) => ({
          document: {
            ...state.document,
            executiveOverview: {
              ...state.document.executiveOverview,
              bulletPoints: [
                ...state.document.executiveOverview.bulletPoints,
                { label, text },
              ],
            },
          },
        })),

      updateOverviewBullet: (index, label, text) =>
        set((state) => {
          const newBullets = [...state.document.executiveOverview.bulletPoints];
          if (newBullets[index]) {
            newBullets[index] = { label, text };
          }
          return {
            document: {
              ...state.document,
              executiveOverview: {
                ...state.document.executiveOverview,
                bulletPoints: newBullets,
              },
            },
          };
        }),

      removeOverviewBullet: (index) =>
        set((state) => ({
          document: {
            ...state.document,
            executiveOverview: {
              ...state.document.executiveOverview,
              bulletPoints: state.document.executiveOverview.bulletPoints.filter((_, i) => i !== index),
            },
          },
        })),

      addModule: (moduleData) =>
        set((state) => {
          const newModule: SOWModule = {
            id: `mod-${Date.now()}`,
            icon: moduleData?.icon || "✨",
            name: moduleData?.name || "New Module Feature",
            description: moduleData?.description || "Description of deliverables and workflow scope.",
            type: moduleData?.type || "New",
          };
          return {
            document: {
              ...state.document,
              modules: [...state.document.modules, newModule],
            },
          };
        }),

      updateModule: (id, moduleData) =>
        set((state) => ({
          document: {
            ...state.document,
            modules: state.document.modules.map((m) =>
              m.id === id ? { ...m, ...moduleData } : m
            ),
          },
        })),

      removeModule: (id) =>
        set((state) => ({
          document: {
            ...state.document,
            modules: state.document.modules.filter((m) => m.id !== id),
          },
        })),

      reorderModules: (startIndex, endIndex) =>
        set((state) => {
          const items = Array.from(state.document.modules);
          const [reorderedItem] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, reorderedItem);
          return {
            document: {
              ...state.document,
              modules: items,
            },
          };
        }),

      addFinancialItem: (itemData) =>
        set((state) => {
          const newItem: SOWFinancialItem = {
            id: `fin-${Date.now()}`,
            title: itemData?.title || "New Service / Deliverable",
            subtitle: itemData?.subtitle || "",
            category: itemData?.category || "Development",
            amount: itemData?.amount || 10000,
            taxable: itemData?.taxable ?? true,
          };
          return {
            document: {
              ...state.document,
              financials: {
                ...state.document.financials,
                items: [...state.document.financials.items, newItem],
              },
            },
          };
        }),

      updateFinancialItem: (id, itemData) =>
        set((state) => ({
          document: {
            ...state.document,
            financials: {
              ...state.document.financials,
              items: state.document.financials.items.map((item) =>
                item.id === id ? { ...item, ...itemData } : item
              ),
            },
          },
        })),

      removeFinancialItem: (id) =>
        set((state) => ({
          document: {
            ...state.document,
            financials: {
              ...state.document.financials,
              items: state.document.financials.items.filter((item) => item.id !== id),
            },
          },
        })),

      setGstRate: (gstRate) =>
        set((state) => ({
          document: {
            ...state.document,
            financials: {
              ...state.document.financials,
              gstRate,
            },
          },
        })),

      updateAmc: (amc) =>
        set((state) => ({
          document: {
            ...state.document,
            amc: { ...state.document.amc, ...amc },
          },
        })),

      setMilestonePreset: (preset) =>
        set((state) => {
          let stages: SOWMilestoneStage[] = [];
          if (preset === "60-30-10") {
            stages = [
              { percentage: 60, label: "Advance Payment", description: "Project kickoff, repo & setup" },
              { percentage: 30, label: "Mid-Milestone", description: "Core modules completed & UAT" },
              { percentage: 10, label: "Final Delivery", description: "Production go-live & handover" },
            ];
          } else if (preset === "50-50") {
            stages = [
              { percentage: 50, label: "Advance Payment", description: "Project kickoff & architecture setup" },
              { percentage: 50, label: "Final Delivery", description: "Completion, testing & signoff" },
            ];
          } else if (preset === "40-40-20") {
            stages = [
              { percentage: 40, label: "Advance Payment", description: "Kickoff & initial milestone" },
              { percentage: 40, label: "Mid-Milestone", description: "Full feature beta release" },
              { percentage: 20, label: "Final Delivery", description: "Final release & go-live" },
            ];
          } else {
            stages = state.document.milestones.stages;
          }

          return {
            document: {
              ...state.document,
              milestones: { preset, stages },
            },
          };
        }),

      updateMilestoneStage: (index, stage) =>
        set((state) => {
          const newStages = [...state.document.milestones.stages];
          if (newStages[index]) {
            newStages[index] = { ...newStages[index], ...stage };
          }
          return {
            document: {
              ...state.document,
              milestones: {
                preset: "custom",
                stages: newStages,
              },
            },
          };
        }),

      addMilestoneStage: () =>
        set((state) => ({
          document: {
            ...state.document,
            milestones: {
              preset: "custom",
              stages: [
                ...state.document.milestones.stages,
                { percentage: 0, label: "New Stage", description: "Stage description" },
              ],
            },
          },
        })),

      removeMilestoneStage: (index) =>
        set((state) => ({
          document: {
            ...state.document,
            milestones: {
              preset: "custom",
              stages: state.document.milestones.stages.filter((_, i) => i !== index),
            },
          },
        })),

      addTerm: (term = "New safety or operational clause.") =>
        set((state) => ({
          document: {
            ...state.document,
            terms: [...state.document.terms, term],
          },
        })),

      updateTerm: (index, text) =>
        set((state) => {
          const newTerms = [...state.document.terms];
          newTerms[index] = text;
          return {
            document: {
              ...state.document,
              terms: newTerms,
            },
          };
        }),

      removeTerm: (index) =>
        set((state) => ({
          document: {
            ...state.document,
            terms: state.document.terms.filter((_, i) => i !== index),
          },
        })),

      updateSignature: (party, signatory) =>
        set((state) => ({
          document: {
            ...state.document,
            signatures: {
              ...state.document.signatures,
              [party]: { ...state.document.signatures[party], ...signatory },
            },
          },
        })),

      setZoomLevel: (zoomLevel) => set({ zoomLevel }),
      setActiveTab: (activeTab) => set({ activeTab }),
      loadPreset: (document) => set({ document }),
      resetDocument: () => set({ document: cottonERPPreset }),
    }),
    {
      name: "sow-generator-draft-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
