"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function SubmittedPage() {
  const router = useRouter();
  const { data } = useOnboarding();

  console.log(data);
  // Récupération du nom pour personnaliser le message
  const userName =
    data.step1?.jobTitle || data.step6?.username || "utilisateur";

  return (
    <div className="space-y-8 text-center">
      {/* Logo SVG */}
      <div className="flex justify-center">
        <svg
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100.21 108.89"
          width="64"
          height="64"
          className="text-primary"
        >
          <defs>
            <style>
              {`.cls-1 {
                fill: #000;
                stroke-width: 0px;
              }`}
            </style>
          </defs>
          <g id="Layer_1-2" data-name="Layer 1">
            <g>
              <path
                className="cls-1"
                d="M53.71.72c-1.64-.96-3.66-.96-5.3,0l-25.19,14.74,49.26,28.78v58.27l25.13-14.7c1.61-.94,2.6-2.66,2.6-4.53V27.93L53.71.72Z"
              />
              <path
                className="cls-1"
                d="M23.27,30.91L0,44.28l36.57,21.36v43.25l23.22-13.35c1.19-.7,1.93-1.98,1.93-3.36v-41.08L27.2,30.91c-1.21-.71-2.72-.71-3.93,0Z"
              />
              <polygon
                className="cls-1"
                points="25.5 100.82 25.5 71.64 .56 86.23 25.5 100.82"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Message de confirmation */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Merci pour votre confiance !</h1>
        <p className="text-muted-foreground">
          Nous avons bien reçu vos critères de recherche. Notre équipe va
          commencer à générer vos leads qualifiés.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/rounded-full">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs text-black tracking-wide uppercase">
          Configuration terminée
        </span>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col gap-4 items-center">
        <Button
          variant="outline"
          onClick={() => router.push("/onboarding")}
          className="w-full max-w-xs"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
