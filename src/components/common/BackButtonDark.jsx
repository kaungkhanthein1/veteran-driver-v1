import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "icons/ArrowBack.svg";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function BackButtonDark({ className = "" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button className={`p-2 -ml-2 ${className}`} onClick={() => navigate(-1)}>
      {/* <img 
        src={ArrowBackIcon} 
        alt={t('common.BackButtonDarkAltText')} 
        className="w-6 h-6 [filter:var(--icon-filter)]"
      /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M23.3333 12.8327H9.13496L15.6566 6.31102L14 4.66602L4.66663 13.9993L14 23.3327L15.645 21.6877L9.13496 15.166H23.3333V12.8327Z"
          fill="#444444"
        />
      </svg>
    </button>
  );
}

BackButtonDark.propTypes = {
  className: PropTypes.string,
};
