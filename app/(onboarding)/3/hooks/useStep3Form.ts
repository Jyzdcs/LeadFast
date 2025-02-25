import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step3FormValues } from "../mocks/constants";

export const useStep3Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const form = useForm<Step3FormValues>({
    defaultValues: {
      activitySector: data.step3?.activitySector || [],
      companySize: data.step3?.companySize || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step3FormValues) => {
    setData({ ...data, step3: values });
    router.push("/4");
  };

  const handleRemoveSector = (valueToRemove: string) => {
    const currentSectors = form.getValues("activitySector");
    form.setValue(
      "activitySector",
      currentSectors.filter((sector) => sector !== valueToRemove)
    );
  };

  const handleRemoveSize = (valueToRemove: string) => {
    const currentSizes = form.getValues("companySize");
    form.setValue(
      "companySize",
      currentSizes.filter((size) => size !== valueToRemove)
    );
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
  };
};
