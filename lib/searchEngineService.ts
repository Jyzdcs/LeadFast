import { industries } from "@/app/(onboarding)/2/mocks/constants";

// Constants with environment variable fallbacks
const SEARCH_ENGINE_BASE_URL =
  process.env.SEARCH_ENGINE_URL || "https://app.apollo.io/#/people";
const SEARCH_ENGINE_DOMAIN = process.env.SEARCH_ENGINE_DOMAIN || "apollo.io";

// Core interfaces
export interface Industry {
  id: string;
  value: string;
  label: string;
}

export interface SearchCriteria {
  // Base info
  firstName: string;
  lastName: string;
  email: string;

  // Job/Position criteria
  positions?: string[];
  excludedPositions?: string[];

  // Location criteria
  locations?: string[];
  excludedLocations?: string[];

  // Company criteria
  companyName?: string;
  companyKeywords?: string[];
  companySize?: string[];
  industries?: string[] | Industry[];

  // Hierarchical criteria
  seniority?: string[];
  departments?: string[];
  expertise?: string[];

  // Email verification
  verifiedEmailsOnly?: boolean;

  // Advanced search parameters
  keywords?: string[];
  organizationTags?: string[];
  searchFields?: string[];

  // Additional metadata for context
  numberOfLeads?: number;
  goals?: string;
  targetAudience?: string;
  details?: string;
  source?: string;
}

interface QueryParams {
  [key: string]: string | string[] | boolean | number | undefined;
}

/**
 * Formats a parameter with the correct syntax for Apollo URL
 */
function formatArrayParam(
  param: string | string[] | undefined
): string[] | undefined {
  if (!param) return undefined;
  return Array.isArray(param) ? param : [param];
}

/**
 * Maps seniority values to Apollo-specific formats
 */
function mapSeniorityValue(value: string): string {
  const seniorityMap: Record<string, string> = {
    cSuite: "c_suite",
    cLevel: "c_level",
    vp: "vp",
    director: "director",
    manager: "manager",
    senior: "senior",
    junior: "junior",
    founder: "founder",
    owner: "owner",
    partner: "partner",
    head: "head",
    intern: "intern",
  };

  return seniorityMap[value.toLowerCase()] || value;
}

/**
 * Maps industry names to their Apollo IDs
 */
function mapIndustryToId(industryValue: string): string | undefined {
  const match = industries.find(
    (ind) =>
      ind.value.toLowerCase() === industryValue.toLowerCase() ||
      ind.label.toLowerCase() === industryValue.toLowerCase()
  );

  return match?.id;
}

/**
 * Maps company size ranges to Apollo format
 */
function formatCompanySize(size: string): string {
  // Apollo expects company sizes in format "min,max"
  const sizeRanges: Record<string, string> = {
    "1-10": "1,10",
    "11-20": "11,20",
    "21-50": "21,50",
    "51-100": "51,100",
    "101-250": "101,250",
    "251-500": "251,500",
    "501-1000": "501,1000",
    "1001-5000": "1001,5000",
    "5001-10000": "5001,10000",
    "10001+": "10001,1000000",
  };

  return sizeRanges[size] || size;
}

/**
 * Maps search criteria to engine-specific query parameters
 */
function mapCriteriaToParams(criteria: SearchCriteria): QueryParams {
  const params: QueryParams = {
    page: "1",
    sortAscending: "false",
    sortByField: "[none]",
  };

  // Job titles / Positions
  if (criteria.positions && criteria.positions.length > 0) {
    params.personTitles = criteria.positions;
    // Also set the titles parameter (comma-separated string format)
    params.titles = criteria.positions.join(",");
  }

  // Excluded job titles
  if (criteria.excludedPositions && criteria.excludedPositions.length > 0) {
    params.personNotTitles = criteria.excludedPositions;
  }

  // Locations
  if (criteria.locations && criteria.locations.length > 0) {
    params.personLocations = criteria.locations;
  }

  // Excluded locations
  if (criteria.excludedLocations && criteria.excludedLocations.length > 0) {
    params.personNotLocations = criteria.excludedLocations;
  }

  // Company name/keywords
  if (criteria.companyName) {
    params.organizationNames = criteria.companyName;
  } else if (criteria.companyKeywords && criteria.companyKeywords.length > 0) {
    params.organizationKeywords = criteria.companyKeywords;
  }

  // Company size ranges
  if (criteria.companySize && criteria.companySize.length > 0) {
    params.organizationNumEmployeesRanges =
      criteria.companySize.map(formatCompanySize);
  }

  // Industries
  if (criteria.industries && criteria.industries.length > 0) {
    const industryIds: string[] = [];

    // Store the industry values for the industries parameter
    let industryValues: string[] = [];

    if (typeof criteria.industries[0] === "string") {
      // Handle string industry names
      const industryNames = criteria.industries as string[];
      industryNames.forEach((name) => {
        industryValues.push(name);
        const id = mapIndustryToId(name);
        if (id) industryIds.push(id);
      });
    } else {
      // Handle industry objects with IDs
      const industryObjects = criteria.industries as Industry[];
      industryObjects.forEach((industry) => {
        industryValues.push(industry.value || industry.label);
        if (industry.id) industryIds.push(industry.id);
      });
    }

    if (industryIds.length > 0) {
      params.organizationIndustryTagIds = industryIds;
    }

    // Set the industries parameter (comma-separated string format)
    if (industryValues.length > 0) {
      params.industries = industryValues.join(",");
    }
  }

  // Seniority levels
  if (criteria.seniority && criteria.seniority.length > 0) {
    // Map to Apollo's expected format
    const mappedSeniorities = criteria.seniority.map(mapSeniorityValue);

    // Use personSeniorities for array parameter format
    params.personSeniorities = mappedSeniorities;

    // Use seniorities for comma-separated string format
    params.seniorities = mappedSeniorities.join(",");
  }

  // Combined departments and expertise for personDepartmentOrSubdepartments
  const departmentFields: string[] = [];

  if (criteria.departments && criteria.departments.length > 0) {
    departmentFields.push(...criteria.departments);
  }

  if (criteria.expertise && criteria.expertise.length > 0) {
    departmentFields.push(...criteria.expertise);
  }

  if (departmentFields.length > 0) {
    params.personDepartmentOrSubdepartments = departmentFields;
  }

  // Email verification status - always set both parameters for compatibility
  params.contactEmailStatusV2 = ["verified"];
  params.emailStatuses = "verified";

  // Organization tags
  if (criteria.organizationTags && criteria.organizationTags.length > 0) {
    params.qOrganizationKeywordTags = criteria.organizationTags;
  }

  // Additional search parameters
  if (criteria.keywords && criteria.keywords.length > 0) {
    params.qKeywords = criteria.keywords.join(" ");
  }

  if (criteria.searchFields && criteria.searchFields.length > 0) {
    params.includedOrganizationKeywordFields = criteria.searchFields;
  } else {
    // Default search fields
    params.includedOrganizationKeywordFields = ["tags", "name"];
  }

  return params;
}

/**
 * Creates a properly formatted URL with parameters
 */
function buildSearchUrl(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;

      // Special handling for certain parameters that need array syntax
      const needsArraySyntax = [
        "contactEmailStatusV2",
        "personTitles",
        "organizationNumEmployeesRanges",
        "organizationIndustryTagIds",
        "personSeniorities",
        "personDepartmentOrSubdepartments",
        "includedOrganizationKeywordFields",
        "qOrganizationKeywordTags",
      ];

      if (needsArraySyntax.includes(key)) {
        value.forEach((item) => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else {
        // Join arrays for parameters that expect comma-separated values
        searchParams.append(key, value.join(","));
      }
    } else {
      // Handle single values
      searchParams.append(key, String(value));
    }
  }

  return `${SEARCH_ENGINE_BASE_URL}?${searchParams.toString()}`;
}

/**
 * Validates a search link
 */
export function validateSearchLink(link: string): {
  valid: boolean;
  message: string;
} {
  if (!link || link.trim() === "") {
    return { valid: false, message: "Le lien de recherche est vide" };
  }

  if (!link.includes(SEARCH_ENGINE_DOMAIN)) {
    return { valid: false, message: "Format du lien de recherche invalide" };
  }

  if (link.length < 20) {
    return { valid: false, message: "Le lien de recherche est trop court" };
  }

  return { valid: true, message: "Lien de recherche valide" };
}

/**
 * Generates a search link from criteria
 */
export function generateSearchLink(criteria: SearchCriteria): string {
  const params = mapCriteriaToParams(criteria);
  return buildSearchUrl(params);
}

/**
 * Adapts API request data to search criteria
 */
export function adaptRequestToSearchCriteria(requestData: any): SearchCriteria {
  return {
    firstName: requestData.firstName,
    lastName: requestData.lastName,
    email: requestData.email,
    positions: requestData.positions || [],
    seniority: requestData.seniority || [],
    industries: requestData.industries || [],
    companySize: requestData.companySize || [],
    companyName: requestData.company || "",
    expertise: requestData.expertise || [],
    organizationTags: requestData.organizationTags || [],
    keywords: requestData.keywords || [],
    verifiedEmailsOnly: true,
    numberOfLeads: requestData.numberOfLeads,
    goals: requestData.goals,
    targetAudience: requestData.targetAudience,
    details: requestData.details,
    source: requestData.source,
  };
}
