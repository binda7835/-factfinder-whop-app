'use client';

import { useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isPayingMember: boolean;
  user: any;
  error: string | null;
}

interface FactFinderClientProps {
  authState: AuthState;
}

/**
 * Client-side FactFinder Component
 * 
 * This component handles the UI and API interactions for the FactFinder app.
 * It receives authentication state from the server component.
 */
export default function FactFinderClient({ authState }: FactFinderClientProps) {
  // State management using React hooks
  const [fact, setFact] = useState<string>('');           // Stores the current fact
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls
  const [error, setError] = useState<string>('');         // Error messages

  /**
   * Fetches a random fact from the API
   */
  const fetchFact = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Make API request to uselessfacts.jsph.pl
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      setFact(data.text);
    } catch (err) {
      setError('Could not load fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show access denied if not authenticated or not a paying member
  if (!authState.isAuthenticated || !authState.isPayingMember) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-red-200">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You must be a paying member to access this feature.</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                {!authState.isAuthenticated 
                  ? 'Please log in to your Whop account to continue.'
                  : 'Please upgrade your membership to access fun facts.'
                }
              </p>
              {authState.error && (
                <p className="text-xs text-red-600 mt-2">
                  Error: {authState.error}
                </p>
              )}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Development Note:</strong> This app requires Whop authentication. 
                Install it in a Whop and access through the tools section to test with real authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Daily Fun Fact
          </h1>

          {/* Fact Display Box */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8 min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Fetching fact...</p>
              </div>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : fact ? (
              <p className="text-gray-800 text-center text-lg leading-relaxed">{fact}</p>
            ) : (
              <p className="text-gray-500 text-center text-lg">
                Click below to get a fun fact!
              </p>
            )}
          </div>

          {/* Get New Fact Button */}
          <div className="text-center">
            <button
              onClick={fetchFact}
              disabled={loading}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              `}
            >
              {loading ? 'Loading...' : 'Get New Fact'}
            </button>
          </div>

          {/* User Info */}
          {authState.user && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Welcome, <span className="font-semibold">{authState.user.name}</span>! 
                <br />
                <span className="text-green-600">✓ Paying Member</span>
                <br />
                <span className="text-xs text-gray-400">@{authState.user.username}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
