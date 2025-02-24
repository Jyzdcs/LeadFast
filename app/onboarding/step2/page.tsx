"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X, UserIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { KeywordInput } from "@/components/ui/keyword-input";
import { StepIndicator } from "@/components/ui/step-indicator";
import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "@/components/ui/stepper"
import { PatternCard, PatternCardBody } from "@/components/ui/card-with-ellipsis-pattern";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

// Constants
const steps = ["1", "2", "3", "4", "5", "6"];
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

// Types
type Step2FormValues = {
  jobTitle: string[];
  managementLevel: string[];
};

export default function Step2() {
  // Hooks
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = React.useState("");

  const form = useForm<Step2FormValues>({
    defaultValues: {
      jobTitle: data.step2?.jobTitle || [],
      managementLevel: data.step2?.managementLevel || [],
    },
  });

  // Event Handlers
  const handleSubmit = async (values: Step2FormValues) => {
    setData({ ...data, step2: values });
    router.push("/onboarding/step3");
  };

  const handleRemoveLevel = (valueToRemove: string) => {
    const currentLevels = form.getValues("managementLevel");
    form.setValue(
      "managementLevel",
      currentLevels.filter((level) => level !== valueToRemove)
    );
  };

  // Effects
  React.useEffect(() => {
    if (selectedLevel) {
      const currentLevels = form.getValues("managementLevel") || [];
      if (!currentLevels.includes(selectedLevel)) {
        form.setValue("managementLevel", [...currentLevels, selectedLevel]);
      }
      setSelectedLevel("");
    }
  }, [selectedLevel, form]);

  return (
    <div className="flex flex-col h-screen w-[85%]">
      {/* Header Section */}
      <div className="w-full border-b border-zinc-100">
        <div className="w-full px-6 py-3">
          <div className="flex flex-col gap-2">
            <StepIndicator 
              step={2} 
              label="Profil Recherché" 
              className="text-base font-medium text-zinc-900"
            />
            <Stepper value={2} className="w-full gap-1">
              {steps.map((step) => (
                <StepperItem key={step} step={Number(step)} className="flex-1">
                  <StepperTrigger className="w-full" asChild>
                    <StepperIndicator 
                      asChild 
                      className="relative h-1 w-full rounded-full bg-zinc-100 overflow-hidden"
                    >
                      <div>
                        <div className="absolute inset-0 bg-black opacity-0 data-[active=true]:opacity-100 transition-opacity duration-300" />
                        <span className="sr-only">{step}</span>
                      </div>
                    </StepperIndicator>
                  </StepperTrigger>
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 flex flex-col h-full">
        {/* Form Section */}
        <div className="space-y-4">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Job Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                Intitulé de poste précis
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                        <InfoIcon className="h-4 w-4 text-zinc-500" />
                        <span className="sr-only">Plus d'informations sur les intitulés de poste</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      sideOffset={8}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Intitulé de poste</p>
                        <p className="text-zinc-300">Indiquez les intitulés exacts des postes ciblés pour une recherche ultra-précise</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                placeholder="Ex : Développeur, Directeur, marketing, CEO..."
                helperText="Appuyez sur Entrée pour ajouter un mot-clé"
                className="w-full"
              />
            </div>

            {/* Management Level Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                Niveaux hiérarchiques
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                        <InfoIcon className="h-4 w-4 text-zinc-500" />
                        <span className="sr-only">Plus d'informations sur les niveaux hiérarchiques</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      sideOffset={8}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Niveaux hiérarchiques</p>
                        <p className="text-zinc-300">Pour maximiser l'impact, ciblez Senior, Lead, Manager, Directeur, VP et C-Level selon vos besoins en prospection</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                icon={<UserIcon className="w-4 h-4 text-zinc-500" />}
                className="w-full"
              />
              <div className="flex flex-wrap gap-2">
                {form.watch("managementLevel")?.map((level) => (
                  <Badge
                    key={level}
                    variant="secondary"
                    className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
                  >
                    {managementLevels.find((l) => l.value === level)?.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveLevel(level)}
                      className="focus:outline-none group"
                    >
                      <X className="h-3 w-3 text-zinc-500 group-hover:text-zinc-700" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Feature Section */}
        <div className="flex-1 relative mt-4 min-h-0">
          <FeaturesSectionWithHoverEffects />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between py-4 border-t border-zinc-100 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/onboarding/step1")}
            className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9"
          >
            Retour
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            className="bg-black hover:bg-black/90 text-white h-9 px-6"
          >
            Continuer
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
