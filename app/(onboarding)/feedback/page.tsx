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
    <div className="h-screen flex flex-col">
      {/* En-tête - Plus compact */}
      <div className="flex items-center justify-center mb-4 pt-4">
        <div className="relative mr-4">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 rounded-sm blur-xl" />
          <Image
            src="/leadfast.png"
            alt="LeadFast.io"
            width={60}
            height={60}
            className="rounded-xl relative"
          />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-medium">Votre Avis Compte</h1>
          <p className="text-sm text-black/60 max-w-lg">
            Nous sommes à l'écoute de vos retours pour améliorer continuellement
            notre service.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border p-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Évaluation */}
              <div>
                <h2 className="text-lg font-medium mb-2">
                  Évaluez votre expérience
                </h2>
                <p className="text-sm text-black/60 mb-3">
                  Dans quelle mesure êtes-vous satisfait de nos services ?
                </p>

                <div className="flex justify-center space-x-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        rating && rating >= star
                          ? "bg-gray-200 text-gray-700"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Aspects appréciés */}
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Qu'avez-vous le plus apprécié ?
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Interface", "Simplicité", "Rapidité", "Support"].map(
                      (aspect) => (
                        <div key={aspect} className="relative">
                          <input
                            type="checkbox"
                            id={aspect}
                            className="peer absolute h-0 w-0 opacity-0"
                          />
                          <label
                            htmlFor={aspect}
                            className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border p-1.5 text-xs peer-checked:border-gray-500 peer-checked:bg-gray-100 peer-checked:text-gray-800"
                          >
                            {aspect}
                          </label>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-3">
                    <textarea
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                      rows={3}
                      placeholder="Partagez vos suggestions d'amélioration..."
                    ></textarea>
                  </div>
                </div>

                {/* Coordonnées et envoi */}
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                      placeholder="Nom (facultatif)"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                      placeholder="Email (facultatif)"
                    />
                  </div>

                  <div className="pt-3">
                    <Button type="submit" className="w-full">
                      Envoyer mon feedback
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 text-gray-700"
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
              <h3 className="text-lg font-medium mb-2">
                Merci pour votre feedback !
              </h3>
              <p className="text-sm text-black/60">
                Vos commentaires sont précieux et nous aident à améliorer.
              </p>
              <p className="text-xs mt-3 text-black/40">
                Redirection automatique...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-center gap-3 pb-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/submitted")}
          className="px-6"
          size="sm"
        >
          Retour
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="px-6"
          size="sm"
        >
          Accueil
        </Button>
      </div>
    </div>
  );
}
