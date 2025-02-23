"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  tags: string[]
  icon: string
  hint: string
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ className, title, description, tags, icon, hint, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4",
          "hover:border-zinc-300 hover:shadow-sm transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-white" />
        
        {/* Content */}
        <div className="relative space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-lg">{icon}</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <h3 className="font-medium text-zinc-900">{title}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hint */}
          <div className="pt-1">
            <p className="text-xs text-zinc-500 italic">
              {hint}
            </p>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    )
  }
)

ProfileCard.displayName = "ProfileCard"

export { ProfileCard } 