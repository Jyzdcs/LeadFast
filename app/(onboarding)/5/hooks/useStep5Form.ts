import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step5FormValues, quantityPricing } from "../mocks/constants";
import { prepareEngineData } from "@/app/(onboarding)/submitted/utils/engineDataAdapter";
import { useToast } from "@/components/ui/use-toast";

export const useStep5Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(
    data.step5?.leadQuantity || ""
  );

  const form = useForm<Step5FormValues>({
    defaultValues: {
      leadQuantity: data.step5?.leadQuantity || "",
    },
  });

  const selectedPrice = useMemo(() => {
    const pricing = quantityPricing.find((p) => p.value === selectedQuantity);
    return pricing?.price || null;
  }, [selectedQuantity]);

  const handleQuantityChange = (quantity: string) => {
    setSelectedQuantity(quantity);
    form.setValue("leadQuantity", quantity);
    setData({
      ...data,
      step5: {
        leadQuantity: quantity,
      },
    });
  };

  // Vérifie si les données requises sont présentes
  const validateOnboardingData = () => {
    const missingFields = [];

    // Vérifier les données personnelles (step4)
    if (!data.step4?.firstName) missingFields.push("Prénom");
    if (!data.step4?.lastName) missingFields.push("Nom");

    // Vérifier les critères de recherche essentiels
    if (!data.step1?.jobTitle?.length) missingFields.push("Intitulés de poste");
    if (!data.step1?.managementLevel?.length)
      missingFields.push("Niveaux hiérarchiques");
    if (!data.step2?.activitySector?.length)
      missingFields.push("Secteurs d'activité");
    if (!data.step2?.companySize?.length)
      missingFields.push("Tailles d'entreprise");

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  const handleSubmit = async (values: Step5FormValues) => {
    try {
      setIsSubmitting(true);

      // Préparation des données pour le moteur de génération
      const engineData = prepareEngineData(data);

      // S'assurer que le body de la requête est correctement formaté
      const requestBody = JSON.stringify(engineData);

      // Envoyer la requête avec le corps correctement formaté
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      // Récupération et vérification de la réponse
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Erreur lors du parsing de la réponse:", parseError);
        throw new Error(
          "La réponse du serveur n'est pas au format JSON valide"
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || result.message || "Une erreur est survenue"
        );
      }

      // Affichage d'une notification de succès
      toast({
        title: "Formulaire envoyé avec succès",
        description:
          result.message || "Votre demande a été traitée avec succès.",
        variant: "default",
      });

      // Redirection vers la page de confirmation
      router.push("/submitted");
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);

      // Affichage d'une notification d'erreur
      toast({
        title: "Une erreur est survenue",
        description:
          (error as Error).message || "Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });

      // Malgré l'erreur, on redirige quand même l'utilisateur
      router.push("/submitted");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    selectedQuantity,
    selectedPrice,
    handleQuantityChange,
    handleSubmit,
    isSubmitting,
  };
};
