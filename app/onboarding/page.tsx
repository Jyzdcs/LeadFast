"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
	ArrowRight, 
	Linkedin, 
	Mail, 
	Globe, 
	Phone,
	Building2,
	Users2
} from "lucide-react";

// Animation variants améliorés
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			duration: 0.8,
			ease: "easeOut"
		}
	}
};

const itemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut"
		}
	}
};

// Sources de données redéfinies
const dataSources = [
	{
		icon: <Linkedin className="w-6 h-6 text-primary" />,
		title: "LinkedIn",
		description: "Extraction intelligente des profils professionnels et réseaux"
	},
	{
		icon: <Mail className="w-6 h-6 text-primary" />,
		title: "Email Pro",
		description: "Vérification et validation des adresses professionnelles"
	},
	{
		icon: <Phone className="w-6 h-6 text-primary" />,
		title: "Téléphone",
		description: "Numéros directs et mobiles professionnels vérifiés"
	},
	{
		icon: <Globe className="w-6 h-6 text-primary" />,
		title: "Site Web",
		description: "Analyse des domaines et pages d'entreprise"
	},
	{
		icon: <Building2 className="w-6 h-6 text-primary" />,
		title: "Entreprise",
		description: "Informations détaillées sur les sociétés (SIRET, CA, effectif)"
	},
	{
		icon: <Users2 className="w-6 h-6 text-primary" />,
		title: "Décideurs",
		description: "Identification des décisionnaires et leurs rôles"
	}
];

export default function Page() {
	return (
		<div className="h-[calc(100vh-4rem)] flex flex-col justify-between p-8">
			{/* En-tête simplifié */}
			<motion.div 
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<h1 className="text-3xl font-medium mb-3 text-primary/90">
					Toutes vos données B2B en un seul endroit
				</h1>
				<p className="text-lg text-muted-foreground max-w-xl mx-auto">
					Accédez aux informations essentielles de vos prospects
				</p>
			</motion.div>

			{/* Cards avec espacement optimisé */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto px-4"
			>
				{dataSources.map((source, index) => (
					<motion.div key={index} variants={itemVariants} className="w-44">
						<Card className="group hover:shadow-lg transition-all duration-300 border-primary/5 h-full">
							<CardContent className="p-6 flex flex-col h-full">
								<div className="mb-4 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary/10 transition-all duration-300">
									{source.icon}
								</div>
								<h3 className="text-lg font-medium mb-2 text-primary/90">
									{source.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{source.description}
								</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{/* CTA simplifié */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="text-center"
			>
				<div className="flex gap-4 justify-center">
					<Link href="/onboarding/step1">
						<Button size="lg" className="group px-6 py-5">
							Générez vos leads
							<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</Button>
					</Link>
					<Button variant="outline" size="lg" className="px-6 py-5">
						Voir une démo
					</Button>
				</div>
			</motion.div>
		</div>
	);
}
