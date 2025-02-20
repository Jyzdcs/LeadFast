import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const steps = [
  "Profil",
  "Entreprise Cible",
  "Entreprise Domaine",
  "Préférences Contact",
  "Informations personnelles",
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-sm border border-white/10 z-50">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <Badge
            variant={currentStep === index + 1 ? "default" : "outline"}
            className={cn(
              "px-3 py-1.5 transition-all duration-200 hover:bg-primary/5",
              currentStep === index + 1 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-110 border-0" 
                : "text-white/60 border-white/10",
              currentStep > index + 1 && "bg-purple-500/20 border-purple-500/20 text-white"
            )}
          >
            {index + 1}
          </Badge>
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "h-[1px] w-4 mx-1 transition-colors duration-200",
                currentStep > index + 1 
                  ? "bg-purple-500/50" 
                  : "bg-white/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
} 