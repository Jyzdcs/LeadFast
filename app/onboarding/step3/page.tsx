"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type Step3FormValues = {
  company: string;
  expertise: string[];
};

export default function Step3() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [expertiseInput, setExpertiseInput] = React.useState("");

  const form = useForm<Step3FormValues>({
    defaultValues: {
      company: data.step3?.company || "",
      expertise: data.step3?.expertise || [],
    },
  });

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      const currentExpertise = form.getValues("expertise") || [];
      if (!currentExpertise.includes(expertiseInput.trim())) {
        form.setValue("expertise", [...currentExpertise, expertiseInput.trim()]);
      }
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (valueToRemove: string) => {
    const currentExpertise = form.getValues("expertise");
    form.setValue(
      "expertise",
      currentExpertise.filter((exp) => exp !== valueToRemove)
    );
  };

  const onSubmit = async (values: Step3FormValues) => {
    setData({ step3: values });
    router.push("/onboarding/step4");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddExpertise();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 3 - Expertise</span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Entreprise spécifique
          </h1>
          <p className="text-gray-600">
            Parlez-nous de votre parcours professionnel
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'entreprise
              </label>
              <Input
                id="company"
                placeholder="Ex : Google, Apple, ..."
                className="bg-gray-50 border-gray-200 focus:ring-[#84cc16] focus:border-[#84cc16]"
                {...form.register("company")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mots clés de domaine d'expertise
              </label>
              <div className="flex gap-2">
                <Input
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  placeholder="Ex : saas, e-commerce, ..."
                  className="bg-gray-50 border-gray-200 focus:ring-[#84cc16] focus:border-[#84cc16]"
                />
                <Button 
                  type="button"
                  onClick={handleAddExpertise}
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Ajouter
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch("expertise")?.map((exp) => (
                  <Badge
                    key={exp}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {exp}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveExpertise(exp)}
                    />
                  </Badge>
                ))}
              </div>
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
