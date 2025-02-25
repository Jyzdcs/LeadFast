import React from "react";
import { StepIndicator } from "@/components/ui/step-indicator";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import { steps } from "../mocks/constants";

export const StepHeader: React.FC = () => {
  return (
    <div className="w-full border-b border-zinc-100">
      <div className="w-full px-6 py-3">
        <div className="flex flex-col gap-2 mt-8">
          <StepIndicator
            step={3}
            label="Entreprise spécifique"
            className="text-base font-medium text-zinc-900"
          />
          <Stepper value={3} className="w-full gap-1">
            {steps.map((step) => (
              <StepperItem key={step} step={Number(step)} className="flex-1">
                <StepperTrigger className="w-full" asChild>
                  <StepperIndicator
                    asChild
                    className="relative h-1 w-full rounded-full bg-zinc-100 overflow-hidden"
                  >
                    <div>
                      <div className="absolute inset-0 bg-black opacity-0 data-[active=true]:opacity-100 transition-opacity duration-300" />
                      <span className="sr-only">{step}</span>
                    </div>
                  </StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
};
