import { FeedbackEmailData } from "@/types/email";

export function validateFeedbackData(data: Partial<FeedbackEmailData>): {
  valid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!data.fullName) errors.push("Le nom complet est requis");
  if (!data.email) errors.push("L'email est requis");
  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push("L'évaluation doit être comprise entre 1 et 5");
  }

  // Validation email basique
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Format d'email invalide");
  }

  // Vérifier que appreciatedAspects est un tableau si fourni
  if (data.appreciatedAspects && !Array.isArray(data.appreciatedAspects)) {
    errors.push("Le format des aspects appréciés est invalide");
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
