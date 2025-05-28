import React from 'react';
import BackButton from '../components/BackButton';
import NotificationIcon from '../icons/Bell.svg';
import WalletIcon from '../icons/Wallet.svg';
import TrophyIcon from '../icons/Trophy.svg';

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="flex items-center justify-between p-4">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="pt-16 space-y-4">
        <div className="flex items-center p-4 border-b border-gray-700">
          <img src={NotificationIcon} alt="System Notification" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">System Notification</h2>
            <p className="text-gray-400">See your system notifications here</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-gray-700">
          <img src={WalletIcon} alt="Balance Alert" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Balance Alert</h2>
            <p className="text-gray-400">See your balance alert here</p>
          </div>
        </div>
        <div className="flex items-center p-4 border-b border-gray-700">
          <img src={TrophyIcon} alt="Achievements Alert" className="w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Achievements Alert</h2>
            <p className="text-gray-400">See your achievements as creator here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;