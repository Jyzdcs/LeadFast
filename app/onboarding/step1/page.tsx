"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { StepIndicator } from "@/components/ui/step-indicator";
import { ProfileCard } from "@/components/ui/profile-card";
import { EnvelopeIcon, BuildingOfficeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// Types pour le formulaire
type Step6FormValues = {
  emailType: string[];
  emailStatus: string[];
};

// Options pour les types d'email
const emailTypes = [
  { value: "professional", label: "Email professionnel", icon: <BuildingOfficeIcon className="w-4 h-4" />, description: "Email d'entreprise" },
  { value: "personal", label: "Email personnel", icon: <EnvelopeIcon className="w-4 h-4" />, description: "Email personnel" },
];

// Options pour les statuts d'email
const emailStatuses = [
  { value: "verified", label: "Email vérifié", description: "Email confirmé" },
  { value: "unverified", label: "Non vérifié", description: "Email non confirmé" },
  { value: "disposable", label: "Email jetable", description: "Email temporaire" },
];

export default function Step6() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

	console.log(data);
  const form = useForm<Step6FormValues>({
    defaultValues: {
      emailType: data.step6?.emailType || [],
      emailStatus: data.step6?.emailStatus || [],
    },
  });

  // Gestion du type d'email
  const handleEmailTypeClick = (value: string) => {
    const currentTypes = form.getValues("emailType") || [];
    let newTypes: string[];

    if (currentTypes.includes(value)) {
      newTypes = currentTypes.filter((t) => t !== value);
    } else {
      newTypes = [...currentTypes, value];
    }

    form.setValue("emailType", newTypes);
    // Mise à jour immédiate du contexte
    setData({
      ...data,
      step6: {
        ...form.getValues(),
        emailType: newTypes,
      },
    });
  };

  // Gestion du statut d'email
  const handleEmailStatusClick = (value: string) => {
    const newStatus = [value]; // Un seul statut à la fois
    form.setValue("emailStatus", newStatus);
    // Mise à jour immédiate du contexte
    setData({
      ...data,
      step6: {
        ...form.getValues(),
        emailStatus: newStatus,
      },
    });
  };

  const onSubmit = async (values: Step6FormValues) => {
    setData({ 
      ...data,
      step6: values 
    });
    router.push("/onboarding/step2");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <StepIndicator step={1} label="Préférences de contact" />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* Type d'email */}
            <div>
              <label className="block text-l font-medium text-gray-700 mb-4">
                Type d'email
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailTypes.map((type) => (
                  <ProfileCard
                    key={type.value}
                    title={type.label}
                    description={type.description}
                    icon={type.icon}
                    // selected={form.watch("emailType")?.includes(type.value)}
                    onClick={() => handleEmailTypeClick(type.value)}
                    showArrow={false}
                    className={cn(
                      "transition-colors duration-200",
                      form.watch("emailType")?.includes(type.value) 
                        ? "ring-2 ring-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Status de l'email */}
            <div>
              <label className="block text-l font-medium text-gray-700 mb-4">
                Status de l'email
              </label>
              <div className="grid grid-cols-1 gap-4">
                {emailStatuses.map((status) => (
                  <ProfileCard
                    key={status.value}
                    title={status.label}
                    description={status.description}
                    icon={<EnvelopeIcon className="w-4 h-4" />}
                    // selected={form.watch("emailStatus")?.includes(status.value)}
                    onClick={() => handleEmailStatusClick(status.value)}
                    showArrow={true}
                    className={cn(
                      "transition-colors duration-200",
                      form.watch("emailStatus")?.includes(status.value) 
                        ? "ring-2 ring-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

					<div className="flex gap-6 mt-auto pt-8 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step5")}
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
