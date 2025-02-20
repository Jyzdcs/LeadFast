"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle2 } from 'lucide-react'; // Icône de confirmation

export default function SubmittedPage() {
  const router = useRouter();
  const { data } = useOnboarding();

  // Récupération du nom pour personnaliser le message
  const userName = data.step1?.jobTitle || data.step6?.username || 'utilisateur';

  return (
    <div className="space-y-8 text-center">
      {/* Icône de succès */}
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>

      {/* Message de confirmation */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Merci pour votre confiance !!</h1>
        <p className="text-muted-foreground">
          Nous avons bien reçu vos criteres de recherche. Notre equipe va commencer a generer vos leads qualifies.
        </p>
      </div>

	  	<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/rounded-full">
				<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
				<span className="text-xs text-black tracking-wide uppercase">
					Configuration terminée
				</span>
			</div>
      {/* Boutons d'action */}
      <div className="flex flex-col gap-4 items-center">
        <Button 
          variant="outline"
          onClick={() => router.push('/onboarding')}
          className="w-full max-w-xs"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
} 