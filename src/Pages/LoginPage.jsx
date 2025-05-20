import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from '../components/FormInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const isFormFilled = emailOrPhone.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-theme-primary px-4 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mt-8 mb-2 text-center">
          <h1 className="text-3xl font-bold text-theme-primary mb-2">Log In</h1>
          <p className="text-theme-secondary text-base">Welcome, let's get started on something great</p>
        </div>
        <form className="w-full mt-8 space-y-6">
          <FormInput
            label="Email or Phone Number"
            name="emailOrPhone"
            placeholder="Enter Your Email"
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
          />
          
          <div className="relative">
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="text-theme-secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938-2.675A9.956 9.956 0 0022 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938M3.06 3.06l17.88 17.88" />
                    )}
                  </svg>
                </button>
              }
            />
          </div>
          {/* Recaptcha Placeholder */}
          <div className="flex justify-center">
            <div className="bg-theme-secondary/30 rounded-lg px-4 py-3 flex items-center gap-2 w-full max-w-xs">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-theme-secondary text-sm">I'm not a robot</span>
              <div className="ml-20 text-theme-secondary text-md">Recaptcha</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/location-access")}
            className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 ${
              isFormFilled
                ? "bg-yellow-gradient text-black"
                : "bg-theme-secondary text-theme-primary"
            }`}
            disabled={!isFormFilled}
          >
            Login
          </button>
        </form>
        <div className="w-full flex justify-center mt-4 mb-4">
          <button 
            className="text-theme-primary"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
        <div className="w-full mt-2 space-y-4">
          <button className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3">
            {/* <GoogleIcon className="w-6 h-6" /> */}
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.133-2.789-6.133-6.25s2.758-6.25 6.133-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.578-3.891-2.547-6.656-2.547-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.156-.156-1.633z"/></svg>
            </span>
            <span>Continue With Google</span>
          </button>
          <button className="w-full flex items-center justify-center bg-[#232323] rounded-full py-3 text-white font-medium text-base space-x-3">
            {/* <PhoneIcon className="w-6 h-6" /> */}
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5h3.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1.003 1.003 0 01-.21 1.11l-2.2 2.2z"/></svg>
            </span>
            <span>Continue With Phone Number</span>
          </button>
          <button className="w-full flex items-center justify-center bg-[#232323] rounded-full py-3 text-white font-medium text-base space-x-3">
            {/* <FacebookIcon className="w-6 h-6" /> */}
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0"/></svg>
            </span>
            <span>Continue With Facebook</span>
          </button>
        </div>
        {/* Register Link */}
        <div className="mt-8 text-center">
          <span className="text-theme-secondary">Don&apos;t you have an account? </span>
          <button
            className="text-[#FFC61B] font-semibold"
            onClick={() => navigate("/")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}