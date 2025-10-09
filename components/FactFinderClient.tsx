'use client';

import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isPayingMember: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    email?: string;
    subscription: { 
      status: string;
      isPayingMember: boolean;
    };
  } | null;
  error: string | null;
}

interface FactFinderClientProps {
  authState: AuthState;
}

export default function FactFinderClient({ authState }: FactFinderClientProps) {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [factCount, setFactCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState('random');
  const [showFavorites, setShowFavorites] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const categories = [
    { id: 'random', name: '🎲 Random', api: 'https://uselessfacts.jsph.pl/random.json?language=en' },
    { id: 'today', name: '📅 Today', api: 'https://uselessfacts.jsph.pl/today.json?language=en' },
    { id: 'trivia', name: '🧠 Trivia', api: 'https://opentdb.com/api.php?amount=1&type=multiple' }
  ];

  const fetchFact = async (category = currentCategory) => {
    setLoading(true);
    setError('');
    setAnimationClass('fade-out');
    
    try {
      const categoryData = categories.find(cat => cat.id === category);
      const response = await fetch(categoryData?.api || categories[0].api);
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      let factText = '';
      
      if (category === 'trivia') {
        factText = data.results[0]?.question || 'No trivia available';
      } else {
        factText = data.text || 'No fact available';
      }
      
      setTimeout(() => {
        setFact(factText);
        setFactCount(prev => prev + 1);
        setAnimationClass('fade-in');
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError('Could not load fact. Please try again.');
      setLoading(false);
      setAnimationClass('fade-in');
    }
  };

  const addToFavorites = () => {
    if (fact && !favorites.includes(fact)) {
      setFavorites(prev => [...prev, fact]);
      // Add haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  const removeFromFavorites = (factToRemove: string) => {
    setFavorites(prev => prev.filter(f => f !== factToRemove));
  };

  const shareFact = async () => {
    if (navigator.share && fact) {
      try {
        await navigator.share({
          title: 'Amazing Fact!',
          text: fact,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(fact);
        alert('Fact copied to clipboard!');
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(fact);
      alert('Fact copied to clipboard!');
    }
  };

  // Show access denied if not authenticated or not a paying member
  if (!authState.isAuthenticated || !authState.isPayingMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-red-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-red-500/50">
            <div className="text-red-400 text-6xl mb-4">🚫</div>
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-300 mb-6">You must be a paying member to access FactFinder Pro.</p>
            <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-200">
                Please upgrade your subscription to continue.
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Current Status: {authState.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </p>
              <p className="text-gray-400 text-sm">
                Membership: {authState.isPayingMember ? 'Premium' : 'Free'}
              </p>
              {authState.error && (
                <p className="text-red-400 text-xs mt-2">
                  Error: {authState.error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎉 FactFinder Pro
          </h1>
          <p className="text-gray-300 text-lg">
            Your free source for mind-blowing facts
          </p>
        </div>

        {/* User Status */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 mb-8 text-center">
          <p className="text-white font-semibold text-lg">
            👋 Welcome, {authState.user?.name}! 
            <span className="text-green-300 ml-2">🆓 Free Access</span>
          </p>
          <p className="text-green-200 text-sm mt-1">
            @{authState.user?.username} • {authState.user?.email}
          </p>
          <div className="mt-2 bg-green-500/20 border border-green-400/30 rounded-lg p-2">
            <p className="text-green-200 text-xs">
              🎉 FactFinder Pro is now FREE for everyone!
            </p>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-2">
              <p className="text-yellow-200 text-xs">
                🚀 Development Mode - Simulated Authentication
              </p>
            </div>
          )}
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setCurrentCategory(category.id);
                fetchFact(category.id);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fact Display */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className={`min-h-[200px] flex items-center justify-center transition-all duration-500 ${animationClass}`}>
                {loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading amazing fact...</p>
                  </div>
                ) : error ? (
                  <p className="text-red-400 text-center text-lg">{error}</p>
                ) : fact ? (
                  <p className="text-white text-xl leading-relaxed text-center">{fact}</p>
                ) : (
                  <p className="text-gray-400 text-center text-lg">
                    💡 Click below to discover an amazing fact!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => fetchFact()}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? '⏳ Loading...' : '🎲 Get New Fact'}
                </button>

                {fact && (
                  <>
                    <button
                      onClick={addToFavorites}
                      className="bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ❤️ Save
                    </button>
                    <button
                      onClick={shareFact}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📤 Share
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold text-lg mb-4">📊 Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Facts Generated:</span>
                  <span className="text-purple-400 font-bold">{factCount}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Favorites:</span>
                  <span className="text-pink-400 font-bold">{favorites.length}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Category:</span>
                  <span className="text-blue-400 font-bold capitalize">{currentCategory}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Status:</span>
                  <span className="text-green-400 font-bold">Free Access</span>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold text-lg">❤️ Favorites</h3>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showFavorites ? '👁️‍🗨️ Hide' : '👁️ Show'}
                </button>
              </div>
              
              {showFavorites && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {favorites.length === 0 ? (
                    <p className="text-gray-400 text-sm">No favorites yet. Save some facts!</p>
                  ) : (
                    favorites.map((fav, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                        <p className="text-gray-300 text-sm mb-2 line-clamp-3">{fav}</p>
                        <button
                          onClick={() => removeFromFavorites(fav)}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold text-lg mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setFact('');
                    setFactCount(0);
                    setFavorites([]);
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  🔄 Reset All
                </button>
                <button
                  onClick={() => {
                    const randomFav = favorites[Math.floor(Math.random() * favorites.length)];
                    if (randomFav) setFact(randomFav);
                  }}
                  disabled={favorites.length === 0}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎯 Random Favorite
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Powered by FactFinder Pro • Built with Next.js & Whop SDK
          </p>
          <p className="text-gray-500 text-xs mt-2">
            User ID: {authState.user?.id} • Free Access
          </p>
        </div>
      </div>

      <style jsx>{`
        .fade-out {
          opacity: 0;
          transform: translateY(-10px);
        }
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}