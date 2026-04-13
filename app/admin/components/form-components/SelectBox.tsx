// SelectBox.tsx
import React from 'react';

type SelectBoxProps = {
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: string[] | undefined;
  required?: boolean; // Accepting a required prop
};

const SelectBox: React.FC<SelectBoxProps> = ({ name, options, placeholder, value, onChange, errors, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {name.charAt(0).toUpperCase() + name.slice(1)}
        {required && <span className="text-red-500">*</span>} {/* Conditional rendering of asterisk */}
      </label>
      <select
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        <option value="" className="text-sm font-medium text-gray-900 dark:text-white" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors.map((error, index) => (
        <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
      ))}
    </div>
  );
};

export default SelectBox;
