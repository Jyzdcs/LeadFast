import * as React from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { X, PlusIcon } from "lucide-react";

interface KeywordInputProps {
  keywords: string[]
  onAdd?: (keyword: string) => void
  onRemove?: (keyword: string) => void
  placeholder?: string
  helperText?: string
  className?: string
  defaultValue?: string[]
}

function KeywordInput({
  keywords,
  onAdd,
  onRemove,
  placeholder = "Ex: saas, data science, consulting...",
  helperText = "Appuyez sur Entrée pour ajouter un mot-clé",
  className,
  defaultValue = [],
  ...props
}: KeywordInputProps) {
  const [input, setInput] = React.useState("")

  React.useEffect(() => {
    if (defaultValue.length > 0 && keywords.length === 0) {
      defaultValue.forEach(keyword => {
        onAdd?.(keyword);
      });
    }
  }, [defaultValue, keywords.length, onAdd]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault()
      onAdd?.(input.trim())
      setInput("")
    }
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="relative">
        <Input
          icon={<PlusIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-14 pl-12 pr-5 font-light bg-black/[0.02] border-transparent rounded-xl focus-visible:ring-1 focus-visible:ring-black/5 focus-visible:border-black/10 placeholder:text-black/30"
        />
        <p className="mt-2 text-xs text-black/40">
          {helperText}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {keywords.map((keyword) => (
          <Badge
            key={keyword}
            variant="secondary"
            className="px-3 py-1 flex items-center gap-1"
          >
            {keyword}
            <X
              className="h-3 w-3 cursor-pointer hover:text-red-500"
              onClick={() => onRemove?.(keyword)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}

export { KeywordInput } 