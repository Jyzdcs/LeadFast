/**
 * Constantes pour l'étape 4
 *
 * Ce fichier contient :
 * - La liste des étapes du processus d'onboarding
 * - Les types utilisés dans l'étape 4
 */

// Liste des étapes du processus d'onboarding
export const steps = ["1", "2", "3", "4", "5"];

/**
 * Type pour les valeurs du formulaire de l'étape 4
 *
 * @property firstName - Prénom de l'utilisateur
 * @property lastName - Nom de l'utilisateur
 * @property email - Adresse email de l'utilisateur
 * @property phoneNumber - Numéro de téléphone de l'utilisateur (optionnel)
 */
export type Step4FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};
