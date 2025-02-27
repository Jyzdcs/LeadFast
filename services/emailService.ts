import { ApolloRequestData } from "@/app/(onboarding)/submitted/types";

/**
 * Type représentant les données nécessaires pour envoyer un email
 */
export interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  apolloLink: string;
}

/**
 * Service d'envoi d'emails
 */
export class EmailService {
  /**
   * Envoie un email avec le lien Apollo
   * @param emailData Les données pour l'email
   * @returns Un objet indiquant le succès ou l'échec de l'envoi
   */
  static async sendApolloLinkEmail(
    emailData: EmailData
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi de l'email");
      }

      return {
        success: true,
        message: "Email envoyé avec succès",
      };
    } catch (error) {
      console.error("Erreur dans le service d'email:", error);
      return {
        success: false,
        message:
          (error as Error).message ||
          "Une erreur est survenue lors de l'envoi de l'email",
      };
    }
  }

  /**
   * Envoie automatiquement un email avec le lien Apollo à partir des données de requête Apollo
   * @param apolloData Les données de la requête Apollo
   * @param apolloLink Le lien Apollo généré
   * @returns Un objet indiquant le succès ou l'échec de l'envoi
   */
  static async sendAutomaticApolloEmail(
    apolloData: ApolloRequestData,
    apolloLink: string
  ): Promise<{ success: boolean; message?: string }> {
    const emailData: EmailData = {
      firstName: apolloData.firstName,
      lastName: apolloData.lastName,
      email: apolloData.email,
      apolloLink,
    };

    return this.sendApolloLinkEmail(emailData);
  }
}
