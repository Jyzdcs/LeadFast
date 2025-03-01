import React from "react";
import { InfoIcon } from "lucide-react";
import { KeywordInput } from "@/components/ui/keyword-input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface JobTitleInputProps {
  jobTitles: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

export const JobTitleInput: React.FC<JobTitleInputProps> = ({
  jobTitles,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
        Intitulé de poste précis
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
                <p className="font-medium">Intitulé de poste</p>
                <p className="text-zinc-300">
                  Indiquez les intitulés exacts des postes ciblés pour une
                  recherche ultra-précise
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </label>
      <KeywordInput
        keywords={jobTitles}
        defaultValue={jobTitles}
        onAdd={onAdd}
        onRemove={onRemove}
        placeholder="Ex : Développeur, Directeur, marketing, CEO..."
        helperText="Appuyez sur Entrée pour ajouter un mot-clé"
        className="w-full"
      />
    </div>
  );
};
