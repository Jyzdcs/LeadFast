import { mapFormToEngineParameters } from "@/utils/engineParameterMap";
import { generateSearchLink } from "@/utils/urlGenerator";
import { useState } from "react";

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

  return {
    generateLink,
    prepareDataForEngine,
    isLoading,
    error,
  };
}
