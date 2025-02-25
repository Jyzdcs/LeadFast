import React from "react";

interface GradientBackgroundProps {
  imagePath?: string;
}

export function GradientBackground({ imagePath = "/background-V2.jpg" }: GradientBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
      {/* Overlay gradients pour une meilleure lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/80 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      {/* Grille décorative */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
    </div>
  );
} 