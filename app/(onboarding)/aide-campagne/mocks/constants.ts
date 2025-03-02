// Types for the aide-campagne form data
export interface AideCampagneFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  campaignType: string;
  budget: string;
  details: string;
  targetAudience: string;
  goals: string;
}

// Campaign type options
export const CAMPAIGN_TYPES = [
  { id: "emailing", label: "Emailing" },
  { id: "linkedin", label: "Linkedin" },
  { id: "accompagnement-personnalisé", label: "Accompagnement personnalisé" },
];
