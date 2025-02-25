import React from "react";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Step5FormValues } from "../mocks/constants";
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";

interface PersonalInfoFormProps {
  register: UseFormRegister<Step5FormValues>;
  errors: FieldErrors<Step5FormValues>;
  clearError: (field: keyof Step5FormValues) => void;
  handleFieldChange: (field: keyof Step5FormValues, value: string) => void;
  getValues: UseFormGetValues<Step5FormValues>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  register,
  errors,
  clearError,
  handleFieldChange,
  getValues,
}) => {
  const values = getValues();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Champ Prénom */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
            Prénom
            <span className="text-red-500">*</span>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                    <Info className="h-4 w-4 text-zinc-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                  sideOffset={8}
                >
                  <p className="text-zinc-300">Entrez votre prénom</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              {...register("firstName", { required: "Le prénom est requis" })}
              value={values.firstName}
              onChange={(e) => {
                handleFieldChange("firstName", e.target.value);
                clearError("firstName");
              }}
              placeholder="John"
              className="pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-red-500">
              {errors.firstName.message?.toString()}
            </p>
          )}
        </div>

        {/* Champ Nom */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
            Nom
            <span className="text-red-500">*</span>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                    <Info className="h-4 w-4 text-zinc-500" />
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                  sideOffset={8}
                >
                  <p className="text-zinc-300">Entrez votre nom</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              {...register("lastName", { required: "Le nom est requis" })}
              value={values.lastName}
              onChange={(e) => {
                handleFieldChange("lastName", e.target.value);
                clearError("lastName");
              }}
              placeholder="Doe"
              className="pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-red-500">
              {errors.lastName.message?.toString()}
            </p>
          )}
        </div>
      </div>

      {/* Champ Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
          Email
          <span className="text-red-500">*</span>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                  <Info className="h-4 w-4 text-zinc-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                sideOffset={8}
              >
                <p className="text-zinc-300">Entrez votre adresse email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format d'email invalide",
              },
            })}
            value={values.email}
            onChange={(e) => {
              handleFieldChange("email", e.target.value);
              clearError("email");
            }}
            type="email"
            placeholder="john.doe@example.com"
            className="pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>

      {/* Champ Téléphone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
          Numéro de téléphone
          <span className="text-zinc-500 text-sm font-normal">(optionnel)</span>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="hidden sm:inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                  <Info className="h-4 w-4 text-zinc-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                sideOffset={8}
              >
                <p className="text-zinc-300">
                  Entrez votre numéro de téléphone (facultatif)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            {...register("phoneNumber")}
            value={values.phoneNumber}
            onChange={(e) => {
              handleFieldChange("phoneNumber", e.target.value);
              clearError("phoneNumber");
            }}
            type="tel"
            placeholder="+33 6 XX XX XX XX"
            className="pl-10 border-zinc-200 focus:border-zinc-300 focus:ring-zinc-300 w-full"
          />
        </div>
      </div>
    </div>
  );
};
