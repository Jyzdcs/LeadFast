"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepIndicator } from '../components/StepIndicator';

// Types pour le formulaire
type Step2FormValues = {
  activitySector: string;
  companySize: string;
};

// Liste des tailles d'entreprise avec leurs volumes de prospects
const employeeRanges = [
	{ value: '1-10', label: '1-10 employés' },
	{ value: '11-20', label: '11-20 employés' },
	{ value: '21-50', label: '21-50 employés' },
	{ value: '51-100', label: '51-100 employés' },
	{ value: '101-200', label: '101-200 employés' },
	{ value: '201-500', label: '201-500 employés' },
	{ value: '501-1000', label: '501-1000 employés' },
	{ value: '1001-2000', label: '1001-2000 employés' },
	{ value: '2001-5000', label: '2001-5000 employés' },
	{ value: '5001-10000', label: '5001-10000 employés' },
	{ value: '10001+', label: '10001+ employés' },
];

export default function Step2() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  // Initialisation du formulaire avec React Hook Form
  const form = useForm<Step2FormValues>({
    defaultValues: {
      activitySector: data.step2?.activitySector || '',
      companySize: data.step2?.companySize || ''
    }
  });

  // Soumission du formulaire
  const onSubmit = async (values: Step2FormValues) => {
    setData({ step2: values });
    router.push('/onboarding/step3');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={2} />
      
      {/* En-tête de la page */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Entreprise cible</h1>
        <p className="text-muted-foreground">
          Définissez le secteur d'activité et la taille de l'entreprise de vos prospects
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Champ secteur d'activité */}
        <div className="space-y-2">
          <label htmlFor="activitySector" className="block text-sm font-medium">
            Secteur d'activité
          </label>
          <Input
            id="activitySector"
            placeholder="ex: Tech, Finance, Santé..."
            {...form.register('activitySector', { 
              required: 'Ce champ est requis',
              minLength: {
                value: 2,
                message: 'Le secteur doit contenir au moins 2 caractères'
              }
            })}
          />
          {form.formState.errors.activitySector && (
            <span className="text-sm text-destructive">
              {form.formState.errors.activitySector.message}
            </span>
          )}
        </div>

        {/* Select pour la taille d'entreprise */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Taille de l'entreprise
          </label>
          <Select
            onValueChange={(value) => form.setValue('companySize', value)}
            defaultValue={data.step2?.companySize}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez une taille d'entreprise" />
            </SelectTrigger>
            <SelectContent>
              {employeeRanges.map((range) => (
                <SelectItem 
                  key={range.value} 
                  value={range.value}
                  className="cursor-pointer hover:bg-primary/5"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.companySize && (
            <span className="text-sm text-destructive">
              {form.formState.errors.companySize.message}
            </span>
          )}
        </div>

        {/* Boutons de navigation */}
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/onboarding/step1')}
            className="w-full"
          >
            Retour
          </Button>
          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Chargement...' : 'Continuer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
