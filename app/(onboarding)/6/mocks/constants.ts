// Constants for step6 page
export const steps = ["1", "2", "3", "4", "5", "6"];

export const quantityPricing = [
  { value: "1000", label: "1000 leads", price: 30 },
  { value: "2000", label: "2000 leads", price: 55 },
  { value: "3000", label: "3000 leads", price: 80 },
  { value: "4000", label: "4000 leads", price: 105 },
  { value: "5000", label: "5000 leads", price: 125 },
  { value: "6000", label: "6000 leads", price: 140 },
  { value: "7000", label: "7000 leads", price: 155 },
  { value: "8000", label: "8000 leads", price: 170 },
  { value: "9000", label: "9000 leads", price: 185 },
  { value: "10000", label: "10000 leads", price: 200 },
] as const;

// Types
export type Step6FormValues = {
  leadQuantity: string;
};
