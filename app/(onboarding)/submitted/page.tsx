"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header, CTASection, Footer } from "./components";

/**
 * Page de confirmation après soumission des critères
 */
export default function SubmittedPage() {
  const router = useRouter();

  // Fonction pour naviguer vers un autre chemin
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {/* En-tête avec logo et message de confirmation */}
      <Header />

      {/* Section des cartes CTA */}
      <CTASection onNavigate={handleNavigate} />

      {/* Pied de page avec bouton de retour */}
      <Footer onBackToHome={() => handleNavigate("/")} />
    </div>
  );
}
