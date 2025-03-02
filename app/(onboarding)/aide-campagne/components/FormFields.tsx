import React from "react";
import { AideCampagneFormData, CAMPAIGN_TYPES } from "../mocks/constants";

interface FormFieldsProps {
  formData: AideCampagneFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

// Définir l'interface pour les éléments des tableaux
interface OptionType {
  id: string;
  label: string;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
            placeholder="Nom complet"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
            placeholder="Entreprise"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
            placeholder="Email professionnel"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
            placeholder="Téléphone"
          />
        </div>
      </div>

      <div>
        <select
          id="campaignType"
          name="campaignType"
          value={formData.campaignType}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
          required
        >
          <option value="">Sélectionnez un service</option>
          {CAMPAIGN_TYPES.map((type: OptionType) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full h-[191px] px-3 pt-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
          rows={3}
          placeholder="Décrivez vos besoins spécifiques"
        ></textarea>
      </div>
    </>
  );
};
