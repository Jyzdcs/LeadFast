import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step4FormValues } from "../mocks/constants";

/**
 * Hook personnalisé pour gérer le formulaire de l'étape 4
 *
 * Ce hook gère :
 * - L'initialisation du formulaire avec les données du contexte
 * - La mise à jour du contexte à chaque changement de champ
 * - La validation et la soumission du formulaire
 * - La navigation vers l'étape suivante
 */
export const useStep4Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  // Initialisation du formulaire avec react-hook-form
  const methods = useForm<Step4FormValues>({
    defaultValues: {
      firstName: data.step4?.firstName || "",
      lastName: data.step4?.lastName || "",
      email: data.step4?.email || "",
      phoneNumber: data.step4?.phoneNumber || "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = methods;

  /**
   * Met à jour le contexte à chaque changement de champ
   * Cette fonction est appelée par les gestionnaires onChange des champs
   */
  const handleFieldChange = (field: keyof Step4FormValues, value: string) => {
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      [field]: value,
    };

    // Mise à jour du contexte
    setData({
      ...data,
      step4: updatedValues,
    });

    // Mise à jour du formulaire
    setValue(field, value);
  };

  /**
   * Gère la soumission du formulaire
   * Sauvegarde les données dans le contexte et navigue vers l'étape suivante
   */
  const onSubmit = (values: Step4FormValues) => {
    // Sauvegarde des données dans le contexte
    setData({ ...data, step4: values });

    // Navigation vers l'étape suivante avec le préfixe /onboarding/
    router.push("/5");
  };

  /**
   * Fonction pour effacer les erreurs de validation
   * Maintenue pour compatibilité avec l'interface
   */
  const clearError = (field: keyof Step4FormValues) => {
    // Cette fonction est maintenue pour compatibilité
  };

  // Préparation du gestionnaire de soumission
  const handleSubmit = hookHandleSubmit(onSubmit);

  return {
    register,
    errors,
    handleSubmit,
    clearError,
    getValues,
    setValue,
    form: methods,
    handleFieldChange,
  };
};
