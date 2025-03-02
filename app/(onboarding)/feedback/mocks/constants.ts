// Constants for feedback page
export const appreciationAspects = [
  "Interface",
  "Simplicité",
  "Rapidité",
  "Qualité des leads",
  "Prix",
  "Support client",
];

// Types
export interface FeedbackFormData {
  name: string;
  email: string;
  feedback: string;
  rating?: number;
  appreciatedAspects?: string[];
  [key: string]: any; // For additional dynamic fields
}
