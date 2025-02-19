"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { StepIndicator } from '../components/StepIndicator';
type Step4FormValues = {
  phoneNumber: string;
  preferredContact: 'email' | 'phone';
  newsletter: boolean;
};

export default function Step4() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step4FormValues>({
    defaultValues: data.step4 || {
      newsletter: false, // Valeur par défaut pour la newsletter
      preferredContact: 'email' // Valeur par défaut pour le mode de contact
    },
  });

  const onSubmit = async (values: Step4FormValues) => {
    setData({ step4: values });
    router.push('/onboarding/step5');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={4} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Préférences de Contact</h1>
        <p className="text-muted-foreground">
          Comment souhaitez-vous que nous communiquions avec vous ?
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Numéro de téléphone */}
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Numéro de téléphone
          </label>
          <Input
            id="phoneNumber"
            placeholder="+33 6 12 34 56 78"
            {...form.register('phoneNumber', {
              required: 'Ce champ est requis',
              pattern: {
                value: /^(\+33|0)[1-9](\d{2}){4}$/,
                message: 'Numéro de téléphone invalide'
              }
            })}
          />
          {form.formState.errors.phoneNumber && (
            <span className="text-sm text-destructive">
              {form.formState.errors.phoneNumber.message}
            </span>
          )}
        </div>

        {/* Mode de contact préféré */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Mode de contact préféré
          </label>
          <RadioGroup
            onValueChange={(value) => form.setValue('preferredContact', value as 'email' | 'phone')}
            defaultValue={form.getValues('preferredContact')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone">Téléphone</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Newsletter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={form.watch('newsletter')}
            onCheckedChange={(checked) => form.setValue('newsletter', checked as boolean)}
          />
          <label
            htmlFor="newsletter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Je souhaite recevoir la newsletter
          </label>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/onboarding/step3')}
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