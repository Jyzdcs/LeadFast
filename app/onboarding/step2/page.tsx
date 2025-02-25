"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { useStep2Form } from "./hooks/useStep2Form";
import { StepHeader } from "./components/StepHeader";
import { JobTitleInput } from "./components/JobTitleInput";
import { ManagementLevelInput } from "./components/ManagementLevelInput";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Step2() {
	const {
		form,
		selectedLevel,
		setSelectedLevel,
		handleSubmit,
		handleRemoveLevel,
		handleAddJobTitle,
		handleRemoveJobTitle,
	} = useStep2Form();

	return (
		<div className="flex flex-col h-screen w-[85%]">
		{/* Header Section */}
		<StepHeader />

		{/* Main Content */}
		<div className="flex-1 px-6 py-4 flex flex-col h-full">
			{/* Form Section */}
			<div className="space-y-4">
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

			{/* Feature Section */}
			<div className="relative mt-4">
				<FeaturesSectionWithHoverEffects />
			</div>

			{/* Navigation Buttons */}
			<NavigationButtons form={form} onSubmit={handleSubmit} />
		</div>
		</div>
	);
}
