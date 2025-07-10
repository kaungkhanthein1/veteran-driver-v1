import React from 'react';
import ChangeContact from '../../components/common/ChangeContact';

export default function ChangeMobilePage() {
  const validateMobile = (mobile: string) => {
    if (!mobile) return 'Mobile number is required';
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    if (!mobileRegex.test(mobile)) return 'Please enter a valid mobile number';
    return null;
  };

  const handleSuccess = () => {
    // Handle any additional logic after successful mobile change
    console.log('Mobile number changed successfully');
  };

  return (
    <ChangeContact
      type="mobile"
      title="Change Mobile Number"
      inputLabel="Mobile Number"
      inputPlaceholder="Enter Your Mobile Number"
      validateInput={validateMobile}
      onSuccess={handleSuccess}
      apiEndpoint="https://vtt_dev.movie06.com/api/v1/auth/mobile"
    />
  );
} 