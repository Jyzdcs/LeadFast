"use client";

import React from "react";
import { FormHeader } from "./components/FormHeader";
import { FormFields } from "./components/FormFields";
import { SuccessMessage } from "./components/SuccessMessage";
import { useDemandeSurMesureForm } from "./hooks/useDemandeSurMesureForm";
import { useRouter } from "next/navigation";
/**
 * Page de demande sur mesure avec design minimaliste
 * Centrée sur l'expérience utilisateur avec uniquement les inputs essentiels
 */
export default function DemandeSurMesurePage() {
  const router = useRouter();
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

            <div className="pt-6 flex flex-row gap-4 justify-between">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:flex-initial"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:flex-initial"
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
