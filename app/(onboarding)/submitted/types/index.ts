/**
 * Interface pour les données de requête Apollo
 */
export interface ApolloRequestData {
  firstName: string;
  lastName: string;
  email: string;
  positions: string[];
  seniority: string[];
  industries: string[] | { id: string; value: string; label: string }[];
  companySize: string[];
  company: string;
  expertise: string[];
  keywords: string[];
  organizationTags: string[];
  numberOfLeads?: number; // Nombre de leads sélectionné par l'utilisateur
}

/**
 * Props pour le composant Header
 */
export interface HeaderProps {
  isGeneratingLink: boolean;
}

/**
 * Props pour le composant ApolloActions
 */
export interface ApolloActionsProps {
  isGeneratingLink: boolean;
  onOpenApollo: () => void;
  onCopyApolloLink: () => void;
}

/**
 * Props pour le composant CTASection
 */
export interface CTASectionProps {
  onNavigate: (path: string) => void;
}

/**
 * Props pour un seul CTA Card
 */
export interface CTACardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  onClick: () => void;
}

/**
 * Props pour le composant Footer
 */
export interface FooterProps {
  onBackToHome: () => void;
}
