// utils/apolloParameterMap.ts
import {
  ApolloFormData,
  ApolloUrlParams,
  Industry,
} from "../types/apolloTypes";
import { industries } from "@/app/(onboarding)/2/mocks/constants";

export const mapFormDataToUrlParams = (
  formData: ApolloFormData
): ApolloUrlParams => {
  const params: ApolloUrlParams = {
    page: "1",
    sortAscending: "true",
    sortByField: "person_title_normalized",
    prospectedByCurrentTeam: ["no"],
    contactEmailExcludeCatchAll: "true",
  };

  // Mappages pour les titres professionnels
  if (formData.jobTitles.length) {
    params.personTitles = formData.jobTitles;
  }

  if (formData.excludedTitles.length) {
    params.personNotTitles = formData.excludedTitles;
  }

  // Mappages pour les localisations
  if (formData.locations.length) {
    params.personLocations = formData.locations;
  }

  if (formData.excludedLocations.length) {
    params.personNotLocations = formData.excludedLocations;
  }

  // Mappages pour les entreprises
  if (formData.companyKeywords.length) {
    params.organizationKeywords = formData.companyKeywords;
  }

  if (formData.companySize.length) {
    params.organizationNumEmployeesRanges = formData.companySize;
  }

  // Mappages pour les secteurs d'activité
  if (formData.industries.length) {
    const industryIds: string[] = [];

    // Déterminer le type de données reçu et extraire les IDs en conséquence
    if (typeof formData.industries[0] === "string") {
      // Cas 1: On a reçu des valeurs (value) ou des noms (label)
      const selectedIndustries = formData.industries as string[];

      // Pour chaque valeur, trouver l'industrie correspondante et récupérer son ID
      selectedIndustries.forEach((selected) => {
        // Chercher par value ou par label (insensible à la casse)
        const match = industries.find(
          (ind) =>
            ind.value.toLowerCase() === selected.toLowerCase() ||
            ind.label.toLowerCase() === selected.toLowerCase()
        );

        if (match) {
          industryIds.push(match.id);
        }
      });
    } else {
      // Cas 2: On a reçu des objets Industry complets
      const selectedIndustries = formData.industries as Industry[];
      selectedIndustries.forEach((industry) => {
        if (industry.id) {
          industryIds.push(industry.id);
        }
      });
    }

    // Ajouter les IDs au paramètre de requête s'il y en a
    if (industryIds.length > 0) {
      params.organizationIndustryTagIds = industryIds;
    }
  }

  // Mappages pour d'autres paramètres
  if (formData.managementLevels.length) {
    params.personSeniorities = formData.managementLevels.map((level) =>
      level === "cSuite" ? "c_suite" : level
    );
  }

  if (formData.departments.length) {
    params.personDepartmentOrSubdepartments = formData.departments;
  }

  // Statuts de vérification d'e-mail
  if (formData.emailVerificationStatus.length) {
    params.contactEmailStatusV2 = formData.emailVerificationStatus;
  }

  // Paramètres de recherche avancés
  if (formData.keywords && formData.keywords.length) {
    // Mots-clés généraux (valeur unique)
    params.qKeywords = formData.keywords.join(" ");
  }

  if (formData.organizationTags && formData.organizationTags.length) {
    // Tags pour les organisations
    params.qOrganizationKeywordTags = formData.organizationTags;
  }

  if (formData.searchInFields && formData.searchInFields.length) {
    // Champs de recherche
    params.includedOrganizationKeywordFields = formData.searchInFields;
  } else {
    // Par défaut, rechercher dans les tags et les noms
    params.includedOrganizationKeywordFields = ["tags", "name"];
  }

  return params;
};
