export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">
						🎉 FactFinder Whop App
					</h1>
					<p className="text-xl text-gray-600 mb-8">
						Your Daily Fun Fact Generator is Ready!
					</p>
					<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
						<h2 className="text-2xl font-semibold text-green-800 mb-2">✅ App Successfully Built!</h2>
						<p className="text-green-700">
							FactFinder is a Whop app that provides random fun facts to paying members.
							Features authentication, API integration, and beautiful UI.
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{/* App Features */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
							<span className="text-3xl mr-3">🚀</span>
							App Features
						</h2>
						<ul className="space-y-2 text-gray-600">
							<li className="flex items-center">
								<span className="text-green-500 mr-2">✓</span>
								Whop SDK Authentication
							</li>
							<li className="flex items-center">
								<span className="text-green-500 mr-2">✓</span>
								Paying Member Access Control
							</li>
							<li className="flex items-center">
								<span className="text-green-500 mr-2">✓</span>
								Random Fun Facts API
							</li>
							<li className="flex items-center">
								<span className="text-green-500 mr-2">✓</span>
								Loading States & Error Handling
							</li>
							<li className="flex items-center">
								<span className="text-green-500 mr-2">✓</span>
								Responsive TailwindCSS Design
							</li>
						</ul>
					</div>

					{/* Technical Stack */}
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
							<span className="text-3xl mr-3">⚡</span>
							Technical Stack
						</h2>
						<ul className="space-y-2 text-gray-600">
							<li className="flex items-center">
								<span className="text-blue-500 mr-2">•</span>
								Next.js 15 with App Router
							</li>
							<li className="flex items-center">
								<span className="text-blue-500 mr-2">•</span>
								React 19 with Hooks
							</li>
							<li className="flex items-center">
								<span className="text-blue-500 mr-2">•</span>
								Whop SDK (@whop/react)
							</li>
							<li className="flex items-center">
								<span className="text-blue-500 mr-2">•</span>
								TailwindCSS Styling
							</li>
							<li className="flex items-center">
								<span className="text-blue-500 mr-2">•</span>
								TypeScript Support
							</li>
						</ul>
					</div>
				</div>

				{/* Setup Instructions */}
				<div className="space-y-8">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white mr-3">
								1
							</span>
							Install Your FactFinder App
						</h2>
						<p className="text-gray-600 mb-4">
							Your app is ready to be installed into a Whop. Click the link below to install it.
						</p>
						{process.env.NEXT_PUBLIC_WHOP_APP_ID ? (
							<a
								href={`https://whop.com/apps/${process.env.NEXT_PUBLIC_WHOP_APP_ID}/install`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
							>
								🚀 Install FactFinder App
							</a>
						) : (
							<span className="text-amber-600">
								Please set your environment variables to see the installation link
							</span>
						)}
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white mr-3">
								2
							</span>
							Test Your App
						</h2>
						<p className="text-gray-600 mb-4">
							Once installed, users can access your app through the Whop tools section.
							The app will check if they're paying members and show fun facts accordingly.
						</p>
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<p className="text-sm text-blue-800">
								<strong>App Path:</strong> /experiences/[experienceId]<br />
								<strong>Access Control:</strong> Paying members only<br />
								<strong>API:</strong> https://uselessfacts.jsph.pl/random.json
							</p>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
							<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white mr-3">
								3
							</span>
							Development Info
						</h2>
						<p className="text-gray-600 mb-4">
							Your app is running in development mode. Environment variables are configured and ready.
						</p>
						{process.env.NODE_ENV === "development" && (
							<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
								<pre className="text-sm text-gray-700">
									<code>
										WHOP_API_KEY={process.env.WHOP_API_KEY?.slice(0, 5)}...<br />
										NEXT_PUBLIC_WHOP_APP_ID={process.env.NEXT_PUBLIC_WHOP_APP_ID}<br />
										NEXT_PUBLIC_WHOP_AGENT_USER_ID={process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID}<br />
										NEXT_PUBLIC_WHOP_COMPANY_ID={process.env.NEXT_PUBLIC_WHOP_COMPANY_ID}
									</code>
								</pre>
							</div>
						)}
					</div>
				</div>

				<div className="mt-12 text-center">
					<p className="text-gray-500 mb-4">
						Need help? Visit the{" "}
						<a
							href="https://dev.whop.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-indigo-600 hover:text-indigo-700 underline"
						>
							Whop Documentation
						</a>
					</p>
					<p className="text-sm text-gray-400">
						FactFinder App - Built with Next.js & Whop SDK
					</p>
				</div>
			</div>
		</div>
	);
}
