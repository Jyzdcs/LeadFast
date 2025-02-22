"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { StepIndicator } from "@/components/ui/step-indicator";
import { Combobox } from "@/components/ui/combobox";
import { ArrowRightIcon, Package } from "lucide-react";

type Step5FormValues = {
  leadQuantity: string;
};

const quantityPricing = [
  { value: "1000", label: "1000 leads", price: 30 },
  { value: "2000", label: "2000 leads", price: 55 },
  { value: "3000", label: "3000 leads", price: 80 },
  { value: "4000", label: "4000 leads", price: 105 },
  { value: "5000", label: "5000 leads", price: 125 },
  { value: "6000", label: "6000 leads", price: 140 },
  { value: "7000", label: "7000 leads", price: 155 },
  { value: "8000", label: "8000 leads", price: 170 },
  { value: "9000", label: "9000 leads", price: 185 },
  { value: "10000", label: "10000 leads", price: 200 },
];

export default function Step5() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = React.useState(data.step5?.leadQuantity || "");

  const form = useForm<Step5FormValues>({
    defaultValues: {
      leadQuantity: data.step5?.leadQuantity || "",
    },
  });

  const selectedPrice = React.useMemo(() => {
    const pricing = quantityPricing.find(p => p.value === selectedQuantity);
    return pricing?.price || null;
  }, [selectedQuantity]);

  const handleQuantityChange = (quantity: string) => {
    setSelectedQuantity(quantity);
    form.setValue("leadQuantity", quantity);
    
    setData({ 
      step5: {
        leadQuantity: quantity
      }
    });
  };

  const onSubmit = async (values: Step5FormValues) => {
    router.push("/onboarding/step6");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <StepIndicator step={5} label="Configuration des leads" />

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Quantité de leads
          </h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité de leads souhaitée
              </label>
              <Combobox
                options={quantityPricing.map((option) => ({
                  id: option.value,
                  label: option.label,
                  desc: `${option.price}€ - ${option.label}`,
                }))}
                value={selectedQuantity}
                onChange={handleQuantityChange}
                placeholder="Sélectionner une quantité..."
                searchPlaceholder="Rechercher une quantité..."
                icon={<Package className="w-4 h-4" />}
              />

              {selectedPrice && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Prix total :</span>
                    <span className="text-lg font-semibold text-gray-900">{selectedPrice}€</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6 mt-auto pt-8 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step4")}
              className="border-gray-200 text-gray-600 hover:bg-gray-50 h-12"
            >
              Retour
            </Button>
            <Button
              type="submit"
							size="sm"
              className="bg-black hover:bg-gray-900 w-36 h-12"
            >
              Continuer <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 