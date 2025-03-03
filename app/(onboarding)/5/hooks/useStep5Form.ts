import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step5FormValues, quantityPricing } from "../mocks/constants";
import { useLeadFastApollo } from "@/hooks/useLeadFastApollo";
import { prepareEngineData } from "@/app/(onboarding)/submitted/utils/apolloDataAdapter";
import { EmailService } from "@/services/emailService";
import { useToast } from "@/components/ui/use-toast";

export const useStep5Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { generateApolloLinkFromCriteria } = useLeadFastApollo();
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

  const handleSubmit = async (values: Step5FormValues) => {
    try {
      setIsSubmitting(true);

      // Préparation des données Apollo
      const apolloData = prepareEngineData(data);

      // Génération du lien Apollo
      const apolloLink = generateApolloLinkFromCriteria(apolloData);

      if (!apolloLink) {
        throw new Error("Impossible de générer le lien Apollo");
      }

      // Envoi de l'email avec le lien Apollo
      const emailResult = await EmailService.sendAutomaticApolloEmail(
        apolloData,
        apolloLink
      );

      if (!emailResult.success) {
        throw new Error(emailResult.message);
      }

      // Affichage d'une notification de succès
      toast({
        title: "Formulaire envoyé avec succès",
        description: "Un email contenant votre lien Apollo a été envoyé.",
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
