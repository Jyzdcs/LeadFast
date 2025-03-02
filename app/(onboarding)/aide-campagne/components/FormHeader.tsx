import React from "react";

export const FormHeader: React.FC = () => {
  return (
    <div className="text-center py-6 border-b border-gray-100">
      <h1 className="text-2xl font-semibold">
        Demande d'aide pour votre campagne
      </h1>
      <p className="text-gray-600 mt-2">
        Partagez vos besoins pour recevoir un accompagnement personnalisé
      </p>
    </div>
  );
};
