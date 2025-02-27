// utils/apolloParameterMap.ts
import { ApolloFormData, ApolloUrlParams } from "../types/apolloTypes";
import { getSectorIds } from "./apolloSectorMap";

// Interface pour les objets secteur d'activité
interface Industry {
  id: string;
  value: string;
  label: string;
}

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
    // Vérifier si nous avons affaire à des chaînes de caractères ou des objets
    const firstItem = formData.industries[0];

    if (typeof firstItem === "string") {
      // Cas 1: Nous avons des noms de secteurs (chaînes), les convertir en IDs
      const industryIds = getSectorIds(formData.industries as string[]);
      if (industryIds.length > 0) {
        params.organizationIndustryTagIds = industryIds;
      }
    } else {
      // Cas 2: Nous avons des objets avec l'ID directement disponible
      const industries = formData.industries as unknown as Industry[];
      params.organizationIndustryTagIds = industries.map(
        (industry) => industry.id
      );
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
