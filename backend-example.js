// Backend Example: Node.js/Express with reCAPTCHA verification
// This is just an example - you'll need to adapt it to your actual backend

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Your reCAPTCHA secret key (keep this secure!)
const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your actual secret key

// reCAPTCHA verification endpoint
app.post('/api/auth/verify-recaptcha', async (req, res) => {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA token is required'
      });
    }

    // Verify the token with Google
    const verificationResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }
      }
    );

    const { success, score, action } = verificationResponse.data;

    if (success) {
      // reCAPTCHA verification successful
      console.log('reCAPTCHA verified successfully');
      console.log('Score:', score); // For v3 reCAPTCHA
      console.log('Action:', action); // For v3 reCAPTCHA
      
      return res.json({
        success: true,
        message: 'reCAPTCHA verification successful',
        score: score,
        action: action
      });
    } else {
      // reCAPTCHA verification failed
      console.log('reCAPTCHA verification failed');
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed'
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during reCAPTCHA verification'
    });
  }
});

// Login endpoint (example)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { emailOrPhone, password, recaptchaToken } = req.body;

    // First verify reCAPTCHA
    const recaptchaVerification = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }
      }
    );

    if (!recaptchaVerification.data.success) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed'
      });
    }

    // If reCAPTCHA is verified, proceed with login logic
    // Your actual login logic here...
    
    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 'user123',
        email: emailOrPhone,
        // other user data...
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
To use this backend:

1. Install dependencies:
   npm init -y
   npm install express axios cors

2. Replace 'YOUR_RECAPTCHA_SECRET_KEY' with your actual secret key from Google reCAPTCHA admin console

3. Run the server:
   node backend-example.js

4. Update your frontend API_BASE_URL in recaptchaService.ts to point to this server

Note: This is a basic example. In production, you should:
- Use environment variables for sensitive data
- Add proper authentication middleware
- Implement proper error handling
- Use HTTPS
- Add rate limiting
- Validate input data
*/ 