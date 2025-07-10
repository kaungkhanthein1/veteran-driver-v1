import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  className?: string;
  recaptchaRef: any;
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
  getValue: () => string | null;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  (
    { onVerify, onExpired, onError, className = "mx-auto", recaptchaRef },
    ref
  ) => {
    // const recaptchaRef = useRef<ReCAPTCHA>(null);
    const { t } = useTranslation();

    const handleVerify = useCallback(
      (token: string | null) => {
        onVerify(token);
      },
      [onVerify]
    );

    const handleExpired = useCallback(() => {
      if (onExpired) {
        onExpired();
      }
    }, [onExpired]);

    const handleError = useCallback(() => {
      if (onError) {
        onError();
      }
    }, [onError]);

    const reset = useCallback(() => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }, []);

    const execute = useCallback(() => {
      if (recaptchaRef.current) {
        recaptchaRef.current.execute();
      }
    }, []);

    const getValue = useCallback(() => {
      if (recaptchaRef.current) {
        return recaptchaRef.current.getValue();
      }
      return null;
    }, []);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      reset,
      execute,
      getValue,
    }));

    return (
      <div className="w-[304px] mx-auto">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Lc6bXgrAAAAAFL74zic2cjeCqu8flnYpCe1I41q"
          // sitekey="6LeZBmUrAAAAANHTL_3UiyYHfBnYR5iSyF1yMR2Z"
          onChange={handleVerify}
          onExpired={handleExpired}
          onError={handleError}
          theme="light"
          size="normal"
        />
      </div>
    );
  }
);

ReCaptcha.displayName = "ReCaptcha";

export default ReCaptcha;
