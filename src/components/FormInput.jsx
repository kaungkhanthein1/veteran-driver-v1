import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false,
  rightIcon
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent border border-theme rounded-lg px-4 h-[56px] text-base focus:border-[#FDC51B] focus:outline-none placeholder:text-theme-secondary/50 flex items-center"
        value={value}
        onChange={onChange}
      />
      <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-theme-secondary bg-theme-primary">
        {label} {required && <span className="text-[#FDC51B]">*</span>}
      </span>
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default FormInput;