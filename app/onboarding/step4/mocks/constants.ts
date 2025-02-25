// Constants for step4 page
export const steps = ["1", "2", "3", "4", "5", "6"];

// Liste des domaines d'expertise suggérés
export const expertiseSuggestions = [
  { value: 'saas', label: 'SaaS' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'ia', label: 'Intelligence Artificielle' },
  { value: 'cloud', label: 'Cloud Computing' },
  { value: 'cybersecurite', label: 'Cybersécurité' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'Internet des Objets (IoT)' },
  { value: 'mobile', label: 'Applications Mobiles' },
  { value: 'big-data', label: 'Big Data' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'crm', label: 'CRM' },
  { value: 'erp', label: 'ERP' },
  { value: 'developpement-web', label: 'Développement Web' },
  { value: 'design-ux', label: 'Design UX/UI' },
];

// Types
export type Step4FormValues = {
  company: string;
  expertise: string[];
}; 