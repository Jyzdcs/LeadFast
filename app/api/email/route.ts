import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialisation de Resend avec la clé API
const resend = new Resend("re_NKVQs3sq_rqTLYNtQpxHsBu79kJUTC3ES");

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
 * POST /api/email
 * Envoie un email avec le lien Apollo généré
 */
export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body: EmailRequestBody = await request.json();
    const { firstName, lastName, email, apolloLink } = body;

    // Construire le sujet et le contenu de l'email
    const subject = `${firstName}, votre recherche Apollo est prête !`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Bonjour ${firstName} ${lastName},</h2>
        <p>Nous avons préparé votre recherche Apollo en fonction de vos critères.</p>
        <p>Vous pouvez accéder à votre recherche avec le lien ci-dessous :</p>
        <p><a href="${apolloLink}" style="color: #2563eb; text-decoration: underline;">${apolloLink}</a></p>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br>L'équipe LeadFast</p>
      </div>
    `;

    // Envoyer l'email via Resend
    const result = await resend.emails.send({
      from: "LeadFast <noreply@leadfast.io>",
      to: "delivered@resend.dev", // Email de test comme demandé
      subject,
      html: htmlContent,
      headers: {
        Authorization: `Bearer re_NKVQs3sq_rqTLYNtQpxHsBu79kJUTC3ES`,
      },
      // Copie à l'utilisateur si en production
      // cc: process.env.NODE_ENV === "production" ? email : undefined,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
