import * as React from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode
}

function Select({ className, children, icon, ...props }: SelectProps) {
  return (
    <div className="relative w-full  sm:max-w-[320px]">
      {icon && (
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
          <div className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400">
            {icon}
          </div>
        </div>
      )}
      <select
        className={cn(
          "w-full appearance-none",
          "h-12 sm:h-14",
          icon ? "pl-10 sm:pl-12" : "pl-4 sm:pl-5",
          "pr-10 sm:pr-12",
          "text-sm sm:text-base font-light",
          "bg-black/[0.02]",
          "border-transparent rounded-lg sm:rounded-xl",
          "focus-visible:ring-1 focus-visible:ring-black/5 focus-visible:border-black/10",
          "placeholder:text-black/30",
          "transition-all duration-200 ease-in-out",
          "hover:bg-black/[0.03] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
    </div>
  )
}

export { Select } 