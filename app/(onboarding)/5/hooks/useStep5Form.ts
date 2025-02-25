import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step5FormValues } from "../mocks/constants";

export const useStep5Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const methods = useForm<Step5FormValues>({
    defaultValues: {
      firstName: data.step5?.firstName || "",
      lastName: data.step5?.lastName || "",
      email: data.step5?.email || "",
      phoneNumber: data.step5?.phoneNumber || "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = methods;

  // Fonction pour mettre à jour le contexte à chaque changement
  const handleFieldChange = (field: keyof Step5FormValues, value: string) => {
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      [field]: value,
    };

    // Mise à jour du contexte
    setData({
      ...data,
      step5: updatedValues,
    });

    // Mise à jour du formulaire
    setValue(field, value);
  };

  const onSubmit = (values: Step5FormValues) => {
    // Sauvegarde des données dans le contexte (pour être sûr)
    setData({ ...data, step5: values });
    // Navigation vers l'étape suivante
    router.push("/6");
  };

  const clearError = (field: keyof Step5FormValues) => {
    // Cette fonction est maintenue pour compatibilité
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    clearError,
    getValues,
    setValue,
    form: methods,
    handleFieldChange,
  };
};
