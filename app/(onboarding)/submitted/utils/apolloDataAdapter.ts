import { ApolloRequestData } from "../types";

// Type pour les données d'onboarding
interface OnboardingData {
  step1?: {
    jobTitle?: string[];
    managementLevel?: string[];
    [key: string]: any;
  };
  step2?: {
    activitySector?: string[];
    companySize?: string[];
    [key: string]: any;
  };
  step3?: {
    company?: string;
    expertise?: string[];
    [key: string]: any;
  };
  step4?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    [key: string]: any;
  };
  step5?: {
    leadQuantity?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Convertit les données d'onboarding au format attendu par Apollo
 * @param data Les données d'onboarding collectées
 * @returns Les données formatées pour Apollo
 */
export const prepareApolloData = (data: OnboardingData): ApolloRequestData => {
  // Extraction des données pertinentes
  const company = data.step3?.company || "";
  const expertise = data.step3?.expertise || [];
  const jobTitles = data.step1?.jobTitle || [];
  const seniorities = data.step1?.managementLevel || [];
  const activitySectors = data.step2?.activitySector || [];
  const companySizes = data.step2?.companySize || [];

  // Récupération et conversion du nombre de leads
  const leadQuantityStr = data.step5?.leadQuantity || "";
  const numberOfLeads = leadQuantityStr ? parseInt(leadQuantityStr, 10) : 0;

  // Construction du format attendu
  return {
    // Informations personnelles (step4)
    firstName: data.step4?.firstName || "",
    lastName: data.step4?.lastName || "",
    email: data.step4?.email || "",

    // Positions (step1)
    positions: jobTitles,

    // Seniority (step1) - conversion des niveaux hiérarchiques
    seniority: seniorities.map((level: string) => {
      // Conversion des niveaux manageriaux au format Apollo
      switch (level.toLowerCase()) {
        case "c-level":
        case "c_level":
          return "c_suite";
        case "vp":
          return "vp";
        case "director":
          return "director";
        case "manager":
          return "manager";
        case "senior":
          return "senior";
        case "owner":
          return "owner";
        default:
          return level;
      }
    }),

    // Secteur d'activité (step2)
    industries: activitySectors,

    // Taille d'entreprise (step2)
    companySize: companySizes,

    // Entreprise spécifique (step3)
    company: company,

    // Expertise comme tags de recherche (step3)
    expertise: expertise,

    // Utilisation de l'entreprise comme mot-clé principal
    keywords: company ? [company] : [],

    // Utilisation de l'expertise comme tags d'organisation
    organizationTags: expertise,

    // Nombre de leads (step5)
    numberOfLeads,
  };
};
