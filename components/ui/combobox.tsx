import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDownIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface Option {
  id: string
  label: string
  desc: string
  color?: string
  icon?: React.ReactNode
}

interface ComboboxProps {
  options: Option[]
  placeholder?: string
  searchPlaceholder?: string
  icon?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
  className?: string
}

function Combobox({
  options,
  placeholder = "Sélectionner une option...",
  searchPlaceholder = "Rechercher...",
  icon,
  value,
  onChange,
  className
}: ComboboxProps) {
  const [search, setSearch] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase()) ||
    option.desc.toLowerCase().includes(search.toLowerCase())
  )

  const selectedOption = options.find(option => option.id === value)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative w-full",
            "h-12 sm:h-14",
            "pl-10 sm:pl-12 pr-10 sm:pr-12",
            "text-sm sm:text-base font-light text-left",
            "bg-black/[0.02]",
            "border-transparent rounded-lg sm:rounded-xl",
            "focus-visible:ring-1 focus-visible:ring-black/5 focus-visible:border-black/10",
            "transition-all duration-200 ease-in-out",
            "hover:bg-black/[0.03] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]",
            className
          )}
        >
          {icon && (
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
              <div className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          <span className="text-black/60">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
        <div className="space-y-2">
          <div className="relative">
            <Input
              icon={<UserIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-1">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                  "text-sm text-gray-700",
                  "transition-colors duration-150",
                  "hover:bg-gray-50",
                  value === option.id ? "bg-gray-50" : "bg-white"
                )}
                onClick={() => {
                  onChange?.(option.id)
                  setIsOpen(false)
                  setSearch("")
                }}
              >
                {option.color ? (
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg",
                    `bg-${option.color}-50 text-${option.color}-500`
                  )}>
                    {option.icon}
                  </div>
                ) : option.icon && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500">
                    {option.icon}
                  </div>
                )}
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.desc !== option.label && (
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  )}
                </div>
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="py-2 px-3 text-sm text-gray-500">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type Option } 