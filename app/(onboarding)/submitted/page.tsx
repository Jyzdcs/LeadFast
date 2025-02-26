"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import Image from "next/image";

export default function SubmittedPage() {
  const router = useRouter();
  const { data } = useOnboarding();

  console.log(data);

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {/* Logo et message de confirmation */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 rounded-sm blur-xl" />
          <Image
            src="/leadfast.png"
            alt="LeadFast.io"
            width={80}
            height={80}
            className="rounded-xl relative"
          />
        </div>
        <h2 className="text-2xl font-medium mb-3">
          Merci pour votre confiance !
        </h2>
        <p className="text-base text-black/60 mb-6">
          Nous avons bien reçu vos critères de recherche. Notre équipe va
          commencer à générer vos leads qualifiés.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm mb-6">
          <svg
            className="w-4 h-4"
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
          Configuration terminée
        </div>
      </div>

      {/* Cartes CTA */}
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CTA 1: Accompagnement pour votre campagne */}
          <div
            onClick={() => router.push("/aide-campagne")}
            className="group cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-black/5 border border-gray-200 hover:border-gray-400 rounded-lg p-3 shadow-sm hover:shadow transition-all duration-300"
          >
            <div className="rounded-full bg-gray-100 p-2 w-8 h-8 flex items-center justify-center mb-2">
              <svg
                className="w-4 h-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 group-hover:text-gray-900 transition-colors">
              Accompagnement pour votre campagne
            </h3>
            <p className="text-gray-600 text-xs mb-2">
              Expertise personnalisée pour optimiser vos résultats.
            </p>
            <span className="inline-flex items-center text-gray-800 text-xs group-hover:text-black font-medium">
              En savoir plus
              <svg
                className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {/* CTA 2: Donnez votre feedback */}
          <div
            onClick={() => router.push("/feedback")}
            className="group cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-black/5 border border-gray-200 hover:border-gray-400 rounded-lg p-3 shadow-sm hover:shadow transition-all duration-300"
          >
            <div className="rounded-full bg-gray-100 p-2 w-8 h-8 flex items-center justify-center mb-2">
              <svg
                className="w-4 h-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 group-hover:text-gray-900 transition-colors">
              Donnez votre feedback
            </h3>
            <p className="text-gray-600 text-xs mb-2">
              Aidez-nous à améliorer notre service.
            </p>
            <span className="inline-flex items-center text-gray-800 text-xs group-hover:text-black font-medium">
              Laisser un avis
              <svg
                className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="px-6"
          size="sm"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
