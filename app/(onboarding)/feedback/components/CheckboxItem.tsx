import React from "react";

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={label}
        className="peer absolute h-0 w-0 opacity-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        htmlFor={label}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border p-2 text-xs sm:text-sm 
                  peer-checked:border-black peer-checked:bg-black peer-checked:text-white
                  transition-all duration-200"
      >
        {label}
      </label>
    </div>
  );
};
