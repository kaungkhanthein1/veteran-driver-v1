import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/common/BackButton';

export default function PointHistoryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('pointHistory.incomeTab'));
  const [selectedMonth, setSelectedMonth] = useState('2024 January');
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);

  // Generate years and months data
  const years = [2024, 2023];
  const months = [t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'), 
                 t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')];

  // Sample data structure for point history
  const [pointHistory] = useState([
    {
      id: 1,
      title: t('pointHistory.locationVerifiedTitle'),
      description: t('pointHistory.locationVerifiedDescription'),
      amount: 20,
      type: 'income',
      timestamp: '2023-10-8 / 9: 00 : 00'
    },
    {
      id: 2,
      title: t('pointHistory.dailySharingTitle'),
      description: t('pointHistory.dailySharingDescription'),
      amount: 2,
      type: 'income',
      timestamp: '2023-10-8, 9: 00 : 00'
    },
    {
      id: 3,
      title: t('pointHistory.videoViralTitle'),
      description: t('pointHistory.videoViralDescription'),
      amount: 20.00,
      type: 'income',
      timestamp: '2023-10-8, 9: 00 : 00'
    },
    {
      id: 4,
      title: t('pointHistory.videoViralTitle'),
      description: t('pointHistory.videoViralDescription'),
      amount: 20.00,
      type: 'income',
      timestamp: '2023-10-8, 9: 00 : 00'
    }
  ]);

  const tabs = [t('pointHistory.incomeTab'), t('pointHistory.withdrawTab'), t('pointHistory.otherIncomeTab')];

  const handleMonthSelect = (month, year) => {
    setSelectedMonth(`${year} ${month}`);
    setIsMonthSelectorOpen(false);
  };

  return (
    <div className="dvh-fallback bg-theme-primary">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <BackButton/>
          <h1 className="flex-1 text-center text-xl font-normal text-theme-text">{t('pointHistory.title')}</h1>
          <div className="w-6"></div>
        </div>

        {/* Month Selector */}
        <div className="px-4 mb-4 relative">
          <button 
            className="text-theme-text text-lg flex items-center gap-1"
            onClick={() => setIsMonthSelectorOpen(!isMonthSelectorOpen)}
          >
            {selectedMonth}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Month Selector Modal */}
          {isMonthSelectorOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
              <div className="bg-theme-secondary w-full max-w-[480px] rounded-t-xl overflow-hidden">
                <div className="w-12 h-1 bg-gray-600 mx-auto my-2 rounded-full" />
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 px-6 text-right space-y-4">
                      {years.map(year => (
                        <div key={year} className="text-theme-text text-base opacity-60">{year}</div>
                      ))}
                    </div>
                    <div className="pr-20">
                      {months.map(month => (
                        <button
                          key={month}
                          className="w-full text-left text-theme-text text-xl py-2 px-6"
                          onClick={() => handleMonthSelect(month, 2024)}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-theme-primary p-4 gap-4">
                  <button 
                    className="flex-1 py-3 rounded-lg bg-theme-primary text-theme-text"
                    onClick={() => setIsMonthSelectorOpen(false)}
                  >
                    {t('common.cancel')}
                  </button>
                  <button 
                    className="flex-1 py-3 rounded-lg bg-[#FDC51B] text-black font-medium"
                    onClick={() => setIsMonthSelectorOpen(false)}
                  >
                    {t('pointHistory.confirmButton')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="px-4 flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-[#FDC51B] text-black' : 'bg-theme-secondary text-theme-text'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* History Cards */}
        <div className="px-4 space-y-3">
          {pointHistory.map((item) => (
            <div key={item.id} className="bg-theme-secondary rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-theme-text font-medium">{item.title}</h3>
                <span className="text-green-500 font-medium">
                  +{item.amount.toFixed(item.amount % 1 === 0 ? 0 : 2)}
                </span>
              </div>
              <p className="text-theme-subtext text-sm mb-2">{item.description}</p>
              <span className="text-theme-subtext text-sm">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}