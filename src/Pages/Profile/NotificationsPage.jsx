import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import NotificationIcon from 'icons/Bell.svg';
import WalletIcon from 'icons/Wallet.svg';
import TrophyIcon from 'icons/Trophy.svg';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-theme-primary">
        <div className="relative flex items-center p-4">
          <BackButton onClick={() => navigate(-1)} className="absolute left-4" />
          <h1 className="text-lg font-semibold text-center flex-grow">{t('notificationsPage.title')}</h1>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="pt-16 space-y-4">
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={NotificationIcon} alt={t('notificationsPage.systemNotificationAltText')} className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{t('notificationsPage.systemNotificationTitle')}</h2>
            <p className="text-theme-secondary">{t('notificationsPage.systemNotificationDescription')}</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={WalletIcon} alt={t('notificationsPage.balanceAlertAltText')} className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{t('notificationsPage.balanceAlertTitle')}</h2>
            <p className="text-theme-secondary">{t('notificationsPage.balanceAlertDescription')}</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={TrophyIcon} alt={t('notificationsPage.achievementsAlertAltText')} className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">{t('notificationsPage.achievementsAlertTitle')}</h2>
            <p className="text-theme-secondary">{t('notificationsPage.achievementsAlertDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;