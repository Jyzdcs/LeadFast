import { ApolloRequestData } from "@/app/(onboarding)/submitted/types";

/**
 * Type représentant les données nécessaires pour envoyer un email
 */
export interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  apolloLink: string;
  numberOfLeads: number;
  // Données supplémentaires des critères
  positions?: string[];
  seniority?: string[];
  industries?: string[] | any[];
  companySize?: string[];
  company?: string;
  expertise?: string[];
}

// Adresse email principale
const TARGET_EMAIL = "ky.claudant@gmail.com";

/**
 * Service d'envoi d'emails pour Apollo
 */
export class EmailService {
  /**
   * Envoie un email avec le lien Apollo
   * @param emailData Les données pour l'email
   * @returns Un objet indiquant le succès ou l'échec de l'envoi
   */
  static async sendApolloLinkEmail(
    emailData: EmailData
  ): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      // Vérifier que toutes les données nécessaires sont présentes
      if (
        !emailData.firstName ||
        !emailData.lastName ||
        !emailData.apolloLink ||
        !emailData.numberOfLeads
      ) {
        throw new Error("Données manquantes pour l'envoi de l'email");
      }

      // Préparation des données
      const emailPayload = {
        ...emailData,
        email: TARGET_EMAIL,
      };

      // Appel à l'API d'envoi d'email
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
        // body: JSON.stringify(emailPayload),
      });

      // Analyser la réponse
      const result = await response.json();

      // Gérer les erreurs de l'API
      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi de l'email");
      }

      // Retourner le résultat en cas de succès
      return {
        success: true,
        message: "Email envoyé avec succès",
        data: result.data,
      };
    } catch (error) {
      // Journaliser l'erreur et retourner un message d'erreur
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
  ): Promise<{ success: boolean; message?: string; data?: any }> {
    // Préparer les données pour l'email
    const emailData: EmailData = {
      firstName: apolloData.firstName,
      lastName: apolloData.lastName,
      email: TARGET_EMAIL,
      apolloLink,
      numberOfLeads: apolloData.numberOfLeads || 0,
      // Inclure les critères de recherche
      positions: apolloData.positions,
      seniority: apolloData.seniority,
      industries: apolloData.industries,
      companySize: apolloData.companySize,
      company: apolloData.company,
      expertise: apolloData.expertise,
    };

    // Utiliser la méthode d'envoi d'email
    return this.sendApolloLinkEmail(emailData);
  }
}
