# Environment Variables Setup

## Quick Setup Guide

1. **Copy the environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Get your Whop App credentials:**
   - Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
   - Create a new app or select an existing one
   - Copy the credentials from the "Settings" tab

3. **Update .env.local with your real values:**
   - Replace `your_app_id_here` with your actual App ID
   - Replace `your_app_secret_here` with your actual App Secret
   - Replace `your_public_key_here` with your actual Public Key
   - Replace `your_webhook_secret_here` with your actual Webhook Secret

## Required Environment Variables

| Variable | Description | Where to find it |
|----------|-------------|------------------|
| `WHOP_APP_ID` | Your Whop App ID | Developer Dashboard > App Settings |
| `WHOP_APP_SECRET` | Your Whop App Secret | Developer Dashboard > App Settings |
| `WHOP_APP_PUBLIC_KEY` | Your Whop App Public Key | Developer Dashboard > App Settings |
| `WHOP_WEBHOOK_SECRET` | Webhook verification secret | Developer Dashboard > Webhooks |
| `WHOP_APP_BASE_URL` | Your app's base URL | Set to `http://localhost:3000` for development |

## Security Notes

- Never commit `.env.local` to version control
- Keep your app secret secure
- Use different credentials for development and production
