import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { submitFeedback } from "@/utils/api";
import { FeedbackFormData } from "../mocks/constants";

export const useFeedbackForm = () => {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données utilisateur depuis le contexte d'onboarding
  const { data: onboardingData } = useOnboarding();

  // S'assurer que userData a toujours une structure valide
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
      : userData.lastName || "";

  // Afficher dans la console les données pour le débogage
  useEffect(() => {
    console.log("Données d'onboarding:", onboardingData);
    console.log("Données utilisateur:", userData);
    console.log("Nom complet:", fullName);
  }, [onboardingData, userData, fullName]);

  const handleAspectChange = (aspect: string, checked: boolean) => {
    if (checked) {
      setSelectedAspects((prev) => [...prev, aspect]);
    } else {
      setSelectedAspects((prev) => prev.filter((item) => item !== aspect));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de base
    if (!feedback.trim()) {
      setError("Veuillez entrer votre feedback");
      return;
    }

    if (!fullName || !userData.email) {
      setError("Les informations de contact sont obligatoires");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData: FeedbackFormData = {
        name: fullName,
        email: userData.email,
        feedback: feedback,
        rating: rating || undefined,
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
  };

  return {
    rating,
    setRating,
    feedback,
    setFeedback,
    selectedAspects,
    handleAspectChange,
    fullName,
    userData,
    submitted,
    isLoading,
    error,
    handleSubmit,
  };
};
