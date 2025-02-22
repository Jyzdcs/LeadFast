"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X, UserIcon, BriefcaseIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { KeywordInput } from "@/components/ui/keyword-input";
import { StepIndicator } from "@/components/ui/step-indicator";

// Types pour le formulaire
type Step2FormValues = {
  jobTitle: string[];
  managementLevel: string[];
};

// Niveaux hiérarchiques avec le volume de prospects disponibles
const managementLevels = [
  { value: "junior", label: "Junior" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Directeur" },
  { value: "vp", label: "VP" },
  { value: "csuite", label: "C-Level" },
];

export default function Step2() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = React.useState("");

  const form = useForm<Step2FormValues>({
    defaultValues: {
      jobTitle: data.step2?.jobTitle || [],
      managementLevel: data.step2?.managementLevel || [],
    },
  });

  // Gestion des niveaux hiérarchiques
  React.useEffect(() => {
    if (selectedLevel) {
      const currentLevels = form.getValues("managementLevel") || [];
      if (!currentLevels.includes(selectedLevel)) {
        form.setValue("managementLevel", [...currentLevels, selectedLevel]);
      }
      setSelectedLevel(""); // Reset après ajout
    }
  }, [selectedLevel, form]);

  const onSubmit = async (values: Step2FormValues) => {
    setData({ 
      ...data, // Garder les données existantes
      step2: values 
    });
    router.push("/onboarding/step3");
  };

  const handleRemoveLevel = (valueToRemove: string) => {
    const currentLevels = form.getValues("managementLevel");
    form.setValue(
      "managementLevel",
      currentLevels.filter((level) => level !== valueToRemove)
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <StepIndicator step={2} label="Profil Recherché" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intitulé de poste précis
              </label>
              <KeywordInput
                keywords={form.watch("jobTitle") || []}
                defaultValue={data.step2?.jobTitle}
                onAdd={(keyword) => {
                  const currentTitles = form.getValues("jobTitle") || [];
                  if (!currentTitles.includes(keyword)) {
                    form.setValue("jobTitle", [...currentTitles, keyword]);
                  }
                }}
                onRemove={(keyword) => {
                  const currentTitles = form.getValues("jobTitle") || [];
                  form.setValue(
                    "jobTitle",
                    currentTitles.filter((title) => title !== keyword)
                  );
                }}
                placeholder="Ex : Développeur, Directeur, etc..."
                helperText="Appuyez sur Entrée pour ajouter un mot-clé"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveaux hiérarchiques
              </label>
              <Combobox
                options={managementLevels.map((level) => ({
                  id: level.value,
                  label: level.label,
				  desc: level.label,
                }))}
                value={selectedLevel}
                onChange={setSelectedLevel}
                placeholder="Sélectionner un niveau..."
                searchPlaceholder="Rechercher un niveau..."
                icon={<UserIcon className="w-4 h-4" />}
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch("managementLevel")?.map((level) => (
                  <Badge
                    key={level}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {managementLevels.find((l) => l.value === level)?.label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLevel(level);
                      }}
                      className="focus:outline-none"
                    >
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                      />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step1")}
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
