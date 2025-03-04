import React from "react";
import { Badge } from "@/components/ui/badge";
import { X, Users, InfoIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { employeeRanges } from "../mocks/constants";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompanySizeInputProps {
  sizes: string[];
  onAdd: (size: string) => void;
  onRemove: (size: string) => void;
  onSelectAll?: () => void;
}

export const CompanySizeInput: React.FC<CompanySizeInputProps> = ({
  sizes,
  onAdd,
  onRemove,
  onSelectAll,
}) => {
  // Convertir les tailles d'entreprise au format attendu par le composant Combobox
  const comboboxOptions = employeeRanges.map((range) => ({
    id: range.value,
    label: range.label,
    desc: range.label,
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
          Taille d'entreprise
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                  <InfoIcon className="h-4 w-4 text-zinc-500" />
                  <span className="sr-only">
                    Plus d'informations sur les tailles d'entreprise
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                sideOffset={8}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Taille d'entreprise</p>
                  <p className="text-zinc-300">
                    Filtrez par taille d'entreprise qui vous intéresse
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        {onSelectAll && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="text-xs"
          >
            Toutes les tailles
          </Button>
        )}
      </div>
      <Combobox
        options={comboboxOptions}
        placeholder="Filtrez par taille d'entreprise"
        onChange={(value: string) => onAdd(value)}
        onRemove={onRemove}
        icon={<Users className="w-4 h-4 text-zinc-500" />}
        className="w-full"
        selectedItems={sizes}
      />
      <p className="mt-2 text-xs text-black/40">
        Laissez vide pour ajouter toutes les tailles
      </p>
      {sizes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {sizes.map((size) => {
            const range = employeeRanges.find((r) => r.value === size);
            return (
              <Badge
                key={size}
                variant="secondary"
                className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
              >
                {range?.label || size}
                <button
                  type="button"
                  onClick={() => onRemove(size)}
                  className="focus:outline-none group"
                >
                  <X className="h-3 w-3 text-zinc-500 group-hover:text-zinc-700" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
