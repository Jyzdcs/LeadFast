"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { StepIndicator } from '../components/StepIndicator';

// Type pour le formulaire correspondant au modèle de données
type Step5FormValues = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
};

export default function Step5() {
	const { data, setData } = useOnboarding();
	const router = useRouter();

	// Initialisation du formulaire avec React Hook Form
	const form = useForm<Step5FormValues>({
		defaultValues: data.step5 || {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: ''
		},
	});

	// Soumission du formulaire avec validation
	const onSubmit = async (values: Step5FormValues) => {
		setData({ step5: values });
		router.push('/onboarding/step6');
	};

	// Redirection vers le formulaire de demande sur mesure
	const handleCustomRequest = () => {
		router.push('/custom-request');
	};

	return (
		<div className="space-y-6">
			<StepIndicator currentStep={5} />
			
			{/* En-tête de la section */}
			<div className="space-y-2">
				<h1 className="text-2xl font-bold">Informations personnelles</h1>
			</div>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Nom */}
				<div className="space-y-2">
					<label htmlFor="lastName" className="block text-sm font-medium">
						Nom
					</label>
					<Input
						id="lastName"
						placeholder="Votre nom"
						{...form.register('lastName', { 
							required: 'Le nom est requis',
							minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
						})}
					/>
					{form.formState.errors.lastName && (
						<span className="text-sm text-destructive">
							{form.formState.errors.lastName.message}
						</span>
					)}
				</div>

				{/* Prénom */}
				<div className="space-y-2">
					<label htmlFor="firstName" className="block text-sm font-medium">
						Prénom
					</label>
					<Input
						id="firstName"
						placeholder="Votre prénom"
						{...form.register('firstName', { 
							required: 'Le prénom est requis',
							minLength: { value: 2, message: 'Le prénom doit contenir au moins 2 caractères' }
						})}
					/>
					{form.formState.errors.firstName && (
						<span className="text-sm text-destructive">
							{form.formState.errors.firstName.message}
						</span>
					)}
				</div>

				{/* Email */}
				<div className="space-y-2">
					<label htmlFor="email" className="block text-sm font-medium">
						Email professionnel
					</label>
					<Input
						id="email"
						type="email"
						placeholder="votre@email.com"
						{...form.register('email', { 
							required: 'L\'email est requis',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Adresse email invalide'
							}
						})}
					/>
					{form.formState.errors.email && (
						<span className="text-sm text-destructive">
							{form.formState.errors.email.message}
						</span>
					)}
				</div>

				{/* Téléphone */}
				<div className="space-y-2">
					<label htmlFor="phoneNumber" className="block text-sm font-medium">
						Téléphone
					</label>
					<Input
						id="phoneNumber"
						placeholder="+33 6 XX XX XX XX"
						{...form.register('phoneNumber', { 
							required: 'Le numéro de téléphone est requis',
							pattern: {
								value: /^(\+33|0)[1-9](\d{2}){4}$/,
								message: 'Format de numéro invalide'
							}
						})}
					/>
					{form.formState.errors.phoneNumber && (
						<span className="text-sm text-destructive">
							{form.formState.errors.phoneNumber.message}
						</span>
					)}
				</div>

				{/* Boutons de navigation */}
				<div className="flex flex-col gap-4 pt-4">
					<div className="flex gap-4">
						<Button 
							type="button" 
							variant="outline"
							onClick={() => router.push('/onboarding/step4')}
							className="w-full"
						>
							Faire une demande sur mesure
						</Button>
						<Button 
							type="submit" 
							className="w-full"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? 'Chargement...' : 'Continuer'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
} 