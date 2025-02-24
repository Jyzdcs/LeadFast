"use client"

import { techCard, teamCard, restaurantCard } from "@/mocks/cards"
import DisplayCards from "./display-cards"

const LogoSvg = ({ className }: { className?: string }) => (
	<svg
	  id="Layer_2"
	  data-name="Layer 2"
	  xmlns="http://www.w3.org/2000/svg"
	  viewBox="0 0 100.21 108.89"
	  width="28"
	  height="28"
	  className={className}
	>
	  <g id="Layer_1-2" data-name="Layer 1">
		<g>
		  <path
			className="cls-1"
			d="M53.71.72c-1.64-.96-3.66-.96-5.3,0l-25.19,14.74,49.26,28.78v58.27l25.13-14.7c1.61-.94,2.6-2.66,2.6-4.53V27.93L53.71.72Z"
		  />
		  <path
			className="cls-1"
			d="M23.27,30.91L0,44.28l36.57,21.36v43.25l23.22-13.35c1.19-.7,1.93-1.98,1.93-3.36v-41.08L27.2,30.91c-1.21-.71-2.72-.71-3.93,0Z"
		  />
		  <polygon
			className="cls-1"
			points="25.5 100.82 25.5 71.64 .56 86.23 25.5 100.82"
		  />
		</g>
	  </g>
	</svg>
  );
  

export default function TreeCards() {
  const customCards = [
	{...techCard, icon: <LogoSvg className="text-blue-500 size-4" />},
	{...teamCard, icon: <LogoSvg className="text-blue-500 size-4" />},
	{...restaurantCard, icon: <LogoSvg className="text-blue-500 size-4" />}
  ]
  return (
    <div>
      <DisplayCards 
        cards={customCards}
      />
    </div>
  )
}