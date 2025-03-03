import { industries } from "@/app/(onboarding)/2/mocks/constants";

// Types pour le mapping des paramètres du moteur de recherche
export interface SearchParameterMap {
  [key: string]: string | string[] | number | boolean | null;
}

/**
 * Mapping des paramètres du formulaire vers les paramètres du moteur de recherche
 * @param formData Données du formulaire
 * @returns Paramètres formatés pour l'URL du moteur de recherche
 */
export function mapFormToEngineParameters(formData: any): SearchParameterMap {
  const params: SearchParameterMap = {
    page: "1",
    sortAscending: "false",
    sortByField: "[none]",
  };

  // Mapping des intitulés de poste
  if (formData.positions && formData.positions.length > 0) {
    params.personTitles = formData.positions;
    params.titles = formData.positions.join(",");
  }

  // Mapping des niveaux hiérarchiques
  if (formData.seniority && formData.seniority.length > 0) {
    const seniorityMap: { [key: string]: string } = {
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

    const mappedSeniorities = formData.seniority.map(
      (s: string) => seniorityMap[s.toLowerCase()] || s
    );

    params.personSeniorities = mappedSeniorities;
    params.seniorities = mappedSeniorities.join(",");
  }

  // Mapping des secteurs d'activité
  if (formData.industries && formData.industries.length > 0) {
    const industryValues: string[] = [];
    const industryIds: string[] = [];

    formData.industries.forEach((industry: any) => {
      if (typeof industry === "object") {
        industryValues.push(industry.value || industry.label);
        if (industry.id) industryIds.push(industry.id);
      } else {
        industryValues.push(industry);

        // Chercher l'ID correspondant pour les industries fournies en string
        const match = industries.find(
          (ind) =>
            ind.value.toLowerCase() === industry.toLowerCase() ||
            ind.label.toLowerCase() === industry.toLowerCase()
        );

        if (match && match.id) {
          industryIds.push(match.id);
        }
      }
    });

    params.industries = industryValues.join(",");

    if (industryIds.length > 0) {
      params.organizationIndustryTagIds = industryIds;
    }
  }

  // Mapping des tailles d'entreprise
  if (formData.companySize && formData.companySize.length > 0) {
    const companyRanges = formData.companySize.map((size: string) => {
      // Conversion au format "min,max" accepté par le moteur
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
    });

    params.organizationNumEmployeesRanges = companyRanges;
  }

  // Ajout du nom d'entreprise si spécifié
  if (formData.company) {
    params.organizationNames = formData.company;
  }

  // Ajout des domaines d'expertise
  if (formData.expertise && formData.expertise.length > 0) {
    params.personDepartmentOrSubdepartments = formData.expertise;
  }

  // Vérification des emails uniquement
  params.contactEmailStatusV2 = ["verified"];
  params.emailStatuses = "verified";

  // Paramètres supplémentaires
  if (formData.keywords && formData.keywords.length > 0) {
    params.qKeywords = formData.keywords.join(" ");
  }

  if (formData.organizationTags && formData.organizationTags.length > 0) {
    params.qOrganizationKeywordTags = formData.organizationTags;
  }

  return params;
}
