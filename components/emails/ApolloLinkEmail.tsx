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
} from "@react-email/components";

interface ApolloLinkEmailProps {
  firstName: string;
  lastName: string;
  apolloLink: string;
}

export const ApolloLinkEmail = ({
  firstName,
  lastName,
  apolloLink,
}: ApolloLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Votre recherche Apollo est prête !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Bonjour {firstName} {lastName},
          </Heading>
          <Text style={paragraph}>
            Nous avons préparé votre recherche Apollo en fonction de vos
            critères.
          </Text>
          <Text style={paragraph}>
            Vous pouvez accéder à votre recherche avec le lien ci-dessous :
          </Text>
          <Link href={apolloLink} style={button}>
            Accéder à ma recherche Apollo
          </Link>
          <Text style={paragraph}>
            Ou copiez ce lien dans votre navigateur :{" "}
            <Link href={apolloLink} style={link}>
              {apolloLink}
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

export default ApolloLinkEmail;
