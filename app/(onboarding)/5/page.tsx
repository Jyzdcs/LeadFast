"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { useStep5Form } from "./hooks/useStep5Form";
import { StepHeader } from "./components/StepHeader";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Step5() {
  const {
    register,
    errors,
    handleSubmit,
    clearError,
    form,
    handleFieldChange,
    getValues,
  } = useStep5Form();

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
            <form id="step5-form" onSubmit={handleSubmit} className="space-y-4">
              <PersonalInfoForm
                register={register}
                errors={errors}
                clearError={clearError}
                handleFieldChange={handleFieldChange}
                getValues={getValues}
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
