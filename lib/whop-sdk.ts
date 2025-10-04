import { WhopAPI } from '@whop/api';

// Initialize the Whop SDK with environment variables
export const whopSdk = new WhopAPI({
  apiKey: process.env.WHOP_APP_SECRET || '',
  appId: process.env.WHOP_APP_ID || '',
});

// Helper function to verify user token from headers
export async function verifyUserToken(headers: Headers) {
  try {
    // Get the authorization header
    const authHeader = headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header found');
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token found in authorization header');
    }

    // Verify the token with Whop API
    const response = await fetch('https://api.whop.com/api/v2/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Token verification failed: ${response.status}`);
    }

    const userData = await response.json();
    return {
      userId: userData.id,
      user: userData
    };
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
}
