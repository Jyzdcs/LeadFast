import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/services/email/email.service";
import { EmailTemplateType } from "@/types/email";

/**
 * Endpoint spécifique par template
 * POST /api/emails/[template]
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { template: string } }
) {
  try {
    const { template } = params;
    const data = await request.json();

    console.log(`Processing email request for template '${template}'`, {
      dataFields: Object.keys(data),
    });

    // Vérification que le template est supporté
    if (!["campaign-help", "custom-request", "feedback"].includes(template)) {
      console.error(`Unsupported email template: ${template}`);
      return NextResponse.json(
        { success: false, error: `Template non supporté: ${template}` },
        { status: 400 }
      );
    }

    // Ajout d'une info sur la source (URL)
    const enhancedData = {
      ...data,
      source: `api-${template}`,
    };

    // Envoi de l'email avec le service approprié
    const result = await emailService.sendEmail(
      template as EmailTemplateType,
      enhancedData
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
    console.error(
      `Error processing email request for template '${params.template}':`,
      error
    );
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
