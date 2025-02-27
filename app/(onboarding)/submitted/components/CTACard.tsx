import React from "react";
import { CTACardProps } from "../types";

/**
 * Composant de carte CTA (Call to Action)
 */
const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  icon,
  actionText,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-black/5 border border-gray-200 hover:border-gray-400 rounded-lg p-3 shadow-sm hover:shadow transition-all duration-300"
    >
      <div className="rounded-full bg-gray-100 p-2 w-8 h-8 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1 group-hover:text-gray-900 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-xs mb-2">{description}</p>
      <span className="inline-flex items-center text-gray-800 text-xs group-hover:text-black font-medium">
        {actionText}
        <svg
          className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default CTACard;
