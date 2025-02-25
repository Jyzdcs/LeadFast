import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step4FormValues } from "../mocks/constants";

export const useStep4Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();

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
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = methods;

  // Fonction pour mettre à jour le contexte à chaque changement
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

  const onSubmit = (values: Step4FormValues) => {
    // Sauvegarde des données dans le contexte (pour être sûr)
    setData({ ...data, step4: values });
    // Navigation vers l'étape suivante
    router.push("/5");
  };

  const clearError = (field: keyof Step4FormValues) => {
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
