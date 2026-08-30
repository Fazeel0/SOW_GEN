"use client";

import React, { useEffect, useState } from "react";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-slate-300">Loading SOW Generator...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* Left Panel: Form & State Editor */}
      <EditorPanel />

      {/* Right Panel: Live A4 Real-Time Preview */}
      <PreviewPanel />
    </main>
  );
}
