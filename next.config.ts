import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
	// Fix workspace root warning
	outputFileTracingRoot: process.cwd(),
	// Production optimizations
	experimental: {
		optimizePackageImports: ['@whop/react', '@whop/api'],
	},
};

export default nextConfig;
