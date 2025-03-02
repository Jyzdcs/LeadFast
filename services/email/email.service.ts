import {
  EmailTemplateType,
  EmailResponse,
  CampaignHelpEmailData,
  CustomRequestEmailData,
  FeedbackEmailData,
  EmailMetadata,
  BaseEmailPayload,
} from "@/types/email";
import { resendService } from "./resend.service";
import emailConfig from "@/config/email.config";
import { emailMonitoring } from "@/services/monitoring/email-monitoring.service";

// Import de tous les templates
import {
  CampaignHelpTemplate,
  CustomRequestTemplate,
  FeedbackTemplate,
} from "./templates";

// Import des validateurs
import {
  validateCampaignHelpData,
  validateCustomRequestData,
  validateFeedbackData,
} from "./validators";

const TEST_EMAIL = "delivered@resend.dev";

class EmailService {
  /**
   * Envoie un email de demande d'aide campagne
   */
  async sendCampaignHelpEmail(
    data: Omit<CampaignHelpEmailData, "to" | "subject"> &
      Partial<EmailMetadata> & { subject?: string }
  ): Promise<EmailResponse> {
    // Validation des données
    const validation = validateCampaignHelpData(data);
    if (!validation.valid) {
      const errorResult = {
        success: false,
        error: `Données invalides: ${validation.errors?.join(", ")}`,
      };
      emailMonitoring.logEmailAttempt("campaign-help", data, errorResult);
      return errorResult;
    }

    const config = emailConfig.templates["campaign-help"];

    // Construction des données complètes
    const emailData = {
      ...data,
      to: TEST_EMAIL,
      subject: data.subject || config.defaultSubject,
      source: data.source || "campaign-help-form",
      sentAt: new Date(),
    };

    // Envoi de l'email avec le template correspondant
    const result = await resendService.sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      react: CampaignHelpTemplate(emailData),
    });

    // Logging et monitoring
    emailMonitoring.logEmailAttempt("campaign-help", data, result);
    if (typeof window !== "undefined") {
      emailMonitoring.trackEmailMetrics("campaign-help", result.success);
    }

    return result;
  }

  /**
   * Envoie un email de demande sur mesure
   */
  async sendCustomRequestEmail(
    data: Omit<CustomRequestEmailData, "to" | "subject"> &
      Partial<EmailMetadata> & { subject?: string }
  ): Promise<EmailResponse> {
    // Validation des données
    const validation = validateCustomRequestData(data);
    if (!validation.valid) {
      const errorResult = {
        success: false,
        error: `Données invalides: ${validation.errors?.join(", ")}`,
      };
      emailMonitoring.logEmailAttempt("custom-request", data, errorResult);
      return errorResult;
    }

    const config = emailConfig.templates["custom-request"];

    // Construction des données complètes
    const emailData = {
      ...data,
      to: TEST_EMAIL,
      subject: data.subject || config.defaultSubject,
      source: data.source || "custom-request-form",
      sentAt: new Date(),
    };

    // Envoi de l'email avec le template correspondant
    const result = await resendService.sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      react: CustomRequestTemplate(emailData),
    });

    // Logging et monitoring
    emailMonitoring.logEmailAttempt("custom-request", data, result);
    if (typeof window !== "undefined") {
      emailMonitoring.trackEmailMetrics("custom-request", result.success);
    }

    return result;
  }

  /**
   * Envoie un email de feedback
   */
  async sendFeedbackEmail(
    data: Omit<FeedbackEmailData, "to" | "subject"> &
      Partial<EmailMetadata> & { subject?: string }
  ): Promise<EmailResponse> {
    // Validation des données
    const validation = validateFeedbackData(data);
    if (!validation.valid) {
      const errorResult = {
        success: false,
        error: `Données invalides: ${validation.errors?.join(", ")}`,
      };
      emailMonitoring.logEmailAttempt("feedback", data, errorResult);
      return errorResult;
    }

    const config = emailConfig.templates["feedback"];

    // Construction des données complètes
    const emailData = {
      ...data,
      to: TEST_EMAIL,
      subject: data.subject || config.defaultSubject,
      source: data.source || "feedback-form",
      sentAt: new Date(),
    };

    // Envoi de l'email avec le template correspondant
    const result = await resendService.sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      react: FeedbackTemplate(emailData),
    });

    // Logging et monitoring
    emailMonitoring.logEmailAttempt("feedback", data, result);
    if (typeof window !== "undefined") {
      emailMonitoring.trackEmailMetrics("feedback", result.success);
    }

    return result;
  }

  /**
   * Méthode générique pour envoyer n'importe quel type d'email
   */
  async sendEmail(
    template: EmailTemplateType,
    data: Record<string, any> & Partial<EmailMetadata>
  ): Promise<EmailResponse> {
    let result: EmailResponse;

    try {
      switch (template) {
        case "campaign-help":
          result = await this.sendCampaignHelpEmail(
            data as Omit<CampaignHelpEmailData, "to" | "subject"> &
              Partial<EmailMetadata> & { subject?: string }
          );
          break;
        case "custom-request":
          result = await this.sendCustomRequestEmail(
            data as Omit<CustomRequestEmailData, "to" | "subject"> &
              Partial<EmailMetadata> & { subject?: string }
          );
          break;
        case "feedback":
          result = await this.sendFeedbackEmail(
            data as Omit<FeedbackEmailData, "to" | "subject"> &
              Partial<EmailMetadata> & { subject?: string }
          );
          break;
        default:
          result = {
            success: false,
            error: `Template d'email non pris en charge: ${template}`,
          };
          emailMonitoring.logEmailAttempt(template, data, result);
      }
    } catch (error) {
      result = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue lors de l'envoi",
      };
      emailMonitoring.logEmailAttempt(template, data, result);
    }

    return result;
  }
}

// Export singleton instance
export const emailService = new EmailService();
