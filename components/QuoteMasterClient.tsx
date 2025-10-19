'use client';

import { useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isPayingMember: boolean;
  user: {
    id: string;
    name: string;
    username: string;
  } | null;
  error: string | null;
}

export default function QuoteMasterClient({ authState }: { authState: AuthState }) {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) throw new Error('Failed to fetch quote');
      const data = await res.json();
      setQuote(data.content);
    } catch (err) {
      setError('Could not load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 Quote Master</h1>
            <p className="text-gray-600">Daily inspirational quotes for your members.</p>
          </div>

          {authState.user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-center">
                <span className="font-semibold">Welcome, {authState.user.name || authState.user.username}!</span>
              </p>
            </div>
          )}

          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8 min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Fetching quote...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-600 mb-2">{error}</p>
                <button onClick={fetchQuote} className="text-sm text-indigo-600 hover:text-indigo-800 underline">Try again</button>
              </div>
            ) : quote ? (
              <p className="text-gray-800 text-center text-lg leading-relaxed">“{quote}”</p>
            ) : (
              <p className="text-gray-500 text-center text-lg">💡 Click below to get a quote!</p>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={fetchQuote}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform ${loading ? 'bg-gray-400 cursor-not-allowed scale-95' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:scale-105'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl`}
            >
              {loading ? '⏳ Loading...' : '✨ Get Quote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
