import React from 'react';
import { OnboardingProvider } from '../../contexts/OnboardingContext';
import "@/app/globals.css";
import { ArrowRight, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: "Onboarding - Génération de Leads",
  description: "Automatisez votre génération de leads",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <OnboardingProvider>
          <main className="min-h-screen flex">
            {/* Section gauche - Présentation */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-white">
              <div className="flex flex-col justify-between w-full max-w-lg mx-auto">
                {/* En-tête avec badge et titre */}
                <div className="space-y-8">
                  <Badge className="bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Zap className="w-3 h-3 mr-1 text-yellow-400" />
                    LeadFast.io
                  </Badge>
                  
                  <div className="space-y-6">
                    <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                      Générez des Leads Ciblés
                    </h1>
                    <p className="text-xl text-white/80">
                      Optimisez votre prospection avec notre solution intelligente
                    </p>
                  </div>

                  <div className="border-l-2 border-white/10 pl-6 text-lg text-white/70">
                    Augmentez vos conversions grâce à notre solution qui s'adapte à vos besoins.
                  </div>
                </div>

                {/* Points clés */}
                <div className="space-y-8 py-12">
                  <h2 className="text-xl font-semibold text-white/90">
                    Pourquoi nous choisir ?
                  </h2>
                  <div className="space-y-6">
                    {[
                      'Automatisation complète de votre prospection',
                      'Analyse en temps réel de vos performances',
                      'Intégration simple avec vos outils existants'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="h-10 w-10 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors flex items-center justify-center">
                          <ArrowRight className="h-5 w-5 text-yellow-400" />
                        </div>
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-sm text-white/40">
                    © 2024 LeadFast.io. Tous droits réservés.
                  </div>
                </div>
              </div>
            </div>

            {/* Section droite - Formulaire */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
              <div className="w-full">
                {children}
              </div>
            </div>
          </main>
        </OnboardingProvider>
      </body>
    </html>
  );
}
