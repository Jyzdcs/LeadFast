"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEmailForm } from "@/hooks/useEmailForm";
import type { CampaignHelpEmailData } from "@/types/email";

type FormData = Omit<CampaignHelpEmailData, "to" | "subject">;

export default function AideCampagnePage() {
  const router = useRouter();

  const {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
  } = useEmailForm<FormData>({
    template: "campaign-help",
    redirectPath: "/submitted",
    onError: (err) => console.error("Form error:", err),
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex items-center justify-center px-4">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-2/3">
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
                        Stratégie de ciblage
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Identifiez efficacement votre audience idéale et affinez
                        vos critères.
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
                        Optimisation des résultats
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Maximisez la qualité et la pertinence des leads générés.
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
                        Support technique
                      </span>
                      <p className="text-xs text-black/60 mt-0.5">
                        Assistance complète pour intégrer les leads dans votre
                        CRM.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-black/60 italic">
                  "Notre équipe a aidé plus de 200 entreprises à optimiser leurs
                  campagnes de génération de leads, avec une amélioration
                  moyenne de 40% du taux de conversion."
                </p>
              </div>
            </div>

            {/* Côté droit : Formulaire de contact */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-sm border p-5">
              <h2 className="text-lg font-medium mb-3">
                Demande d'accompagnement
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    placeholder="Nom complet"
                    value={formData.fullName || ""}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    placeholder="Email professionnel"
                    value={formData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    value={formData.service || ""}
                    onChange={(e) => updateField("service", e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="targeting">Stratégie de ciblage</option>
                    <option value="optimization">
                      Optimisation des résultats
                    </option>
                    <option value="support">Support technique</option>
                    <option value="complete">Accompagnement complet</option>
                  </select>
                </div>
                <div>
                  <textarea
                    className="w-full h-[317px] px-3 pt-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    rows={4}
                    placeholder="Décrivez vos besoins spécifiques"
                    value={formData.needs || ""}
                    onChange={(e) => updateField("needs", e.target.value)}
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}

                <div className="pt-0">
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
                  d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">
              Demande envoyée !
            </h3>
            <p className="text-gray-500 mb-4">
              Merci pour votre demande d'accompagnement. <br />
              Notre équipe vous contactera dans les 24 heures.
            </p>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-center gap-3 pb-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/submitted")}
          className="px-6"
          size="sm"
        >
          Retour
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="px-6"
          size="sm"
        >
          Accueil
        </Button>
      </div>
    </div>
  );
}
