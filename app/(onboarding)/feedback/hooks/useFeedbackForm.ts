import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { submitFeedback } from "@/utils/api";
import { FeedbackFormData } from "../mocks/constants";
import { useForm } from "react-hook-form";

// Type pour les valeurs du formulaire
interface FeedbackFormValues {
  name: string;
  email: string;
  feedback: string;
}

export const useFeedbackForm = () => {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données utilisateur depuis le contexte d'onboarding
  const { data: onboardingData } = useOnboarding();

  // Récupérer les données utilisateur à partir du contexte
  const userData = onboardingData.step4 || {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  // Création du nom complet à partir du prénom et du nom
  const fullName =
    userData.lastName && userData.firstName
      ? `${userData.lastName} ${userData.firstName}`
      : "";

  // Initialiser react-hook-form avec les valeurs du contexte si disponibles
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      name: fullName,
      email: userData.email || "",
      feedback: "",
    },
  });

  // Récupérer les valeurs actuelles des champs
  const formValues = watch();

  // Déterminer si les champs sont modifiables
  const isNameEditable = !fullName;
  const isEmailEditable = !userData.email;

  // Gérer les changements d'aspect
  const handleAspectChange = (aspect: string, checked: boolean) => {
    if (checked) {
      setSelectedAspects((prev) => [...prev, aspect]);
    } else {
      setSelectedAspects((prev) => prev.filter((item) => item !== aspect));
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = handleFormSubmit(async (data) => {
    // Vérification que la notation est présente
    if (rating === null) {
      setError("Veuillez donner une note à notre outil");
      return;
    }

    // Vérification des informations de contact
    if (!data.name || !data.email) {
      setError("Les informations de contact sont obligatoires");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Définir une valeur par défaut pour le feedback
      const feedbackText = data.feedback.trim()
        ? data.feedback.trim()
        : "Aucun commentaire fourni";

      const formData: FeedbackFormData = {
        name: data.name,
        email: data.email,
        feedback: feedbackText,
        rating,
        appreciatedAspects:
          selectedAspects.length > 0 ? selectedAspects : undefined,
      };

      const response = await submitFeedback(formData);

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push("/submitted");
        }, 2000);
      } else {
        setError(
          response.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de votre feedback");
      console.error("Erreur lors de l'envoi du feedback:", err);
    } finally {
      setIsLoading(false);
    }
  });

  // Mettre à jour le state de feedback
  const setFeedback = (value: string) => {
    setValue("feedback", value);
  };

  return {
    rating,
    setRating,
    feedback: formValues.feedback,
    setFeedback,
    selectedAspects,
    handleAspectChange,
    formValues,
    fullName,
    userData,
    isNameEditable,
    isEmailEditable,
    register,
    submitted,
    isLoading,
    error,
    handleSubmit,
  };
};
