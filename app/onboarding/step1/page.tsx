"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '../components/StepIndicator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types pour le formulaire
type Step1FormValues = {
  jobTitle: string;
  managementLevel: string;
};

// Niveaux hiérarchiques avec le volume de prospects disponibles
const managementLevels = [
  { value: 'owner', label: 'Propriétaire' },
  { value: 'founder', label: 'Fondateur' },
  { value: 'c_suite', label: 'Cadre dirigeant (C suite)' },
  { value: 'partner', label: 'Associé' },
  { value: 'vp', label: 'Vice-président' },
  { value: 'head', label: 'Responsable' },
  { value: 'director', label: 'Directeur' },
  { value: 'manager', label: 'Manager ' },
  { value: 'senior', label: 'Senior' },
  { value: 'entry', label: 'Débutant' },
  { value: 'intern', label: 'Stagiaire' },
];

export default function Step1() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step1FormValues>({
    defaultValues: {
      jobTitle: data.step1?.jobTitle || '',
      managementLevel: data.step1?.managementLevel || ''
    }
  });

  const onSubmit = async (values: Step1FormValues) => {
    setData({ step1: values });
    router.push('/onboarding/step2');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={1} />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Profil Cible</h1>
        <p className="text-muted-foreground">
          Définissez le profil type de vos prospects
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="block text-sm font-medium">
            Intitulé de poste précis
          </label>
          <Input
            id="jobTitle"
            placeholder="ex: Directeur Commercial, CEO, etc."
            {...form.register('jobTitle', { 
              required: 'Ce champ est requis',
              minLength: {
                value: 2,
                message: 'L\'intitulé doit contenir au moins 2 caractères'
              }
            })}
          />
          {form.formState.errors.jobTitle && (
            <span className="text-sm text-destructive">
              {form.formState.errors.jobTitle.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Niveau hiérarchique
          </label>
          <Select
            onValueChange={(value) => form.setValue('managementLevel', value)}
            defaultValue={data.step1?.managementLevel || ''}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez un niveau hiérarchique" />
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
          {form.formState.errors.managementLevel && (
            <span className="text-sm text-destructive">
              {form.formState.errors.managementLevel.message}
            </span>
          )}
        </div>

        <div className="pt-4 flex gap-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Chargement...' : 'Continuer'}
          </Button>
        </div>
      </form>

      <div className="pt-4 flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => router.push('/onboarding')}
          className="w-full"
        >
          Retour
        </Button>
      </div>
    </div>
  );
}
