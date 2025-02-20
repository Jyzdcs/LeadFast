"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepIndicator } from '../components/StepIndicator';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Types pour le formulaire
type Step2FormValues = {
  activitySector: string[];
  companySize: string;
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

  // Initialisation du formulaire avec un tableau vide pour activitySector
  const form = useForm<Step2FormValues>({
    defaultValues: {
      activitySector: [],
      companySize: '',
    }
  });

  // Fonction pour gérer la sélection/déselection des secteurs
  const handleSectorChange = (value: string) => {
    const currentSectors = form.getValues('activitySector');
    let newSectors: string[];

    if (currentSectors.includes(value)) {
      // Si le secteur est déjà sélectionné, on le retire
      newSectors = currentSectors.filter(sector => sector !== value);
    } else {
      // Sinon, on l'ajoute
      newSectors = [...currentSectors, value];
    }

    form.setValue('activitySector', newSectors);
  };

  // Soumission du formulaire
  const onSubmit = async (values: Step2FormValues) => {
    setData({ step2: values });
    router.push('/onboarding/step3');
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={2} />
      
      {/* En-tête de la page */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Entreprise cible</h1>
        <p className="text-muted-foreground">
          Définissez le secteur d'activité et la taille de l'entreprise de vos prospects
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Remplacer l'Input par un Select multiple pour les secteurs d'activité */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Secteurs d'activité
          </label>
          <Select
            onValueChange={handleSectorChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez un ou plusieurs secteurs" />
            </SelectTrigger>
            <SelectContent>
              {/* Groupe les industries par ordre alphabétique pour une meilleure UX */}
              {industries
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((industry) => (
                  <SelectItem 
                    key={industry.value} 
                    value={industry.value}
                    className={cn(
                      "cursor-pointer hover:bg-primary/5",
                      // Ajoute une classe pour indiquer si l'item est sélectionné
                      form.watch('activitySector').includes(industry.value) && "bg-primary/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-grow">{industry.label}</div>
                      {/* Affiche un indicateur de sélection */}
                      {form.watch('activitySector').includes(industry.value) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          {/* Affichage des secteurs sélectionnés */}
          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch('activitySector').map((sectorValue) => {
              const sector = industries.find(i => i.value === sectorValue);
              return (
                <Badge
                  key={sectorValue}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleSectorChange(sectorValue)}
                >
                  {sector?.label} ×
                </Badge>
              );
            })}
          </div>

          {form.formState.errors.activitySector && (
            <span className="text-sm text-destructive">
              {form.formState.errors.activitySector.message}
            </span>
          )}
        </div>

        {/* Select pour la taille d'entreprise */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Taille de l'entreprise
          </label>
          <Select
            onValueChange={(value) => form.setValue('companySize', value )}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez une taille d'entreprise" />
            </SelectTrigger>
            <SelectContent>
              {employeeRanges.map((range) => (
                <SelectItem 
                  key={range.value} 
                  value={range.value}
                  className="cursor-pointer hover:bg-primary/5"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.companySize && (
            <span className="text-sm text-destructive">
              {form.formState.errors.companySize.message}
            </span>
          )}
        </div>

        {/* Boutons de navigation */}
        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/onboarding/step1')}
            className="w-full"
          >
            Retour
          </Button>
          <Button 
            type="submit" 
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Chargement...' : 'Continuer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
