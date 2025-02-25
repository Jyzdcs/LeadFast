import React from "react";

interface HeroContentProps {
  title?: string[];
  description?: string[];
}

export function HeroContent({
  title = ["Des milliers de propects", "en quelques clics"],
  description = [
    "Une liste de prospects ultra-segmentée selon vos besoins",
    "+275M de contacts, 1 formulaire, 0 casse-tête."
  ]
}: HeroContentProps) {
  return (
    <div>
      <h1 className="text-4xl font-light text-white leading-[1.1] tracking-tight mt-2">
        {title[0]}
      </h1>
      <h1 className="text-4xl font-light text-white leading-[1.1] tracking-tight mt-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">
          {" "}
          {title[1]}
        </span>
      </h1>
      {description.map((line, index) => (
        <p 
          key={index} 
          className={`text-base text-zinc-300 font-light ${index === 0 ? 'mt-6' : 'mt-1'}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
} 