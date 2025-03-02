"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FormFields } from "./components/FormFields";
import { useAideCampagneForm } from "./hooks/useAideCampagneForm";
import { useRouter } from "next/navigation";

export default function AideCampagnePage() {
  const router = useRouter();
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
  } = useAideCampagneForm();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex items-center justify-center px-4 py-8">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Côté gauche : Comment pouvons-nous vous aider */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border p-5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-medium mb-3">
                  Comment pouvons-nous vous aider ?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-sm">
                        Mise en place d'un système de prospection mailing
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Automatisez et optimisez vos campagnes d'emailing pour
                        toucher efficacement vos prospects et maximiser vos
                        conversions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-sm">
                        Stratégie et automatisation LinkedIn
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Déployez une stratégie performante sur LinkedIn avec des
                        campagnes automatisées et ciblées pour générer des leads
                        qualifiés.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-sm">
                        Accompagnement personnalisé
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Bénéficiez d'un suivi sur mesure pour structurer et
                        améliorer votre stratégie de prospection selon vos
                        besoins spécifiques.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-black/60 italic">
                  "Nous avons accompagné plus de 200 entreprises dans la
                  structuration de leur prospection, leur permettant d'augmenter
                  significativement leur taux de conversion et d'optimiser leur
                  acquisition client."
                </p>
              </div>
            </div>

            {/* Côté droit : Formulaire de contact */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border p-5 overflow-y-auto max-h-[70vh]">
              <h2 className="text-lg font-medium mb-3">
                Demande d'accompagnement
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-3"
              >
                <FormFields formData={formData} handleChange={handleChange} />

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="pt-0 pb-1">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Envoi en cours..."
                      : "Demander un accompagnement"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-7 h-7 text-gray-700"
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
            <h3 className="text-lg font-medium mb-2">
              Demande reçue avec succès !
            </h3>
            <p className="text-sm text-black/60">
              Notre équipe vous contactera sous 24h pour échanger sur vos
              besoins.
            </p>
            <p className="text-xs mt-3 text-black/40">
              Redirection automatique...
            </p>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-center gap-4 pb-4 pt-2 mt-auto px-4">
        <Button
          variant="outline"
          onClick={() => router.push("/submitted")}
          className="px-6 flex-1 sm:flex-initial"
          size="sm"
        >
          Retour
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="px-6 flex-1 sm:flex-initial"
          size="sm"
        >
          Accueil
        </Button>
      </div>
    </div>
  );
}
