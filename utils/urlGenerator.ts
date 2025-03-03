import {
  SearchParameterMap,
  mapFormToEngineParameters,
} from "./engineParameterMap";

// URL de base configurée via les variables d'environnement pour plus de sécurité
const SEARCH_ENGINE_URL =
  process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL || "https://app.apollo.io/#/people";
const SEARCH_ENGINE_DOMAIN =
  process.env.NEXT_PUBLIC_SEARCH_ENGINE_DOMAIN || "apollo.io";

/**
 * Génère une URL de recherche à partir des critères fournis
 * @param formData Données du formulaire avec les critères de recherche
 * @returns URL de recherche complète
 */
export function generateSearchLink(formData: any): string {
  // Obtention des paramètres mappés pour le moteur de recherche
  const params = mapFormToEngineParameters(formData);

  // Création de l'URL avec les paramètres
  return buildSearchUrl(params);
}

/**
 * Construit l'URL complète avec les paramètres
 * @param params Paramètres formatés pour l'URL
 * @returns URL complète
 */
function buildSearchUrl(params: SearchParameterMap): string {
  const searchParams = new URLSearchParams();

  // Parcours des paramètres et ajout à l'URL
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // Traitement spécial pour les paramètres qui requièrent la syntaxe []
      const needsArraySyntax = [
        "contactEmailStatusV2",
        "personTitles",
        "organizationNumEmployeesRanges",
        "organizationIndustryTagIds",
        "personSeniorities",
        "personDepartmentOrSubdepartments",
        "qOrganizationKeywordTags",
      ];

      if (needsArraySyntax.includes(key)) {
        value.forEach((item) => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else {
        searchParams.append(key, value.join(","));
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  return `${SEARCH_ENGINE_URL}?${searchParams.toString()}`;
}
