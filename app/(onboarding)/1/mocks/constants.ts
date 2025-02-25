// Constants for step2 page
export const steps = ["1", "2", "3", "4", "5", "6"];

export const managementLevels = [
  { value: "junior", label: "Junior" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Directeur" },
  { value: "vp", label: "VP" },
  { value: "csuite", label: "C-Level" },
];

// Types
export type Step1FormValues = {
  jobTitle: string[];
  managementLevel: string[];
};
