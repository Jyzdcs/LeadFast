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
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm border border-border/50">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <Badge
            variant={currentStep === index + 1 ? "default" : "outline"}
            className={cn(
              "px-3 py-1 transition-all duration-200 hover:bg-primary/5",
              currentStep === index + 1 
                ? "bg-primary text-primary-foreground scale-110" 
                : "text-muted-foreground",
              currentStep > index + 1 && "bg-primary/20 border-primary/20 text-primary"
            )}
          >
            {index + 1}
          </Badge>
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "h-[1px] w-4 mx-1 transition-colors duration-200",
                currentStep > index + 1 
                  ? "bg-primary/50" 
                  : "bg-muted-foreground/20"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
} 