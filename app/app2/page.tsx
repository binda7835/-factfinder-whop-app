export default function App2Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎉 Second Whop App</h1>
          <p className="text-xl text-gray-600 mb-8">A second app namespace under /app2</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <a href="/app2/experiences/test123" className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Go to Experience</h2>
            <p className="text-gray-600 text-sm">Route: /app2/experiences/[experienceId]</p>
          </a>
          <a href="/app2/dashboard/demo-company" className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Open Dashboard</h2>
            <p className="text-gray-600 text-sm">Route: /app2/dashboard/[companyId]</p>
          </a>
          <a href="/app2/discover" className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Discover Page</h2>
            <p className="text-gray-600 text-sm">Route: /app2/discover</p>
          </a>
          <a href="/" className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Back to Main App</h2>
            <p className="text-gray-600 text-sm">Home</p>
          </a>
        </div>
      </div>
    </div>
  );
}
