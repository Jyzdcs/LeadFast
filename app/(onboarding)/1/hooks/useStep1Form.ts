import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step1FormValues } from "../mocks/constants";

export const useStep1Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const form = useForm<Step1FormValues>({
    defaultValues: {
      jobTitle: data.step1?.jobTitle || [],
      managementLevel: data.step1?.managementLevel || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step1FormValues) => {
    setData({ ...data, step1: values });
    router.push("/2");
  };

  const handleRemoveLevel = (valueToRemove: string) => {
    const currentLevels = form.getValues("managementLevel");
    form.setValue(
      "managementLevel",
      currentLevels.filter((level: string) => level !== valueToRemove)
    );
  };

  const handleAddJobTitle = (keyword: string) => {
    const currentTitles = form.getValues("jobTitle") || [];
    if (!currentTitles.includes(keyword)) {
      form.setValue("jobTitle", [...currentTitles, keyword]);
    }
  };

  const handleRemoveJobTitle = (keyword: string) => {
    const currentTitles = form.getValues("jobTitle") || [];
    form.setValue(
      "jobTitle",
      currentTitles.filter((title) => title !== keyword)
    );
  };

  // Effects
  useEffect(() => {
    if (selectedLevel) {
      const currentLevels = form.getValues("managementLevel") || [];
      if (!currentLevels.includes(selectedLevel)) {
        form.setValue("managementLevel", [...currentLevels, selectedLevel]);
      }
      setSelectedLevel("");
    }
  }, [selectedLevel, form]);

  return {
    form,
    selectedLevel,
    setSelectedLevel,
    handleSubmit,
    handleRemoveLevel,
    handleAddJobTitle,
    handleRemoveJobTitle,
  };
};
