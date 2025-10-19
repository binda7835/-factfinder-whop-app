export default function App2DiscoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">Discover your second app</h1>
        <div className="bg-white rounded-xl p-8 shadow-md text-center mb-10">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            This is the discover page for your second Whop app.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Use this space to highlight the unique value proposition of the second app.
          </p>
        </div>
        <div className="text-center">
          <a href="/app2/experiences/test123" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            🚀 Try the Experience
          </a>
        </div>
      </div>
    </div>
  );
}
