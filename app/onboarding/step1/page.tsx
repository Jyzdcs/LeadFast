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

// Types pour le formulaire
type Step1FormValues = {
  jobTitle: string;
  managementLevel: string;
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
  { value: "manager", label: "Manager " },
  { value: "senior", label: "Senior" },
  { value: "entry", label: "Débutant" },
  { value: "intern", label: "Stagiaire" },
];

export default function Step1() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step1FormValues>({
    defaultValues: {
      jobTitle: data.step1?.jobTitle || "",
      managementLevel: data.step1?.managementLevel || "",
    },
  });

  const onSubmit = async (values: Step1FormValues) => {
    setData({ step1: values });
    router.push("/onboarding/step2");
  };

  return (
    <div className="space-y-8">
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Intitulé de poste précis
            </label>
            <Input
              id="jobTitle"
              placeholder="ex: Directeur Commercial, CEO, etc."
              className="mt-1 bg-gray-50 border-gray-200 focus:ring-[#84cc16] focus:border-[#84cc16]"
              {...form.register("jobTitle")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Niveau hiérarchique
            </label>
            <Select
              onValueChange={(value) => form.setValue("managementLevel", value)}
              defaultValue={data.step1?.managementLevel || ""}
            >
              <SelectTrigger className="mt-1 bg-gray-50 border-gray-200">
                <SelectValue placeholder="Sélectionnez un niveau hiérarchique" />
              </SelectTrigger>
              <SelectContent>
                {managementLevels.map((level) => (
                  <SelectItem
                    key={level.value}
                    value={level.value}
                    className="text-gray-700"
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <Button
            type="submit"
            className="bg-[#111] hover:bg-gray-900 text-white py-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Chargement..." : "Continuer"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/onboarding")}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Retour
          </Button>
        </div>
      </form>
    </div>
  );
}
