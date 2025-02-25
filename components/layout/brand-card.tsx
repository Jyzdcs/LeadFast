import React from "react";
import { Logo } from "@/components/ui/logo";
import { ApprovalBadge } from "@/components/ui/approval-badge";
import { HeroContent } from "@/components/ui/hero-content";
import { GradientBackground } from "@/components/ui/gradient-background";
import { FeatureCardsSection } from "@/components/ui/feature-cards-section";

export function BrandCard() {
  return (
    <div className="relative w-full rounded-2xl shadow-lg overflow-hidden">
      {/* Background with image and overlay */}
      <GradientBackground />

      {/* Content */}
      <div className="relative h-full w-full p-8 flex flex-col">
        {/* Header */}
        <Logo />

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <div className="space-y-6">
            {/* Badge */}
            <div className="space-y-3">
              <ApprovalBadge />

              {/* Title & Description */}
              <HeroContent />
            </div>
          </div>

          {/* Feature Cards */}
          <FeatureCardsSection />
        </div>
      </div>
    </div>
  );
}
