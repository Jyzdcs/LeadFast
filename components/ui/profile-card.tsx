import * as React from "react"
import { Card } from "./card"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  iconBgColor?: string
  iconColor?: string
  showArrow?: boolean
}

function ProfileCard({
  title,
  description,
  icon,
  iconBgColor = "bg-black/[0.02]",
  iconColor = "text-black/40",
  showArrow = false,
  className,
  ...props
}: ProfileCardProps) {
  return (
    <Card className={cn("p-4 cursor-pointer hover:border-black/20 transition-colors group", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg transition-colors", iconBgColor, {
            "group-hover:bg-black/[0.05]": iconBgColor === "bg-black/[0.02]",
            "group-hover:bg-blue-100": iconBgColor === "bg-blue-50",
          })}>
            <div className={cn("w-5 h-5", iconColor)}>
              {icon}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs text-black/60">{description}</p>
          </div>
        </div>
        {showArrow && (
          <ArrowRightIcon className="w-4 h-4 text-black/20 group-hover:text-black/40 transition-colors" />
        )}
      </div>
    </Card>
  )
}

export { ProfileCard } 