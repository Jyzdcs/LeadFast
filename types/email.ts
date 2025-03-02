// Types de base pour tous les emails
export interface BaseEmailPayload {
  to: string | string[];
  subject?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

// Interface pour le suivi et l'historique des emails
export interface EmailMetadata {
  source: string; // page d'origine
  sentAt?: Date;
  status?: "sent" | "failed" | "pending";
  trackingId?: string;
}

// Types spécifiques pour chaque formulaire
export interface CampaignHelpEmailData extends BaseEmailPayload {
  fullName: string;
  email: string;
  service: string;
  needs: string;
}

export interface CustomRequestEmailData extends BaseEmailPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  description: string;
}

export interface FeedbackEmailData extends BaseEmailPayload {
  fullName: string;
  email: string;
  rating: number;
  appreciatedAspects: string[];
  comments?: string;
}

// Type union pour tous les emails possibles
export type EmailData =
  | (CampaignHelpEmailData & EmailMetadata)
  | (CustomRequestEmailData & EmailMetadata)
  | (FeedbackEmailData & EmailMetadata);

// Type pour la réponse de l'API
export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Type d'email template
export type EmailTemplateType = "campaign-help" | "custom-request" | "feedback";
