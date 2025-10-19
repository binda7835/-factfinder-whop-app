import { headers } from "next/headers";

export default async function App2DashboardPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const headersList = await headers();
  const { companyId } = await params;

  const user = {
    name: 'Demo User 2',
    username: 'demo_user_2',
    userId: 'demo_user2_123'
  };

  const company = {
    title: 'Demo Company 2'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">🎉 Second App Dashboard</h1>

          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <p className="text-blue-200 text-lg">
              Hi <strong>{user.name}</strong>! Welcome to your second Whop app.
            </p>
            <p className="text-blue-300 text-sm mt-2">Username: <strong>@{user.username}</strong></p>
            <p className="text-blue-300 text-sm">Company: <strong>{company.title}</strong></p>
          </div>

          <div className="space-y-4">
            <a 
              href="/app2/experiences/test123"
              className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              🎲 Go to App 2 Experience
            </a>
            <div className="text-gray-400 text-sm">
              <p>This second app uses the same auth flow and UI components.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
