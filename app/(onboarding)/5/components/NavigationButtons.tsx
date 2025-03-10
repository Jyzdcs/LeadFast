import React from "react";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Step5FormValues } from "../mocks/constants";

interface NavigationButtonsProps {
  form: UseFormReturn<Step5FormValues>;
  onSubmit: (values: Step5FormValues) => void;
  isSubmitting?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  form,
  onSubmit,
  isSubmitting = false,
}) => {
  const router = useRouter();
  const formValues = form.getValues();
  const isLeadQuantitySelected = !!formValues.leadQuantity;

  return (
    <div className="flex flex-row gap-4 justify-between py-4 border-t border-zinc-100 mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/4")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9 flex-1 sm:flex-initial"
        disabled={isSubmitting}
      >
        Retour
      </Button>
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="bg-black hover:bg-black/90 text-white h-9 px-6 flex-1 sm:flex-initial"
        disabled={isSubmitting || !isLeadQuantitySelected}
        title={
          !isLeadQuantitySelected
            ? "Veuillez sélectionner une quantité de leads"
            : ""
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            Terminer
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};
