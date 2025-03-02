import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitDemandeSurMesure } from "@/utils/api";
import { DemandeSurMesureFormData } from "../mocks/constants";

export const useDemandeSurMesureForm = () => {
  const router = useRouter();
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
