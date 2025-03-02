/**
 * Utility functions for making API calls to our backend routes
 */

// Type for feedback form data
export interface FeedbackFormData {
  name: string;
  email: string;
  feedback: string;
  rating?: number;
  [key: string]: any; // For additional dynamic fields
}

// Type for custom request form data
export interface DemandeSurMesureFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

// Type for campaign help form data
export interface AideCampagneFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  campaignType: string;
  targetAudience: string;
  goals: string;
  budget?: string;
  timeline?: string;
  additionalInfo?: string;
}

// Type for API response
interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit feedback form data to the API
 */
export async function submitFeedback(
  data: FeedbackFormData
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return {
      success: false,
      error: "Failed to submit feedback. Please try again later.",
    };
  }
}

/**
 * Submit custom request form data to the API
 */
export async function submitDemandeSurMesure(
  data: DemandeSurMesureFormData
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/demande-sur-mesure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error submitting custom request:", error);
    return {
      success: false,
      error: "Failed to submit your request. Please try again later.",
    };
  }
}

/**
 * Submit campaign help form data to the API
 */
export async function submitAideCampagne(
  data: AideCampagneFormData
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/aide-campagne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error submitting campaign help request:", error);
    return {
      success: false,
      error:
        "Failed to submit your campaign help request. Please try again later.",
    };
  }
}
