"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/useEmailForm";
import { CustomRequestEmailData } from "@/types/email";

/**
 * Page de demande sur mesure avec design minimaliste
 * Centrée sur l'expérience utilisateur avec uniquement les inputs essentiels
 * Intègre le système d'envoi d'emails automatisé
 */
export default function DemandeSurMesurePage() {
  const router = useRouter();

  // Définir les champs du formulaire sans 'to' et 'subject' qui seront ajoutés par le service
  type FormData = Omit<CustomRequestEmailData, "to" | "subject">;

  // Utilisation du hook useEmailForm pour gérer l'état et la soumission du formulaire
  const {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
  } = useEmailForm<FormData>({
    template: "custom-request",
    redirectPath: "/submitted",
  });

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-2rem)] w-[85%] max-w-full mx-auto relative">
      {!isSubmitted ? (
        <>
          <div className="text-center py-6">
            <h1 className="text-2xl font-medium">Votre demande sur mesure</h1>
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
          </div>

          {/* Main Content - Using grid for better control */}
          <div className="grid grid-rows-[1fr_auto] flex-1 px-6 py-4 h-[calc(100%-4rem)] overflow-y-auto">
            {/* Scrollable Content Area */}
            <div className="space-y-6 pb-4 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section informations de contact */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Votre nom et prénom"
                        value={formData.fullName || ""}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Entreprise
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Nom de votre entreprise"
                        value={formData.company || ""}
                        onChange={(e) => updateField("company", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="nom@entreprise.com"
                        value={formData.email || ""}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Votre numéro de téléphone"
                        value={formData.phone || ""}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-1 text-gray-700"
                    >
                      Description détaillée de vos besoins
                    </label>
                    <textarea
                      id="description"
                      className="w-full h-[215px] px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                      rows={5}
                      placeholder="Décrivez précisément vos besoins (critères de ciblage, spécificités, etc.)"
                      value={formData.description || ""}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      required
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>

            {/* Navigation Buttons - Fixed at bottom, similar to pages 1 and 2 */}
            <div className="sticky bottom-0 bg-white py-4">
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="px-6"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 bg-black hover:bg-black/90 text-white"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Message de confirmation après soumission */
        <div className="flex items-center justify-center h-full">
          <div className="bg-white/50 rounded-lg border border-gray-200 p-8 text-center max-w-md w-full">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">
              Demande envoyée avec succès
            </h2>
            <p className="text-gray-600 mb-6">
              Notre équipe va étudier votre demande et vous contactera sous 48h
              avec une proposition personnalisée.
            </p>
            <p className="text-sm text-gray-500">Redirection en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
}
