import React from "react";
import { DemandeSurMesureFormData } from "../mocks/constants";

interface FormFieldsProps {
  formData: DemandeSurMesureFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-6 pb-4 overflow-y-auto">
      <form className="space-y-6">
        {/* Section informations de contact */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                placeholder="Votre nom et prénom"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                placeholder="Nom de votre entreprise"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                placeholder="nom@entreprise.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
                placeholder="Votre numéro de téléphone"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-2">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Description détaillée de vos besoins
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-[215px] px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition"
              rows={5}
              placeholder="Décrivez précisément vos besoins (critères de ciblage, spécificités, etc.)"
              required
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};
