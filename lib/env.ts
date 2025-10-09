/**
 * Environment Variables Validation
 * 
 * This file validates all required environment variables for production deployment.
 * It ensures the app has all necessary Whop credentials and configuration.
 */

export const env = {
  // Whop App Configuration
  WHOP_APP_ID: process.env.WHOP_APP_ID || process.env.NEXT_PUBLIC_WHOP_APP_ID,
  WHOP_APP_SECRET: process.env.WHOP_APP_SECRET || process.env.WHOP_API_KEY,
  WHOP_APP_PUBLIC_KEY: process.env.WHOP_APP_PUBLIC_KEY,
  WHOP_WEBHOOK_SECRET: process.env.WHOP_WEBHOOK_SECRET,
  WHOP_APP_BASE_URL: process.env.WHOP_APP_BASE_URL || process.env.NEXT_PUBLIC_WHOP_APP_BASE_URL,
  
  // Whop Company Configuration
  WHOP_COMPANY_ID: process.env.WHOP_COMPANY_ID || process.env.NEXT_PUBLIC_WHOP_COMPANY_ID,
  WHOP_AGENT_USER_ID: process.env.WHOP_AGENT_USER_ID || process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID,
  
  // App Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Database Configuration (if needed)
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
} as const;

/**
 * Validate required environment variables for production
 */
export function validateEnvironment() {
  const requiredVars = [
    'WHOP_APP_ID',
    'WHOP_APP_SECRET',
    'WHOP_APP_PUBLIC_KEY',
    'WHOP_WEBHOOK_SECRET',
    'WHOP_APP_BASE_URL',
  ];

  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!env[varName as keyof typeof env]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file and ensure all Whop credentials are set.'
    );
  }

  return true;
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return env.NODE_ENV === 'production';
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return env.NODE_ENV === 'development';
}

/**
 * Get the app's base URL
 */
export function getAppBaseUrl(): string {
  return env.WHOP_APP_BASE_URL || env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

/**
 * Get Whop app installation URL
 */
export function getWhopInstallUrl(): string {
  if (!env.WHOP_APP_ID) {
    throw new Error('WHOP_APP_ID is required to generate installation URL');
  }
  return `https://whop.com/apps/${env.WHOP_APP_ID}/install`;
}
