import * as React from "react";
import { FeedbackEmailData } from "@/types/email";

export const FeedbackTemplate: React.FC<
  Omit<FeedbackEmailData, "to" | "subject">
> = ({ fullName, email, rating, appreciatedAspects, comments }) => {
  // Fonction pour afficher les étoiles selon la note
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const filled = index < rating;
        return (
          <span
            key={index}
            style={{
              color: filled ? "#F5A623" : "#D8D8D8",
              fontSize: "24px",
              margin: "0 2px",
            }}
          >
            ★
          </span>
        );
      });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h1
        style={{
          color: "#333",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        Nouveau feedback client
      </h1>

      <div style={{ margin: "20px 0" }}>
        <p>
          <strong>Nom:</strong> {fullName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>

        <div style={{ margin: "20px 0" }}>
          <p>
            <strong>Évaluation:</strong>
          </p>
          <div style={{ margin: "10px 0" }}>{renderStars(rating)}</div>
          <p>
            <strong>Note:</strong> {rating}/5
          </p>
        </div>

        {appreciatedAspects && appreciatedAspects.length > 0 && (
          <div style={{ margin: "20px 0" }}>
            <p>
              <strong>Aspects appréciés:</strong>
            </p>
            <ul style={{ paddingLeft: "20px" }}>
              {appreciatedAspects.map((aspect, index) => (
                <li key={index}>{aspect}</li>
              ))}
            </ul>
          </div>
        )}

        {comments && (
          <div
            style={{
              margin: "20px 0",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Commentaires:</h3>
            <p style={{ whiteSpace: "pre-line" }}>{comments}</p>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "30px",
          fontSize: "14px",
          color: "#666",
          borderTop: "1px solid #eee",
          paddingTop: "10px",
        }}
      >
        <p>
          Cet email a été envoyé automatiquement depuis le formulaire de
          feedback LeadFast
        </p>
      </div>
    </div>
  );
};
