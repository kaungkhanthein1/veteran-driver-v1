import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/cards/card.css";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { TolgeeProvider } from "@tolgee/react";
import { tolgee } from "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

// Initialize environment validation
import { validateEnvironment } from "./config/env";
validateEnvironment();

// Initialize axios interceptors
import { authService } from "./services/authService";
authService.setupAxiosInterceptors();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <TolgeeProvider tolgee={tolgee}>
            <App />
          </TolgeeProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
