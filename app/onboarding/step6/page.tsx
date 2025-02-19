"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepIndicator } from '../components/StepIndicator';

type Step6FormValues = {
  username: string;
  timezone: string;
  language: string;
};

// Liste des fuseaux horaires les plus courants en France
const TIMEZONES = [
  { value: 'Europe/Paris', label: 'Paris (UTC+1/+2)' },
  { value: 'Europe/London', label: 'Londres (UTC+0/+1)' },
  { value: 'America/New_York', label: 'New York (UTC-5/-4)' },
];

// Langues disponibles
const LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

export default function Step6() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step6FormValues>({
    defaultValues: data.step6 || {
      timezone: 'Europe/Paris',
      language: 'fr'
    },
  });

  const onSubmit = async (values: Step6FormValues) => {
    setData({ step6: values });
    // Redirection vers la page submitted dans le dossier onboarding
    router.push('/onboarding/submitted');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={6} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Configuration du Compte</h1>
        <p className="text-muted-foreground">
          Dernières configurations avant de commencer
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Nom d'utilisateur */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Nom d'utilisateur
          </label>
          <Input
            id="username"
            placeholder="votre_nom"
            {...form.register('username', {
              required: 'Ce champ est requis',
              pattern: {
                value: /^[a-zA-Z0-9_-]{3,16}$/,
                message: "Le nom d'utilisateur doit contenir entre 3 et 16 caractères (lettres, chiffres, - et _)"
              }
            })}
          />
          {form.formState.errors.username && (
            <span className="text-sm text-destructive">
              {form.formState.errors.username.message}
            </span>
          )}
        </div>

        {/* Fuseau horaire */}
        <div className="space-y-2">
          <label htmlFor="timezone" className="block text-sm font-medium">
            Fuseau horaire
          </label>
          <Select
            onValueChange={(value) => form.setValue('timezone', value)}
            defaultValue={form.getValues('timezone')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre fuseau horaire" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((timezone) => (
                <SelectItem key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Langue */}
        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-medium">
            Langue
          </label>
          <Select
            onValueChange={(value) => form.setValue('language', value)}
            defaultValue={form.getValues('language')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre langue" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/onboarding/step5')}
            className="w-full"
          >
            Retour
          </Button>
          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Chargement...' : 'Terminer'}
          </Button>
        </div>
      </form>
    </div>
  );
} 