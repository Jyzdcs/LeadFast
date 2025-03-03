import { Resend } from "resend";
import SearchLinkEmail from "@/components/emails/SearchLinkEmail";

// Initialize Resend with API key
const resend = new Resend(process.env.OFFICIAL_API_KEY);

// Target email for notifications
const TARGET_EMAIL = "alexismarketeur@gmail.com";

/**
 * Email service error type
 */
export type EmailError = {
  message: string;
  code?: string;
  details?: any;
};

/**
 * Email result type
 */
export type EmailResult = {
  success: boolean;
  error?: EmailError;
  data?: any;
};

/**
 * Generates HTML summary of user request for internal team
 */
export function generateInternalSummary(data: any): string {
  // Helper to format arrays for display
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
      <h2 style="color: #333;">Détails de la demande client</h2>
      
      <h3 style="color: #555;">Informations client</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nom:</strong> ${data.lastName} ${data.firstName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
      </ul>
      
      <h3 style="color: #555;">Critères de recherche</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Intitulés de poste:</strong> ${formatArray(data.positions)}</li>
        <li><strong>Niveaux hiérarchiques:</strong> ${formatArray(data.seniority)}</li>
        <li><strong>Secteurs d'activité:</strong> ${formatArray(data.industries)}</li>
        <li><strong>Taille d'entreprise:</strong> ${formatArray(data.companySize)}</li>
        <li><strong>Entreprise cible:</strong> ${data.company || "Non spécifié"}</li>
        <li><strong>Domaines d'expertise:</strong> ${formatArray(data.expertise)}</li>
        <li><strong>Tags d'organisation:</strong> ${formatArray(data.organizationTags)}</li>
        <li><strong>Mots-clés:</strong> ${formatArray(data.keywords)}</li>
      </ul>
      
      <h3 style="color: #555;">Détails de la demande</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nombre de leads demandés:</strong> ${data.numberOfLeads || "Non spécifié"}</li>
        <li><strong>Lien de recherche:</strong> <a href="${data.searchLink}" target="_blank">Voir la recherche</a></li>
        <li><strong>Cible:</strong> ${data.targetAudience || "Non renseignée"}</li>
        <li><strong>Objectifs:</strong> ${data.goals || "Non renseignés"}</li>
        <li><strong>Source:</strong> ${data.source || "Non renseignée"}</li>
        <li><strong>Détails supplémentaires:</strong> ${data.details || "Aucun"}</li>
      </ul>
      
      <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
        <p><strong>Date de la demande:</strong> ${new Date().toLocaleString("fr-FR")}</p>
      </div>
    </div>
  `;
}

/**
 * Send search results email to user
 */
export async function sendSearchLinkEmail(data: any): Promise<EmailResult> {
  try {
    // Validate that Resend API key is configured
    if (!process.env.OFFICIAL_API_KEY) {
      console.error("Resend API key not configured");
      return {
        success: false,
        error: {
          message: "Service email non configuré",
          code: "ENV_VAR_MISSING",
        },
      };
    }

    // Extract data for email
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
      organizationTags,
      keywords,
      goals,
      targetAudience,
      details,
      source,
    } = data;

    // Validate that recipient email is provided
    if (!email) {
      return {
        success: false,
        error: {
          message: "Email du destinataire manquant",
          code: "MISSING_RECIPIENT",
        },
      };
    }

    // Send email to user
    console.log("Sending email with search link:", searchLink);
    const emailResult = await resend.emails.send({
      from: "LeadFast <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: `Votre recherche avec ${numberOfLeads} leads est prête !`,
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

    if (emailResult.error) {
      console.error("Erreur d'envoi d'email:", emailResult.error);
      return {
        success: false,
        error: {
          message: "Échec d'envoi d'email",
          details: emailResult.error,
        },
      };
    }

    // Send notification to internal team
    const internalData = {
      ...data,
      searchLink,
      // Ensure all fields are defined for internal summary
      organizationTags: organizationTags || [],
      keywords: keywords || [],
      goals: goals || "",
      targetAudience: targetAudience || "",
      details: details || "",
      source: source || "",
    };

    await resend.emails.send({
      from: "LeadFast System <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: `[VERIFICATION] Nouvelle demande de recherche de ${firstName} ${lastName} - ${numberOfLeads} leads`,
      html: generateInternalSummary(internalData),
    });

    return {
      success: true,
      data: emailResult.data,
    };
  } catch (error) {
    console.error("Error in sendSearchLinkEmail:", error);
    return {
      success: false,
      error: {
        message: "Une erreur s'est produite lors de l'envoi de l'email",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
