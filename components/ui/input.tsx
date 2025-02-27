import * as React from "react";
import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/outline";

function Input({
  icon,
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & { icon?: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {icon}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "w-full",
          "h-12",
          "pl-10 sm:pl-12 pr-4 sm:pr-5",
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
      />
    </div>
  );
}

export { Input };
