import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Step4FormValues } from "../mocks/constants";

/**
 * Interface pour les props du composant NavigationButtons
 *
 * @property form - L'objet de formulaire retourné par useForm
 * @property onSubmit - La fonction de soumission du formulaire
 */
interface NavigationButtonsProps {
  form: UseFormReturn<Step4FormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

/**
 * Composant pour les boutons de navigation (Retour/Suivant)
 *
 * Ce composant gère :
 * - La navigation vers l'étape précédente
 * - La soumission du formulaire pour passer à l'étape suivante
 */
export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  form,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between py-4 border-t border-zinc-100 mt-4">
      {/* Bouton Retour - Navigation vers l'étape précédente */}
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/3")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9"
      >
        Retour
      </Button>

      {/* Bouton Suivant - Soumission du formulaire */}
      <Button
        type="submit"
        form="step4-form"
        className="bg-black hover:bg-black/90 text-white h-9 px-6"
      >
        Continuer
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
