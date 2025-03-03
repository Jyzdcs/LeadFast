// Type pour les données d'onboarding
interface OnboardingData {
  step1?: {
    jobTitle?: string[];
    managementLevel?: string[];
  };
  step2?: {
    activitySector?: string[];
    companySize?: string[];
    companyName?: string;
  };
  step3?: {
    expertise?: string[];
    additionalKeywords?: string[];
    organizationTags?: string[];
  };
  step4?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  };
  step5?: {
    leadQuantity?: string;
  };
}

// Type pour les données formatées pour le moteur de recherche
export interface DataEngineRequestData {
  firstName: string;
  lastName: string;
  email: string;
  positions: string[];
  seniority: string[];
  industries: string[];
  companySize: string[];
  company?: string;
  expertise?: string[];
  keywords?: string[];
  organizationTags?: string[];
  numberOfLeads: number;
  source?: string;
}

/**
 * Prépare les données pour le moteur de recherche
 * Transforme les données du formulaire d'onboarding en format compatible avec l'API du moteur
 */
export function prepareEngineData(data: OnboardingData): DataEngineRequestData {
  // Nettoyage et validation des données
  const firstName = data.step4?.firstName || "";
  const lastName = data.step4?.lastName || "";
  const email = data.step4?.email || "";
  const positions = data.step1?.jobTitle || [];
  const seniority = data.step1?.managementLevel || [];
  const industries = data.step2?.activitySector || [];
  const companySize = data.step2?.companySize || [];
  const company = data.step2?.companyName || "";
  const expertise = data.step3?.expertise || [];
  const keywords = data.step3?.additionalKeywords || [];
  const organizationTags = data.step3?.organizationTags || [];
  const leadQuantityStr = data.step5?.leadQuantity || "0";

  // Conversion de la quantité de leads en nombre
  const numberOfLeads = parseInt(leadQuantityStr, 10) || 0;

  return {
    firstName,
    lastName,
    email,
    positions,
    seniority,
    industries,
    companySize,
    company,
    expertise,
    keywords,
    organizationTags,
    numberOfLeads,
    source: "onboarding",
  };
}
