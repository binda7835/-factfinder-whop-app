import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
	outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
