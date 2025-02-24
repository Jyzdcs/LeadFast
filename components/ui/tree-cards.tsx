import { Rocket, Zap } from "lucide-react";
import { Star } from "lucide-react";
import DisplayCards from "./display-cards";

export default function TreeCards() {
	const customCards = [
		{
		  icon: <Rocket className="size-4 text-blue-300" />,
		  title: "Launch",
		  description: "Ready for takeoff",
		  date: "Today",
		  iconClassName: "text-blue-500",
		  titleClassName: "text-blue-500",
		  className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
		},
		{
		  icon: <Star className="size-4 text-yellow-300" />,
		  title: "Featured",
		  description: "Top rated content",
		  date: "2 days ago",
		  iconClassName: "text-yellow-500",
		  titleClassName: "text-yellow-500",
		  className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
		},
		{
		  icon: <Zap className="size-4 text-purple-300" />,
		  title: "Trending",
		  description: "Most popular this week",
		  date: "Last week",
		  iconClassName: "text-purple-500",
		  titleClassName: "text-purple-500",
		  className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
		},
	];

  return (
    <div>
		<DisplayCards cards={customCards} />
    </div>
  );
}