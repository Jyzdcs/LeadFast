import React from "react";
import Image from "next/image";

/**
 * Composant d'en-tête avec logo et message de confirmation
 */
const Header: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 rounded-sm blur-xl" />
        <Image
          src="/leadfast.png"
          alt="LeadFast.io"
          width={80}
          height={80}
          className="rounded-xl relative"
        />
      </div>
      <h2 className="text-2xl font-medium mb-3">
        Merci pour votre confiance !
      </h2>
      <p className="text-base text-black/60 mb-6">
        Notre équipe va commencer à générer vos leads qualifiés. Nous vous
        recontacterons dans les meilleurs délais
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm mb-6">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        Configuration terminée
      </div>
    </div>
  );
};

export default Header;
