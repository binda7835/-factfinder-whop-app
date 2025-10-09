// Note: WhopAPI import removed due to build issues
// Using direct API calls instead for production stability

// Initialize Whop SDK configuration
export const whopConfig = {
  apiKey: process.env.WHOP_APP_SECRET || '',
  appId: process.env.WHOP_APP_ID || '',
  baseUrl: 'https://api.whop.com/api/v2'
};

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
