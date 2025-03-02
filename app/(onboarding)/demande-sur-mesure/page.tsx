"use client";

import React from "react";
import { FormHeader } from "./components/FormHeader";
import { FormFields } from "./components/FormFields";
import { SuccessMessage } from "./components/SuccessMessage";
import { useDemandeSurMesureForm } from "./hooks/useDemandeSurMesureForm";

/**
 * Page de demande sur mesure avec design minimaliste
 * Centrée sur l'expérience utilisateur avec uniquement les inputs essentiels
 */
export default function DemandeSurMesurePage() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
  } = useDemandeSurMesureForm();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {!isSubmitted ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <FormHeader />
          <div className="p-6">
            <FormFields formData={formData} handleChange={handleChange} />

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}

            <div className="pt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <SuccessMessage />
        </div>
      )}
    </div>
  );
}
