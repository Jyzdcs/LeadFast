import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
		default: "h-12 px-6 bg-black text-white hover:bg-black/90 hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.08)]",
        primary: "h-12 px-6 bg-black text-white hover:bg-black/90 hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.08)]",
        secondary: "h-12 px-6 bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "h-12 border-black/10 hover:bg-black/[0.02] hover:border-black/20 rounded-xl text-black/60 text-sm px-6 h-12 px-6 border border-black/10 text-black/60 hover:bg-black/[0.02] hover:border-black/20",
      },
      size: {
        default: "",
        sm: "h-10 px-4",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {variant === "primary" && (
        <ArrowRightIcon className="w-4 h-4" />
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
