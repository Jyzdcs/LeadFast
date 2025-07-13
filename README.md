# LeadFast - Plateforme de Génération de Leads B2B

## 🚀 Vue d'ensemble

LeadFast est une plateforme moderne de génération de leads B2B qui permet aux entreprises de créer facilement des listes de prospects qualifiés. L'application guide les utilisateurs à travers un processus d'onboarding intuitif en 5 étapes pour définir leurs critères de recherche et générer automatiquement des liens de recherche personnalisés.

## ✨ Fonctionnalités principales

### 🎯 Processus d'onboarding intelligent
- **Étape 1** : Définition des postes et niveaux de management cibles
- **Étape 2** : Sélection des secteurs d'activité et tailles d'entreprise
- **Étape 3** : Spécification des entreprises et expertises
- **Étape 4** : Collecte des informations personnelles
- **Étape 5** : Choix de la quantité de leads souhaitée

### 📧 Système d'emails automatisé
- Envoi automatique des liens de recherche aux utilisateurs
- Notifications internes à l'équipe
- Templates d'emails personnalisés avec React Email

### 🔍 Génération de liens de recherche
- Intégration avec Apollo.io pour la recherche de prospects
- Conversion automatique des critères en paramètres de recherche
- Validation et optimisation des liens générés

### 💬 Services supplémentaires
- **Aide campagne** : Assistance pour la création de campagnes
- **Demande sur mesure** : Service personnalisé pour des besoins spécifiques
- **Feedback** : Système de retour d'expérience utilisateur

## 🏗️ Architecture technique

### Stack technologique
- **Frontend** : Next.js 14 avec App Router
- **UI/UX** : React 18, Tailwind CSS, Framer Motion
- **Composants** : Radix UI, Lucide React, Heroicons
- **Gestion d'état** : React Context API
- **Formulaires** : React Hook Form
- **Emails** : React Email + Resend
- **Authentification** : NextAuth.js avec Clerk
- **Langues** : TypeScript

### Structure des dossiers
```
LeadFast/
├── app/                        # App Router de Next.js
│   ├── (onboarding)/           # Processus d'onboarding
│   │   ├── 1-5/                # Étapes d'onboarding
│   │   ├── aide-campagne/      # Service d'aide campagne
│   │   ├── demande-sur-mesure/ # Service sur mesure
│   │   ├── feedback/           # Système de feedback
│   │   └── submitted/          # Page de confirmation
│   └── api/                    # Routes API
├── components/                 # Composants réutilisables
│   ├── emails/                 # Templates d'emails
│   ├── ui/                     # Composants d'interface
│   └── layout/                 # Composants de mise en page
├── contexts/                   # Contextes React
├── hooks/                      # Hooks personnalisés
├── lib/                        # Services et utilitaires
├── services/                   # Services métier
├── types/                      # Types TypeScript
└── utils/                      # Fonctions utilitaires
```

## 🛠️ Installation

### Prérequis
- Node.js 18.0 ou supérieur
- npm, yarn, pnpm ou bun

### Installation
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd LeadFast

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Variables d'environnement
```env
# Email service
OFFICIAL_API_KEY=your_resend_api_key

# Search engine
SEARCH_ENGINE_URL=https://app.apollo.io/#/people
SEARCH_ENGINE_DOMAIN=apollo.io

# Authentication (optionnel)
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 🔧 Utilisation

### Démarrage rapide
1. Accédez à `http://localhost:3000`
2. Suivez le processus d'onboarding en 5 étapes
3. Recevez votre lien de recherche personnalisé par email

### Processus d'onboarding détaillé

#### Étape 1 - Ciblage professionnel
- Sélection des titres de poste
- Définition des niveaux de management
- Interface avec suggestions automatiques

#### Étape 2 - Critères d'entreprise
- Choix des secteurs d'activité
- Sélection des tailles d'entreprise
- Filtres avancés disponibles

#### Étape 3 - Spécialisation
- Nom d'entreprise spécifique (optionnel)
- Domaines d'expertise
- Mots-clés personnalisés

#### Étape 4 - Informations de contact
- Nom et prénom
- Email professionnel
- Numéro de téléphone

#### Étape 5 - Configuration finale
- Quantité de leads souhaitée
- Calcul automatique du prix
- Validation finale

## 📊 Services intégrés

### Génération de liens Apollo.io
Le service `searchEngineService` convertit les critères utilisateur en paramètres de recherche Apollo.io :

```typescript
interface SearchCriteria {
  positions?: string[];
  seniority?: string[];
  industries?: string[];
  companySize?: string[];
  // ... autres critères
}
```

### Service d'emails
Envoi automatique d'emails personnalisés avec :
- Lien de recherche généré
- Résumé des critères
- Instructions d'utilisation
- Suivi interne pour l'équipe

### API Routes
- `/api/send` : Envoi d'emails avec liens de recherche
- `/api/search-link` : Génération de liens de recherche
- `/api/aide-campagne` : Demandes d'aide campagne
- `/api/demande-sur-mesure` : Demandes sur mesure
- `/api/feedback` : Collecte de feedback

## 🎨 Design et UX

### Principes de design
- **Simplicité** : Interface épurée et intuitive
- **Progressivité** : Onboarding étape par étape
- **Feedback** : Retours visuels immédiats
- **Responsivité** : Adaptation mobile et desktop

### Composants UI réutilisables
- `StepIndicator` : Indicateur de progression
- `AnimatedBackground` : Animations fluides
- `HoverButton` : Interactions élégantes
- `ProfileCard` : Cartes de profil
- `FeatureCards` : Présentation des fonctionnalités

## 📈 Fonctionnalités avancées

### Système de contexte
Gestion d'état global avec `OnboardingContext` :
- Persistance des données entre les étapes
- Validation en temps réel
- Sauvegarde automatique

### Validation des données
- Validation des emails
- Vérification des liens de recherche
- Contrôle des données obligatoires

### Gestion des erreurs
- Messages d'erreur contextuels
- Récupération automatique
- Logs détaillés pour le debugging

## 🔄 Workflow de développement

### Scripts disponibles
```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run lint       # Linting du code
```

### Structure de contribution
1. Créer une branche feature
2. Développer la fonctionnalité
3. Tester localement
4. Créer une pull request

## 🚀 Déploiement

### Déploiement Vercel (recommandé)
```bash
# Déployer sur Vercel
vercel --prod

# Ou utiliser le dashboard Vercel
# Connecter le repository GitHub
```

### Variables d'environnement de production
Configurer les variables suivantes sur la plateforme de déploiement :
- `OFFICIAL_API_KEY`
- `SEARCH_ENGINE_URL`
- `SEARCH_ENGINE_DOMAIN`

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**LeadFast** - Générez des leads B2B qualifiés en quelques clics ! 🎯
