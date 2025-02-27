// Constants for step2 page
export const steps = ["1", "2", "3", "4", "5"];

export const managementLevels = [
  { value: "junior", label: "Junior" },
  { value: "founder", label: "Founder" },
  { value: "senior", label: "Senior" },
  { value: "head", label: "Head" },
  { value: "partner", label: "Partner" },
  { value: "intern", label: "Intern" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "vp", label: "VP" },
  { value: "csuite", label: "C-Level" },
];

// Types
export type Step1FormValues = {
  jobTitle: string[];
  managementLevel: string[];
};
