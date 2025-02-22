"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { StepIndicator } from "@/components/ui/step-indicator";
import { KeywordInput } from "@/components/ui/keyword-input";
import { Building2Icon } from "lucide-react";

type Step4FormValues = {
  company: string;
  expertise: string[];
};

export default function Step4() {
  const { data, setData } = useOnboarding();
  const router = useRouter();


	console.log(data);
  const form = useForm<Step4FormValues>({
    defaultValues: {
      company: data.step4?.company || "",
      expertise: data.step4?.expertise || [],
    },
  });

  const onSubmit = async (values: Step4FormValues) => {
    setData({ step4: values });
    router.push("/onboarding/step5");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <StepIndicator step={4} label="Entreprise spécifique" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'entreprise
              </label>
              <Input
                id="company"
                placeholder="Ex : Google, Apple, ..."
                className="bg-gray-50 border-gray-200"
                {...form.register("company")}
								icon={<Building2Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mots clés de domaine d'expertise
              </label>
              <KeywordInput
                keywords={form.watch("expertise") || []}
                onAdd={(keyword) => form.setValue("expertise", [...form.getValues("expertise"), keyword])}
                onRemove={(keyword) => form.setValue("expertise", form.getValues("expertise").filter((exp) => exp !== keyword))}
                placeholder="Ex : saas, e-commerce, ..."
                helperText="Appuyez sur Entrée pour ajouter un mot-clé"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step2")}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Chargement..." : "Continuer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
