import { headers } from "next/headers";

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	// The headers contains the user token
	const headersList = await headers();

	// The companyId is a path param
	const { companyId } = await params;

	// For now, we'll show a simplified dashboard
	// In a real implementation, you would verify the user token and check access
	const authHeader = headersList.get('authorization');
	
	// Simulate user data for development
	const user = {
		name: 'Demo User',
		username: 'demo_user',
		userId: 'demo_user_123'
	};

	const company = {
		title: 'Demo Company'
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
			<div className="max-w-2xl w-full">
				<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
					<h1 className="text-3xl font-bold text-white mb-6">
						🎉 FactFinder Pro Dashboard
					</h1>
					
					<div className="bg-green-600/20 border border-green-500/30 rounded-lg p-6 mb-6">
						<p className="text-green-200 text-lg">
							Hi <strong>{user.name}</strong>! Welcome to FactFinder Pro.
						</p>
						<p className="text-green-300 text-sm mt-2">
							Your username: <strong>@{user.username}</strong>
						</p>
						<p className="text-green-300 text-sm">
							Company: <strong>{company.title}</strong>
						</p>
					</div>

					<div className="space-y-4">
						<a 
							href="/experiences/test123"
							className="block w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
						>
							🎲 Go to FactFinder Pro
						</a>
						
						<div className="text-gray-400 text-sm">
							<p>FactFinder Pro is FREE for all users!</p>
							<p>Enjoy unlimited facts, favorites, and sharing.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
