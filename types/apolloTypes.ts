// types/apolloTypes.ts
// Interface pour les objets secteur d'activité
export interface Industry {
  id: string;
  value: string;
  label: string;
}

export interface ApolloFormData {
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;

  // Paramètres de recherche Apollo
  hasExistingLink: "yes" | "no";
  apolloLink: string;

  // Filtres de recherche
  jobTitles: string[];
  excludedTitles: string[];
  locations: string[];
  excludedLocations: string[];

  // Paramètres d'entreprise
  companyKeywords: string[];
  companySize: string[];
  industries: string[] | Industry[]; // Peut être soit des chaînes (noms) soit des objets (avec id)

  // Autres paramètres
  managementLevels: string[];
  departments: string[];
  emailVerificationStatus: string[];

  // Paramètres de recherche avancés
  keywords?: string[]; // Mots-clés généraux de recherche (qKeywords)
  organizationTags?: string[]; // Tags pour les organisations (qOrganizationKeywordTags)
  searchInFields?: string[]; // Champs dans lesquels rechercher (includedOrganizationKeywordFields)
}

export interface ApolloUrlParams {
  [key: string]: string | string[];
}
