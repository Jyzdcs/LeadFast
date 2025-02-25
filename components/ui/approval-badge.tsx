import React from "react";

interface ApprovalBadgeProps {
  count?: number;
  logos?: { src: string; alt: string }[];
}

export function ApprovalBadge({ 
  count = 10, 
  logos = [
    { src: "ocom-logo.png", alt: "OCOM Logo" },
    { src: "artntreal-logo.png", alt: "ArtNTReal Logo" },
    { src: "chataigne-logo.png", alt: "Chataigne Logo" }
  ] 
}: ApprovalBadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-700/50 p-1 shadow-sm backdrop-blur-sm bg-black/20">
      <div className="flex -space-x-1.5">
        {logos.map((logo, index) => (
          <img
            key={index}
            className={`ring-background rounded-full ring-1 ${index === 2 ? 'bg-black' : ''}`}
            src={logo.src}
            width={20}
            height={20}
            alt={logo.alt}
          />
        ))}
      </div>
      <p className="text-zinc-400 px-2 text-xs">
        Approuvé par{" "}
        <strong className="text-white font-medium">{count}+</strong>{" "}
        start-ups.
      </p>
    </div>
  );
} 