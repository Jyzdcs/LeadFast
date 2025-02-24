"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverButton } from "@/components/ui/hover-button";
import {
  ArrowRightIcon,
  MailIcon,
  Rocket,
  Sparkle,
  Zap,
  Star,
} from "lucide-react";
import { LinkedinIcon } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { TvIcon } from "lucide-react";
import TreeCards from "@/components/ui/tree-cards";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:min-h-[100dvh] bg-zinc-50 font-['Arial, Helvetica, sans-serif']">
      {/* Left Section - Form */}
      <div className="w-full lg:w-2/3 flex flex-col">
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
            <div className="text-base font-medium text-white font-['Arial,_Helvetica']">
              LeadFast<span className="text-white/70">.io</span>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Right Section - Brand Card */}
      <div className="hidden lg:flex lg:w-2/4 p-6">
        <div className="relative w-full rounded-2xl shadow-lg overflow-hidden">
          {/* Background with image and overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/background-V2.jpg)" }}
            />
            {/* Overlay gradients pour une meilleure lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/80 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
            {/* Grille décorative */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          </div>

          {/* Content */}
          <div className="relative h-full w-full p-8 flex flex-col">
            {/* Header */}
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
              <div className="text-base font-medium text-white font-['Arial']">
                LeadFast<span className="text-white/70">.io</span>
              </div>
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col justify-center max-w-xl">
              <div className="space-y-6">
                {/* Badge */}
                <div className="space-y-3">
                  <div className="inline-flex items-center rounded-full border border-zinc-700/50 p-1 shadow-sm backdrop-blur-sm bg-black/20">
                    <div className="flex -space-x-1.5">
                      <img
                        className="ring-background rounded-full ring-1"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        width={20}
                        height={20}
                        alt="Avatar 01"
                      />
                      <img
                        className="ring-background rounded-full ring-1"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                        width={20}
                        height={20}
                        alt="Avatar 02"
                      />
                      <img
                        className="ring-background rounded-full ring-1"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
                        width={20}
                        height={20}
                        alt="Avatar 03"
                      />
                      <img
                        className="ring-background rounded-full ring-1"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max"
                        width={20}
                        height={20}
                        alt="Avatar 04"
                      />
                    </div>
                    <p className="text-zinc-400 px-2 text-xs">
                      Trusted by{" "}
                      <strong className="text-white font-medium">60K+</strong>{" "}
                      developers.
                    </p>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h1 className="text-4xl font-light text-white leading-[1.1] tracking-tight mt-2">
                      Des milliers de propects
                    </h1>
                    <h1 className="text-4xl font-light text-white leading-[1.1] tracking-tight mt-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">
                        {" "}
                        en quelques clics
                      </span>
                    </h1>
                    <p className="text-base text-zinc-300 font-light mt-6">
                      Une liste de prospects ultra-segmentée selon vos besoins
                    </p>
                    <p className="text-base text-zinc-300 font-light mt-1">
                      +275M de contacts, 1 formulaire, 0 casse-tête.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Cards avec HoverButton optimisé */}
              <div className="flex min-h-[400px] w-full items-center justify-center py-20">
                <div className="w-full max-w-3xl">
                  <div className="space-y-10">
                    <div className="-ml-12 dark">
                      <TreeCards />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
