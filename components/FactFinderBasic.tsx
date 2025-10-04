'use client';

import { useState } from 'react';

export default function FactFinderBasic() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFact = async () => {
    setLoading(true);
    setError('');
    
    try {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎉 Fun Fact Generator
          </h1>
          <p className="text-gray-600">Your daily dose of interesting facts!</p>
        </div>

        {/* User Welcome */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-center">
            <strong>Welcome, Muhammad Usman!</strong>
            <br />
            <span className="text-sm">Access Level: admin</span>
          </p>
        </div>

        {/* Fact Display Box */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8 min-h-[120px] flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Fetching fact...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={fetchFact}
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                Try again
              </button>
            </div>
          ) : fact ? (
            <p className="text-gray-800 text-center text-lg leading-relaxed">{fact}</p>
          ) : (
            <p className="text-gray-500 text-center text-lg">
              💡 Click below to get a fun fact!
            </p>
          )}
        </div>

        {/* Get New Fact Button */}
        <div className="text-center">
          <button
            onClick={fetchFact}
            disabled={loading}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed scale-95' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:scale-105'
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              shadow-lg hover:shadow-xl
            `}
          >
            {loading ? '⏳ Loading...' : '🎲 Get New Fact'}
          </button>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-600">∞</p>
              <p className="text-xs text-blue-800">Facts Available</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-xs text-green-800">Always Fresh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
