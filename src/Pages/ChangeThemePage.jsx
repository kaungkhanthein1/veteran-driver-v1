import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangeThemePage = () => {
  const [selectedTheme, setSelectedTheme] = React.useState('white');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Theme</h1>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-2">Change Application Theme</h2>
        <p className="text-gray-400 text-base mb-6">
          Change the look and feel of the interface by selecting a different theme. You can switch between options like Light Mode and Dark Mode
        </p>

        {/* Theme Options */}
        <div className="space-y-3">
          {/* White Theme */}
          <button 
            className={`w-full bg-[#232323] rounded-lg p-4 flex items-center justify-between ${
              selectedTheme === 'white' ? 'border border-[#FDC51B]' : ''
            }`}
            onClick={() => setSelectedTheme('white')}
          >
            <div>
              <h3 className="text-left font-medium mb-1">White Theme</h3>
              <p className="text-gray-400 text-sm text-left">A bright and clean look that's easy to read in daylight</p>
            </div>
            {selectedTheme === 'white' && (
              <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Dark Theme */}
          <button 
            className={`w-full bg-[#232323] rounded-lg p-4 flex items-center justify-between ${
              selectedTheme === 'dark' ? 'border border-[#FDC51B]' : ''
            }`}
            onClick={() => setSelectedTheme('dark')}
          >
            <div>
              <h3 className="text-left font-medium mb-1">Dark Theme</h3>
              <p className="text-gray-400 text-sm text-left">A sleek, dark interface that's easy on the eyes</p>
            </div>
            {selectedTheme === 'dark' && (
              <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* System Theme */}
          <button 
            className={`w-full bg-[#232323] rounded-lg p-4 flex items-center justify-between ${
              selectedTheme === 'system' ? 'border border-[#FDC51B]' : ''
            }`}
            onClick={() => setSelectedTheme('system')}
          >
            <div>
              <h3 className="text-left font-medium mb-1">Default (System)</h3>
              <p className="text-gray-400 text-sm text-left">We will adjust your theme based on your device's System Setting.</p>
            </div>
            {selectedTheme === 'system' && (
              <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeThemePage;