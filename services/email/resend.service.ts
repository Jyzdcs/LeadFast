import { Resend } from "resend";
import { EmailResponse } from "@/types/email";
import emailConfig from "@/config/email.config";

class ResendService {
  private resend: Resend;
  private initialized: boolean = false;

  constructor() {
    // Initialisation de Resend avec la clé API
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.initialized = !!process.env.RESEND_API_KEY;

    // Log pour l'initialisation
    if (!this.initialized) {
      console.warn("Resend service not initialized, missing API key");
    }
  }

  /**
   * Vérifie si le service est correctement initialisé
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Envoie un email via Resend
   */
  async sendEmail({
    from = emailConfig.defaults.from,
    to,
    subject,
    html,
    text,
    reply_to = emailConfig.defaults.replyTo,
    cc,
    bcc = emailConfig.defaults.bcc,
    react,
  }: {
    from?: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    reply_to?: string;
    cc?: string | string[];
    bcc?: string | string[];
    react?: React.ReactNode;
  }): Promise<EmailResponse> {
    if (!this.initialized) {
      console.error("Resend service is not initialized");
      return { success: false, error: "Email service not configured" };
    }

    try {
      // En mode développement, rediriger les emails si configuré
      let recipients = to;
      if (
        process.env.NODE_ENV !== "production" &&
        emailConfig.development.overrideRecipient
      ) {
        recipients = emailConfig.development.overrideRecipient;
        console.log(
          `[DEV] Email redirected to ${recipients} (original: ${to})`
        );
      }

      // Envoi de l'email via Resend API
      const { data, error } = await this.resend.emails.send({
        from,
        to: recipients,
        subject,
        html,
        text,
        replyTo: reply_to,
        cc,
        bcc,
        react,
      });

      if (error) {
        console.error("Resend API error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, messageId: data?.id };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const resendService = new ResendService();
