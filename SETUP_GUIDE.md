# Whop Next.js App Setup Guide

## 🚀 Quick Start

This is a beginner-friendly setup for your Whop Next.js app using the official template.

### 1. Environment Variables Setup

1. **Copy the environment template:**
   ```bash
   cp env-template.txt .env.local
   ```

2. **Get your Whop App credentials:**
   - Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
   - Create a new app or select an existing one
   - Go to the "Settings" tab and copy your credentials

3. **Update .env.local with your real values:**
   ```env
   # Required for Whop SDK
   NEXT_PUBLIC_WHOP_APP_ID=your_actual_app_id
   WHOP_API_KEY=your_actual_api_key
   
   # Optional but recommended
   NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id
   NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id
   ```

### 2. Install Dependencies

The template uses pnpm, but you can use npm:

```bash
# Option 1: Use npm (may show warnings but will work)
npm install

# Option 2: Install pnpm first, then use it
npm install -g pnpm
pnpm install
```

### 3. Run the Development Server

```bash
# If using npm
npm run dev

# If using pnpm
pnpm dev
```

### 4. Configure Your Whop App

In your Whop Developer Dashboard, set these paths:

- **App path:** `/experiences/[experienceId]`
- **Dashboard path:** `/dashboard/[companyId]`
- **Discover path:** `/discover`
- **Base URL:** `http://localhost:3000` (for development)

## 📁 Project Structure

```
whop-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── discover/          # Discover page
│   ├── experiences/       # Experience pages
│   └── layout.tsx         # Root layout
├── lib/
│   └── whop-sdk.ts        # Whop SDK configuration
├── .env.local             # Your environment variables
└── package.json           # Dependencies
```

## 🔧 Key Features

- **Authentication:** Built-in Whop authentication
- **Dashboard:** Company management interface
- **Experiences:** User-facing app pages
- **Webhooks:** Handle Whop events
- **TypeScript:** Full type safety
- **Tailwind CSS:** Modern styling

## 🎯 Next Steps

1. **Test the setup:** Run `npm run dev` and visit `http://localhost:3000`
2. **Add your app to a Whop:** Go to a Whop's tools section and add your app
3. **Customize:** Modify the pages in the `app/` directory
4. **Deploy:** Use Vercel for easy deployment

## 🆘 Troubleshooting

- **Engine warnings:** Ignore Node.js version warnings - the app will work
- **Environment variables:** Make sure `.env.local` has your real Whop credentials
- **App not loading:** Check that your Whop app paths are configured correctly

## 📚 Resources

- [Whop Developer Docs](https://dev.whop.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Whop API Reference](https://dev.whop.com/api-reference)
