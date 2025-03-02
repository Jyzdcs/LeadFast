import React from "react";

export const SuccessMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">
        Demande envoyée avec succès !
      </h2>
      <p className="text-gray-600 max-w-md">
        Nous avons bien reçu votre demande d'accompagnement pour votre campagne.
        Un expert va analyser vos besoins et vous contactera très prochainement.
      </p>
      <p className="text-sm text-gray-500 mt-4">
        Vous allez être redirigé dans quelques secondes...
      </p>
    </div>
  );
};
