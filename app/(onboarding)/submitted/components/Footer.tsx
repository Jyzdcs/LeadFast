import React from "react";
import { Button } from "@/components/ui/button";
import { FooterProps } from "../types";

/**
 * Composant de pied de page avec bouton d'action
 */
const Footer: React.FC<FooterProps> = ({ onBackToHome }) => {
  return (
    <div className="mt-6">
      <Button
        variant="outline"
        onClick={onBackToHome}
        className="px-6"
        size="sm"
      >
        Retour à l'accueil
      </Button>
    </div>
  );
};

export default Footer;
