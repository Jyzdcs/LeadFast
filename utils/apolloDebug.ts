import { industries_detailled } from "@/app/(onboarding)/2/mocks/detailled-constant";

/**
 * Affiche la liste complète des secteurs d'activité disponibles dans Apollo
 * avec leurs IDs correspondants. Utile pour le débogage.
 */
export const logAvailableSectors = (): void => {
  // Ne traiter que les industries de type "linkedin_industry"
  const industries = industries_detailled.filter(
    (industry) => industry.kind === "linkedin_industry"
  );

  // Trier par nom pour faciliter la lecture
  const sortedIndustries = [...industries].sort((a, b) =>
    a.cleaned_name.localeCompare(b.cleaned_name)
  );

  console.log("=== SECTEURS D'ACTIVITÉ APOLLO DISPONIBLES ===");
  console.log(`Total: ${sortedIndustries.length} secteurs`);

  sortedIndustries.forEach((industry) => {
    console.log(`- ${industry.cleaned_name} | ID: ${industry.id}`);
  });

  console.log("=== FIN DE LA LISTE ===");
};

/**
 * Recherche et affiche les secteurs d'activité qui correspondent à un terme de recherche.
 * Utile pour trouver rapidement un secteur spécifique et son ID.
 * @param searchTerm Terme de recherche (insensible à la casse)
 */
export const findSectorsByName = (searchTerm: string): void => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  // Rechercher dans les secteurs de type "linkedin_industry"
  const matchingSectors = industries_detailled
    .filter((industry) => industry.kind === "linkedin_industry")
    .filter((industry) =>
      industry.cleaned_name.toLowerCase().includes(normalizedSearchTerm)
    );

  if (matchingSectors.length === 0) {
    console.log(`Aucun secteur trouvé pour la recherche: "${searchTerm}"`);
    return;
  }

  console.log(`=== SECTEURS CORRESPONDANT À "${searchTerm}" ===`);
  console.log(`${matchingSectors.length} résultats trouvés`);

  matchingSectors.forEach((industry) => {
    console.log(`- ${industry.cleaned_name} | ID: ${industry.id}`);
  });

  console.log("=== FIN DES RÉSULTATS ===");
};
