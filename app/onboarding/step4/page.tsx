"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step4FormValues = {
  phoneNumber: string;
  preferredContact: string[];
  newsletter: boolean;
};

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Téléphone" },
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "linkedin", label: "LinkedIn" },
];

export default function Step4() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step4FormValues>({
    defaultValues: {
      phoneNumber: data.step4?.phoneNumber || "",
      preferredContact: data.step4?.preferredContact ? [data.step4.preferredContact] : [],
      newsletter: data.step4?.newsletter || false,
    },
  });

  const handleAddContact = (value: string) => {
    const currentContacts = form.getValues("preferredContact") || [];
    if (!currentContacts.includes(value)) {
      form.setValue("preferredContact", [...currentContacts, value]);
    }
  };

  const handleRemoveContact = (valueToRemove: string) => {
    const currentContacts = form.getValues("preferredContact");
    form.setValue(
      "preferredContact",
      currentContacts.filter((contact) => contact !== valueToRemove)
    );
  };

  const onSubmit = async (values: Step4FormValues) => {
    setData({ 
      step4: {
        ...values,
        preferredContact: values.preferredContact[0] as 'email' | 'phone'
      } 
    });
    router.push("/onboarding/step5");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 4 - Contact</span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Préférences de contact
          </h1>
          <p className="text-gray-600">
            Comment souhaitez-vous être contacté ?
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                className="bg-gray-50 border-gray-200"
                {...form.register("phoneNumber")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Méthodes de contact préférées
              </label>
              <Select onValueChange={handleAddContact}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sélectionnez vos préférences" />
                </SelectTrigger>
                <SelectContent>
                  {contactMethods.map((method) => (
                    <SelectItem
                      key={method.value}
                      value={method.value}
                      className="cursor-pointer hover:bg-primary/5"
                    >
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch("preferredContact")?.map((contact) => (
                  <Badge
                    key={contact}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {contactMethods.find((m) => m.value === contact)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveContact(contact)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="newsletter"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...form.register("newsletter")}
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600">
                Je souhaite recevoir la newsletter
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/onboarding/step3")}
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