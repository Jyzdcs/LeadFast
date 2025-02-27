import { industries } from "@/app/(onboarding)/2/mocks/constants";
import { Industry } from "../types/apolloTypes";

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

  // Remplir la map avec les labels comme clés et les IDs comme valeurs
  industries.forEach((industry) => {
    const name = industry.label.toLowerCase();
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

/**
 * Trouve l'objet secteur complet à partir de son nom
 * @param sectorName Nom du secteur
 * @returns Objet secteur complet ou undefined si non trouvé
 */
export const findSectorByName = (sectorName: string): Industry | undefined => {
  const normalizedName = sectorName.toLowerCase();
  return industries.find(
    (industry) => industry.label.toLowerCase() === normalizedName
  );
};

/**
 * Trouve un secteur à partir de son ID
 * @param sectorId ID Apollo du secteur
 * @returns Objet secteur complet ou undefined si non trouvé
 */
export const findSectorById = (sectorId: string): Industry | undefined => {
  return industries.find((industry) => industry.id === sectorId);
};
