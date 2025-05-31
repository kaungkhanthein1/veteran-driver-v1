import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const settingGroups = [
    {
      title: t('settingsPage.accountGroupTitle'),
      items: [
        {
          id: 'mobile',
          title: t('settingsPage.mobileNumberItem'),
          route: '/settings/mobile'
        },
        {
          id: 'email',
          title: 'Bind E-mail',
          route: '/settings/email'
        }
      ]
    },
    {
      title: 'Third Party',
      items: [
        {
          id: 'facebook',
          title: 'Bind with Facebook',
          route: '/settings/facebook'
        },
        {
          id: 'wechat',
          title: 'Bind with WeChat',
          route: '/settings/wechat'
        },
        {
          id: 'line',
          title: 'Bind with Line',
          route: '/settings/line'
        }
      ]
    },
    {
      title: 'Security',
      items: [
        {
          id: 'password',
          title: 'Change Password',
          route: '/settings/password'
        },
        {
          id: '2fa',
          title: 'Setup Two-Factor Authentication (2FA)',
          route: '/settings/2fa'
        }
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">
      {/* Header */}
      <div className="px-4 py-4 relative flex items-center">
        <div className="absolute left-3">
          <BackButton/>
        </div>
        <h1 className="flex-grow text-center text-xl font-semibold">Settings</h1>
      </div>

      {/* Settings Groups */}
      <div className="px-4 py-2">
        {settingGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-theme-secondary text-sm mb-2">{group.title}</h2>
            <div className="bg-theme-secondary rounded-lg overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <button
                  key={item.id}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-opacity-50"
                  onClick={() => navigate(item.route)}
                >
                  <span>{item.title}</span>
                  <svg className="w-5 h-5 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}