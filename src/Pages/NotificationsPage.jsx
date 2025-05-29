import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import NotificationIcon from 'icons/Bell.svg';
import WalletIcon from 'icons/Wallet.svg';
import TrophyIcon from 'icons/Trophy.svg';

const NotificationsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-theme-primary">
        <div className="relative flex items-center p-4">
          <BackButton onClick={() => navigate(-1)} className="absolute left-4" />
          <h1 className="text-lg font-semibold text-center flex-grow">Notifications</h1>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="pt-16 space-y-4">
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={NotificationIcon} alt="System Notification" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">System Notification</h2>
            <p className="text-theme-secondary">See your system notifications here</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={WalletIcon} alt="Balance Alert" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Balance Alert</h2>
            <p className="text-theme-secondary">See your balance alert here</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-theme-secondary">
          <img src={TrophyIcon} alt="Achievements Alert" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Achievements Alert</h2>
            <p className="text-theme-secondary">See your achievements as creator here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;