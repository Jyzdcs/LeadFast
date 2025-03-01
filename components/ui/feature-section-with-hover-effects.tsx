import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Les visionnaires",
      description:
        "Ils définissent la mission et la vision de l’entreprise, et prennent les décisions stratégiques majeures.",
      icon: (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
            C-Level
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
            Founder
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
            Partner
          </span>
        </div>
      ),
    },
    {
      title: "Les chefs d'orchestre",
      description:
        "Ils pilotent la croissance et les stratégies d'acquisition.",
      icon: (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
            VP
          </span>
        </div>
      ),
    },
    {
      title: "Les responsables",
      description: "Ils gèrent les opérations et implémentent les stratégies.",
      icon: (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
              Directeur
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
              Manager
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Les influenceurs internes",
      description:
        "Ils testent et recommandent les outils de prospection et d'acquisition.",
      icon: (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
              Lead
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200">
              Senior
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 gap-3 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-5 relative group/feature border border-zinc-200 rounded-xl overflow-hidden",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {/* Gradient hover effect */}
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-zinc-100 to-transparent pointer-events-none rounded-xl" />

      {/* Icon section */}
      <div className="mb-2 relative z-10 px-6 text-zinc-600">{icon}</div>

      {/* Title section */}
      <div className="text-base mb-1 relative z-10 px-6">
        <div className="absolute left-0 inset-y-0 h-5 group-hover/feature:h-6 w-1 rounded-tr-full rounded-br-full bg-zinc-200 group-hover/feature:bg-black transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-900 font-medium">
          {title}
        </span>
      </div>

      {/* Description section */}
      <p className="text-xs text-zinc-600 max-w-xs relative z-10 px-6">
        {description}
      </p>
    </div>
  );
};
