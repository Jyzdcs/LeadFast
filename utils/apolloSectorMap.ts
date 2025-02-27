import { industries_detailled } from "@/app/(onboarding)/2/mocks/detailled-constant";

/**
 * Interface pour un secteur d'activité Apollo
 */
interface ApolloIndustry {
  id: string;
  cleaned_name: string;
  kind: string;
  [key: string]: any;
}

/**
 * Map permettant de convertir le nom d'un secteur en son ID Apollo
 */
const sectorToIdMap = new Map<string, string>();

/**
 * Initialise la map de conversion des secteurs d'activité
 */
const initSectorMap = () => {
  if (sectorToIdMap.size > 0) return; // Déjà initialisé

  // Ne traiter que les éléments de type "linkedin_industry"
  const industries = industries_detailled.filter(
    (industry: ApolloIndustry) => industry.kind === "linkedin_industry"
  );

  // Remplir la map avec les noms normalisés comme clés et les IDs comme valeurs
  industries.forEach((industry: ApolloIndustry) => {
    const name = industry.cleaned_name.toLowerCase();
    sectorToIdMap.set(name, industry.id);
  });
};

// Initialiser la map dès l'import
initSectorMap();

/**
 * Convertit un nom de secteur d'activité en ID Apollo
 * @param sectorName Nom du secteur d'activité
 * @returns ID Apollo correspondant ou undefined si non trouvé
 */
export const getSectorId = (sectorName: string): string | undefined => {
  const normalizedName = sectorName.toLowerCase();
  return sectorToIdMap.get(normalizedName);
};

/**
 * Convertit une liste de noms de secteurs d'activité en leurs IDs Apollo
 * @param sectorNames Liste de noms de secteurs
 * @returns Liste d'IDs Apollo correspondants (filtrés pour ne garder que ceux qui existent)
 */
export const getSectorIds = (sectorNames: string[]): string[] => {
  return sectorNames
    .map((name) => getSectorId(name))
    .filter((id): id is string => id !== undefined);
};
