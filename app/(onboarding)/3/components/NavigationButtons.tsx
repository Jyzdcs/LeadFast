import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Step3FormValues } from "../mocks/constants";

interface NavigationButtonsProps {
  form: UseFormReturn<Step3FormValues>;
  onSubmit: (values: Step3FormValues) => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  form,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 justify-between py-4 border-t border-zinc-100 mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/2")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9 flex-1 sm:flex-initial"
      >
        Retour
      </Button>
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="bg-black hover:bg-black/90 text-white h-9 px-6 flex-1 sm:flex-initial"
      >
        Continuer
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
