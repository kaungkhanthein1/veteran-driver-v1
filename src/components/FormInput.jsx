import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false 
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent border border-theme rounded-lg px-4 py-3 text-sm focus:border-[#FDC51B] focus:outline-none pt-5 pb-2"
        value={value}
        onChange={onChange}
      />
      <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-theme-secondary bg-theme-primary">
        {label} {required && <span className="text-[#FDC51B]">*</span>}
      </span>
    </div>
  );
};

export default FormInput;