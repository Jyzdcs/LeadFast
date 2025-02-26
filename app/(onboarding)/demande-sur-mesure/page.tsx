"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Page de demande sur mesure avec design minimaliste
 * Centrée sur l'expérience utilisateur avec uniquement les inputs essentiels
 */
export default function DemandeSurMesurePage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Redirection après un court délai (ici on simule une soumission de formulaire)
    setTimeout(() => {
      router.push("/submitted");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      {!formSubmitted ? (
        <>
          <h1 className="text-2xl font-medium mb-6 text-center">
            Votre demande sur mesure
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section informations de contact */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
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
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    id="email"
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
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
              </div>
            </div>

            {/* Section description de la demande */}
            <div className="space-y-4 pt-2">
              <div>
                <label
                  htmlFor="sector"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Secteur d'activité
                </label>
                <select
                  id="sector"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                  required
                >
                  <option value="">Sélectionnez votre secteur</option>
                  <option value="restauration">Restauration</option>
                  <option value="retail">Commerce / Retail</option>
                  <option value="b2b">Services B2B</option>
                  <option value="tech">Technologie / IT</option>
                  <option value="sante">Santé / Médical</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="volume"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Volume de leads mensuel souhaité
                </label>
                <select
                  id="volume"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                  required
                >
                  <option value="">Sélectionnez un volume</option>
                  <option value="50">Moins de 50 leads</option>
                  <option value="100">50 à 100 leads</option>
                  <option value="200">100 à 200 leads</option>
                  <option value="500">200 à 500 leads</option>
                  <option value="1000">Plus de 500 leads</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Description de vos besoins
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                  rows={5}
                  placeholder="Décrivez précisément vos besoins (critères de ciblage, spécificités, etc.)"
                  required
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
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
                className="px-6 bg-black hover:bg-black/90 text-white"
              >
                Envoyer ma demande
              </Button>
            </div>
          </form>
        </>
      ) : (
        /* Message de confirmation après soumission */
        <div className="bg-white/50 rounded-lg border border-gray-200 p-8 text-center">
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
      )}
    </div>
  );
}
