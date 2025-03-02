"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/contexts/OnboardingContext"; // Utilisation du contexte existant
import { submitFeedback } from "@/utils/api"; // Import de la fonction d'API

// Composants réutilisables
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number | null;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="flex justify-center space-x-4 py-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            rating && rating >= star
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          )}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

const CheckboxItem = ({ label }: { label: string }) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={label}
        className="peer absolute h-0 w-0 opacity-0"
      />
      <label
        htmlFor={label}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border p-2 text-sm 
                  peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                  transition-all duration-200"
      >
        {label}
      </label>
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2">Merci pour votre feedback !</h3>
      <p className="text-black/60">
        Vos commentaires sont précieux et nous aident à améliorer notre service.
      </p>
      <p className="text-sm mt-4 text-black/40">Redirection automatique...</p>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value = "",
  disabled = false,
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border outline-none transition",
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

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données utilisateur depuis le contexte d'onboarding
  const { data: onboardingData } = useOnboarding();
  const userData = onboardingData.step4 || {
    firstName: "",
    lastName: "",
    email: "",
  };

  // Création du nom complet à partir du prénom et du nom
  const fullName =
    userData.firstName && userData.lastName
      ? `${userData.lastName} ${userData.firstName}`
      : "";

  const handleAspectChange = (aspect: string, checked: boolean) => {
    if (checked) {
      setSelectedAspects((prev) => [...prev, aspect]);
    } else {
      setSelectedAspects((prev) => prev.filter((item) => item !== aspect));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de base
    if (!feedback.trim()) {
      setError("Veuillez entrer votre feedback");
      return;
    }

    if (!fullName || !userData.email) {
      setError("Les informations de contact sont obligatoires");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = {
        name: fullName,
        email: userData.email,
        feedback: feedback,
        rating: rating || undefined,
        appreciatedAspects:
          selectedAspects.length > 0 ? selectedAspects : undefined,
      };

      const response = await submitFeedback(formData);

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push("/submitted");
        }, 2000);
      } else {
        setError(
          response.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi de votre feedback");
      console.error("Erreur lors de l'envoi du feedback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const appreciationAspects = [
    "Interface",
    "Simplicité",
    "Rapidité",
    "Qualité des leads",
    "Prix",
    "Support client",
  ];

  return (
    <div className="h-full container mx-auto space-y-8 px-4 py-6">
      {/* Contenu principal */}
      <div className="h-full max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Évaluation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium mb-2">
                Évaluez votre expérience
              </h2>
              <p className="text-black/60 mb-4">
                Dans quelle mesure êtes-vous satisfait de nos services jusqu'à
                présent ?
              </p>

              <StarRating rating={rating} setRating={setRating} />
            </div>

            <div className="border-t pt-10">
              <h3 className="font-medium mb-3">
                Qu'avez-vous le plus apprécié ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {appreciationAspects.map((aspect) => (
                  <div key={aspect} className="relative">
                    <input
                      type="checkbox"
                      id={aspect}
                      className="peer absolute h-0 w-0 opacity-0"
                      onChange={(e) =>
                        handleAspectChange(aspect, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={aspect}
                      className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border p-2 text-sm 
                                peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                                transition-all duration-200"
                    >
                      {aspect}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Partagez vos suggestions</h3>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                rows={4}
                placeholder="Qu'est-ce que nous pourrions améliorer ? Avez-vous des suggestions ?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-28">
              <InputField
                id="name"
                label="Nom"
                placeholder="Votre nom"
                value={fullName}
                disabled={!!fullName}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                value={userData.email}
                disabled={!!userData.email}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Envoyer mon feedback"}
              </Button>
            </div>
          </form>
        ) : (
          <SuccessMessage />
        )}
      </div>
    </div>
  );
}
