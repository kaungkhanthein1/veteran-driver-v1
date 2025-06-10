import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormInput from '../../components/common/FormInput';
import BackButton from '../../components/common/BackButton';
// Import payment method icons
import CardsIcon from 'assets/Cards.png';
import AlipayIcon from 'assets/Alipay.png';
import GooglePayIcon from 'assets/GooglePay.png';
import ApplePayIcon from 'assets/ApplePay.svg';
import WeChatIcon from 'assets/WeChat.svg';

export default function WithdrawPage() {
  const { t } = useTranslation();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(t('withdrawPage.bankAccountOption'));

  const paymentMethods = [
    { name: t('withdrawPage.bankAccountOption'), default: true },
    {
      name: t('withdrawPage.creditCardOption'),
      icons: [CardsIcon]
    },
    { name: t('withdrawPage.alipayOption'), icon: AlipayIcon },
    { name: t('withdrawPage.googlePayOption'), icon: GooglePayIcon },
    { name: t('withdrawPage.applePayOption'), icon: ApplePayIcon },
    { name: t('withdrawPage.wechatOption'), icon: WeChatIcon }
  ];

  const isFormFilled = withdrawAmount.trim() !== '' && bankAccountName.trim() !== '' && bankAccountNumber.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="dvh-fallback bg-theme-primary text-theme-text">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
         <BackButton/>
          <h1 className="flex-1 text-center text-xl font-normal">{t('withdrawPage.title')}</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 space-y-6 pb-6">
          {/* Withdraw Amount */}
          <FormInput 
            label={t('withdrawPage.withdrawAmountLabel')}
            type="number"
            placeholder={t('withdrawPage.withdrawAmountPlaceholder')}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />

          {/* Available Amount */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {t('withdrawPage.availableAmountLabel')}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>{t('withdrawPage.availableCoins')}</span>
          </div>

          <div>{t('withdrawPage.youReceiveLabel', { amount: '0.00' })}</div>   

          {/* Payment Methods */}
          <div className="space-y-2 relative">
            <label className="block text-theme-text/60">{t('withdrawPage.paymentMethodsLabel')}</label>
            <button
              type="button"
              className="w-full bg-theme-secondary border border-theme-text/20 rounded-lg px-4 py-3 flex justify-between items-center"
              onClick={() => setShowPaymentMethods(!showPaymentMethods)}
            >
              <span>{selectedPayment}{selectedPayment === t('withdrawPage.bankAccountOption') ? t('withdrawPage.defaultLabel') : ''}</span>
              <svg
                className={`w-5 h-5 transition-transform ${showPaymentMethods ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showPaymentMethods && (
              <div className="absolute z-10 w-full mt-1 bg-theme-secondary border border-theme-text/20 rounded-lg overflow-hidden shadow-lg">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    type="button"
                    className={`w-full px-4 py-3 flex justify-between items-center hover:bg-theme-text/10 ${method.name === selectedPayment ? 'bg-[#FDC51B] bg-opacity-20' : ''}`}
                    onClick={() => {
                      setSelectedPayment(method.name);
                      setShowPaymentMethods(false);
                    }}
                  >
                    <span>{method.name}{method.default ? t('withdrawPage.defaultLabel') : ''}</span>
                    <div className="flex items-center gap-1">
                      {method.icons ? (
                        method.icons.map((icon, index) => (
                          <img key={index} src={icon} alt="" className="h-5" />
                        ))
                      ) : method.icon ? (
                        <img src={method.icon} alt="" className="h-5" />
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bank Account Name */}
          <FormInput
            label={t('withdrawPage.bankAccountNameLabel')}
            placeholder={t('withdrawPage.bankAccountNamePlaceholder')}
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            required
          />

          {/* Bank Account Number */}
          <FormInput
            label={t('withdrawPage.bankAccountNumberLabel')}
            placeholder={t('withdrawPage.bankAccountNumberPlaceholder')}
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            required
          />

          {/* Upload Photo Proof */}
          <div className="space-y-2">
            <label className="block">{t('withdrawPage.uploadPhotoProofLabel')}</label>
            <div className="flex gap-4">
              <label className="w-24 h-24 bg-theme-secondary rounded-lg flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setProofImage(e.target.files[0])}
                />
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </label>
              {proofImage && (
                <div className="w-24 h-24 bg-theme-secondary rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(proofImage)}
                    alt={t('withdrawPage.proofAltText')}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Withdraw Rule */}
          <div className="space-y-4">
            <h2>{t('withdrawPage.withdrawRuleTitle')}</h2>
            <ol className="list-decimal list-inside space-y-2 text-theme-text/60">
              <li>{t('withdrawPage.withdrawRule1')}</li>
              <li>{t('withdrawPage.withdrawRule2')}</li>
              <li>{t('withdrawPage.withdrawRule3')}</li>
            </ol>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg ${isFormFilled ? 'bg-yellow-gradient text-black' : 'bg-theme-secondary text-theme-text'}`}
            disabled={!isFormFilled}
          >
            {t('withdrawPage.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
