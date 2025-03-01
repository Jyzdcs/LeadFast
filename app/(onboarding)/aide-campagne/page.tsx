"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AideCampagnePage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Ici, vous pourriez envoyer les données du formulaire à une API
    setTimeout(() => {
      router.push("/submitted");
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Contenu principal */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex items-center justify-center px-4">
        {!formSubmitted ? (
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
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    placeholder="Email professionnel"
                    required
                  />
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
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
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    rows={4}
                    placeholder="Décrivez vos besoins spécifiques"
                    required
                  ></textarea>
                </div>
                <div className="pt-1">
                  <Button type="submit" className="w-full">
                    Demander un accompagnement
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
