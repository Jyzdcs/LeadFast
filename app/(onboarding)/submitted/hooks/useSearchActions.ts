import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { prepareEngineData } from "@/app/(onboarding)/submitted/utils/engineDataAdapter";

/**
 * Hook pour gérer les actions liées à la recherche
 */
export const useSearchActions = () => {
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { toast } = useToast();
  const { data } = useOnboarding();

  /**
   * Génère un lien de recherche et l'ouvre dans un nouvel onglet
   */
  const handleOpenSearchLink = async () => {
    try {
      setIsGeneratingLink(true);

      // Préparer les données pour le moteur de recherche
      const engineData = prepareEngineData(data);

      // Générer le lien via l'API
      const response = await fetch("/api/search-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(engineData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du lien de recherche");
      }

      const responseData = await response.json();

      // Ouvrir le lien dans un nouvel onglet
      window.open(responseData.searchLink, "_blank");

      toast({
        title: "Lien ouvert",
        description: "Votre recherche a été ouverte dans un nouvel onglet",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ouvrir le lien de recherche",
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  /**
   * Génère un lien de recherche et le copie dans le presse-papier
   */
  const handleCopySearchLink = async () => {
    try {
      setIsGeneratingLink(true);

      // Préparer les données pour le moteur de recherche
      const engineData = prepareEngineData(data);

      // Générer le lien via l'API
      const response = await fetch("/api/search-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(engineData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du lien de recherche");
      }

      const responseData = await response.json();

      // Copier le lien dans le presse-papier
      await navigator.clipboard.writeText(responseData.searchLink);

      toast({
        title: "Lien copié",
        description: "Le lien de recherche a été copié dans le presse-papier",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de copier le lien de recherche",
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return {
    isGeneratingLink,
    handleOpenSearchLink,
    handleCopySearchLink,
  };
};
