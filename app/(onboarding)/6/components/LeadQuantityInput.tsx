import React from "react";
import { Package, InfoIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { quantityPricing } from "../mocks/constants";

interface LeadQuantityInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedPrice: number | null;
}

export const LeadQuantityInput: React.FC<LeadQuantityInputProps> = ({
  value,
  onChange,
  selectedPrice,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
          Quantité de leads souhaitée
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                  <InfoIcon className="h-4 w-4 text-zinc-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                sideOffset={8}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Quantité de leads</p>
                  <p className="text-zinc-300">
                    Sélectionnez la quantité de leads que vous souhaitez obtenir
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>

        <Combobox
          options={quantityPricing.map((option) => ({
            id: option.value,
            label: option.label,
            desc: `${option.price}€ - ${option.label}`,
          }))}
          value={value}
          onChange={onChange}
          placeholder="Sélectionner une quantité..."
          searchPlaceholder="Rechercher une quantité..."
          icon={<Package className="w-4 h-4 text-zinc-500" />}
          className="w-full"
        />

        {selectedPrice !== null && (
          <div className="mt-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-600">
                Prix total :
              </span>
              <span className="text-lg font-semibold text-zinc-900">
                {selectedPrice}€
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
