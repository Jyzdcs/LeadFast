import React from "react";
import { OnboardingProvider } from "../../contexts/OnboardingContext";
import "@/app/globals.css";
import { ClientLayout } from "./ClientLayout";

export const metadata = {
  title: "LeadFast - Génération de Leads",
  description: "Solution de prospection B2B",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <OnboardingProvider>
          <ClientLayout>{children}</ClientLayout>
        </OnboardingProvider>
      </body>
    </html>
  );
}
