"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type Step2FormValues = {
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

export default function Step2() {
  const { data, setData } = useOnboarding();
  const router = useRouter();

  const form = useForm<Step2FormValues>({
    defaultValues: {
      activitySector: data.step2?.activitySector || [],
      companySize: data.step2?.companySize || [],
    },
  });

  const handleAddSector = (value: string) => {
    const currentSectors = form.getValues('activitySector') || [];
    if (!currentSectors.includes(value)) {
      form.setValue('activitySector', [...currentSectors, value]);
    }
  };

  const handleRemoveSector = (valueToRemove: string) => {
    const currentSectors = form.getValues('activitySector');
    form.setValue(
      'activitySector',
      currentSectors.filter((sector) => sector !== valueToRemove)
    );
  };

  const handleAddSize = (value: string) => {
    const currentSizes = form.getValues('companySize') || [];
    if (!currentSizes.includes(value)) {
      form.setValue('companySize', [...currentSizes, value]);
    }
  };

  const handleRemoveSize = (valueToRemove: string) => {
    const currentSizes = form.getValues('companySize');
    form.setValue(
      'companySize',
      currentSizes.filter((size) => size !== valueToRemove)
    );
  };

  const onSubmit = async (values: Step2FormValues) => {
    setData({ step2: values });
    router.push('/onboarding/step3');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="space-y-8 flex-1">
        <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <span className="text-sm text-gray-600">Étape 2 - Entreprise cible</span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Entreprise cible
          </h1>
          <p className="text-gray-600">
            Définissez le profil des entreprises que vous souhaitez cibler.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteurs d'activité
              </label>
              <Select onValueChange={handleAddSector}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sélectionnez les secteurs" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem
                      key={industry.value}
                      value={industry.value}
                      className="cursor-pointer hover:bg-primary/5"
                    >
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch('activitySector')?.map((sector) => (
                  <Badge
                    key={sector}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {industries.find((i) => i.value === sector)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveSector(sector)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tailles d'entreprise
              </label>
              <Select onValueChange={handleAddSize}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Sélectionnez les tailles" />
                </SelectTrigger>
                <SelectContent>
                  {employeeRanges.map((size) => (
                    <SelectItem
                      key={size.value}
                      value={size.value}
                      className="cursor-pointer hover:bg-primary/5"
                    >
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2 mt-3">
                {form.watch('companySize')?.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {employeeRanges.find((s) => s.value === size)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveSize(size)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/onboarding/step1')}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Chargement...' : 'Continuer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
