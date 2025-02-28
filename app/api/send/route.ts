import { NextResponse } from "next/server";
import { Resend } from "resend";
import ApolloLinkEmail from "@/components/emails/ApolloLinkEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse d'email de test Resend (utilisée lorsqu'aucun domaine n'est vérifié)
const TEST_EMAIL = "delivered@resend.dev";

/**
 * Type pour les données requises dans le corps de la requête
 */
interface EmailRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  apolloLink: string;
}

/**
 * POST /api/send
 * Envoie un email avec le lien Apollo généré en utilisant un template React
 */
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body: EmailRequestBody = await request.json();
    const { firstName, lastName, email, apolloLink } = body;

    // Vérifier que toutes les données nécessaires sont présentes
    if (!firstName || !lastName || !email || !apolloLink) {
      return NextResponse.json(
        { success: false, error: "Données manquantes pour l'envoi de l'email" },
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

    // Envoyer l'email via Resend avec le template React
    const { data, error } = await resend.emails.send({
      from: "LeadFast <onboarding@resend.dev>",
      to: [TEST_EMAIL], // En développement, utiliser l'adresse email de test
      subject: `${firstName}, votre recherche Apollo est prête !`,
      react: ApolloLinkEmail({ firstName, lastName, apolloLink }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
