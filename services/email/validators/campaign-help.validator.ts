import { CampaignHelpEmailData } from "@/types/email";

export function validateCampaignHelpData(
  data: Partial<CampaignHelpEmailData>
): {
  valid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!data.fullName) errors.push("Le nom complet est requis");
  if (!data.email) errors.push("L'email est requis");
  if (!data.service) errors.push("Le service est requis");
  if (!data.needs) errors.push("La description des besoins est requise");

  // Validation email basique
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Format d'email invalide");
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
