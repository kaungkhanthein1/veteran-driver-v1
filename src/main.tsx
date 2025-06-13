import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { TolgeeProvider } from '@tolgee/react';
import { tolgee } from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TolgeeProvider tolgee={tolgee}>
        <App />
      </TolgeeProvider>
    </Provider>
  </React.StrictMode>
); 