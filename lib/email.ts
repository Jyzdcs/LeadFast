import { Resend } from "resend";

// Configuration de l'email cible pour tous les formulaires
export const TARGET_EMAIL = "ky.claudant@gmail.com";

// Initialisation de Resend avec la clé API
const resend = new Resend(process.env.OFFICIAL_API_KEY);

/**
 * Types d'emails supportés
 */
export type EmailTemplate =
  | "feedback"
  | "custom-request"
  | "campaign-help"
  | "apollo-link";

/**
 * Interface pour les données d'email communes
 */
export interface BaseEmailData {
  subject: string;
  content: string | React.ReactNode;
}

/**
 * Fonction utilitaire pour envoyer un email
 */
export async function sendEmail({ subject, content }: BaseEmailData) {
  if (!process.env.OFFICIAL_API_KEY) {
    console.error("La clé API Resend n'est pas configurée");
    throw new Error("Configuration d'email manquante");
  }

  try {
    const result = await resend.emails.send({
      from: "LeadFast <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: subject,
      html: typeof content === "string" ? content : undefined,
      react: typeof content !== "string" ? content : undefined,
    });

    if (result.error) {
      throw new Error(`Erreur d'envoi: ${result.error.message}`);
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
}

/**
 * Génère un contenu HTML simple pour les emails textuels
 */
export function generateSimpleHtml(data: Record<string, any>): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Données du formulaire</h2>
      
      <div style="margin-top: 20px;">
        ${Object.entries(data)
          .map(
            ([key, value]) => `
          <div style="margin-bottom: 15px;">
            <strong style="display: block; margin-bottom: 5px; color: #555;">${key}:</strong>
            <div style="background: #f9f9f9; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${
              Array.isArray(value) ? value.join(", ") : value
            }</div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
        Envoyé via LeadFast le ${new Date().toLocaleString("fr-FR")}
      </div>
    </div>
  `;
}
