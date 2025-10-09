import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FactFinder Pro - Whop App",
	description: "Premium fact generator for Whop members. Get random fun facts, save favorites, and share amazing discoveries.",
	keywords: ["facts", "trivia", "whop", "premium", "membership"],
	authors: [{ name: "FactFinder Pro Team" }],
	openGraph: {
		title: "FactFinder Pro",
		description: "Premium fact generator for Whop members",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ErrorBoundary>
					<WhopApp>{children}</WhopApp>
				</ErrorBoundary>
			</body>
		</html>
	);
}
