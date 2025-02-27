"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import ApolloActions from "./components/ApolloActions";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { useApolloActions } from "./hooks/useApolloActions";

/**
 * Page de confirmation après soumission des critères
 */
export default function SubmittedPage() {
  const router = useRouter();
  const { isGeneratingLink, handleOpenApolloLink, handleCopyApolloLink } =
    useApolloActions();

  // Fonction pour naviguer vers un autre chemin
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between py-8">
      {/* En-tête avec logo et message de confirmation */}
      <Header isGeneratingLink={isGeneratingLink} />

      {/* Boutons d'action Apollo */}
      <ApolloActions
        isGeneratingLink={isGeneratingLink}
        onOpenApollo={handleOpenApolloLink}
        onCopyApolloLink={handleCopyApolloLink}
      />

      {/* Section des cartes CTA */}
      <CTASection onNavigate={handleNavigate} />

      {/* Pied de page avec bouton de retour */}
      <Footer onBackToHome={() => handleNavigate("/")} />
    </div>
  );
}
