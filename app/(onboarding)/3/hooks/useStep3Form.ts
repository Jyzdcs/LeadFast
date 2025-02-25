import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step3FormValues } from "../mocks/constants";

export const useStep3Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [expertise, setExpertise] = useState("");

  const form = useForm<Step3FormValues>({
    defaultValues: {
      company: data.step3?.company || "",
      expertise: data.step3?.expertise || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step3FormValues) => {
    setData({ ...data, step3: values });
    router.push("/4");
  };

  const handleAddExpertise = (keyword: string) => {
    const currentExpertise = form.getValues("expertise") || [];
    if (keyword && !currentExpertise.includes(keyword)) {
      form.setValue("expertise", [...currentExpertise, keyword]);
    }
    setExpertise("");
  };

  const handleRemoveExpertise = (keyword: string) => {
    const currentExpertise = form.getValues("expertise");
    form.setValue(
      "expertise",
      currentExpertise.filter((exp) => exp !== keyword)
    );
  };

  return {
    form,
    expertise,
    setExpertise,
    handleSubmit,
    handleAddExpertise,
    handleRemoveExpertise,
  };
};
