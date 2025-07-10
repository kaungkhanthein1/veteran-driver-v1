import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import FormInput from './FormInput';
import ReCaptcha from './ReCaptcha';
import { gatewayRequest } from '../../services/gateway';

interface ChangeContactProps {
  type: 'email' | 'mobile';
  title: string;
  inputLabel: string;
  inputPlaceholder: string;
  initialValue?: string;
  validateInput: (value: string) => string | null;
  onSuccess: () => void;
  apiEndpoint: string;
}

export default function ChangeContact({
  type,
  title,
  inputLabel,
  inputPlaceholder,
  initialValue = '',
  validateInput,
  onSuccess,
  apiEndpoint,
}: ChangeContactProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [value, setValue] = useState(initialValue);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token);
    setError(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setError('reCAPTCHA expired. Please try again.');
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setError('reCAPTCHA error occurred. Please try again.');
  };

  const handleSendOTP = async () => {
    const validationError = validateInput(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await gatewayRequest({
        url: `${apiEndpoint}/send-otp`,
        method: 'POST',
        data: {
          [type]: value,
          recaptchaToken,
        },
      });
      setStep('otp');
    } catch (error: any) {
      setError(error?.response?.data?.message || `Failed to send OTP to ${value}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await gatewayRequest({
        url: `${apiEndpoint}/verify-otp`,
        method: 'POST',
        data: {
          [type]: value,
          otp,
        },
      });
      onSuccess();
      navigate(-1);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await gatewayRequest({
        url: `${apiEndpoint}/resend-otp`,
        method: 'POST',
        data: {
          [type]: value,
        },
      });
      alert('Verification code resent successfully');
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to resend verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="relative flex items-center justify-center h-14 px-4">
        <div className="absolute left-2">
          <BackButton />
        </div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="px-4 pt-4">
        {step === 'input' ? (
          <>
            {/* Input Form */}
            <div className="mb-6">
              <FormInput
                label={inputLabel}
                name={type}
                type={type === 'email' ? 'email' : 'tel'}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(null);
                }}
                placeholder={inputPlaceholder}
              />
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>

            {/* ReCaptcha */}
            <div className="mb-6">
              <ReCaptcha
                onVerify={handleRecaptchaVerify}
                onExpired={handleRecaptchaExpired}
                onError={handleRecaptchaError}
              />
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSendOTP}
              disabled={!value || !recaptchaToken || isLoading}
              className={`w-full py-3 rounded-full font-medium transition-colors ${
                value && recaptchaToken && !isLoading
                  ? 'bg-[#FFC61B] text-black'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </button>
          </>
        ) : (
          <>
            {/* OTP Verification */}
            <div className="mb-6">
              <p className="text-center text-gray-600 mb-2">
                Verification code sent to {value}
              </p>
              <p className="text-center text-gray-500 text-sm mb-6">
                Please check your messages and be sure to check your spam folder
              </p>

              {/* OTP Input */}
              <div className="flex justify-center gap-2 mb-4">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[index] = e.target.value;
                        setOtp(newOtp.join(''));
                        setError(null);
                        // Auto-focus next input
                        if (e.target.value && index < 5) {
                          const nextInput = document.querySelector(
                            `input[name=otp-${index + 1}]`
                          ) as HTMLInputElement;
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      name={`otp-${index}`}
                      className="w-10 h-10 text-center border rounded-lg focus:outline-none focus:border-[#FFC61B]"
                    />
                  ))}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center mb-4">{error}</div>
              )}

              {/* Resend Link */}
              <div className="text-center mb-6">
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-[#FFC61B] text-sm font-medium"
                >
                  Didn&apos;t get the verification code? Resend OTP
                </button>
              </div>

              {/* Save Changes Button */}
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
                className={`w-full py-3 rounded-full font-medium transition-colors ${
                  otp.length === 6 && !isLoading
                    ? 'bg-[#FFC61B] text-black'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 