"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { useStep1Form } from "./hooks/useStep1Form";
import { StepHeader } from "./components/StepHeader";
import { JobTitleInput } from "./components/JobTitleInput";
import { ManagementLevelInput } from "./components/ManagementLevelInput";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Step1() {
  const {
    form,
    selectedLevel,
    setSelectedLevel,
    handleSubmit,
    handleRemoveLevel,
    handleAddJobTitle,
    handleRemoveJobTitle,
  } = useStep1Form();

  return (
    <div className="flex flex-col h-screen w-[85%] max-w-full relative">
      {/* Header Section */}
      <StepHeader />
      {/* Main Content - Using grid for better control */}
      <div className="grid grid-rows-[1fr_auto] flex-1 px-6 py-4 overflow-hidden">
        {/* Content Area */}
        <div className="space-y-6 pb-4 overflow-y-auto">
          {/* Form Section */}
          <div className="space-y-4">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <JobTitleInput
                jobTitles={form.watch("jobTitle") || []}
                onAdd={handleAddJobTitle}
                onRemove={handleRemoveJobTitle}
              />
              <ManagementLevelInput
                selectedLevels={form.watch("managementLevel") || []}
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
                onRemoveLevel={handleRemoveLevel}
              />
            </form>
          </div>
          {/* Feature Section - Hidden on small screens */}
          <div className="relative hidden sm:block">
            <FeaturesSectionWithHoverEffects />
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
