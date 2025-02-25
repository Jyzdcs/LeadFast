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
    <div className="space-y-8 text-center">
      {/* Logo SVG */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 rounded-sm blur-xl" />
          <Image
            src="/leadfast.png"
            alt="LeadFast.io"
            width={100}
            height={100}
            className="rounded-xl relative"
          />
        </div>
        <h2 className="text-3xl font-medium mb-4">
          Merci pour votre confiance !
        </h2>
        <p className="text-lg text-black/60 mb-8 max-w-md">
          Nous avons bien reçu vos critères de recherche. Notre équipe va
          commencer à générer vos leads qualifiés.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 text-sm">
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
      {/* Boutons d'action */}
      <div className="flex flex-col gap-4 items-center">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="w-full max-w-xs"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
