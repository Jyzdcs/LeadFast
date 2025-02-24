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
			<div className="flex flex-col min-h-screen">
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
