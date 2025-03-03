import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface SearchLinkEmailProps {
  firstName: string;
  lastName: string;
  searchLink: string;
  numberOfLeads?: number; // Nombre de leads choisis par l'utilisateur
  // Informations supplémentaires de l'utilisateur
  positions?: string[]; // Intitulé de poste précis
  seniority?: string[]; // Niveau hiérarchique
  industries?: string[] | any[]; // Secteur d'activité
  companySize?: string[]; // Taille d'entreprise
  company?: string; // Nom de l'entreprise
  expertise?: string[]; // Domaine d'expertise
}

export const SearchLinkEmail = ({
  firstName,
  lastName,
  searchLink,
  numberOfLeads = 0, // Valeur par défaut pour éviter undefined
  positions = [],
  seniority = [],
  industries = [],
  companySize = [],
  company = "",
  expertise = [],
}: SearchLinkEmailProps) => {
  // Formatage pour l'affichage
  const leadsCount = numberOfLeads || "plusieurs";

  // Formatage des tableaux pour l'affichage
  const formatArray = (arr: any[]): string => {
    if (!arr || arr.length === 0) return "Non spécifié";
    return arr
      .map((item) =>
        typeof item === "object" ? item.label || item.value || item : item
      )
      .join(", ");
  };

  return (
    <Html>
      <Head />
      <Preview>{`Votre recherche avec ${leadsCount} leads est prête !`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Bonjour {firstName} {lastName},
          </Heading>
          <Text style={paragraph}>
            Nous avons préparé votre recherche en fonction de vos critères,
            contenant <strong>{numberOfLeads}</strong> leads qualifiés.
          </Text>

          <Section style={criteriaSection}>
            <Heading style={h2}>Récapitulatif de vos critères</Heading>

            <Row>
              <Column>
                <Text style={criteriaLabel}>Recherche de :</Text>
              </Column>
              <Column>
                <Text style={criteriaValue}>{formatArray(positions)}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={criteriaLabel}>Niveau hiérarchique :</Text>
              </Column>
              <Column>
                <Text style={criteriaValue}>{formatArray(seniority)}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={criteriaLabel}>Secteur d'activité :</Text>
              </Column>
              <Column>
                <Text style={criteriaValue}>{formatArray(industries)}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={criteriaLabel}>Taille d'entreprise :</Text>
              </Column>
              <Column>
                <Text style={criteriaValue}>{formatArray(companySize)}</Text>
              </Column>
            </Row>

            {company && (
              <Row>
                <Column>
                  <Text style={criteriaLabel}>Entreprise :</Text>
                </Column>
                <Column>
                  <Text style={criteriaValue}>{company}</Text>
                </Column>
              </Row>
            )}

            <Row>
              <Column>
                <Text style={criteriaLabel}>Domaine d'expertise :</Text>
              </Column>
              <Column>
                <Text style={criteriaValue}>{formatArray(expertise)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Text style={paragraph}>
            Vous pouvez accéder à votre recherche avec le lien ci-dessous :
          </Text>
          <Link href={searchLink} style={button}>
            Accéder à ma recherche
          </Link>
          <Text style={paragraph}>
            Ou copiez ce lien dans votre navigateur :{" "}
            <Link href={searchLink} style={link}>
              {searchLink}
            </Link>
          </Text>
          <Text style={paragraph}>
            Si vous avez des questions, n'hésitez pas à nous contacter.
          </Text>
          <Text style={paragraph}>
            Cordialement,
            <br />
            L'équipe LeadFast
          </Text>
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

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "5px",
  color: "#fff",
  display: "block",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "25px auto",
  padding: "12px 20px",
  textAlign: "center" as const,
  textDecoration: "none",
  width: "fit-content",
};

const link = {
  color: "#2563eb",
  textDecoration: "underline",
};

const criteriaSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "4px",
  padding: "15px",
  margin: "20px 0",
};

const criteriaLabel = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "8px 0",
};

const criteriaValue = {
  color: "#1f2937",
  fontSize: "14px",
  margin: "8px 0",
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "20px 0",
};

export default SearchLinkEmail;
