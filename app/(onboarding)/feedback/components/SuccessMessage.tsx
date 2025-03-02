import React from "react";

export const SuccessMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-center mb-2">
        Merci pour votre feedback !
      </h3>
      <p className="text-center text-base text-black/60 max-w-md">
        Vos commentaires sont précieux et nous aident à améliorer notre service.
      </p>
      <p className="text-sm text-center mt-4 text-black/40">
        Redirection automatique...
      </p>
    </div>
  );
};
