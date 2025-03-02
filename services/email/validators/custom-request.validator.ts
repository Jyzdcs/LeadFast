import { CustomRequestEmailData } from "@/types/email";

export function validateCustomRequestData(
  data: Partial<CustomRequestEmailData>
): {
  valid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!data.fullName) errors.push("Le nom complet est requis");
  if (!data.company) errors.push("L'entreprise est requise");
  if (!data.email) errors.push("L'email est requis");
  if (!data.description) errors.push("La description est requise");

  // Validation email basique
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Format d'email invalide");
  }

  // Validation téléphone si fourni
  if (
    data.phone &&
    !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(data.phone)
  ) {
    errors.push("Format de téléphone invalide");
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
