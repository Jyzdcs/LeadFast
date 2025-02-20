"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

type Step5FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function Step5() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step5FormValues>({
    defaultValues: {
      firstName: data.step5?.firstName || "",
      lastName: data.step5?.lastName || "",
      email: data.step5?.email || "",
      phoneNumber: data.step5?.phoneNumber || "",
    },
  });

  const onSubmit = async (values: Step5FormValues) => {
    setData({ step5: values });
    router.push("/onboarding/submitted");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 5 - Confirmation</span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Vos informations
          </h1>
          <p className="text-gray-600">
            Pour finaliser votre inscription, merci de renseigner vos
            informations
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prénom
                </label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-gray-50 border-gray-200"
                  {...form.register("firstName", {
                    required: "Le prénom est requis",
                  })}
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nom
                </label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-gray-50 border-gray-200"
                  {...form.register("lastName", {
                    required: "Le nom est requis",
                  })}
                />
                {form.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email professionnel
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@entreprise.com"
                className="bg-gray-50 border-gray-200"
                {...form.register("email", {
                  required: "L'email est requis",
                })}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Numéro de téléphone
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+33 6 XX XX XX XX"
                className="bg-gray-50 border-gray-200"
                {...form.register("phoneNumber")}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step4")}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Chargement..." : "Terminer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
