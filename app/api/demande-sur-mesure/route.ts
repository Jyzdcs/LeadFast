import { NextResponse } from "next/server";
import { Resend } from "resend";
import DemandeSurMesureEmail from "@/components/emails/DemandeSurMesureEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.OFFICIAL_API_KEY);

// Adresse email unique pour toutes les communications
const TARGET_EMAIL = "ky.claudant@gmail.com";

interface DemandeSurMesureRequestBody {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

/**
 * Valide les données de la demande sur mesure
 */
function validateRequestData(data: DemandeSurMesureRequestBody): {
  valid: boolean;
  message?: string;
} {
  // Vérifier les champs obligatoires
  if (!data.fullName || !data.email || !data.company || !data.description) {
    return {
      valid: false,
      message: "Veuillez remplir tous les champs obligatoires",
    };
  }

  // Vérifier le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: "Format d'email invalide" };
  }

  return { valid: true };
}

/**
 * POST /api/demande-sur-mesure
 * Envoie un email avec les détails de la demande sur mesure
 */
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body: DemandeSurMesureRequestBody = await request.json();

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
    if (!process.env.OFFICIAL_API_KEY) {
      console.error("La clé API Resend n'est pas configurée");
      return NextResponse.json(
        { success: false, error: "Configuration du service d'email manquante" },
        { status: 500 }
      );
    }

    // Envoyer l'email
    const emailResult = await resend.emails.send({
      from: "LeadFast Demandes <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: `Nouvelle demande sur mesure de ${body.fullName}`,
      react: DemandeSurMesureEmail({
        fullName: body.fullName,
        company: body.company,
        email: body.email,
        phone: body.phone || "Non renseigné",
        description: body.description,
      }),
    });

    if (emailResult.error) {
      console.error("Erreur lors de l'envoi de l'email:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a bien été envoyée",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la demande:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
