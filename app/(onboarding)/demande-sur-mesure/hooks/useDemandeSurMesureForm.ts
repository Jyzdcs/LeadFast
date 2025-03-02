import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitDemandeSurMesure } from "@/utils/api";
import { DemandeSurMesureFormData } from "../mocks/constants";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const useDemandeSurMesureForm = () => {
  const router = useRouter();
  const { data: onboardingData, setData } = useOnboarding();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État pour les champs du formulaire
  const [formData, setFormData] = useState<DemandeSurMesureFormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    description: "",
  });

  // Mise à jour des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Fonction pour extraire prénom/nom du format "Nom Prénom"
  const extractNameParts = (
    fullName: string
  ): { firstName: string; lastName: string } => {
    const nameParts = fullName.trim().split(/\s+/);

    // Si un seul mot, on le considère comme nom de famille
    if (nameParts.length === 1) {
      return {
        lastName: nameParts[0],
        firstName: "",
      };
    }

    // Si deux mots ou plus, le premier est le nom de famille, le reste est le prénom
    return {
      lastName: nameParts[0],
      firstName: nameParts.slice(1).join(" "),
    };
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async () => {
    // Validation basique
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.company.trim() ||
      !formData.description.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitDemandeSurMesure(formData);

      if (response.success) {
        // Extraire le prénom et le nom
        const { firstName, lastName } = extractNameParts(formData.fullName);

        // Stocker les données utilisateur dans le contexte d'onboarding
        setData({
          step3: {
            company: formData.company,
            expertise: [], // Valeur par défaut vide
          },
          step4: {
            firstName,
            lastName,
            email: formData.email,
            phoneNumber: formData.phone,
          },
        });

        setIsSubmitted(true);
        setTimeout(() => {
          router.push("/submitted");
        }, 3000);
      } else {
        setError(
          response.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de votre demande");
      console.error("Erreur lors de l'envoi de la demande:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
  };
};
