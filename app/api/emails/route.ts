import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/services/email/email.service";
import { EmailTemplateType } from "@/types/email";

/**
 * Endpoint générique pour tous les emails
 * POST /api/emails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { template, data } = body;

    console.log(`Processing generic email request`, {
      template,
      dataFields: data ? Object.keys(data) : [],
    });

    // Vérification des données minimales requises
    if (!template || !data) {
      console.error("Missing required fields in email request", {
        template,
        hasData: !!data,
      });
      return NextResponse.json(
        { success: false, error: "Le template et les données sont requis" },
        { status: 400 }
      );
    }

    // Vérification que le template est supporté
    if (!["campaign-help", "custom-request", "feedback"].includes(template)) {
      console.error(`Unsupported email template: ${template}`);
      return NextResponse.json(
        { success: false, error: `Template non supporté: ${template}` },
        { status: 400 }
      );
    }

    // Envoi de l'email avec le service approprié
    const result = await emailService.sendEmail(
      template as EmailTemplateType,
      data
    );

    console.log(`Email result for template '${template}':`, result);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("Error processing generic email request:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
