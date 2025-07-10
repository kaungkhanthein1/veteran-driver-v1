import React from 'react';
import ChangeContact from '../../components/common/ChangeContact';

export default function ChangeEmailPage() {
  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const handleSuccess = () => {
    // Handle any additional logic after successful email change
    console.log('Email changed successfully');
  };

  return (
    <ChangeContact
      type="email"
      title="Change E-Mail"
      inputLabel="E-Mail"
      inputPlaceholder="Enter Your Email"
      validateInput={validateEmail}
      onSuccess={handleSuccess}
      apiEndpoint="https://vtt_dev.movie06.com/api/v1/auth/email"
    />
  );
} 