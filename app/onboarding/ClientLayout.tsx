"use client";

import React from 'react';
import { ChartBar } from 'lucide-react';

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      {/* Section formulaire (Light Mode) */}
      <div className="w-[65%] bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="max-w-3xl mx-auto py-12 px-10">
          {children}
        </div>
      </div>

      {/* Section présentation (Dark Mode) */}
      <div className="w-[35%] fixed right-8 min-h-[calc(100vh-4rem)]">
        <div className="relative w-full h-[calc(100vh-4rem)] bg-black rounded-3xl overflow-hidden shadow-lg">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
              poster="/video-poster.jpg"
            >
              <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/75" />
          </div>

          {/* Contenu */}
          <div className="relative z-10 h-full flex flex-col p-12">
            <div className="pt-8 flex items-center gap-2 opacity-80">
              <ChartBar className="w-5 h-5 text-white" />
              <span className="text-sm text-white/80 font-medium tracking-wide">
                LeadFast.io
              </span>
            </div>

            <div className="flex-1 flex flex-col items-start justify-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-white/70 tracking-wide uppercase">
                  Plateforme en ligne
                </span>
              </div>

              <h1 className="text-4xl leading-tight font-semibold text-white">
                Générez vos leads<br />automatiquement
              </h1>

              <p className="text-base text-white/60 leading-relaxed max-w-md">
                Transformez votre prospection avec notre solution intelligente. 
                Plus de temps perdu en recherche manuelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 