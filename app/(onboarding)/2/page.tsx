"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { useStep2Form } from "./hooks/useStep2Form";
import { StepHeader } from "./components/StepHeader";
import { ActivitySectorInput } from "./components/ActivitySectorInput";
import { CompanySizeInput } from "./components/CompanySizeInput";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Step2() {
  const {
    form,
    selectedSector,
    setSelectedSector,
    selectedSize,
    setSelectedSize,
    handleSubmit,
    handleRemoveSector,
    handleRemoveSize,
    handleSelectAllCompanySizes,
  } = useStep2Form();

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-2rem)] w-[85%] max-w-full relative">
      {/* Header Section */}
      <StepHeader />

      {/* Main Content - Using grid for better control */}
      <div className="grid grid-rows-[1fr_auto] flex-1 px-6 py-4 h-[calc(100%-4rem)] overflow-y-auto">
        {/* Scrollable Content Area */}
        <div className="space-y-6 pb-4 overflow-y-auto">
          {/* Form Section */}
          <div className="space-y-4">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <ActivitySectorInput
                sectors={form.watch("activitySector") || []}
                onAdd={setSelectedSector}
                onRemove={handleRemoveSector}
              />
              <CompanySizeInput
                sizes={form.watch("companySize") || []}
                onAdd={setSelectedSize}
                onRemove={handleRemoveSize}
                onSelectAll={handleSelectAllCompanySizes}
              />
            </form>
          </div>
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white py-4">
          <NavigationButtons form={form} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
