import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Step6FormValues } from "../mocks/constants";

interface NavigationButtonsProps {
  form: UseFormReturn<Step6FormValues>;
  onSubmit: (values: Step6FormValues) => void;
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
        onClick={() => router.push("/5")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9"
      >
        Retour
      </Button>
      <Button
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
        className="bg-black hover:bg-black/90 text-white h-9 px-6"
      >
        Terminer
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
