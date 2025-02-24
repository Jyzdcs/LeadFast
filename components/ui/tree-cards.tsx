"use client"

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
    {
	  icon: <LogoSvg className="text-blue-500 size-4" />,
      id: "1",
      title: "Notification",
      description: "C-level, Tech, Nantes",
      date: "Il y a 5 jours",
      iconClassName: "text-yellow-500",
      titleClassName: "text-yellow-500",
      className: "[grid-area:stack] cursor-pointer w-96 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-all before:duration-700 before:left-0 before:top-0 text-white hover:bg-blue-500/10 transition-all duration-700",
      data: [
        {
          id: "1",
          name: "John Doe",
          position: "Chief Technology Officer",
          company: "TechCorp Solutions",
          email: "john.doe@techcorp.com",
          phone: "+33 6 12 34 56 78",
          website: "www.techcorp.com",
          linkedin: "linkedin.com/in/johndoe",
          country: "France",
          city: "Nantes",
          image: "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
        },
        {
          id: "2",
          name: "Marie Dubois",
          position: "Chief Executive Officer",
          company: "Digital Innovation Labs",
          email: "m.dubois@dilabs.fr",
          phone: "+33 6 98 76 54 32",
          website: "www.dilabs.fr",
          linkedin: "linkedin.com/in/mariedubois",
          country: "France",
          region: "Pays de la Loire",
          city: "Nantes",
          image: "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
        }
      ],
      columns: [
        { key: "name", header: "Nom", width: "250px" },
        { key: "position", header: "Poste", width: "200px" },
        { key: "company", header: "Entreprise", width: "200px" },
        { key: "email", header: "Email", width: "250px" },
        { key: "phone", header: "Téléphone", width: "150px" },
        { key: "website", header: "Site Web", width: "200px" },
        { key: "linkedin", header: "LinkedIn", width: "200px" },
        { key: "country", header: "Pays", width: "120px" },
        { key: "city", header: "Ville", width: "120px" }
      ]
    },
    {
	  	icon: <LogoSvg className="text-blue-500 size-4" />,
      id: "2",
      title: "Notification",
      description: "All team, Mistral, France",
      date: "Il y a 2 jours",
      iconClassName: "text-yellow-500",
      titleClassName: "text-yellow-500",
      className: "[grid-area:stack] cursor-pointer w-96 translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-all before:duration-700 before:left-0 before:top-0 text-white hover:bg-yellow-500/10 transition-all duration-700",
      data: [
        {
          id: "1",
          name: "Team Alpha",
          username: "@alpha",
          image: "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
          department: "Development",
          project: "Mistral AI",
          location: "Paris, FR",
          status: "Active"
        }
      ],
      columns: [
        { key: "name", header: "Team" },
        { key: "department", header: "Department" },
        { key: "project", header: "Project" },
        { key: "location", header: "Location" },
        { key: "status", header: "Status" }
      ]
    },
    {
	  	icon: <LogoSvg className="text-blue-500 size-4" />,
      id: "3",
      title: "Notification",
      description: "C-Level, Restauration, France",
      date: "Il y a 1 minute",
      iconClassName: "text-yellow-500",
      titleClassName: "text-yellow-500",
      className: "[grid-area:stack] cursor-pointer w-96 translate-x-24 translate-y-20 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-all before:duration-700 before:left-0 before:top-0 text-white hover:bg-purple-500/10 transition-all duration-700",
      data: [
        {
          id: "1",
          name: "Restaurant A",
          username: "@resta",
          image: "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
          type: "Fine Dining",
          location: "Lyon, FR",
          revenue: "€2.5M",
          status: "New"
        }
      ],
      columns: [
        { key: "name", header: "Restaurant" },
        { key: "type", header: "Type" },
        { key: "location", header: "Location" },
        { key: "revenue", header: "Revenue" },
        { key: "status", header: "Status" }
      ]
    }
  ]

  return (
    <div>
      <DisplayCards 
        cards={customCards}
      />
    </div>
  )
}