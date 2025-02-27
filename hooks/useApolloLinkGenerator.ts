// hooks/useApolloLinkGenerator.ts
import { useState, useCallback } from "react";
import { ApolloFormData, ApolloUrlParams } from "../types/apolloTypes";
import { mapFormDataToUrlParams } from "../utils/apolloParameterMap";
import { generateApolloUrl } from "../utils/urlGenerator";

// Valeurs par défaut pour initialiser le formulaire
const defaultFormData: ApolloFormData = {
  firstName: "",
  lastName: "",
  email: "",
  hasExistingLink: "no",
  apolloLink: "",
  jobTitles: [],
  excludedTitles: [],
  locations: [],
  excludedLocations: [],
  companyKeywords: [],
  companySize: [],
  industries: [],
  managementLevels: [],
  departments: [],
  emailVerificationStatus: ["verified"],
};

export const useApolloLinkGenerator = () => {
  // État du formulaire
  const [formData, setFormData] = useState<ApolloFormData>(defaultFormData);

  // État de l'URL générée
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  // État de validation et de soumission
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Gestionnaires d'événements
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleMultiSelectChange = useCallback(
    (field: keyof ApolloFormData) => (values: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: values }));
    },
    []
  );

  // Fonction principale de génération de lien
  const generateLink = useCallback(() => {
    try {
      // Si l'utilisateur a déjà un lien Apollo et l'a fourni
      if (formData.hasExistingLink === "yes" && formData.apolloLink) {
        setGeneratedUrl(formData.apolloLink);
        return formData.apolloLink;
      }

      // Conversion des données du formulaire en paramètres d'URL
      const urlParams = mapFormDataToUrlParams(formData);

      // Génération de l'URL Apollo
      const url = generateApolloUrl(urlParams);

      setGeneratedUrl(url);
      return url;
    } catch (err) {
      setError(
        `Error generating link: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      return "";
    }
  }, [formData]);

  // Validation du formulaire
  const validateForm = useCallback(() => {
    // Validation selon les champs requis
    const isFormValid = Boolean(
      formData.firstName && formData.lastName && formData.email
    );

    setIsValid(isFormValid);
    return isFormValid;
  }, [formData]);

  // Gestionnaire de soumission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        setError("Please fill in all required fields");
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        // Génération du lien
        const url = generateLink();

        // Dans un contexte sans backend, on peut:
        // 1. Copier l'URL dans le presse-papier
        await navigator.clipboard.writeText(url);

        // 2. Enregistrer dans le localStorage pour historique
        const savedLinks = JSON.parse(
          localStorage.getItem("apolloLinks") || "[]"
        );
        savedLinks.push({
          url,
          timestamp: new Date().toISOString(),
          name: `${formData.firstName} ${formData.lastName}`,
        });
        localStorage.setItem("apolloLinks", JSON.stringify(savedLinks));

        setIsSubmitting(false);
      } catch (error) {
        setError(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, generateLink]
  );

  return {
    formData,
    setFormData,
    generatedUrl,
    isValid,
    isSubmitting,
    error,
    handleInputChange,
    handleMultiSelectChange,
    generateLink,
    handleSubmit,
    validateForm,
  };
};
