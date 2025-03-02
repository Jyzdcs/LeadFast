import { EmailTemplateType } from "@/types/email";

interface EmailConfig {
  templates: Record<
    EmailTemplateType,
    {
      defaultSubject: string;
      recipients: string[];
      internal: boolean; // Si true, email interne à l'équipe, sinon email client
    }
  >;
  defaults: {
    from: string;
    replyTo: string;
    bcc?: string[];
  };
  development: {
    overrideRecipient?: string; // Pour rediriger tous les emails en dev
    testMode: boolean;
  };
}

const emailConfig: EmailConfig = {
  templates: {
    "campaign-help": {
      defaultSubject: "Nouvelle demande d'aide campagne",
      recipients: ["equipe@leadfast.com"],
      internal: true,
    },
    "custom-request": {
      defaultSubject: "Nouvelle demande sur mesure",
      recipients: ["equipe@leadfast.com"],
      internal: true,
    },
    feedback: {
      defaultSubject: "Nouveau feedback client",
      recipients: ["feedback@leadfast.com"],
      internal: true,
    },
  },
  defaults: {
    from: "LeadFast <contact@leadfast.com>",
    replyTo: "support@leadfast.com",
    bcc: ["archive@leadfast.com"],
  },
  development: {
    overrideRecipient:
      process.env.NODE_ENV === "development" ? "dev@leadfast.com" : undefined,
    testMode: false,
  },
};

export default emailConfig;
