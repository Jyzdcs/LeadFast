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
        <h1 className="text-3xl font-bold">Félicitations {userName} !</h1>
        <p className="text-muted-foreground text-lg">
          Votre inscription a été complétée avec succès.
        </p>
        <p className="text-muted-foreground">
          Nous avons bien reçu vos informations et nous vous contacterons bientôt.
        </p>
      </div>

      {/* Résumé des étapes complétées */}
      <div className="bg-muted/50 p-6 rounded-lg max-w-md mx-auto">
        <h2 className="font-semibold mb-4">Ce que vous avez accompli :</h2>
        <ul className="space-y-2 text-left list-none">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Création de votre profil</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Configuration de vos préférences</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Personnalisation de votre compte</span>
          </li>
        </ul>
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