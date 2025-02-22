import * as React from "react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  label: string
}

function StepIndicator({ step, label, className, ...props }: StepIndicatorProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2 bg-black/[0.02] rounded-full self-start mb-8",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-[10px] font-medium text-white">
        {step}
      </span>
      <span className="text-sm font-light text-black/60">
        {label}
      </span>
    </div>
  )
}

export { StepIndicator } 