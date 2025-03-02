"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { submitDemandeSurMesure } from "@/utils/api";

/**
 * Page de demande sur mesure avec design minimaliste
 * Centrée sur l'expérience utilisateur avec uniquement les inputs essentiels
 */
export default function DemandeSurMesurePage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État pour chaque champ du formulaire
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    description: "",
  });

  // Mise à jour des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.company.trim() ||
      !formData.description.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await submitDemandeSurMesure(formData);

      if (response.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          router.push("/submitted");
        }, 2000);
      } else {
        setError(
          response.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de votre demande");
      console.error("Erreur lors de l'envoi de la demande:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-2rem)] w-[85%] max-w-full mx-auto relative">
      {!formSubmitted ? (
        <>
          <div className="text-center py-6">
            <h1 className="text-2xl font-medium">Votre demande sur mesure</h1>
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
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Votre nom et prénom"
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
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Nom de votre entreprise"
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
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="nom@entreprise.com"
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
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                        placeholder="Votre numéro de téléphone"
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
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full h-[215px] px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                      rows={5}
                      placeholder="Décrivez précisément vos besoins (critères de ciblage, spécificités, etc.)"
                      required
                    ></textarea>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}
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
                  disabled={isLoading}
                  className="px-6 bg-black hover:bg-black/90 text-white"
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
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
