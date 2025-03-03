import { useCallback } from "react";
import { ApolloFormData } from "@/types/apolloTypes";
import { mapFormDataToUrlParams } from "@/utils/apolloParameterMap";
import { generateApolloUrl } from "@/utils/urlGenerator";

/**
 * Hook pour la génération de liens Apollo adapté au workflow de LeadFast
 * Transforme les données de critères du formulaire en lien Apollo
 */
export const useLeadFastApollo = () => {
  /**
   * Convertit les critères LeadFast en format ApolloFormData
   * @param criteria - Les critères sélectionnés dans le formulaire LeadFast
   */
  const mapLeadFastCriteriaToApolloForm = useCallback(
    (criteria: any): ApolloFormData => {
      // Extraction de mots-clés de l'entreprise si disponible
      const companyName =
        criteria.companies && criteria.companies.length > 0
          ? criteria.companies[0]
          : criteria.company || "";

      // Détermination des mots-clés généraux de recherche
      const generalKeywords = companyName ? [companyName] : [];

      // Préparation des technologies comme tags d'organisation
      const techTags = criteria.expertise || [];

      // Création d'un objet ApolloFormData à partir des critères LeadFast
      const apolloFormData: ApolloFormData = {
        firstName: criteria.firstName || "",
        lastName: criteria.lastName || "",
        email: criteria.email || "",
        hasExistingLink: "no",
        apolloLink: "",

        // Conversion des titres professionnels
        jobTitles: criteria.positions || [],
        excludedTitles: criteria.excludedPositions || [],

        // Conversion des localisations
        locations: [
          ...(criteria.country ? [criteria.country] : []),
          ...(criteria.city ? [criteria.city] : []),
        ],
        excludedLocations: criteria.excludedLocations || [],

        // Conversion des paramètres d'entreprise
        companyKeywords: companyName ? [companyName] : [],
        companySize: criteria.companySize || [],
        industries: criteria.industries || [],

        // Autres paramètres
        managementLevels: criteria.seniority || [],
        departments: criteria.departments || [],
        emailVerificationStatus: ["verified"], // Par défaut, nous voulons des emails vérifiés

        // Paramètres de recherche avancés
        keywords: generalKeywords,
        organizationTags: techTags,
        searchInFields: ["tags", "name"], // Les champs dans lesquels rechercher par défaut
      };

      return apolloFormData;
    },
    []
  );

  /**
   * Génère un lien Apollo à partir des critères LeadFast
   * @param criteria - Les critères sélectionnés dans le formulaire LeadFast
   */
  const generateApolloLinkFromCriteria = useCallback(
    (criteria: any): string => {
      try {
        // Conversion des critères LeadFast en format Apollo
        const apolloFormData = mapLeadFastCriteriaToApolloForm(criteria);

        // Conversion en paramètres d'URL
        const urlParams = mapFormDataToUrlParams(apolloFormData);

        // Génération de l'URL Apollo
        const apolloUrl = generateApolloUrl(urlParams);

        return apolloUrl;
      } catch (error) {
        console.error("Erreur lors de la génération du lien Apollo:", error);
        return "";
      }
    },
    [mapLeadFastCriteriaToApolloForm]
  );

  /**
   * Ouvre le lien Apollo dans un nouvel onglet
   * @param criteria - Les critères sélectionnés dans le formulaire LeadFast
   */
  const openApolloLink = useCallback(
    (criteria: any): void => {
      const url = generateApolloLinkFromCriteria(criteria);

      if (url) {
        // Ouverture du lien dans un nouvel onglet
        window.open(url, "_blank");
      }
    },
    [generateApolloLinkFromCriteria]
  );

  /**
   * Copie le lien Apollo dans le presse-papiers
   * @param criteria - Les critères sélectionnés dans le formulaire LeadFast
   */
  const copyApolloLinkToClipboard = useCallback(
    async (criteria: any): Promise<boolean> => {
      const url = generateApolloLinkFromCriteria(criteria);

      if (url) {
        try {
          // Copie dans le presse-papiers
          await navigator.clipboard.writeText(url);
          return true;
        } catch (error) {
          console.error(
            "Erreur lors de la copie dans le presse-papiers:",
            error
          );
          return false;
        }
      }

      return false;
    },
    [generateApolloLinkFromCriteria]
  );

  return {
    generateApolloLinkFromCriteria,
    openApolloLink,
    copyApolloLinkToClipboard,
  };
};
