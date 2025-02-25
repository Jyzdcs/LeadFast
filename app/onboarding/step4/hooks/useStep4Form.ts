import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step4FormValues } from "../mocks/constants";

export const useStep4Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [expertise, setExpertise] = useState("");

  console.log(data);
  const form = useForm<Step4FormValues>({
    defaultValues: {
      company: data.step4?.company || "",
      expertise: data.step4?.expertise || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step4FormValues) => {
    setData({ ...data, step4: values });
    router.push("/onboarding/step5");
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
