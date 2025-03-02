import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface AideCampagneEmailProps {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  campaignType: string;
  targetAudience: string;
  goals: string;
  budget?: string;
  timeline?: string;
  additionalInfo?: string;
}

export const AideCampagneEmail = ({
  fullName,
  company,
  email,
  phone,
  campaignType,
  targetAudience,
  goals,
  budget,
  timeline,
  additionalInfo,
}: AideCampagneEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{`Nouvelle demande d'aide campagne de ${fullName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nouvelle Demande d'Aide Campagne</Heading>

          <Text style={paragraph}>
            <strong>Date:</strong> {new Date().toLocaleString("fr-FR")}
          </Text>

          <Hr style={divider} />

          <Section>
            <Heading style={h2}>Informations de contact</Heading>
            <Text style={paragraph}>
              <strong>Nom complet:</strong> {fullName}
            </Text>
            <Text style={paragraph}>
              <strong>Entreprise:</strong> {company}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={paragraph}>
              <strong>Téléphone:</strong> {phone}
            </Text>
          </Section>

          <Hr style={divider} />

          <Section>
            <Heading style={h2}>Détails de la campagne</Heading>
            <Text style={paragraph}>
              <strong>Type de campagne:</strong> {campaignType}
            </Text>
            <Text style={paragraph}>
              <strong>Audience cible:</strong> {targetAudience}
            </Text>
            <Text style={paragraph}>
              <strong>Objectifs:</strong>
            </Text>
            <Text style={contentText}>{goals}</Text>

            {budget && (
              <Text style={paragraph}>
                <strong>Budget:</strong> {budget}
              </Text>
            )}

            {timeline && (
              <Text style={paragraph}>
                <strong>Calendrier:</strong> {timeline}
              </Text>
            )}
          </Section>

          {additionalInfo && (
            <>
              <Hr style={divider} />
              <Section>
                <Heading style={h2}>Informations supplémentaires</Heading>
                <Text style={contentText}>{additionalInfo}</Text>
              </Section>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20, 50, 70, 0.2)",
  margin: "0 auto",
  maxWidth: "600px",
  padding: "20px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "20px 0 10px",
  padding: "0",
};

const paragraph = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const contentText = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  padding: "15px",
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
  whiteSpace: "pre-line" as const,
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "20px 0",
};

export default AideCampagneEmail;
