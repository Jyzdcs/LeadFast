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
    submitted,
    isLoading,
    error,
    handleSubmit,
  } = useFeedbackForm();

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
                  <CheckboxItem
                    key={aspect}
                    label={aspect}
                    onChange={(checked) => handleAspectChange(aspect, checked)}
                  />
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
