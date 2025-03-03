import { NextResponse } from "next/server";
import {
  validateSearchLink,
  generateSearchLink,
  adaptRequestToSearchCriteria,
  SearchCriteria,
} from "@/lib/searchEngineService";
import { sendSearchLinkEmail } from "@/lib/emailService";

// Interface pour les données de requête
interface EmailRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  searchLink?: string;
  numberOfLeads: number;
  // Critères de recherche supplémentaires
  positions?: string[];
  seniority?: string[];
  industries?: string[] | any[];
  companySize?: string[];
  company?: string;
  expertise?: string[];
  goals?: string;
  targetAudience?: string;
  details?: string;
  source?: string;
}

/**
 * Valide les données de la requête
 */
function validateRequestData(data: EmailRequestBody): {
  valid: boolean;
  message: string;
} {
  // Vérification des champs obligatoires
  if (!data.firstName || !data.lastName || !data.email) {
    return {
      valid: false,
      message: "Données requises manquantes",
    };
  }

  // Vérification du format d'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: "Format d'email invalide" };
  }

  // Vérification que le nombre de leads est spécifié et valide
  if (
    data.numberOfLeads === undefined ||
    isNaN(data.numberOfLeads) ||
    data.numberOfLeads <= 0
  ) {
    return {
      valid: false,
      message: "Veuillez spécifier un nombre de leads valide",
    };
  }

  // Validation du lien de recherche si fourni
  if (data.searchLink) {
    const linkValidation = validateSearchLink(data.searchLink);
    if (!linkValidation.valid) {
      return { valid: false, message: linkValidation.message };
    }
  }

  return { valid: true, message: "Données valides" };
}

/**
 * Gère les requêtes POST pour envoyer des emails avec liens de recherche
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // Analyser les données de la requête
    const data: EmailRequestBody = await req.json();

    // Valider les données de la requête
    const validation = validateRequestData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }

    // Utiliser le lien existant ou en générer un nouveau
    let searchLink = data.searchLink;

    if (!searchLink) {
      // Convertir les données de la requête en critères de recherche
      const searchCriteria = adaptRequestToSearchCriteria(data);

      // Générer un lien de recherche à partir des critères
      searchLink = generateSearchLink(searchCriteria);
      console.log("Lien de recherche généré:", searchLink);
    }

    // Envoi des emails (à l'utilisateur et à l'équipe interne)
    const emailResult = await sendSearchLinkEmail({ ...data, searchLink });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error?.message || "Échec d'envoi d'email",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès!",
    });
  } catch (error) {
    console.error("Erreur globale:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur s'est produite",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
