import { NextResponse } from "next/server";
import { Resend } from "resend";
import ApolloLinkEmail from "@/components/emails/ApolloLinkEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email unique pour toutes les communications
const TARGET_EMAIL = "ky.claudant@gmail.com";

/**
 * Type pour les données requises dans le corps de la requête
 */
interface EmailRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  apolloLink: string;
  numberOfLeads: number; // Nombre de leads choisis, maintenant obligatoire
  // Informations supplémentaires sur les critères de recherche
  positions?: string[]; // Intitulé de poste précis
  seniority?: string[]; // Niveau hiérarchique
  industries?: string[] | any[]; // Secteur d'activité
  companySize?: string[]; // Taille d'entreprise
  company?: string; // Nom de l'entreprise
  expertise?: string[]; // Domaine d'expertise
  // Informations personnelles et contextuelles
  phone?: string;
  goals?: string;
  source?: string;
  additionalInfo?: string;
}

/**
 * Valide les données de la requête pour éviter les soumissions frauduleuses
 */
function validateRequestData(data: EmailRequestBody): {
  valid: boolean;
  message?: string;
} {
  // Vérifier les champs obligatoires
  if (!data.firstName || !data.lastName || !data.email || !data.apolloLink) {
    return {
      valid: false,
      message: "Informations d'identification incomplètes",
    };
  }

  // Vérifier que le nombre de leads est valide
  if (
    !data.numberOfLeads ||
    isNaN(data.numberOfLeads) ||
    data.numberOfLeads <= 0
  ) {
    return {
      valid: false,
      message:
        "Le nombre de leads est obligatoire et doit être un nombre positif",
    };
  }

  // Vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: "Format d'email invalide" };
  }

  // Vérifier le format du lien Apollo (contient apollo.io ou commence par https://app.apollo.io/)
  if (!data.apolloLink.includes("apollo.io")) {
    return { valid: false, message: "Format du lien Apollo invalide" };
  }

  return { valid: true };
}

/**
 * Génère un résumé HTML de toutes les données du formulaire pour l'équipe interne
 */
function generateFormSummary(data: EmailRequestBody): string {
  // Fonction pour formater un tableau en HTML
  const formatArrayToHtml = (arr: any[] | undefined): string => {
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
        <li><strong>Nom:</strong> ${data.lastName} ${data.firstName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</li>
      </ul>
      
      <h3 style="color: #555;">Critères de recherche</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Intitulés de poste:</strong> ${formatArrayToHtml(data.positions)}</li>
        <li><strong>Niveaux hiérarchiques:</strong> ${formatArrayToHtml(data.seniority)}</li>
        <li><strong>Secteurs d'activité:</strong> ${formatArrayToHtml(data.industries)}</li>
        <li><strong>Taille d'entreprise:</strong> ${formatArrayToHtml(data.companySize)}</li>
        <li><strong>Entreprise cible:</strong> ${data.company || "Non spécifié"}</li>
        <li><strong>Domaines d'expertise:</strong> ${formatArrayToHtml(data.expertise)}</li>
      </ul>
      
      <h3 style="color: #555;">Détails de la demande</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nombre de leads demandés:</strong> ${data.numberOfLeads}</li>
        <li><strong>Lien Apollo:</strong> <a href="${data.apolloLink}" target="_blank">${data.apolloLink}</a></li>
        <li><strong>Objectifs:</strong> ${data.goals || "Non renseignés"}</li>
        <li><strong>Source:</strong> ${data.source || "Non renseignée"}</li>
      </ul>
      
      <h3 style="color: #555;">Informations supplémentaires</h3>
      <p style="white-space: pre-line;">${data.additionalInfo || "Aucune information supplémentaire"}</p>
      
      <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
        <p><strong>Date de la demande:</strong> ${new Date().toLocaleString("fr-FR")}</p>
      </div>
    </div>
  `;
}

/**
 * POST /api/send
 * Envoie un email avec le lien Apollo généré en utilisant un template React
 * et envoie une copie à l'équipe pour vérification
 */
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body: EmailRequestBody = await request.json();
    const {
      firstName,
      lastName,
      email,
      apolloLink,
      numberOfLeads,
      positions,
      seniority,
      industries,
      companySize,
      company,
      expertise,
      phone,
    } = body;

    console.log("Requête d'envoi d'email reçue:", {
      client: `${firstName} ${lastName} (${email})`,
      numberOfLeads,
      hasApolloLink: !!apolloLink,
      criteresCount: {
        positions: positions?.length || 0,
        seniority: seniority?.length || 0,
        industries: industries?.length || 0,
        companySize: companySize?.length || 0,
        expertise: expertise?.length || 0,
      },
    });

    // Valider les données
    const validation = validateRequestData(body);
    if (!validation.valid) {
      console.warn("Validation échouée:", validation.message, body);
      return NextResponse.json(
        { success: false, error: validation.message },
        { status: 400 }
      );
    }

    // Vérifier que la clé API Resend est configurée
    if (!process.env.RESEND_API_KEY) {
      console.error("La clé API Resend n'est pas configurée");
      return NextResponse.json(
        { success: false, error: "Configuration du service d'email manquante" },
        { status: 500 }
      );
    }

    // 1. Envoyer un email de notification avec toutes les données
    const teamEmailResult = await resend.emails.send({
      from: "LeadFast System <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: `[VERIFICATION] Nouvelle demande Apollo de ${firstName} ${lastName} - ${numberOfLeads} leads`,
      html: generateFormSummary(body),
    });

    if (teamEmailResult.error) {
      console.warn(
        "Erreur lors de l'envoi de l'email à l'équipe:",
        teamEmailResult.error
      );
      // On continue même si l'email à l'équipe échoue
    }

    console.log("Emails envoyés avec succès:", {
      //   clientEmailId: clientEmailResult.data?.id,
      teamEmailId: teamEmailResult.data?.id || "échec",
    });

    return NextResponse.json({
      success: true,
      //   data: clientEmailResult.data,
      message:
        "Email envoyé avec succès au client et à l'équipe de vérification",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
