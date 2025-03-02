import * as React from "react";
import { CampaignHelpEmailData } from "@/types/email";

export const CampaignHelpTemplate: React.FC<
  Omit<CampaignHelpEmailData, "to" | "subject">
> = ({ fullName, email, service, needs }) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      <h1
        style={{
          color: "#333",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        Nouvelle demande d'aide campagne
      </h1>

      <div style={{ margin: "20px 0" }}>
        <p>
          <strong>Nom:</strong> {fullName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Service demandé:</strong> {service}
        </p>

        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Description des besoins:</h3>
          <p style={{ whiteSpace: "pre-line" }}>{needs}</p>
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
          Cet email a été envoyé automatiquement depuis le formulaire d'aide
          campagne LeadFast
        </p>
      </div>
    </div>
  );
};
