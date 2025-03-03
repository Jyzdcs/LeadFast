"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFeedbackForm } from "./hooks/useFeedbackForm";
import { StarRating } from "./components/StarRating";
import { CheckboxItem } from "./components/CheckboxItem";
import { SuccessMessage } from "./components/SuccessMessage";
import { InputField } from "./components/InputField";
import { appreciationAspects } from "./mocks/constants";

export default function FeedbackPage() {
  const {
    rating,
    setRating,
    feedback,
    setFeedback,
    selectedAspects,
    handleAspectChange,
    fullName,
    userData,
    isNameEditable,
    isEmailEditable,
    register,
    submitted,
    isLoading,
    error,
    handleSubmit,
  } = useFeedbackForm();

  return (
    <div className="min-h-screen flex flex-col py-6 px-4 sm:px-6">
      {!submitted ? (
        <div className="flex-1 w-full max-w-2xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Évaluation */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-medium">
                  Évaluez votre expérience
                </h2>
                <p className="text-sm sm:text-base text-black/60">
                  Dans quelle mesure êtes-vous satisfait de nos services jusqu'à
                  présent ?
                </p>

                <StarRating rating={rating} onRatingChange={setRating} />
              </div>

              <div className="border-t pt-5">
                <h3 className="font-medium mb-3 text-base sm:text-lg">
                  Qu'avez-vous le plus apprécié ?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {appreciationAspects.map((aspect) => (
                    <CheckboxItem
                      key={aspect}
                      label={aspect}
                      checked={selectedAspects.includes(aspect)}
                      onChange={(checked) =>
                        handleAspectChange(aspect, checked)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-base sm:text-lg">
                  Partagez vos suggestions
                </h3>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition text-sm sm:text-base"
                  rows={4}
                  placeholder="Qu'est-ce que nous pourrions améliorer ? Avez-vous des suggestions ?"
                  value={feedback}
                  {...register("feedback")}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <InputField
                  id="name"
                  label="Nom"
                  placeholder="Votre nom"
                  disabled={!isNameEditable}
                  isPreFilled={!isNameEditable}
                  register={register}
                  name="name"
                  required
                />
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="vous@exemple.com"
                  disabled={!isEmailEditable}
                  isPreFilled={!isEmailEditable}
                  register={register}
                  name="email"
                  required
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
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border p-4 sm:p-6 w-full max-w-lg">
            <SuccessMessage />
          </div>
        </div>
      )}
    </div>
  );
}
