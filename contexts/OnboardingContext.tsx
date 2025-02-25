"use client";

import React, { createContext, useContext, useState } from "react";

type OnboardingData = {
  step1?: {
    // Informations de base
    company: string;
    expertise: Array<string>;
  };
  step2?: {
    jobTitle: string[];
    managementLevel: string[];
  };
  step3?: {
    activitySector: string[];
    companySize: string[];
  };
  step4?: {
    emailType: string[];
    emailStatus: string[];
  };
  step5?: {
    // Informations personnelles
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  step6?: {
    leadQuantity: string;
  };
};

interface OnboardingContextType {
  data: OnboardingData;
  setData: (update: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setFormData] = useState<OnboardingData>({});

  const setData = (newData: Partial<OnboardingData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
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
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
