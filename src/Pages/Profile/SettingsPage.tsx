import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import { authService } from '../../services/authService';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Updated setting groups to match new design
  const settingGroups = [
    {
      title: 'Account',
      items: [
        {
          id: 'username',
          title: 'Change User Name',
          route: '/settings/username',
        },
        {
          id: 'mobile',
          title: 'Change Mobile Number',
          route: '/settings/mobile',
        },
        {
          id: 'email',
          title: 'Change E-Mail',
          route: '/settings/email',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          id: 'password',
          title: 'Change Password',
          route: '/settings/password',
        },
      ],
    },
  ];

  // Logout handler (implement actual logic as needed)
  const handleLogout = () => {
    // TODO: Add logout logic
    authService.logout();
    navigate('/profile');
  };

  return (
    <div className="dvh-fallback bg-[#FAFBFF] min-h-screen flex flex-col text-theme-primary">
      {/* Header */}
      <div className="px-4 py-4 relative flex items-center">
        <div className="absolute left-3">
          <BackButton />
        </div>
        <h1 className="flex-grow text-center text-xl font-semibold">Settings</h1>
      </div>

      {/* Settings Groups */}
      <div className="px-4 py-2 flex-1">
        {settingGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <span className="text-[#A1A1A1] montserrat-regular">{group.title}</span>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, idx) => (
                <button
                  key={item.id}
                  className={`w-full px-4 py-4 flex items-center justify-between text-[18px] font-normal text-[#222] ${idx !== group.items.length - 1 ? 'border-b border-[#F2F2F2]' : ''} hover:bg-[#F5F5F5]`}
                  onClick={() => navigate(item.route)}
                >
                  <span className="montserrat-regular">{item.title}</span>
                  <svg className="w-5 h-5 text-[#C7C7C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

      {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-sm text-[#555555] text-md font-normal border border-[#F2F2F2] hover:bg-[#F5F5F5]"
        >
          <svg className="w-6 h-6 text-[#555555]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}