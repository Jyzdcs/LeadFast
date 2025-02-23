"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:min-h-[100dvh] bg-zinc-50">
      {/* Left Section - Form */}
      <div className="w-full lg:w-2/3 items-center md:flex">
	  <nav className="md:hidden w-full bg-black px-4 py-2">
		<div className="flex items-center space-x-3">
			<svg
				id="Layer_2"
				data-name="Layer 2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100.21 108.89"
				width="28"
				height="28"
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
		</nav>
        <div className="mx-auto w-full pt-6 px-12">
          {children}
        </div>
      </div>

      {/* Right Section - Card Design */}
      <div className="hidden lg:flex lg:w-2/4 p-8">
        <Card className="w-full bg-black rounded-3xl overflow-hidden relative">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/background-v2.mp4" type="video/mp4" />
          </video>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full w-full p-8 flex flex-col z-20">
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
                <h1 className="text-4xl font-light text-white leading-[1.1] tracking-tight">
                  Générez vos leads{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">
                    automatiquement
                  </span>
                </h1>
                <p className="text-base text-white/70 max-w-xl font-light">
                  Transformez votre prospection avec notre solution
                  intelligente. Plus de temps perdu en recherches manuelles.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-white/[0.03] border-white/[0.05]">
                  <div className="text-3xl font-light text-white mb-1">1K+</div>
                  <span className="text-sm text-white/50">
                    Prospects qualifiés
                  </span>
                </Card>

                <Card className="p-4 bg-white/[0.03] border-white/[0.05]">
                  <div className="text-3xl font-light text-white mb-1">7j</div>
                  <span className="text-sm text-white/50">
                    Essai gratuit
                  </span>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}