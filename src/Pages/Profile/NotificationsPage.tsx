import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import NoNoti from '../../icons/NoNoti.svg'; // or .png

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="dvh-fallback bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-theme-primary">
        <div className="relative flex items-center p-4">
          <BackButton onClick={() => navigate(-1)} className="absolute left-4" />
          <h1 className="text-lg font-semibold text-center flex-grow">{t('notificationsPage.title')}</h1>
        </div>
      </div>
      {/* Empty State */}
      <div className="flex flex-col items-center justify-center flex-1 pt-32">
        <img src={NoNoti} alt="No Notifications" className="w-[120px] h-[102px] mb-4 mt-4" />
        <div className="flex flex-col items-center mb-2">
          <span className="text-theme-primary text-lg font-semibold text-center">
            You’ve caught up with everything
          </span>
          <span className="text-theme-secondary text-base font-normal text-center mt-1">
            No notification at this time
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;