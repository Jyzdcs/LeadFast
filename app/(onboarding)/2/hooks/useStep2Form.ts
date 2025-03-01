import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step2FormValues, employeeRanges } from "../mocks/constants";

export const useStep2Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const form = useForm<Step2FormValues>({
    defaultValues: {
      activitySector: data.step2?.activitySector || [],
      companySize: data.step2?.companySize || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step2FormValues) => {
    setData({ ...data, step2: values });
    router.push("/3");
  };

  const handleRemoveSector = (valueToRemove: string) => {
    const currentSectors = form.getValues("activitySector");
    form.setValue(
      "activitySector",
      currentSectors.filter((sector: string) => sector !== valueToRemove)
    );
  };

  const handleRemoveSize = (valueToRemove: string) => {
    const currentSizes = form.getValues("companySize");
    form.setValue(
      "companySize",
      currentSizes.filter((size: string) => size !== valueToRemove)
    );
  };

  // Nouvelle fonction pour sélectionner toutes les tailles d'entreprise
  const handleSelectAllCompanySizes = () => {
    const allSizes = employeeRanges.map((size) => size.value);
    form.setValue("companySize", allSizes);
  };

  // Effects
  useEffect(() => {
    if (selectedSector) {
      const currentSectors = form.getValues("activitySector") || [];
      if (!currentSectors.includes(selectedSector)) {
        form.setValue("activitySector", [...currentSectors, selectedSector]);
      }
      setSelectedSector("");
    }
  }, [selectedSector, form]);

  useEffect(() => {
    if (selectedSize) {
      const currentSizes = form.getValues("companySize") || [];
      if (!currentSizes.includes(selectedSize)) {
        form.setValue("companySize", [...currentSizes, selectedSize]);
      }
      setSelectedSize("");
    }
  }, [selectedSize, form]);

  return {
    form,
    selectedSector,
    setSelectedSector,
    selectedSize,
    setSelectedSize,
    handleSubmit,
    handleRemoveSector,
    handleRemoveSize,
    handleSelectAllCompanySizes,
  };
};
