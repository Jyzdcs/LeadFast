"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StepIndicator } from '../components/StepIndicator';
type Step5FormValues = {
  skills: string[];
  interests: string[];
};

export default function Step5() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [skillInput, setSkillInput] = React.useState('');
  const [interestInput, setInterestInput] = React.useState('');

  const form = useForm<Step5FormValues>({
    defaultValues: data.step5 || {
      skills: [],
      interests: []
    },
  });

  // Gestionnaire pour ajouter une compétence
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = form.getValues('skills') || [];
      form.setValue('skills', [...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Gestionnaire pour ajouter un intérêt
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      const currentInterests = form.getValues('interests') || [];
      form.setValue('interests', [...currentInterests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  // Gestionnaire pour supprimer une compétence
  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills');
    form.setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  // Gestionnaire pour supprimer un intérêt
  const handleRemoveInterest = (interestToRemove: string) => {
    const currentInterests = form.getValues('interests');
    form.setValue('interests', currentInterests.filter(interest => interest !== interestToRemove));
  };

  const onSubmit = async (values: Step5FormValues) => {
    setData({ step5: values });
    router.push('/onboarding/step6');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={5} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Compétences et Intérêts</h1>
        <p className="text-muted-foreground">
          Parlez-nous de vos compétences et centres d'intérêt
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section Compétences */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Compétences
          </label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Ajouter une compétence"
            />
            <Button type="button" onClick={handleAddSkill}>
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.watch('skills')?.map((skill) => (
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

        {/* Section Intérêts */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Centres d'intérêt
          </label>
          <div className="flex gap-2">
            <Input
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              placeholder="Ajouter un centre d'intérêt"
            />
            <Button type="button" onClick={handleAddInterest}>
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.watch('interests')?.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveInterest(interest)}
              >
                {interest} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/onboarding/step4')}
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