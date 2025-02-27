"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { useStep6Form } from "./hooks/useStep6Form";
import { StepHeader } from "./components/StepHeader";
import { LeadQuantityInput } from "./components/LeadQuantityInput";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Step6() {
  const {
    form,
    selectedQuantity,
    selectedPrice,
    handleQuantityChange,
    handleSubmit,
    isSubmitting,
  } = useStep6Form();

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
              <LeadQuantityInput
                value={selectedQuantity}
                onChange={handleQuantityChange}
                selectedPrice={selectedPrice}
              />
            </form>
          </div>
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white py-4">
          <NavigationButtons
            form={form}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
