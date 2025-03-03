import { Resend } from "resend";
import SearchLinkEmail from "@/components/emails/SearchLinkEmail";

// Configuration du service d'email
const resend = new Resend(process.env.OFFICIAL_API_KEY);

// Email de notification (configurable via variables d'environnement)
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "alexismarketeur@gmail.com";

// Types d'erreurs
export type EmailError = {
  message: string;
  code?: string;
  details?: any;
};

// Type de résultat d'envoi d'email
export type EmailResult = {
  success: boolean;
  error?: EmailError;
  data?: any;
};

/**
 * Génère le contenu de l'email interne pour l'équipe
 */
export function generateInternalSummary(formData: any): string {
  // Fonction auxiliaire pour formater les tableaux
  const formatArray = (arr: any[] | undefined): string => {
    if (!arr || arr.length === 0) return "<em>Non spécifié</em>";
    return arr
      .map((item) => {
        if (typeof item === "object") {
          return item.label || item.value || JSON.stringify(item);
        }
        return item;
      })
      .join(", ");
  };

  return `
    <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333;">Récapitulatif de la demande client</h2>
      
      <h3 style="color: #555;">Informations client</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nom:</strong> ${formData.lastName} ${formData.firstName}</li>
        <li><strong>Email:</strong> ${formData.email || "Non renseigné"}</li>
      </ul>
      
      <h3 style="color: #555;">Critères de recherche</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Intitulés de poste:</strong> ${formatArray(formData.positions)}</li>
        <li><strong>Niveaux hiérarchiques:</strong> ${formatArray(formData.seniority)}</li>
        <li><strong>Secteurs d'activité:</strong> ${formatArray(formData.industries)}</li>
        <li><strong>Taille d'entreprise:</strong> ${formatArray(formData.companySize)}</li>
        <li><strong>Entreprise cible:</strong> ${formData.company || "Non spécifié"}</li>
        <li><strong>Domaines d'expertise:</strong> ${formatArray(formData.expertise)}</li>
      </ul>
      
      <h3 style="color: #555;">Détails de la demande</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nombre de leads demandés:</strong> ${formData.numberOfLeads || 0}</li>
        <li><strong>Lien de recherche:</strong> <a href="${formData.searchLink}" target="_blank">Voir la recherche</a></li>
      </ul>
      
      <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
        <p><strong>Date de la demande:</strong> ${new Date().toLocaleString("fr-FR")}</p>
      </div>
    </div>
  `;
}

/**
 * Envoie un email avec le lien de recherche au client
 */
export async function sendSearchLinkEmail(formData: any): Promise<EmailResult> {
  try {
    // Vérifier que la clé API est configurée
    if (!process.env.OFFICIAL_API_KEY) {
      console.error("La clé API pour l'envoi d'emails n'est pas configurée");
      return {
        success: false,
        error: {
          message: "Configuration de l'envoi d'emails manquante",
          code: "CONFIG_ERROR",
        },
      };
    }

    // Extraire les données nécessaires pour l'email
    const {
      firstName,
      lastName,
      email,
      searchLink,
      numberOfLeads,
      positions,
      seniority,
      industries,
      companySize,
      company,
      expertise,
    } = formData;

    // Vérifier que les données essentielles sont présentes
    if (!email || !searchLink) {
      console.error("Données manquantes pour l'envoi de l'email");
      return {
        success: false,
        error: {
          message: "Adresse email ou lien de recherche manquant",
          code: "MISSING_DATA",
        },
      };
    }

    // Envoyer l'email au client
    const userEmailResult = await resend.emails.send({
      from: "LeadFast <notifications@resend.dev>",
      to: email,
      subject: `Votre recherche de leads est prête !`,
      react: SearchLinkEmail({
        firstName,
        lastName,
        searchLink,
        numberOfLeads,
        positions,
        seniority,
        industries,
        companySize,
        company,
        expertise,
      }),
    });

    if (userEmailResult.error) {
      console.error(
        "Erreur lors de l'envoi de l'email:",
        userEmailResult.error
      );
      return {
        success: false,
        error: {
          message: "Échec de l'envoi de l'email au client",
          details: userEmailResult.error,
        },
      };
    }

    // Envoyer notification interne
    await resend.emails.send({
      from: "LeadFast System <notifications@resend.dev>",
      to: "alexismarketeur@gmail.com",
      subject: `[LEADFAST] Nouvelle demande - ${firstName} ${lastName} - ${numberOfLeads} leads`,
      html: generateInternalSummary(formData),
    });

    return {
      success: true,
      data: userEmailResult.data,
    };
  } catch (error) {
    console.error("Exception lors de l'envoi de l'email:", error);
    return {
      success: false,
      error: {
        message: "Une erreur s'est produite lors de l'envoi de l'email",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
    };
  }
}
