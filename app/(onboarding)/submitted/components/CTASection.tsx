import React from "react";
import CTACard from "./CTACard";
import { CTASectionProps } from "../types";

/**
 * Section des cartes CTA
 */
const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  // Définition des icônes utilisées dans les CTAs
  const campaignIcon = (
    <svg
      className="w-4 h-4 text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
        clipRule="evenodd"
      />
      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
    </svg>
  );

  const feedbackIcon = (
    <svg
      className="w-4 h-4 text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Configuration des cartes CTA
  const ctaCards = [
    {
      title: "Accompagnement pour votre campagne",
      description: "Expertise personnalisée pour optimiser vos résultats.",
      icon: campaignIcon,
      actionText: "En savoir plus",
      path: "/aide-campagne",
    },
    {
      title: "Donnez votre feedback",
      description: "Aidez-nous à améliorer notre service.",
      icon: feedbackIcon,
      actionText: "Laisser un avis",
      path: "/feedback",
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ctaCards.map((card, index) => (
          <CTACard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            actionText={card.actionText}
            onClick={() => onNavigate(card.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default CTASection;
