"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { StepIndicator } from "../components/StepIndicator";
import { Badge } from "@/components/ui/badge";

type Step3FormValues = {
  company: string;
  expertise: Array<string>;
};

export default function Step3() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  console.log(data);
  // Initialisation du formulaire avec les données existantes
  const form = useForm<Step3FormValues>({
    defaultValues: data.step3 || {},
  });

  // Gestionnaire pour ajouter une compétence
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = form.getValues("expertise") || [];
      form.setValue("expertise", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  // Gestionnaire pour ajouter un intérêt
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      const currentInterests = form.getValues("expertise") || [];
      form.setValue("expertise", [...currentInterests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  // Gestionnaire pour supprimer une compétence
  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("expertise");
    form.setValue(
      "expertise",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  // Gestionnaire pour supprimer un intérêt
  const handleRemoveInterest = (interestToRemove: string) => {
    const currentInterests = form.getValues("expertise");
    form.setValue(
      "expertise",
      currentInterests.filter((interest) => interest !== interestToRemove)
    );
  };

  const onSubmit = async (values: Step3FormValues) => {
    setData({ step3: values });
    router.push("/onboarding/step4");
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={3} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Entreprise spécifique</h1>
        <p className="text-muted-foreground">
          Parlez-nous de votre parcours professionnel
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Champ Entreprise */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium">
            Nom de l'entreprise
          </label>
          <Input
            id="company"
            placeholder="Ex : Google, Apple, ..."
            {...form.register("company")}
          />
        </div>

        {/* Section Mots clés de domaine d'expertise */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Mots clés de domaine d'expertise
          </label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Ex : saas, e-commerce, ..."
            />
            <Button type="button" onClick={handleAddSkill}>
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.watch("expertise")?.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/onboarding/step2")}
            className="w-full"
          >
            Retour
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Chargement..." : "Continuer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
