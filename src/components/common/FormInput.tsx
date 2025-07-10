import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  rightIcon?: React.ReactNode;
}

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false,
  rightIcon,
  ...rest
}: FormInputProps) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder ? t(placeholder) : ''}
        className="w-full bg-[#F8F9FB] border border-theme rounded-lg px-4 h-[56px] text-base focus:outline-none focus:ring-0 placeholder:text-theme-secondary/50 flex items-center"
        value={value}
        onChange={onChange}
        {...rest}
      />
      <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-theme-secondary bg-[#F8F9FB]">
        {label ? t(label) : ''} {required && <span className="text-[#FDC51B]">*</span>}
      </span>
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  rightIcon: PropTypes.node,
};

export default FormInput;