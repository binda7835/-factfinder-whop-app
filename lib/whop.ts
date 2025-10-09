// Note: WhopAPI import removed due to build issues
// Using direct API calls instead for production stability

// Helper function to get user from headers
export async function getUserFromHeaders(headers: Headers) {
  try {
    const authHeader = headers.get('authorization');
    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return null;
    }

    // Verify the token with Whop API
    const response = await fetch('https://api.whop.com/api/v2/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting user from headers:', error);
    return null;
  }
}

// Helper function to verify user access
export async function verifyUserAccess(userId: string, experienceId: string) {
  try {
    // For now, we'll assume all authenticated users have access
    // In a real app, you'd check against your database or Whop's API
    return true;
  } catch (error) {
    console.error('Error verifying user access:', error);
    return false;
  }
}
