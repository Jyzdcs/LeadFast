import { NextResponse } from "next/server";
import { Resend } from "resend";
import FeedbackEmail from "@/components/emails/FeedbackEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email unique pour toutes les communications
const TARGET_EMAIL = "ky.claudant@gmail.com";

interface FeedbackRequestBody {
  name: string;
  email: string;
  feedback: string;
  rating?: number;
  [key: string]: any; // Pour les champs dynamiques supplémentaires
}

/**
 * Valide les données de la requête feedback
 */
function validateRequestData(data: FeedbackRequestBody): {
  valid: boolean;
  message?: string;
} {
  // Vérifier les champs obligatoires
  if (!data.name || !data.email || !data.feedback) {
    return {
      valid: false,
      message: "Les champs nom, email et feedback sont obligatoires",
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
 * POST /api/feedback
 * Envoie un email contenant les informations de feedback
 */
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body: FeedbackRequestBody = await request.json();

    console.log("Requête de feedback reçue:", {
      name: body.name,
      email: body.email,
      hasRating: !!body.rating,
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

    // Extraire les champs connus
    const { name, email, feedback, rating, ...additionalInfo } = body;

    // Envoyer l'email
    const emailResult = await resend.emails.send({
      from: "LeadFast Feedback <notifications@resend.dev>",
      to: TARGET_EMAIL,
      subject: `Nouveau feedback de ${name}`,
      react: FeedbackEmail({
        name,
        email,
        feedback,
        rating,
        additionalInfo,
      }),
    });

    if (emailResult.error) {
      console.error("Erreur lors de l'envoi de l'email:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    console.log("Email de feedback envoyé avec succès:", {
      emailId: emailResult.data?.id,
    });

    return NextResponse.json({
      success: true,
      message: "Votre feedback a bien été envoyé",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du feedback:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
