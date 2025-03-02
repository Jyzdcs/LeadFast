import React from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number | null;
  setRating: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
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
