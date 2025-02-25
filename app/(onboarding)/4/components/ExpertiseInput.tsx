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

      <div className="relative">
        <Lightbulb className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex : saas, e-commerce, ..."
          className="pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
        />
        <div className="text-xs text-zinc-500 mt-1 ml-1">
          Appuyez sur Entrée pour ajouter un mot-clé
        </div>
      </div>

      {/* Suggestions */}
      {inputValue && availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs text-zinc-500 self-center">
            Suggestions :
          </span>
          {availableSuggestions.map((suggestion) => (
            <Badge
              key={suggestion.value}
              variant="secondary"
              className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion.value)}
            >
              {suggestion.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Selected expertise */}
      {expertise.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {expertise.map((item) => {
            const suggestionItem = expertiseSuggestions.find(
              (s) => s.value === item
            );
            const displayLabel = suggestionItem ? suggestionItem.label : item;

            return (
              <Badge
                key={item}
                variant="secondary"
                className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
              >
                {displayLabel}
                <button
                  type="button"
                  onClick={() => onRemove(item)}
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
