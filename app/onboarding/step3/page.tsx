"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepIndicator } from '../components/StepIndicator';
import { Badge } from '@/components/ui/badge';

type Step3FormValues = {
	company: string;
	position: string;
	experience: string;
};

export default function Step3() {
	const { data, setData } = useOnboarding();
	const router = useRouter();

	// Initialisation du formulaire avec les données existantes
	const form = useForm<Step3FormValues>({
		defaultValues: data.step3 || {},
	});

	const onSubmit = async (values: Step3FormValues) => {
		setData({ step3: values });
		router.push('/onboarding/step4');
	};

	return (
		<div className="space-y-6">
			<StepIndicator currentStep={3} />
			<div className="space-y-2">
				<h1 className="text-2xl font-bold">Expérience Professionnelle</h1>
				<p className="text-muted-foreground">
					Parlez-nous de votre parcours professionnel
				</p>
			</div>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Champ Entreprise */}
				<div className="space-y-2">
					<label htmlFor="company" className="block text-sm font-medium">
						Entreprise actuelle
					</label>
					<Input
						id="company"
						placeholder="Nom de l'entreprise"
						{...form.register('company', { required: 'Ce champ est requis' })}
					/>
					{form.formState.errors.company && (
						<span className="text-sm text-destructive">{form.formState.errors.company.message}</span>
					)}
				</div>

				{/* Champ Position */}
				<div className="space-y-2">
					<label htmlFor="position" className="block text-sm font-medium">
						Poste actuel
					</label>
					<Input
						id="position"
						placeholder="Votre poste"
						{...form.register('position', { required: 'Ce champ est requis' })}
					/>
					{form.formState.errors.position && (
						<span className="text-sm text-destructive">{form.formState.errors.position.message}</span>
					)}
				</div>

				{/* Champ Expérience */}
				<div className="space-y-2">
					<label htmlFor="experience" className="block text-sm font-medium">
						Années d'expérience
					</label>
					<Input
						id="experience"
						type="number"
						placeholder="Nombre d'années"
						{...form.register('experience', { 
							required: 'Ce champ est requis',
							min: { value: 0, message: 'La valeur doit être positive' }
						})}
					/>
					{form.formState.errors.experience && (
						<span className="text-sm text-destructive">{form.formState.errors.experience.message}</span>
					)}
				</div>

				{/* Boutons de navigation */}
				<div className="flex gap-4 pt-4">
					<Button 
						type="button" 
						variant="outline"
						onClick={() => router.push('/onboarding/step2')}
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
