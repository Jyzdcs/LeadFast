import { EmailResponse, EmailMetadata } from "@/types/email";

class EmailMonitoringService {
  /**
   * Enregistre les statistiques d'envoi d'emails
   */
  logEmailAttempt(
    template: string,
    data: Partial<EmailMetadata>,
    result: EmailResponse
  ): void {
    // En production, connecter à un service de logging/monitoring
    if (process.env.NODE_ENV === "production") {
      // Exemple avec Datadog, LogRocket, ou autre service
      console.info(
        `Email [${template}] ${result.success ? "sent" : "failed"}: ${result.messageId || result.error}`
      );
    } else {
      // En développement, simplement logger dans la console
      console.log({
        timestamp: new Date().toISOString(),
        template,
        source: data.source,
        success: result.success,
        messageId: result.messageId,
        error: result.error,
      });
    }
  }

  /**
   * Suivi des métriques d'emails
   */
  trackEmailMetrics(template: string, success: boolean): void {
    // Exemple d'intégration avec un service d'analytics
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      // Exemple avec Google Analytics, Mixpanel, etc.
      console.info(
        `Tracking email metrics: ${template} - ${success ? "success" : "failure"}`
      );
    }
  }
}

export const emailMonitoring = new EmailMonitoringService();
