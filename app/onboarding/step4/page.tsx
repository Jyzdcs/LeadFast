"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step4FormValues = {
  leadQuantity: string;
};

const quantityPricing = [
  { quantity: "1000", price: 30 },
  { quantity: "2000", price: 55 },
  { quantity: "3000", price: 80 },
  { quantity: "4000", price: 105 },
  { quantity: "5000", price: 125 },
  { quantity: "6000", price: 140 },
  { quantity: "7000", price: 155 },
  { quantity: "8000", price: 170 },
  { quantity: "9000", price: 185 },
  { quantity: "10000", price: 200 },
];

export default function Step4() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = React.useState<number | null>(null);

  React.useEffect(() => {
    const quantity = data?.step4?.leadQuantity;
    if (quantity) {
      const pricing = quantityPricing.find(p => p.quantity === quantity);
      setSelectedPrice(pricing?.price || null);
    }
  }, [data?.step4?.leadQuantity]);

  const form = useForm<Step4FormValues>({
    defaultValues: {
      leadQuantity: data.step4?.leadQuantity || "",
    },
  });

  const handleQuantityChange = (quantity: string) => {
    form.setValue("leadQuantity", quantity);
    const pricing = quantityPricing.find(p => p.quantity === quantity);
    setSelectedPrice(pricing?.price || null);
    
    // Sauvegarder immédiatement dans le contexte
    setData({ 
      step4: {
        leadQuantity: quantity
      }
    });
  };

  const onSubmit = async (values: Step4FormValues) => {
    // La sauvegarde est déjà faite dans handleQuantityChange
    router.push("/onboarding/step5");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 4 - Configuration des leads</span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Quantité de leads
          </h1>
          <p className="text-gray-600">
            Choisissez le nombre de leads que vous souhaitez obtenir
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité de leads souhaitée
              </label>
              <Select 
                onValueChange={handleQuantityChange}
                defaultValue={data.step4?.leadQuantity}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sélectionnez la quantité" />
                </SelectTrigger>
                <SelectContent>
                  {quantityPricing.map((option) => (
                    <SelectItem
                      key={option.quantity}
                      value={option.quantity}
                      className="cursor-pointer hover:bg-primary/5"
                    >
                      {option.quantity} leads
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step3")}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900"
              disabled={!form.watch("leadQuantity")}
            >
              {form.formState.isSubmitting ? "Chargement..." : "Continuer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 