import React from "react";
import { X, UserIcon, InfoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { managementLevels } from "../mocks/constants";

interface ManagementLevelInputProps {
  selectedLevels: string[];
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  onRemoveLevel: (value: string) => void;
}

export const ManagementLevelInput: React.FC<ManagementLevelInputProps> = ({
  selectedLevels,
  selectedLevel,
  onLevelChange,
  onRemoveLevel,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
        Niveaux hiérarchiques
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                <InfoIcon className="h-4 w-4 text-zinc-500" />
                <span className="sr-only">
                  Plus d'informations sur les niveaux hiérarchiques
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={8}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">Niveaux hiérarchiques</p>
                <p className="text-zinc-300">
                  Pour maximiser l'impact, ciblez Senior, Lead, Manager,
                  Directeur, VP et C-Level selon vos besoins en prospection
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </label>
      <Combobox
        options={managementLevels.map((level) => ({
          id: level.value,
          label: level.label,
          desc: level.label,
        }))}
        value={selectedLevel}
        onChange={onLevelChange}
        onRemove={onRemoveLevel}
        placeholder="Sélectionner un niveau..."
        searchPlaceholder="Rechercher un niveau..."
        icon={<UserIcon className="w-4 h-4 text-zinc-500" />}
        className="w-full"
        selectedItems={selectedLevels}
      />
      <div className="flex flex-wrap gap-2">
        {selectedLevels?.map((level) => (
          <Badge
            key={level}
            variant="secondary"
            className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
          >
            {managementLevels.find((l) => l.value === level)?.label}
            <button
              type="button"
              onClick={() => onRemoveLevel(level)}
              className="focus:outline-none group"
            >
              <X className="h-3 w-3 text-zinc-500 group-hover:text-zinc-700" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
