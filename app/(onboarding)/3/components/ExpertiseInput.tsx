import React, { KeyboardEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, Lightbulb, InfoIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { expertiseSuggestions } from "../mocks/constants";
import { KeywordInput } from "@/components/ui/keyword-input";

interface ExpertiseInputProps {
  expertise: string[];
  onAdd: (expertise: string) => void;
  onRemove: (expertise: string) => void;
}

export const ExpertiseInput: React.FC<ExpertiseInputProps> = ({
  expertise,
  onAdd,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!expertise.includes(suggestion)) {
      onAdd(suggestion);
    }
  };

  // Filtrer les suggestions qui ne sont pas déjà sélectionnées
  const availableSuggestions = expertiseSuggestions
    .filter((suggestion) => !expertise.includes(suggestion.value))
    .slice(0, 5); // Limiter à 5 suggestions

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
        Domaines d'expertise
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                <InfoIcon className="h-4 w-4 text-zinc-500" />
                <span className="sr-only">
                  Plus d'informations sur les domaines d'expertise
                </span>
              </span>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={8}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">Domaines d'expertise</p>
                <p className="text-zinc-300">
                  Ajoutez des mots-clés liés aux domaines d'expertise que vous
                  recherchez
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </label>
      <KeywordInput
        keywords={expertise}
        defaultValue={expertise}
        onAdd={onAdd}
        onRemove={onRemove}
        placeholder="AWS, Cloud, Python, ..."
        helperText="Appuyez sur Entrée pour ajouter un mot-clé"
        className="w-full"
      />
    </div>
  );
};
