import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "icons/ArrowBack.svg";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function BackButton({ className = "", detail = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const handleBack = () => {
    // Check if we're coming from login
    if (detail) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <button className={`p-2 -ml-2 ${className}`} onClick={handleBack}>
      <img
        src={ArrowBackIcon}
        alt={t("common.backButtonAltText")}
        className="w-6 h-6 "
      />
    </button>
  );
}

BackButton.propTypes = {
  className: PropTypes.string,
};
