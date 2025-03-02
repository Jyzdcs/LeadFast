import React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value = "",
  disabled = false,
}) => {
  return (
    <div className="space-y-1 sm:space-y-2">
      <label htmlFor={id} className="block text-xs sm:text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        disabled={disabled}
        className={cn(
          "w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border outline-none transition text-sm",
          disabled
            ? "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
            : "border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
        )}
        placeholder={placeholder}
      />
      {disabled && (
        <p className="text-xs text-gray-500 mt-1">
          Ces informations ont été récupérées de votre profil
        </p>
      )}
    </div>
  );
};
