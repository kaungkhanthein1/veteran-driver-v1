
// ===== Enums and Types =====

export type VerificationChannel = 'email';

export type VerificationScene = 'register' | 'login' | 'resetPassword' | 'changeEmail' | 'changePhone' | 'bindPhone' | 'bindEmail';

export type Gender = 'Male' | 'Female' | 'Other';

// ===== Profile Structure =====

export interface ProfileResponseDto {
  id: string;
  uid: string;
  nickname?: string;
  bio?: string;
  gender?: Gender;
  country?: string;
  city?: string;
  avatar?: string;
}

// ===== Token Structure =====

export interface TokenData {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

// ===== Verification Code =====

export interface SendVerificationCodeDto {
  to: string;
  channel: VerificationChannel;
  scene: VerificationScene;
}

export interface SendVerificationCodeResponseDto {
  to: string;
  channel: VerificationChannel;
}

// ===== User Registration =====

export interface UserRegisterDto {
  username: string;
  email: string;
  password: string;
  code: number;
}

export interface UserRegisterResponseDto {
  uid: string;
  username: string;
  email: string;
  profile: ProfileResponseDto;
  token: TokenData;
}

// ===== Password Login =====

export interface PasswordLoginDto {
  account: string;
  password: string;
}

export interface PasswordLoginResponseDto {
  data: {
    token: TokenData;
  }
}

// ===== Email OTP Login =====

export interface EmailOtpLoginDto {
  email: string;
  code: number;
}

export interface EmailOtpLoginResponseDto {
  token: TokenData;
}

// ===== Password Reset =====

export interface SendResetPasswordCodeDto {
  account: string;
}

export interface SendResetPasswordCodeResponseDto {
  to: string;
  channel: string;
  token: string;
}

export interface ResetPasswordDto {
  token: string;
  code: number;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponseDto {
  result: string;
}

// ===== Token Refresh =====

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  token: TokenData;
}

// ===== Account Updates =====

export interface UpdateUsernameDto {
  username: string;
  currentPassword: string;
}

export interface UpdateUsernameResponseDto {
  username: string;
}

export interface UpdateEmailDto {
  email: string;
  code: number;
  currentPassword: string;
}

export interface UpdateEmailResponseDto {
  email: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponseDto {
  result: string;
}

// ===== API Response Types =====

export type SendVerificationCodeResponse = SendVerificationCodeResponseDto;
export type UserRegisterResponse = UserRegisterResponseDto;
export type PasswordLoginResponse = PasswordLoginResponseDto;
export type EmailOtpLoginResponse = EmailOtpLoginResponseDto;
export type SendResetPasswordCodeResponse = SendResetPasswordCodeResponseDto;
export type ResetPasswordResponse = ResetPasswordResponseDto;
export type RefreshTokenResponse = RefreshTokenResponseDto;
export type UpdateUsernameResponse = UpdateUsernameResponseDto;
export type UpdateEmailResponse = UpdateEmailResponseDto;
export type UpdatePasswordResponse = UpdatePasswordResponseDto; 