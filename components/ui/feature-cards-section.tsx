import React from "react";
import TreeCards from "@/components/ui/tree-cards";

export function FeatureCardsSection() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <div className="space-y-10">
          <div className="-ml-12 dark">
            <TreeCards />
          </div>
        </div>
      </div>
    </div>
  );
} 