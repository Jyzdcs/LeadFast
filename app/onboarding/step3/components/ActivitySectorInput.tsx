import React from "react";
import { Badge } from "@/components/ui/badge";
import { X, Building2, InfoIcon } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { industries } from "../mocks/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActivitySectorInputProps {
  sectors: string[];
  onAdd: (sector: string) => void;
  onRemove: (sector: string) => void;
}

export const ActivitySectorInput: React.FC<ActivitySectorInputProps> = ({
  sectors,
  onAdd,
  onRemove,
}) => {
  // Convertir les industries au format attendu par le composant Combobox
  const comboboxOptions = industries.map((industry) => ({
    id: industry.value,
    label: industry.label,
    desc: industry.label,
  }));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
        Secteurs d'activité
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
                <p className="font-medium">Secteurs d'activité</p>
                <p className="text-zinc-300">
                  Sélectionnez les secteurs d'activité qui vous intéressent
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </label>

      <Combobox
        options={comboboxOptions}
        placeholder="Sélectionnez un secteur d'activité"
        onChange={(value: string) => onAdd(value)}
        icon={<Building2 className="w-4 h-4 text-zinc-500" />}
        className="w-full"
      />

      {sectors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {sectors.map((sector) => {
            const industry = industries.find((i) => i.value === sector);
            return (
              <Badge
                key={sector}
                variant="secondary"
                className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
              >
                {industry?.label || sector}
                <button
                  type="button"
                  onClick={() => onRemove(sector)}
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
