import { NextResponse } from "next/server";
import { Resend } from "resend";
import SearchLinkEmail from "@/components/emails/SearchLinkEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email cible pour les notifications
const TARGET_EMAIL = "ky.claudant@gmail.com";

/**
 * Génère un résumé HTML pour l'équipe interne
 */
function generateInternalSummary(data: any): string {
  // Format d'affichage des tableaux
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
      </ul>
      
      <h3 style="color: #555;">Détails de la demande</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nombre de leads demandés:</strong> ${data.numberOfLeads}</li>
        <li><strong>Lien de recherche:</strong> <a href="${data.searchLink}" target="_blank">${data.searchLink}</a></li>
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

// Import de la vérification de liens
function validateSearchLink(link: string): { valid: boolean; message: string } {
  // Vérifier que le lien n'est pas vide
  if (!link || link.trim() === "") {
    return { valid: false, message: "Le lien de recherche est vide" };
  }

  // Vérifier le format du lien (contient le domaine requis ou commence par l'URL complète)
  const searchEngineDomain = "apollo.io";

  if (!link.includes(searchEngineDomain)) {
    return { valid: false, message: "Format du lien de recherche invalide" };
  }

  // Vérifier la longueur minimale du lien
  if (link.length < 20) {
    return { valid: false, message: "Le lien de recherche est trop court" };
  }

  return { valid: true, message: "Lien de recherche valide" };
}

// Type pour les données de la requête
interface EmailRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  searchLink: string;
  numberOfLeads: number; // Nombre de leads choisis, maintenant obligatoire
  // Informations supplémentaires sur les critères de recherche
  positions?: string[]; // Intitulé de poste précis
  seniority?: string[]; // Niveau hiérarchique
  industries?: string[] | any[]; // Secteur d'activité
  companySize?: string[]; // Taille d'entreprise
  company?: string; // Nom de l'entreprise
  expertise?: string[]; // Domaine d'expertise
  goals?: string; // Objectifs de la campagne
  source?: string;
  targetAudience?: string;
  details?: string;
}

/**
 * Vérifie que les données requises sont présentes et valides
 */
function validateRequestData(data: EmailRequestBody): {
  valid: boolean;
  message: string;
} {
  // Vérifier les champs obligatoires
  if (!data.firstName || !data.lastName || !data.email || !data.searchLink) {
    return {
      valid: false,
      message: "Données requises manquantes",
    };
  }

  // Vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: "Format d'email invalide" };
  }

  // Validation du lien de recherche
  const linkValidation = validateSearchLink(data.searchLink);
  if (!linkValidation.valid) {
    return { valid: false, message: linkValidation.message };
  }

  return { valid: true, message: "Données valides" };
}

/**
 * Envoie un email avec le lien de recherche généré en utilisant un template React
 * et envoie une copie à l'équipe pour vérification
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // Récupérer les données du corps de la requête
    const data = await req.json();

    // Valider les données requises
    const validation = validateRequestData(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, message: validation.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Extraire les données pour l'email
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
      targetAudience,
      goals,
      source,
      details,
    } = data;

    // Envoyer l'email avec le template React
    try {
      const emailResult = await resend.emails.send({
        from: "LeadFast <notifications@resend.dev>",
        to: email,
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

      // Envoyer une copie de l'email à l'équipe interne
      await resend.emails.send({
        from: "LeadFast System <notifications@resend.dev>",
        to: TARGET_EMAIL,
        subject: `[VERIFICATION] Nouvelle demande de recherche de ${firstName} ${lastName} - ${numberOfLeads} leads`,
        html: generateInternalSummary(data),
      });
    } catch (err) {
      console.error("Erreur d'envoi d'email:", err);
      return new Response(
        JSON.stringify({ success: false, message: "Échec d'envoi d'email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email envoyé avec succès!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erreur globale:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Une erreur s'est produite",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
