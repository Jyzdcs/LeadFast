"use client";

import React, { createContext, useContext, useState } from "react";

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
    company: string;
    expertise: string[];
  };
  step4?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  step5?: {
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
