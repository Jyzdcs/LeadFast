import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailTemplateType } from "@/types/email";

interface UseEmailFormProps {
  template: EmailTemplateType;
  redirectPath?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

export function useEmailForm<T extends Record<string, any>>({
  template,
  redirectPath = "/submitted",
  onSuccess,
  onError,
}: UseEmailFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<T>({} as T);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/emails/${template}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Obtenir le corps de la réponse
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${result.error || "Unknown error"}`
        );
      }

      if (result.success) {
        setIsSubmitted(true);

        if (onSuccess) {
          onSuccess(result);
        }

        if (redirectPath) {
          setTimeout(() => {
            router.push(redirectPath);
          }, 2000);
        }
      } else {
        setError(result.error || "Une erreur est survenue");
        if (onError) onError(result.error);
      }
    } catch (error) {
      console.error(`Error submitting ${template} form:`, error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
    setFormData,
  };
}
