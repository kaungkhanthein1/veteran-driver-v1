# reCAPTCHA Implementation Guide

This guide explains how to implement Google reCAPTCHA in your React application with backend verification.

## What We've Implemented

### 1. Frontend Components

#### ReCaptcha Component (`src/components/common/ReCaptcha.tsx`)
- Wraps the `react-google-recaptcha` library
- Provides a clean interface with proper TypeScript types
- Handles verification, expiration, and error callbacks
- Exposes reset, execute, and getValue methods via ref

#### Updated LoginPage (`src/Pages/LoginPage.tsx`)
- Replaced placeholder checkbox with real reCAPTCHA widget
- Integrated with verification service
- Added proper error handling and loading states
- Added translation keys for reCAPTCHA messages

#### reCAPTCHA Service (`src/services/recaptchaService.ts`)
- Handles communication with your backend
- Provides token verification functionality
- Includes error handling and type safety
- Uses Vite's `import.meta.env` for environment variables

### 2. Backend Example (`backend-example.js`)
- Node.js/Express server example
- Shows how to verify reCAPTCHA tokens with Google
- Includes proper error handling and response formatting

## Setup Instructions

### 1. Frontend Setup (Already Done)

The frontend implementation is already complete. The key files are:
- `src/components/common/ReCaptcha.tsx` - reCAPTCHA component
- `src/services/recaptchaService.ts` - API service
- `src/Pages/LoginPage.tsx` - Updated login form
- `src/locales/en.json` - Added translation keys
- `src/vite-env.d.ts` - TypeScript environment types

### 2. Environment Variables Setup

Create a `.env` file in your project root:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# reCAPTCHA Configuration (for development - replace with your actual secret key)
VITE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

**Important Notes:**
- In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser
- The secret key should only be used on your backend, not in the frontend
- The frontend only needs the API URL

### 3. Backend Setup

You need to implement the backend verification. Here's what you need to do:

#### Step 1: Get Your Secret Key
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Find your site (with key: `6Lfo62QrAAAAACzmT7aBwmnvTM5EgrX4EFfh31FT`)
3. Copy the **Secret Key** (not the site key)

#### Step 2: Implement Backend Verification
Use the `backend-example.js` as a reference. You need to:

1. **Create an endpoint** that accepts the reCAPTCHA token
2. **Verify the token** with Google's API using your secret key
3. **Return success/failure** to the frontend

#### Example Backend Endpoint (Node.js/Express):
```javascript
app.post('/api/auth/verify-recaptcha', async (req, res) => {
  const { recaptchaToken } = req.body;
  
  // Verify with Google
  const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
    params: {
      secret: 'YOUR_SECRET_KEY', // Replace with your actual secret key
      response: recaptchaToken
    }
  });
  
  if (response.data.success) {
    res.json({ success: true, message: 'Verification successful' });
  } else {
    res.status(400).json({ success: false, error: 'Verification failed' });
  }
});
```

## How It Works

### 1. User Interaction Flow
1. User fills out login form
2. User completes reCAPTCHA challenge
3. reCAPTCHA generates a token
4. Frontend sends token to your backend
5. Backend verifies token with Google
6. Backend returns verification result
7. Frontend proceeds with login or shows error

### 2. Security Benefits
- **Bot Protection**: Prevents automated form submissions
- **Rate Limiting**: Reduces spam and abuse
- **User Verification**: Ensures real human interaction
- **Server-Side Validation**: Token verification happens on your server

## Key Features

### Frontend Features
- ✅ Real reCAPTCHA widget (not placeholder)
- ✅ Proper error handling and user feedback
- ✅ Loading states during verification
- ✅ Automatic reset on errors
- ✅ TypeScript support
- ✅ Internationalization support
- ✅ Responsive design
- ✅ Vite environment variable support

### Backend Features
- ✅ Token verification with Google
- ✅ Proper error handling
- ✅ Security best practices
- ✅ CORS support
- ✅ JSON response format

## Customization Options

### 1. reCAPTCHA Theme
You can change the theme in `ReCaptcha.tsx`:
```typescript
<ReCAPTCHA
  theme="dark" // or "light"
  size="compact" // or "normal", "invisible"
  // ... other props
/>
```

### 2. API Endpoint
Update the API URL in your `.env` file:
```env
VITE_API_URL=https://your-backend.com/api
```

### 3. Error Messages
Customize error messages in your translation files:
```json
{
  "loginPage": {
    "recaptchaRequired": "Please complete the verification",
    "recaptchaExpired": "Verification expired, please try again",
    "recaptchaError": "Verification failed, please try again"
  }
}
```

## Testing

### 1. Development Testing
- Use the reCAPTCHA test keys for development
- Test both success and failure scenarios
- Verify error handling works correctly

### 2. Production Testing
- Test with real reCAPTCHA keys
- Verify backend integration works
- Test with different browsers and devices

## Troubleshooting

### Common Issues

1. **"process is not defined" error**
   - ✅ **FIXED**: Use `import.meta.env` instead of `process.env` in Vite
   - Environment variables must be prefixed with `VITE_`

2. **"reCAPTCHA not loading"**
   - Check your site key is correct
   - Verify domain is whitelisted in reCAPTCHA admin console

3. **"Verification failed"**
   - Check your secret key is correct
   - Verify backend endpoint is working
   - Check network requests in browser dev tools

4. **"CORS errors"**
   - Ensure your backend has CORS configured
   - Check API URL is correct

### Debug Tips

1. **Check Browser Console** for JavaScript errors
2. **Check Network Tab** for API request/response
3. **Check Backend Logs** for server-side errors
4. **Use reCAPTCHA Test Keys** for development
5. **Verify Environment Variables** are loaded correctly

## Security Notes

1. **Never expose your secret key** in frontend code
2. **Always verify tokens** on your backend
3. **Use HTTPS** in production
4. **Implement rate limiting** on your backend
5. **Validate all inputs** before processing

## Next Steps

1. Create `.env` file with your API URL
2. Implement the backend verification endpoint
3. Test the complete flow
4. Deploy to production
5. Monitor for any issues
6. Consider implementing reCAPTCHA v3 for invisible verification

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Google reCAPTCHA documentation
3. Check browser console and network logs
4. Verify all configuration is correct
5. Ensure environment variables are properly set 