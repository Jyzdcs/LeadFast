import { ApolloUrlParams } from "../types/apolloTypes";

export const generateApolloUrl = (params: ApolloUrlParams): string => {
  const searchParams = new URLSearchParams();

  // Fonction pour ajouter des paramètres à l'URL avec le format correct pour Apollo
  const appendParam = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return; // Skip empty arrays

      // Gestion spéciale pour les plages d'employés qui doivent rester comme "min,max"
      if (key === "organizationNumEmployeesRanges") {
        value.forEach((range) => {
          // Ne pas diviser les plages de valeurs
          searchParams.append(`${key}[]`, range);
        });
      } else {
        // Pour tous les autres tableaux, ajouter chaque élément séparément
        value.forEach((item) => {
          // Apollo attend format "key[]" pour les tableaux
          searchParams.append(`${key}[]`, item);
        });
      }
    } else if (value !== undefined && value !== null && value !== "") {
      // Valeurs simples
      searchParams.append(key, value);
    }
  };

  // Ajout de tous les paramètres à l'URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      appendParam(key, value);
    }
  });

  return `https://app.apollo.io/#/people?${searchParams.toString()}`;
};
