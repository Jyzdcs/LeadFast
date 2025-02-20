"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
	Target,
	Users,
	ChartBar,
	Shield 
} from "lucide-react";

// Types
interface Feature {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const features: Feature[] = [
	{
		icon: <Target className="w-5 h-5" />,
		title: "Ciblage Précis",
		description: "Identifiez vos prospects B2B idéaux"
	},
	{
		icon: <Users className="w-5 h-5" />,
		title: "Base de Données",
		description: "Accédez à des millions de décideurs"
	},
	{
		icon: <ChartBar className="w-5 h-5" />,
		title: "Analytics",
		description: "Suivi des performances"
	},
	{
		icon: <Shield className="w-5 h-5" />,
		title: "RGPD",
		description: "100% conforme à la réglementation"
	}
];

export default function Page() {
	return (
		<div className="space-y-12">
			{/* En-tête */}
			<div>
				<h1 className="text-2xl font-semibold text-gray-900 mb-3">
					Solution de Prospection B2B
				</h1>
				<p className="text-gray-600">
					Optimisez votre processus de génération de leads.
				</p>
			</div>

			{/* Fonctionnalités */}
			<div className="grid grid-cols-2 gap-6">
				{features.map((feature, index) => (
					<div
						key={index}
						className="p-5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
					>
						<div className="flex gap-4">
							<div className="text-gray-700">
								{feature.icon}
							</div>
							<div>
								<h3 className="font-medium text-gray-900 mb-1">
									{feature.title}
								</h3>
								<p className="text-sm text-gray-500">
									{feature.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* CTA */}
			<div className="space-y-4">
				<Link href="/onboarding/step1" className="block">
					<Button 
						className="w-full bg-black hover:bg-gray-900 text-white h-12"
					>
						Commencer
					</Button>
				</Link>
				<Button
					variant="outline"
					className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 h-12"
				>
					Demande sur mesure
				</Button>
			</div>
		</div>
	);
}
