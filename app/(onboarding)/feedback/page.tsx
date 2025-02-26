"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données à une API
    setSubmitted(true);
    setTimeout(() => {
      router.push("/submitted");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Contenu principal */}
      <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border p-8">
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

              <div className="flex justify-center space-x-4 py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      rating && rating >= star
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
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
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">
                Qu'avez-vous le plus apprécié ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {[
                  "Interface",
                  "Simplicité",
                  "Rapidité",
                  "Qualité des leads",
                  "Prix",
                  "Support client",
                ].map((aspect) => (
                  <div key={aspect} className="relative">
                    <input
                      type="checkbox"
                      id={aspect}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <label
                      htmlFor={aspect}
                      className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border p-2 text-sm peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600"
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
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows={4}
                placeholder="Qu'est-ce que nous pourrions améliorer ? Avez-vous des suggestions ?"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nom (facultatif)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Votre nom"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email (facultatif)
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Envoyer mon feedback
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
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
            <h3 className="text-xl font-medium mb-2">
              Merci pour votre feedback !
            </h3>
            <p className="text-black/60">
              Vos commentaires sont précieux et nous aident à améliorer notre
              service.
            </p>
            <p className="text-sm mt-4 text-black/40">
              Redirection automatique...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
