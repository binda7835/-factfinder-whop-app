import { verifyUserToken } from '@/lib/whop-sdk';
import { headers } from 'next/headers';
import FactFinderClient from './FactFinderClient';

/**
 * Server-side FactFinder Component
 * 
 * This component handles authentication on the server side using the Whop SDK
 * and passes the authentication state to the client component.
 */
export default async function FactFinderServer() {
  let authState = {
    isAuthenticated: false,
    isPayingMember: false,
    user: null,
    error: null
  };

  try {
    // Get headers for authentication
    const headersList = await headers();
    
    // Verify user token using Whop SDK
    const { userId, user } = await verifyUserToken(headersList);
    
    // Check if user has access to the experience
    // For this demo, we'll assume all authenticated users are paying members
    authState = {
      isAuthenticated: true,
      isPayingMember: true,
      user: {
        id: userId,
        name: user.name || user.username || 'User',
        username: user.username,
        subscription: { status: 'active' }
      },
      error: null
    };
  } catch (error) {
    // Handle authentication errors
    console.error('Authentication error:', error);
    authState = {
      isAuthenticated: false,
      isPayingMember: false,
      user: null,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }

  return <FactFinderClient authState={authState} />;
}
