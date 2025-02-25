import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Step5FormValues } from "../mocks/constants";

interface NavigationButtonsProps {
  form: UseFormReturn<Step5FormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  form,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between py-4 border-t border-zinc-100 mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/4")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9"
      >
        Retour
      </Button>
      <Button
        type="submit"
        form="step5-form"
        className="bg-black hover:bg-black/90 text-white h-9 px-6"
      >
        Suivant
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
