"use client";

import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { StepHeader } from "./components/StepHeader";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { NavigationButtons } from "./components/NavigationButtons";
import { useStep4Form } from "./hooks/useStep4Form";

/**
 * Composant principal pour l'étape 4 du processus d'onboarding
 *
 * Cette étape gère la collecte des informations personnelles de l'utilisateur :
 * - Prénom
 * - Nom
 * - Email
 * - Numéro de téléphone (optionnel)
 *
 * Les données sont sauvegardées dans le contexte à chaque modification
 * et persistées lors de la navigation entre les étapes.
 */
export default function Step4() {
  // Utilisation du hook personnalisé pour gérer le formulaire
  const {
    register,
    errors,
    handleSubmit,
    clearError,
    form,
    handleFieldChange,
    getValues,
  } = useStep4Form();

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-2rem)] w-[85%] max-w-full relative">
      {/* Header Section - Affiche l'indicateur d'étape et la barre de progression */}
      <StepHeader />

      {/* Main Content - Using grid for better control */}
      <div className="grid grid-rows-[1fr_auto] flex-1 px-6 py-4 h-[calc(100%-4rem)] overflow-y-auto">
        {/* Scrollable Content Area */}
        <div className="space-y-6 pb-4 overflow-y-auto">
          {/* Form Section - Formulaire d'informations personnelles */}
          <div className="space-y-4">
            <form id="step4-form" onSubmit={handleSubmit} className="space-y-4">
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
