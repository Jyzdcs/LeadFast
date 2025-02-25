import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Step5FormValues, quantityPricing } from "../mocks/constants";

export const useStep6Form = () => {
  const { data, setData } = useOnboarding();
  const router = useRouter();
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
    router.push("/submitted");
  };

  return {
    form,
    selectedQuantity,
    selectedPrice,
    handleQuantityChange,
    handleSubmit,
  };
};
