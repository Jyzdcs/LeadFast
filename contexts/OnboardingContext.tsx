"use client";

import React, { createContext, useContext, useState } from 'react';

type OnboardingData = {
  step1?: {
    jobTitle: string[];
    managementLevel: string[];
  };
  step2?: {
    activitySector: string[];
    companySize: string[];
  };
  step3?: {
    // Informations professionnelles
    company: string;
	expertise: Array<string>;
  };
  step4?: {
    // Préférences de communication
    phoneNumber: string;
    preferredContact: 'email' | 'phone';
    newsletter: boolean;
  };
  step5?: {
    // Informations personnelles
    firstName: string;
    lastName: string;
	phoneNumber: string;
	email: string;
  };
  step6?: {
    // Configuration du compte
    username: string;
    timezone: string;
    language: string;
  };
  // Ajoute d'autres étapes au besoin...
};

interface OnboardingContextType {
  data: OnboardingData;
  setData: (update: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setFormData] = useState<OnboardingData>({});

  const setData = (newData: Partial<OnboardingData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
