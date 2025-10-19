import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
	outputFileTracingRoot: process.cwd(),
	// Handle missing environment variables gracefully
	env: {
		WHOP_APP_ID: process.env.WHOP_APP_ID || 'demo_app_id',
		WHOP_APP_SECRET: process.env.WHOP_APP_SECRET || 'demo_app_secret',
		WHOP_APP_PUBLIC_KEY: process.env.WHOP_APP_PUBLIC_KEY || 'demo_public_key',
		WHOP_WEBHOOK_SECRET: process.env.WHOP_WEBHOOK_SECRET || 'demo_webhook_secret',
		NEXT_PUBLIC_WHOP_APP_ID: process.env.NEXT_PUBLIC_WHOP_APP_ID || 'demo_app_id',
		// Second app support
		NEXT_PUBLIC_WHOP_APP2_ID: process.env.NEXT_PUBLIC_WHOP_APP2_ID || 'demo_app2_id',
	},
};

export default nextConfig;
