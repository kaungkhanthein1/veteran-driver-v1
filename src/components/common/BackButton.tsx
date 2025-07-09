import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "icons/arrow_back.webp";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function BackButton({ className = "" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button className={`p-3 -ml-2 ${className}`} onClick={() => navigate(-1)}>
      <img
        src={ArrowBackIcon}
        alt={t("common.backButtonAltText")}
        className="w-2.5"
      />
    </button>
  );
}

BackButton.propTypes = {
  className: PropTypes.string,
};
