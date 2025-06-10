import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';

export default function WalletPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Sample data structure for point history
  const [pointHistory] = useState([
    {
      id: 1,
      title: t('walletPage.locationVerifiedTitle'),
      description: t('walletPage.locationVerifiedDescription'),
      amount: 20,
      type: 'credit',
      status: 'completed',
      timestamp: '2023-10-8 / 9: 00 : 00'
    },
    {
      id: 2,
      title: t('walletPage.rewardWithdrawTitle'),
      description: t('walletPage.rewardWithdrawDescription'),
      amount: 30,
      type: 'debit',
      status: 'approved',
      timestamp: '2023-10-8 / 9: 00 : 00'
    },
    {
      id: 3,
      title: t('walletPage.rewardWithdrawTitle'),
      description: t('walletPage.rewardWithdrawDescription'),
      amount: 30,
      type: 'debit',
      status: 'pending',
      timestamp: '2023-10-8 / 9: 00 : 00'
    },
    {
      id: 4,
      title: t('walletPage.dailySharingCompleteTitle'),
      description: t('walletPage.dailySharingCompleteDescription'),
      amount: 2,
      type: 'credit',
      status: 'completed',
      timestamp: '2023-10-8 / 9: 00 : 00'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'pending':
        return 'text-[#FDC51B]';
      default:
        return '';
    }
  };

  return (
    <div className="dvh-fallback bg-theme-primary">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
         <BackButton/>
          <h1 className="flex-1 text-center text-xl font-normal text-theme-text">{t('walletPage.title')}</h1>
          <div className="w-6"></div>
        </div>

        {/* Total Coins Card */}
        <div className="mx-4 p-4 bg-theme-secondary rounded-xl">
          <p className="text-theme-subtext text-center mb-2">{t('walletPage.totalCoinsLabel')}</p>
          <p className="text-4xl text-center font-medium mb-1">15,685.00</p>
          <p className="text-theme-subtext text-center">=23.3$</p>
          <button 
            className="w-full bg-[#FDC51B] text-black font-medium py-3 rounded-full mt-4"
            onClick={() => navigate('/withdraw')}
          >
            {t('walletPage.withdrawButton')}
          </button>
        </div>

        {/* Point History */}
        <div className="mx-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-theme-text text-lg">{t('walletPage.pointHistoryTitle')}</h2>
            <button 
              className="text-theme-subtext flex items-center gap-1"
              onClick={() => navigate('/point-history')}
            >
              {t('walletPage.viewAllButton')}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* History Cards */}
          <div className="space-y-3">
            {pointHistory.map((item) => (
              <div key={item.id} className="bg-theme-secondary rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-theme-text font-medium">{item.title}</h3>
                  <span className={`font-medium ${item.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.type === 'credit' ? '+' : '-'}{item.amount}
                  </span>
                </div>
                <p className="text-theme-subtext text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-theme-subtext text-sm">{item.timestamp}</span>
                  {(item.status === 'approved' || item.status === 'pending') && (
                    <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                      {t(`walletPage.status.${item.status}`)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}