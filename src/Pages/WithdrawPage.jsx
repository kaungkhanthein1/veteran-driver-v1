import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormInput from '../components/FormInput';
import BackButton from '../components/BackButton';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Bank Account');

  const paymentMethods = [
    { name: 'Bank Account', default: true },
    { 
      name: 'Credit Card', 
      icons: [
        '/visa.png',
        '/mastercard.png',
        '/amex.png',
        '/discover.png'
      ]
    },
    { name: 'AliPay', icon: '/alipay.png' },
    { name: 'Google Pay', icon: '/googlepay.png' },
    { name: 'Apple Pay', icon: '/applepay.png' },
    { name: 'WeChat', icon: '/wechat.png' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-theme-primary text-theme-text">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
         <BackButton/>
          <h1 className="flex-1 text-center text-xl font-normal">Withdraw</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 space-y-6">
          {/* Withdraw Amount */}
          <FormInput
            label="Withdraw Amount"
            type="number"
            placeholder="Please enter withdraw amount (min 800 coins )"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />

          {/* Available Amount */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              Available Amount
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>****** coins</span>
          </div>

          <div>You Receive 0.00 USD</div>   

          {/* Payment Methods */}
          <div className="space-y-2 relative">
            <label className="block text-theme-text/60">Payment Methods</label>
            <button
              type="button"
              className="w-full bg-[#1C1C1E] border border-theme-text/20 rounded-lg px-4 py-3 flex justify-between items-center"
              onClick={() => setShowPaymentMethods(!showPaymentMethods)}
            >
              <span>{selectedPayment}{selectedPayment === 'Bank Account' ? ' (default)' : ''}</span>
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
              <div className="absolute z-10 w-full mt-1 bg-[#1C1C1E] border border-theme-text/20 rounded-lg overflow-hidden shadow-lg">
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
                    <span>{method.name}{method.default ? ' (default)' : ''}</span>
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
            label="Bank Account Name"
            placeholder="Please enter bank account name"
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            required
          />

          {/* Bank Account Number */}
          <FormInput
            label="Bank Account Number"
            placeholder="Please enter bank account number"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            required
          />

          {/* Upload Photo Proof */}
          <div className="space-y-2">
            <label className="block">Upload Photo Proof</label>
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
                    alt="Proof"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Withdraw Rule */}
          <div className="space-y-4">
            <h2>Withdraw Rule</h2>
            <ol className="list-decimal list-inside space-y-2 text-theme-text/60">
              <li>Withdraw amount must be at least 800 coins.</li>
              <li>User need to upload proof of income to pass the review from admin</li>
              <li>Review process will begin after you submitted the withdraw form and it will take 24 Hours to process.</li>
            </ol>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-theme-secondary text-theme-text py-4 rounded-lg mt-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
