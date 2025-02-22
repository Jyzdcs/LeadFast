"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:min-h-[100dvh]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center">
        <div className="max-w-2xl mx-auto w-full py-12 px-12">
          {children}
        </div>
      </div>

      {/* Right Section - Hidden on mobile */}
      <div className="hidden lg:block w-1/2 bg-black relative overflow-hidden">
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

        {/* Overlay gradient et grille */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-white/[0.02] to-transparent rounded-full blur-3xl" />
        </div>

        {/* Contenu */}
        <div className="relative h-full w-full max-w-xl mx-auto px-12 py-12 flex flex-col z-20">
          <header className="mb-24">
            <div className="flex items-center space-x-3">
              <svg
                id="Layer_2"
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100.21 108.89"
                width="32"
                height="32"
                className="relative"
              >
                <defs>
                  <style>
                    {`.cls-1 {
                      fill: white;
                      stroke-width: 0px;
                    }`}
                  </style>
                </defs>
                <g id="Layer_1-2" data-name="Layer 1">
                  <g>
                    <path
                      className="cls-1"
                      d="M53.71.72c-1.64-.96-3.66-.96-5.3,0l-25.19,14.74,49.26,28.78v58.27l25.13-14.7c1.61-.94,2.6-2.66,2.6-4.53V27.93L53.71.72Z"
                    />
                    <path
                      className="cls-1"
                      d="M23.27,30.91L0,44.28l36.57,21.36v43.25l23.22-13.35c1.19-.7,1.93-1.98,1.93-3.36v-41.08L27.2,30.91c-1.21-.71-2.72-.71-3.93,0Z"
                    />
                    <polygon
                      className="cls-1"
                      points="25.5 100.82 25.5 71.64 .56 86.23 25.5 100.82"
                    />
                  </g>
                </g>
              </svg>
              <div className="text-base font-medium text-white">
                LeadFast<span className="text-white/70">.io</span>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-white/[0.05] text-white/70 border-white/[0.05] gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                Plateforme en ligne
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-light text-white leading-[1.1] tracking-tight">
                Générez vos leads{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">
                  automatiquement
                </span>
              </h1>
              <p className="text-lg text-white/70 max-w-xl font-light">
                Transformez votre prospection avec notre solution
                intelligente. Plus de temps perdu en recherches manuelles.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <Card className="p-6 bg-white/[0.03] border-white/[0.05]">
                <div className="text-4xl font-light text-white mb-2">1K+</div>
                <span className="text-sm text-white/50">
                  Prospects qualifiés par mois
                </span>
              </Card>

              <Card className="p-6 bg-white/[0.03] border-white/[0.05]">
                <div className="text-4xl font-light text-white mb-2">7j</div>
                <span className="text-sm text-white/50">
                  D'essai gratuit sans engagement
                </span>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}