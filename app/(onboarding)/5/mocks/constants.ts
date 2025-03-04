// Constants for step6 page
export const steps = ["1", "2", "3", "4", "5"];

export const quantityPricing = [
  { value: "1000", label: "1000 leads", price: 29 },
  { value: "3000", label: "3000 leads", price: 79 },
  { value: "5000", label: "5000 leads", price: 99 },
  { value: "10000", label: "10000 leads", price: 199 },
  { value: "50000", label: "50000 leads", price: 500 },
] as const;
// Types
export type Step5FormValues = {
  leadQuantity: string;
};
