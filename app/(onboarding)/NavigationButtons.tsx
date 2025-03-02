import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

export const NavigationButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 justify-between py-4 border-t border-zinc-100 mt-4 w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/demande-sur-mesure")}
        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9 max-w-[150px] sm:max-w-none"
      >
        Demande sur mesure
      </Button>
      <Button
        type="submit"
        className="bg-black hover:bg-black/90 text-white h-9 px-4 max-w-[150px] sm:max-w-none"
        onClick={() => router.push("/1")}
      >
        Commencer
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
