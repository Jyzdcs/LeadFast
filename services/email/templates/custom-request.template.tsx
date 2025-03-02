import * as React from "react";
import { CustomRequestEmailData } from "@/types/email";

export const CustomRequestTemplate: React.FC<
  Omit<CustomRequestEmailData, "to" | "subject">
> = ({ fullName, company, email, phone, description }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h1
        style={{
          color: "#333",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        Nouvelle demande sur mesure
      </h1>

      <div style={{ margin: "20px 0" }}>
        <p>
          <strong>Nom:</strong> {fullName}
        </p>
        <p>
          <strong>Entreprise:</strong> {company}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        {phone && (
          <p>
            <strong>Téléphone:</strong> {phone}
          </p>
        )}

        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Description détaillée:</h3>
          <p style={{ whiteSpace: "pre-line" }}>{description}</p>
        </div>
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
          Cet email a été envoyé automatiquement depuis le formulaire de demande
          sur mesure LeadFast
        </p>
      </div>
    </div>
  );
};
