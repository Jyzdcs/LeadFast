"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Badge } from '@/components/ui/badge';
import { X, Building2, Users, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
import { StepIndicator } from '@/components/ui/step-indicator';
import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "@/components/ui/stepper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Step3FormValues = {
  activitySector: string[];
  companySize: string[];
};

// Liste des tailles d'entreprise avec leurs volumes de prospects
const employeeRanges = [
	{ value: '1-10', label: '1-10 employés' },
	{ value: '11-20', label: '11-20 employés' },
	{ value: '21-50', label: '21-50 employés' },
	{ value: '51-100', label: '51-100 employés' },
	{ value: '101-200', label: '101-200 employés' },
	{ value: '201-500', label: '201-500 employés' },
	{ value: '501-1000', label: '501-1000 employés' },
	{ value: '1001-2000', label: '1001-2000 employés' },
	{ value: '2001-5000', label: '2001-5000 employés' },
	{ value: '5001-10000', label: '5001-10000 employés' },
	{ value: '10001+', label: '10001+ employés' },
];

const industries = [
	{ value: 'writing_editing', label: 'Écriture & Édition' },
	{ value: 'wireless', label: 'Sans fil' },
	{ value: 'wine_spirits', label: 'Vin & Spiritueux' },
	{ value: 'veterinary', label: 'Vétérinaire' },
	{ value: 'warehousing', label: 'Entreposage' },
	{ value: 'venture_capital_private_equity', label: 'Capital-risque & Private Equity' },
	{ value: 'transportation_trucking_railroad', label: 'Transport / Camionnage / Chemin de fer' },
	{ value: 'tobacco', label: 'Tabac' },
	{ value: 'think_tanks', label: 'Think Tanks' },
	{ value: 'textiles', label: 'Textiles' },
	{ value: 'telecommunications', label: 'Télécommunications' },
	{ value: 'sports', label: 'Sports' },
	{ value: 'staffing_recruiting', label: 'Recrutement & Dotation' },
	{ value: 'shipbuilding', label: 'Construction navale' },
	{ value: 'semiconductors', label: 'Semi-conducteurs' },
	{ value: 'retail', label: 'Vente au détail' },
	{ value: 'security_investigations', label: 'Sécurité & Enquêtes' },
	{ value: 'renewables_environment', label: 'Énergies renouvelables & Environnement' },
	{ value: 'recreational_facilities_services', label: 'Équipements & Services récréatifs' },
	{ value: 'ranching', label: 'Élevage' },
	{ value: 'publishing', label: 'Édition' },
	{ value: 'railroad_manufacture', label: 'Fabrication de chemins de fer' },
	{ value: 'public_relations_communications', label: 'Relations publiques & Communication' },
	{ value: 'public_policy', label: 'Politique publique' },
	{ value: 'professional_training_coaching', label: 'Formation professionnelle & Coaching' },
	{ value: 'primary_secondary_education', label: 'Éducation primaire & secondaire' },
	{ value: 'plastics', label: 'Plastiques' },
	{ value: 'photography', label: 'Photographie' },
	{ value: 'philanthropy', label: 'Philanthropie' },
	{ value: 'performing_arts', label: 'Arts du spectacle' },
	{ value: 'paper_forest_products', label: 'Produits en papier & forestiers' },
	{ value: 'religious_institutions', label: 'Institutions religieuses' },
	{ value: 'public_safety', label: 'Sécurité publique' },
	{ value: 'real_estate', label: 'Immobilier' },
	{ value: 'program_development', label: 'Développement de programmes' },
	{ value: 'research', label: 'Recherche' },
	{ value: 'pharmaceuticals', label: 'Pharmaceutique' },
	{ value: 'political_organization', label: 'Organisation politique' },
	{ value: 'accounting', label: 'Comptabilité' },
	{ value: 'airlines_aviation', label: 'Compagnies aériennes / Aviation' },
	{ value: 'agriculture', label: 'Agriculture' },
	{ value: 'alternative_medicine', label: 'Médecine alternative' },
	{ value: 'animation', label: 'Animation' },
	{ value: 'apparel_fashion', label: 'Vêtements & Mode' },
	{ value: 'architecture_planning', label: 'Architecture & Planification' },
	{ value: 'arts_crafts', label: 'Arts & Artisanat' },
	{ value: 'automotive', label: 'Automobile' },
	{ value: 'aviation_aerospace', label: 'Aviation & Aérospatiale' },
	{ value: 'banking', label: 'Banque' },
	{ value: 'biotechnology', label: 'Biotechnologie' },
	{ value: 'broadcast_media', label: 'Médias de diffusion' },
	{ value: 'building_materials', label: 'Matériaux de construction' },
	{ value: 'business_supplies_equipment', label: 'Fournitures & Équipements professionnels' },
	{ value: 'capital_markets', label: 'Marchés des capitaux' },
	{ value: 'chemicals', label: 'Produits chimiques' },
	{ value: 'civic_social_organization', label: 'Organisation civique & sociale' },
	{ value: 'civil_engineering', label: 'Génie civil' },
	{ value: 'commercial_real_estate', label: 'Immobilier commercial' },
	{ value: 'computer_network_security', label: 'Sécurité informatique & réseaux' },
	{ value: 'computer_games', label: 'Jeux informatiques' },
	{ value: 'computer_hardware', label: 'Matériel informatique' },
	{ value: 'computer_networking', label: 'Réseaux informatiques' },
	{ value: 'computer_software', label: 'Logiciels informatiques' },
	{ value: 'construction', label: 'Construction' },
	{ value: 'consumer_electronics', label: 'Électronique grand public' },
	{ value: 'consumer_goods', label: 'Biens de consommation' },
	{ value: 'consumer_services', label: 'Services aux consommateurs' },
	{ value: 'cosmetics', label: 'Cosmétiques' },
	{ value: 'dairy', label: 'Laitier' },
	{ value: 'defense_space', label: 'Défense & Espace' },
	{ value: 'design', label: 'Design' },
	{ value: 'e_learning', label: 'E-learning' },
	{ value: 'education_management', label: 'Gestion de l\'éducation' },
	{ value: 'electrical_electronic_manufacturing', label: 'Fabrication électrique / électronique' },
	{ value: 'entertainment', label: 'Divertissement' },
	{ value: 'environmental_services', label: 'Services environnementaux' },
	{ value: 'events_services', label: 'Services événementiels' },
	{ value: 'executive_office', label: 'Bureau exécutif' },
	{ value: 'facilities_services', label: 'Services d\'installation' },
	{ value: 'farming', label: 'Agriculture' },
	{ value: 'financial_services', label: 'Services financiers' },
	{ value: 'fine_art', label: 'Beaux-arts' },
	{ value: 'fishery', label: 'Pêche' },
	{ value: 'food_beverages', label: 'Alimentation & Boissons' },
	{ value: 'food_production', label: 'Production alimentaire' },
	{ value: 'fund_raising', label: 'Collecte de fonds' },
	{ value: 'furniture', label: 'Meubles' },
	{ value: 'gambling_casinos', label: 'Jeux de hasard & Casinos' },
	{ value: 'glass_ceramics_concrete', label: 'Verre, Céramique & Béton' },
	{ value: 'government_administration', label: 'Administration gouvernementale' },
	{ value: 'government_relations', label: 'Relations gouvernementales' },
	{ value: 'graphic_design', label: 'Conception graphique' },
	{ value: 'health_wellness_fitness', label: 'Santé, Bien-être & Fitness' },
	{ value: 'alternative_dispute_resolution', label: 'Résolution alternative des litiges' },
	{ value: 'higher_education', label: 'Enseignement supérieur' },
	{ value: 'hospital_health_care', label: 'Hôpital & Soins de santé' },
	{ value: 'hospitality', label: 'Hôtellerie' },
	{ value: 'human_resources', label: 'Ressources humaines' },
	{ value: 'import_export', label: 'Import / Export' },
	{ value: 'individual_family_services', label: 'Services aux individus & familles' },
	{ value: 'industrial_automation', label: 'Automatisation industrielle' },
	{ value: 'information_services', label: 'Services d\'information' },
	{ value: 'information_technology_services', label: 'Technologie de l\'information & Services' },
	{ value: 'insurance', label: 'Assurance' },
	{ value: 'international_affairs', label: 'Affaires internationales' },
	{ value: 'international_trade_development', label: 'Commerce international & Développement' },
	{ value: 'investment_banking', label: 'Banque d\'investissement' },
	{ value: 'investment_management', label: 'Gestion d\'investissements' },
	{ value: 'judiciary', label: 'Judiciaire' },
	{ value: 'law_enforcement', label: 'Application de la loi' },
	{ value: 'law_practice', label: 'Pratique du droit' },
	{ value: 'internet', label: 'Internet' },
	{ value: 'legal_services', label: 'Services juridiques' },
	{ value: 'legislative_office', label: 'Bureau législatif' },
	{ value: 'leisure_travel_tourism', label: 'Loisirs, Voyage & Tourisme' },
	{ value: 'libraries', label: 'Bibliothèques' },
	{ value: 'logistics_supply_chain', label: 'Logistique & Chaîne d\'approvisionnement' },
	{ value: 'luxury_goods_jewelry', label: 'Articles de luxe & Bijouterie' },
	{ value: 'machinery', label: 'Machinerie' },
	{ value: 'management_consulting', label: 'Conseil en gestion' },
	{ value: 'maritime', label: 'Maritime' },
	{ value: 'market_research', label: 'Étude de marché' },
	{ value: 'marketing_advertising', label: 'Marketing & Publicité' },
	{ value: 'mechanical_industrial_engineering', label: 'Génie mécanique ou industriel' },
	{ value: 'media_production', label: 'Production médiatique' },
	{ value: 'medical_devices', label: 'Dispositifs médicaux' },
	{ value: 'medical_practice', label: 'Pratique médicale' },
	{ value: 'mental_health_care', label: 'Soins de santé mentale' },
	{ value: 'military', label: 'Militaire' },
	{ value: 'mining_metals', label: 'Exploitation minière & Métaux' },
	{ value: 'motion_pictures_film', label: 'Cinéma & Film' },
	{ value: 'museums_institutions', label: 'Musées & Institutions' },
	{ value: 'music', label: 'Musique' },
	{ value: 'nanotechnology', label: 'Nanotechnologie' },
	{ value: 'newspapers', label: 'Journaux' },
	{ value: 'nonprofit_organization_management', label: 'Gestion d\'organisations à but non lucratif' },
	{ value: 'oil_energy', label: 'Pétrole & Énergie' },
	{ value: 'online_media', label: 'Médias en ligne' },
	{ value: 'outsourcing_offshoring', label: 'Externalisation / Délocalisation' },
	{ value: 'package_freight_delivery', label: 'Livraison de colis / fret' },
	{ value: 'packaging_containers', label: 'Emballage & Conteneurs' },
	{ value: 'printing', label: 'Impression' },
	{ value: 'restaurants', label: 'Restaurants' },
	{ value: 'sporting_goods', label: 'Articles de sport' },
	{ value: 'supermarkets', label: 'Supermarchés' },
	{ value: 'translation_localization', label: 'Traduction & Localisation' },
	{ value: 'utilities', label: 'Services publics' },
	{ value: 'wholesale', label: 'Vente en gros' },
];

// Constants
const steps = ["1", "2", "3", "4", "5", "6"];

export default function Step3() {
  const { data, setData } = useOnboarding();
  const router = useRouter();
  const [selectedSector, setSelectedSector] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");

  console.log(data);
  const form = useForm<Step3FormValues>({
    defaultValues: {
      activitySector: data.step3?.activitySector || [],
      companySize: data.step3?.companySize || [],
    },
  });

  // Gestion des secteurs d'activité
  React.useEffect(() => {
    if (selectedSector) {
      const currentSectors = form.getValues("activitySector") || [];
      if (!currentSectors.includes(selectedSector)) {
        form.setValue("activitySector", [...currentSectors, selectedSector]);
      }
      setSelectedSector(""); // Reset après ajout
    }
  }, [selectedSector, form]);

  // Gestion des tailles d'entreprise
  React.useEffect(() => {
    if (selectedSize) {
      const currentSizes = form.getValues("companySize") || [];
      if (!currentSizes.includes(selectedSize)) {
        form.setValue("companySize", [...currentSizes, selectedSize]);
      }
      setSelectedSize(""); // Reset après ajout
    }
  }, [selectedSize, form]);

  const handleRemoveSector = (valueToRemove: string) => {
    const currentSectors = form.getValues("activitySector");
    form.setValue(
      "activitySector",
      currentSectors.filter((sector) => sector !== valueToRemove)
    );
  };

  const handleRemoveSize = (valueToRemove: string) => {
    const currentSizes = form.getValues("companySize");
    form.setValue(
      "companySize",
      currentSizes.filter((size) => size !== valueToRemove)
    );
  };

  const onSubmit = async (values: Step3FormValues) => {
    setData({ step3: values });
    router.push("/onboarding/step4");
  };

  return (
    <div className="flex flex-col h-screen w-[85%]">
      {/* Header Section */}
      <div className="w-full border-b border-zinc-100">
        <div className="w-full px-6 py-3">
          <div className="flex flex-col gap-2">
            <StepIndicator 
              step={3} 
              label="Entreprises Cibles" 
              className="text-base font-medium text-zinc-900"
            />
            <Stepper value={3} className="w-full gap-1">
              {steps.map((step) => (
                <StepperItem key={step} step={Number(step)} className="flex-1">
                  <StepperTrigger className="w-full" asChild>
                    <StepperIndicator 
                      asChild 
                      className="relative h-1 w-full rounded-full bg-zinc-100 overflow-hidden"
                    >
                      <div>
                        <div className="absolute inset-0 bg-black opacity-0 data-[active=true]:opacity-100 transition-opacity duration-300" />
                        <span className="sr-only">{step}</span>
                      </div>
                    </StepperIndicator>
                  </StepperTrigger>
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 flex flex-col h-full">
        {/* Form Section */}
        <div className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Activity Sector Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                Secteurs d'activité
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                        <InfoIcon className="h-4 w-4 text-zinc-500" />
                        <span className="sr-only">Plus d'informations sur les secteurs d'activité</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      sideOffset={8}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Secteurs d'activité</p>
                        <p className="text-zinc-300">Sélectionnez les secteurs d'activité qui correspondent à vos cibles pour une prospection ciblée et efficace.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Combobox
                options={industries.map((industry) => ({
                  id: industry.value,
                  label: industry.label,
                  desc: industry.label,
                }))}
                value={selectedSector}
                onChange={setSelectedSector}
                placeholder="Sélectionner un secteur..."
                searchPlaceholder="Rechercher un secteur..."
                icon={<Building2 className="w-4 h-4 text-zinc-500" />}
                className="w-full"
              />
              <div className="flex flex-wrap gap-2">
                {form.watch("activitySector")?.map((sector) => (
                  <Badge
                    key={sector}
                    variant="secondary"
                    className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
                  >
                    {industries.find((i) => i.value === sector)?.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveSector(sector)}
                      className="focus:outline-none group"
                    >
                      <X className="h-3 w-3 text-zinc-500 group-hover:text-zinc-700" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Company Size Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                Tailles d'entreprise
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950">
                        <InfoIcon className="h-4 w-4 text-zinc-500" />
                        <span className="sr-only">Plus d'informations sur les tailles d'entreprise</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      className="max-w-[280px] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-50 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      sideOffset={8}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Tailles d'entreprise</p>
                        <p className="text-zinc-300">Affinez votre ciblage en sélectionnant les tailles d'entreprises qui correspondent à votre marché idéal.</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Combobox
                options={employeeRanges.map((range) => ({
                  id: range.value,
                  label: range.label,
                  desc: range.label,
                }))}
                value={selectedSize}
                onChange={setSelectedSize}
                placeholder="Sélectionner une taille..."
                searchPlaceholder="Rechercher une taille..."
                icon={<Users className="w-4 h-4 text-zinc-500" />}
                className="w-full"
              />
              <div className="flex flex-wrap gap-2">
                {form.watch("companySize")?.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="px-2.5 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center gap-1.5 transition-colors duration-200"
                  >
                    {employeeRanges.find((s) => s.value === size)?.label}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="focus:outline-none group"
                    >
                      <X className="h-3 w-3 text-zinc-500 group-hover:text-zinc-700" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Feature Section - You can add your feature section here */}
        <div className="flex-1 relative mt-4 min-h-0">
          {/* Add your feature section component here */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between py-4 border-t border-zinc-100 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/onboarding/step2")}
            className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-9"
          >
            Retour
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-black hover:bg-black/90 text-white h-9 px-6"
          >
            Continuer
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
