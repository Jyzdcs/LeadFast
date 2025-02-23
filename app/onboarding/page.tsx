"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
	UserIcon,
	BriefcaseIcon,
	BuildingOfficeIcon,
	EnvelopeIcon,
	GlobeAltIcon,
	ArrowRightIcon
} from "@heroicons/react/24/outline";
import AnimatedBackground from "@/components/ui/animated-background";
import { LinkedinIcon } from "lucide-react";
import { ProfileCard } from "@/components/ui/profile-card";
import { HoverButton } from "@/components/ui/hover-button";
// Types
interface TargetInfo {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const CONTACTS = [
  {
    id: 1,
    title: 'Identité',
    description: 'Prénom et Nom',
    icon: <UserIcon className="w-5 h-5" />
  },
  {
    id: 2,
    title: 'Poste',
    description: 'Poste occupé',
    icon: <BriefcaseIcon className="w-5 h-5" />
  },
  {
    id: 3,
    title: 'Entreprise',
    description: 'Nom de l\'entreprise',
    icon: <BuildingOfficeIcon className="w-5 h-5" />
  },
  {
    id: 4,
    title: 'Site Web',
    description: 'www.example.com',
    icon: <GlobeAltIcon className="w-5 h-5" />
  },
  {
    id: 5,
    title: 'Contact',
    description: 'email,\nnuméro',
    icon: <EnvelopeIcon className="w-5 h-5" />
  },
  {
    id: 6,
    title: 'LinkedIn',
    description: 'Profil prospect & entreprise',
    icon: <LinkedinIcon className="w-5 h-5" />
  },
];

export default function Page() {
	return (
		<>
			<div className="flex flex-col min-h-screen bg-white">
				{/* Section principale avec AnimatedBackground */}
				<div className="flex-1 flex flex-col">
					{/* Contenu principal centré */}
					<div className="flex-1 flex flex-col items-center justify-center space-y-20 py-16">
						{/* En-tête */}
						<div className="w-full px-6 md:px-10">
							<div className="max-w-3xl mx-auto text-center">
								<div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 mb-6">
									<div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
									Génération de leads B2B
								</div>
								<h1 className="text-4xl font-medium text-gray-900 tracking-tight mb-4">
									Informations ciblées
								</h1>
								<p className="text-lg text-gray-600 max-w-2xl mx-auto">
									Accédez en quelques clics à des données précises et exploitables.
								</p>
							</div>
						</div>

						{/* Zone centrale avec AnimatedBackground */}
						<div className="w-full px-6 md:px-10">
							<div className="max-w-4xl mx-auto">
								<AnimatedBackground
									items={CONTACTS}
									className="rounded-2xl bg-zinc-50/50 shadow-xl border border-zinc-100"
									transition={{
										type: 'spring',
										bounce: 0.2,
										duration: 0.6,
									}}
									enableHover
									iconClassName="text-zinc-600"
								/>
							</div>
						</div>
					</div>

					{/* Section inférieure */}
					<div className="w-full pb-16 px-6 md:px-10">
						<div className="max-w-4xl mx-auto space-y-6">
							{/* Section d'extrait gratuit */}
							<div className="relative overflow-hidden rounded-2xl shadow-lg group">
								<div className="absolute inset-0">
									<div 
										className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700 group-hover:scale-100"
										style={{ backgroundImage: 'url(/background-V2.jpg)' }}
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
									<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
								</div>

								<div className="relative p-8">
									<div className="flex items-center justify-between">
										<div className="space-y-3">
											<div 
												className="inline-flex items-center gap-2 rounded-full 
														 bg-emerald-500/10 backdrop-blur-sm px-3 py-1.5 
														 text-sm text-emerald-400 border border-emerald-500/20"
											>
												<div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
												Extrait gratuit
											</div>
											<h3 className="text-xl font-medium text-white drop-shadow-sm">
												Accédez gratuitement à 1 500 CEO de startups
											</h3>
											<p className="text-zinc-200 drop-shadow-sm">
												Obtenez un échantillon de notre base de données.
											</p>
										</div>

										<HoverButton
											className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-6 h-12 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:from-white/[0.1] hover:to-white/[0.04] hover:shadow-xl hover:shadow-black/5 text-white"
										>
											Accéder maintenant
											<ArrowRightIcon className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5" />
										</HoverButton>
									</div>
								</div>
							</div>

							{/* Actions */}
							<div className="flex justify-between items-center">
								<HoverButton
									className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-12 px-6"
								>
									Demande sur mesure
								</HoverButton>
								<Link href="/onboarding/step1">
									<HoverButton 
										className="bg-black hover:bg-black/90 text-white h-12 px-6"
									>
										Commencer
									</HoverButton>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
