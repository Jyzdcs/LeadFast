"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { StepIndicator } from "@/components/ui/step-indicator";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
/**
 * Interface pour les données du formulaire Step1
 */
interface Step1FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // On le rend requis pour éviter les problèmes de type
}

/**
 * Composant Step1 - Collecte des informations personnelles
 * Premier step du processus d'onboarding
 */
export default function Step1() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  // Styles
  const inputClassName = "bg-gray-50 border-gray-200 w-full";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-2";

  const [errors, setErrors] = React.useState<Partial<Step1FormValues>>({});

  const form = useForm<Step1FormValues>({
    defaultValues: {
      firstName: data.step1?.firstName || "",
      lastName: data.step1?.lastName || "",
      email: data.step1?.email || "",
      phoneNumber: data.step1?.phoneNumber || ""
    }
  });

  const validateForm = (values: Step1FormValues) => {
    const newErrors: Partial<Step1FormValues> = {};
    
    if (!values.firstName?.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!values.lastName?.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    
    if (!values.email?.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      newErrors.email = "Format d'email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (values: Step1FormValues) => {
    if (validateForm(values)) {
      setData({ step1: values });
      router.push("/onboarding/step2");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <StepIndicator step={1} label="Informations personnelles" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 max-w-xl">
            <div className="grid grid-cols-2 gap-6">
              {/* Champ Prénom */}
              <div>
                <label htmlFor="firstName" className={labelClassName}>
                  Prénom <span className="text-red-500">*</span>
                </label>
                <Input
                  icon={<UserIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
                  id="firstName"
                  placeholder="John"
                  className={inputClassName}
                  defaultValue={data.step1?.firstName}
                  onChange={(e) => {
                    form.setValue("firstName", e.target.value);
                    if (errors.firstName) {
                      setErrors({ ...errors, firstName: undefined });
                    }
                  }}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              {/* Champ Nom */}
              <div>
                <label htmlFor="lastName" className={labelClassName}>
                  Nom <span className="text-red-500">*</span>
                </label>
                <Input
                  icon={<UserIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
                  id="lastName"
                  placeholder="Doe"
                  className={inputClassName}
                  defaultValue={data.step1?.lastName}
                  onChange={(e) => {
                    form.setValue("lastName", e.target.value);
                    if (errors.lastName) {
                      setErrors({ ...errors, lastName: undefined });
                    }
                  }}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Champ Email */}
            <div className="w-full">
              <label htmlFor="email" className={labelClassName}>
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                icon={<EnvelopeIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className={inputClassName}
                defaultValue={data.step1?.email}
                onChange={(e) => {
                  form.setValue("email", e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Champ Téléphone */}
            <div className="w-full">
              <label htmlFor="phoneNumber" className={labelClassName}>
                Numéro de téléphone (optionnel)
              </label>
              <Input
                icon={<PhoneIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
                id="phoneNumber"
                type="tel"
                placeholder="+33 6 XX XX XX XX"
                className={inputClassName}
                defaultValue={data.step1?.phoneNumber}
                onChange={(e) => {
                  form.setValue("phoneNumber", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding")}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 h-12"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900 h-12"
            >
              Continuer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
