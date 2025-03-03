import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLeadFastApollo } from "@/hooks/useLeadFastApollo";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { prepareEngineData } from "@/app/(onboarding)/submitted/utils/apolloDataAdapter";
/**
 * Hook personnalisé pour gérer les actions liées à Apollo
 */
export const useApolloActions = () => {
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const { data } = useOnboarding();
  const { openApolloLink, copyApolloLinkToClipboard } = useLeadFastApollo();
  const { toast } = useToast();

  /**
   * Ouvrir le lien Apollo dans un nouvel onglet
   */
  const handleOpenApolloLink = () => {
    setIsGeneratingLink(true);
    try {
      const apolloData = prepareEngineData(data);
      openApolloLink(apolloData);
      toast({
        title: "Lien généré",
        description: "Un nouvel onglet a été ouvert avec votre recherche.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le lien. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  /**
   * Copier le lien Apollo dans le presse-papiers
   */
  const handleCopyApolloLink = async () => {
    setIsGeneratingLink(true);
    try {
      const apolloData = prepareEngineData(data);
      const success = await copyApolloLinkToClipboard(apolloData);

      if (success) {
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans votre presse-papiers.",
          variant: "default",
        });
      } else {
        throw new Error("Échec de la copie");
      }
    } catch (error) {
      console.error("Erreur lors de la copie du lien Apollo:", error);
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return {
    isGeneratingLink,
    handleOpenApolloLink,
    handleCopyApolloLink,
  };
};
