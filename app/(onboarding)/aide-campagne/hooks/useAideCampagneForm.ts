import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitAideCampagne } from "@/utils/api";
import { AideCampagneFormData } from "../mocks/constants";

export const useAideCampagneForm = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<AideCampagneFormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    campaignType: "",
    budget: "",
    details: "",
    targetAudience: "",
    goals: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.company.trim() ||
      !formData.campaignType
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Préparer les données pour l'API en adaptant la structure
      const apiData = {
        ...formData,
        additionalInfo: formData.details, // Mapper details à additionalInfo pour l'API
      };

      const response = await submitAideCampagne(apiData);

      if (response.success) {
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
