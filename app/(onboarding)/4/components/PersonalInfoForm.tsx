import React from "react";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Step4FormValues } from "../mocks/constants";
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
} from "react-hook-form";

/**
 * Interface pour les props du composant PersonalInfoForm
 *
 * @property register - Fonction pour enregistrer les champs avec react-hook-form
 * @property errors - Objet contenant les erreurs de validation
 * @property clearError - Fonction pour effacer une erreur spécifique
 * @property handleFieldChange - Fonction pour mettre à jour le contexte à chaque changement
 * @property getValues - Fonction pour récupérer les valeurs actuelles du formulaire
 */
interface PersonalInfoFormProps {
  register: UseFormRegister<Step4FormValues>;
  errors: FieldErrors<Step4FormValues>;
  clearError: (field: keyof Step4FormValues) => void;
  handleFieldChange: (field: keyof Step4FormValues, value: string) => void;
  getValues: UseFormGetValues<Step4FormValues>;
}

/**
 * Composant pour le formulaire d'informations personnelles
 *
 * Ce composant gère :
 * - L'affichage des champs du formulaire (prénom, nom, email, téléphone)
 * - La validation des champs
 * - La mise à jour du contexte à chaque changement
 * - L'affichage des erreurs de validation
 */
export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  register,
  errors,
  clearError,
  handleFieldChange,
  getValues,
}) => {
  // Récupération des valeurs actuelles pour les afficher dans les champs
  const values = getValues();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Champ Prénom */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
            Prénom
            <span className="text-red-500">*</span>
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
