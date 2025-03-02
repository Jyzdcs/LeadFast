import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ApolloRequestData } from "@/app/(onboarding)/submitted/types";
import ApolloLinkEmail from "@/components/emails/ApolloLinkEmail";

// Initialisation de Resend avec la clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email cible pour les notifications
const TARGET_EMAIL = "ky.claudant@gmail.com";

/**
 * Génère un lien Apollo à partir des critères fournis
 * Cette fonction contient la logique qui était précédemment dans useLeadFastApollo
 */
function generateApolloLink(criteria: ApolloRequestData): string {
  // Logique de génération de lien déplacée côté serveur
  try {
    console.log(
      "Critères reçus pour la génération du lien:",
      JSON.stringify(criteria, null, 2)
    );

    // On adapte les données pour correspondre au format d'Apollo
    const companyName = criteria.company || "";

    const generalKeywords = criteria.keywords || [];
    const techTags = criteria.organizationTags || [];

    // Construction de l'URL Apollo
    const baseUrl = "https://app.apollo.io/#/people";

    // Création des paramètres d'URL
    const params = new URLSearchParams();

    // Ajout des titres professionnels
    if (criteria.positions && criteria.positions.length > 0) {
      params.append("titles", criteria.positions.join(","));
    }

    // Ajout des niveaux hiérarchiques
    if (criteria.seniority && criteria.seniority.length > 0) {
      params.append("seniorities", criteria.seniority.join(","));
    }

    // Ajout des industries
    if (criteria.industries && criteria.industries.length > 0) {
      try {
        const industryValues = criteria.industries
          .map((ind) =>
            typeof ind === "object" ? ind.value || ind.label : ind
          )
          .filter(Boolean) // Filtrer les valeurs vides
          .join(",");

        if (industryValues) {
          params.append("industries", industryValues);
        }
      } catch (err) {
        console.error("Erreur lors du traitement des industries:", err);
      }
    }

    // Ajout de la taille d'entreprise
    if (criteria.companySize && criteria.companySize.length > 0) {
      params.append("companySizes", criteria.companySize.join(","));
    }

    // Ajout du nom d'entreprise si spécifié
    if (companyName) {
      params.append("organizationNames", companyName);
    }

    // Autres paramètres de qualité
    params.append("emailStatuses", "verified");

    // Construction de l'URL finale
    const apolloUrl = `${baseUrl}?${params.toString()}`;
    console.log("URL Apollo générée:", apolloUrl);

    return apolloUrl;
  } catch (error) {
    console.error("Erreur lors de la génération du lien Apollo:", error);
    return "";
  }
}

/**
 * Génère un résumé HTML de toutes les données du formulaire pour l'équipe interne
 */
function generateFormSummary(
  data: ApolloRequestData,
  apolloLink: string
): string {
  // Fonction pour formater un tableau en HTML
  const formatArrayToHtml = (arr: any[] | undefined): string => {
    if (!arr || arr.length === 0) return "<em>Non spécifié</em>";
    return arr
      .map((item) => {
        if (typeof item === "object") {
          return item.label || item.value || JSON.stringify(item);
        }
        return item;
      })
      .join(", ");
  };

  return `
    <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333;">Récapitulatif de la demande client</h2>
      
      <h3 style="color: #555;">Informations client</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nom:</strong> ${data.lastName} ${data.firstName}</li>
        <li><strong>Email:</strong> ${data.email || "Non renseigné"}</li>
      </ul>
      
      <h3 style="color: #555;">Critères de recherche</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Intitulés de poste:</strong> ${formatArrayToHtml(data.positions)}</li>
        <li><strong>Niveaux hiérarchiques:</strong> ${formatArrayToHtml(data.seniority)}</li>
        <li><strong>Secteurs d'activité:</strong> ${formatArrayToHtml(data.industries)}</li>
        <li><strong>Taille d'entreprise:</strong> ${formatArrayToHtml(data.companySize)}</li>
        <li><strong>Entreprise cible:</strong> ${data.company || "Non spécifié"}</li>
        <li><strong>Domaines d'expertise:</strong> ${formatArrayToHtml(data.expertise)}</li>
      </ul>
      
      <h3 style="color: #555;">Détails de la demande</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Nombre de leads demandés:</strong> ${data.numberOfLeads || 0}</li>
        <li><strong>Lien Apollo:</strong> <a href="${apolloLink}" target="_blank">${apolloLink}</a></li>
      </ul>
      
      <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
        <p><strong>Date de la demande:</strong> ${new Date().toLocaleString("fr-FR")}</p>
      </div>
    </div>
  `;
}

/**
 * POST /api/process-onboarding
 * Traite les données du formulaire d'onboarding, génère le lien Apollo côté serveur et envoie l'email
 */
export async function POST(request: Request) {
  try {
    console.log("Début du traitement de la requête d'onboarding");

    // Récupérer le corps de la requête complet
    const rawBody = await request.text();
    console.log("Corps brut reçu:", rawBody);

    // Analyser le JSON
    let formData: ApolloRequestData;
    try {
      formData = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("Erreur de parsing JSON:", parseError);
      return NextResponse.json(
        { success: false, error: "Format de données invalide" },
        { status: 400 }
      );
    }

    console.log("Requête de traitement d'onboarding reçue:", {
      client: `${formData.firstName || "?"} ${formData.lastName || "?"}`,
      fields: Object.keys(formData),
      hasPositions: Array.isArray(formData.positions),
      hasSeniority: Array.isArray(formData.seniority),
      hasIndustries: Array.isArray(formData.industries),
      hasCompanySize: Array.isArray(formData.companySize),
    });

    // Vérifier que toutes les propriétés requises sont présentes et valides
    const requiredProps = [
      "firstName",
      "lastName",
      "email",
      "positions",
      "seniority",
      "industries",
      "companySize",
    ];
    const missingProps = requiredProps.filter(
      (prop) => !formData[prop as keyof ApolloRequestData]
    );

    if (missingProps.length > 0) {
      console.error("Propriétés manquantes:", missingProps);

      // Initialiser les propriétés manquantes avec des valeurs par défaut pour éviter les erreurs
      missingProps.forEach((prop) => {
        if (
          [
            "positions",
            "seniority",
            "industries",
            "companySize",
            "expertise",
            "keywords",
            "organizationTags",
          ].includes(prop)
        ) {
          (formData as any)[prop] = [];
        } else {
          (formData as any)[prop] = "";
        }
      });

      console.log("Propriétés initialisées avec des valeurs par défaut");
    }

    // S'assurer que numberOfLeads est un nombre
    if (typeof formData.numberOfLeads !== "number") {
      formData.numberOfLeads = parseInt(formData.numberOfLeads as any) || 0;
      console.log(
        `numberOfLeads converti en nombre: ${formData.numberOfLeads}`
      );
    }

    // Vérifier que la clé API Resend est configurée
    if (!process.env.RESEND_API_KEY) {
      console.error("La clé API Resend n'est pas configurée");
      return NextResponse.json(
        { success: false, error: "Configuration du service d'email manquante" },
        { status: 500 }
      );
    }

    // Générer le lien Apollo côté serveur
    console.log("Génération du lien Apollo...");
    const apolloLink = generateApolloLink(formData);

    if (!apolloLink) {
      console.error("Échec de la génération du lien Apollo");
      return NextResponse.json(
        { success: false, error: "Impossible de générer le lien Apollo" },
        { status: 500 }
      );
    }

    // Envoyer un email de notification avec toutes les données
    console.log("Envoi de l'email de notification...");
    try {
      const emailResult = await resend.emails.send({
        from: "LeadFast System <notifications@resend.dev>",
        to: TARGET_EMAIL,
        subject: `[LEADFAST] Nouvelle demande - ${formData.firstName} ${formData.lastName} - ${formData.numberOfLeads} leads`,
        html: generateFormSummary(formData, apolloLink),
      });

      if (emailResult.error) {
        console.error("Erreur lors de l'envoi de l'email:", emailResult.error);
        return NextResponse.json(
          { success: false, error: "Échec de l'envoi de l'email" },
          { status: 500 }
        );
      }

      console.log("Email envoyé avec succès:", {
        emailId: emailResult.data?.id,
      });
    } catch (emailError) {
      console.error("Exception lors de l'envoi de l'email:", emailError);
      return NextResponse.json(
        { success: false, error: "Exception lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Retourner uniquement un statut de succès, sans données sensibles
    console.log("Traitement terminé avec succès");
    return NextResponse.json({
      success: true,
      message: "Votre demande a été traitée avec succès",
    });
  } catch (error) {
    console.error("Erreur globale lors du traitement de la demande:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}
