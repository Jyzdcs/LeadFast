import { useState } from "react";
import { mapFormToEngineParameters } from "@/utils/engineParameterMap";
import { generateSearchLink } from "@/utils/urlGenerator";

// Type pour la fonction de génération de lien de recherche
export interface LinkGeneratorOptions {
  positions?: string[];
  seniority?: string[];
  industries?: any[];
  companySize?: string[];
  company?: string;
  expertise?: string[];
  keywords?: string[];
  organizationTags?: string[];
}

// Résultat de la génération de lien
export interface SearchLinkResult {
  searchLink: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook pour la génération de liens de recherche
 * Fournit une interface pour générer des liens de recherche basés sur des critères
 */
export function useSearchLinkGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Génère un lien de recherche basé sur les critères fournis
   */
  const generateLink = async (
    criteria: LinkGeneratorOptions
  ): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validation des données minimales requises
      if (!criteria.positions?.length && !criteria.company) {
        throw new Error(
          "Au moins un titre de poste ou une entreprise est requis"
        );
      }

      // Génération du lien
      const searchLink = generateSearchLink(criteria);

      return searchLink;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la génération du lien";
      setError(errorMessage);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Format les données du formulaire pour le moteur de recherche
   */
  const prepareDataForEngine = (formData: any) => {
    return mapFormToEngineParameters(formData);
  };

  /**
   * Ouvre le lien de recherche dans un nouvel onglet
   */
  const openSearchLink = (criteria: LinkGeneratorOptions): void => {
    const url = generateSearchLink(criteria);
    if (url) {
      window.open(url, "_blank");
    }
  };

  /**
   * Copie le lien de recherche dans le presse-papiers
   */
  const copyLinkToClipboard = async (
    criteria: LinkGeneratorOptions
  ): Promise<boolean> => {
    const url = generateSearchLink(criteria);
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (error) {
        console.error("Erreur lors de la copie dans le presse-papiers:", error);
        return false;
      }
    }
    return false;
  };

  return {
    generateLink,
    prepareDataForEngine,
    openSearchLink,
    copyLinkToClipboard,
    isLoading,
    error,
  };
}
