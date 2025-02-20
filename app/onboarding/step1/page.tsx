"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StepIndicator } from "../components/StepIndicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Types pour le formulaire
type Step1FormValues = {
  jobTitle: string[];
  managementLevel: string[];
};

// Niveaux hiérarchiques avec le volume de prospects disponibles
const managementLevels = [
  { value: "owner", label: "Propriétaire" },
  { value: "founder", label: "Fondateur" },
  { value: "c_suite", label: "Cadre dirigeant (C suite)" },
  { value: "partner", label: "Associé" },
  { value: "vp", label: "Vice-président" },
  { value: "head", label: "Responsable" },
  { value: "director", label: "Directeur" },
  { value: "manager", label: "Manager" },
  { value: "senior", label: "Senior" },
  { value: "entry", label: "Débutant" },
  { value: "intern", label: "Stagiaire" },
];

export default function Step1() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [jobTitleInput, setJobTitleInput] = React.useState("");

  const form = useForm<Step1FormValues>({
    defaultValues: {
      jobTitle: data.step1?.jobTitle || [],
      managementLevel: data.step1?.managementLevel || [],
    },
  });

  const onSubmit = async (values: Step1FormValues) => {
    setData({ step1: values });
    router.push("/onboarding/step2");
  };

  const handleAddLevel = (value: string) => {
    const currentLevels = form.getValues("managementLevel") || [];
    if (!currentLevels.includes(value)) {
      form.setValue("managementLevel", [...currentLevels, value]);
    }
  };

  const handleRemoveJobTitle = (valueToRemove: string) => {
    const currentJobTitles = form.getValues("jobTitle");
    form.setValue(
      "jobTitle",
      currentJobTitles.filter((jobTitle) => jobTitle !== valueToRemove)
    );
  };

  const handleRemoveLevel = (valueToRemove: string) => {
    const currentLevels = form.getValues("managementLevel");
    form.setValue(
      "managementLevel",
      currentLevels.filter((level) => level !== valueToRemove)
    );
  };

  const handleAddJobTitle = () => {
    if (jobTitleInput.trim()) {
      const currentJobTitles = form.getValues("jobTitle") || [];
      if (!currentJobTitles.includes(jobTitleInput.trim())) {
        form.setValue("jobTitle", [...currentJobTitles, jobTitleInput.trim()]);
      }
      setJobTitleInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 1 - Profil</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Votre profil professionnel
          </h1>
          <p className="text-gray-600">
            Aidez-nous à mieux comprendre votre rôle.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
		  	<label className="block text-sm font-medium text-gray-700 mb-2">
                Intitulé de poste précis
        	</label>
            <div className="flex gap-2">
              <Input
                value={jobTitleInput}
                onChange={(e) => setJobTitleInput(e.target.value)}
                placeholder="Ex : Développeur, Directeur, etc..."
                className="bg-gray-50 border-gray-200 focus:ring-[#84cc16] focus:border-[#84cc16]"
              />
              <Button
                type="button"
                onClick={handleAddJobTitle}
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                Ajouter
              </Button>
            </div>
			<div className="flex flex-wrap gap-2 mt-3">
                {form.watch("jobTitle")?.map((jobTitle) => (
                  <Badge
                    key={jobTitle}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {jobTitle}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveJobTitle(jobTitle)}
                    />
                  </Badge>
                ))}
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveaux hiérarchiques
              </label>
              <Select onValueChange={handleAddLevel}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sélectionnez les niveaux" />
                </SelectTrigger>
                <SelectContent>
                  {managementLevels.map((level) => (
                    <SelectItem
                      key={level.value}
                      value={level.value}
                      className="cursor-pointer hover:bg-primary/5"
                    >
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Affichage des niveaux sélectionnés */}
              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch("managementLevel")?.map((level) => (
                  <Badge
                    key={level}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {managementLevels.find((l) => l.value === level)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveLevel(level)}
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
              onClick={() => router.push("/onboarding")}
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
