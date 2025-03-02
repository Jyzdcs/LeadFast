import React from "react";
import { Input } from "@/components/ui/input";
import { Building2, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompanyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CompanyInput: React.FC<CompanyInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
        Nom de l'entreprise
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                <InfoIcon className="h-4 w-4 text-zinc-500" />
                <span className="sr-only">
                  Plus d'informations sur le nom de l'entreprise
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={8}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">Nom de l'entreprise</p>
                <p className="text-zinc-300">
                  Entrez le nom de l'entreprise que vous souhaitez cibler
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </label>
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex : Google, Apple, ..."
          className="h-14 pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
        />
      </div>
    </div>
  );
};
