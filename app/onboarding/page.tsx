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
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-[85%] max-w-7xl space-y-10">
				{/* En-tête */}
				<div className="text-center">
					<h1 className="text-2xl font-medium text-gray-900 mb-2">
						Informations ciblées
					</h1>
					<p className="text-sm text-gray-500">
						Accédez aux données B2B qualifiées
					</p>
				</div>

				{/* AnimatedBackground */}
				<div className="w-full">
					<AnimatedBackground
						items={CONTACTS}
						className="rounded-2xl bg-zinc-50 dark:bg-zinc-800 shadow-xl"
						transition={{
							type: 'spring',
							bounce: 0.2,
							duration: 0.6,
						}}
						enableHover
						iconClassName="text-zinc-600 dark:text-zinc-400"
					/>
				</div>

				{/* Actions */}
				<div className="flex justify-between items-center pt-4 px-4">
					<Button
						variant="outline"
						className="bg-white text-black hover:bg-gray-50/80 h-10"
					>
						Demande sur mesure
					</Button>
					<Link href="/onboarding/step1">
						<Button 
							className="bg-black/90 hover:bg-black text-white h-10 w-32"
						>
							Commencer
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
