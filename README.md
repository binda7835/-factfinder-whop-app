# 🎉 FactFinder Whop App

A beautiful, functional Whop app that provides random fun facts to paying members.

## ✨ Features

- **🔐 Authentication**: Whop SDK integration with paying member access control
- **🎨 Beautiful UI**: TailwindCSS styling with responsive design
- **🌐 API Integration**: Fetches random facts from uselessfacts.jsph.pl
- **⚡ Loading States**: Smooth animations and error handling
- **🚀 Production Ready**: Multiple component versions for development and production

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Whop Developer Account

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp env-template.txt .env.local
# Edit .env.local with your Whop credentials

# Start development server
npm run dev:npm
```

### Environment Variables
Create a `.env.local` file with your Whop credentials:
```env
WHOP_API_KEY=your_api_key
NEXT_PUBLIC_WHOP_APP_ID=your_app_id
NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id
NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id
```

## 🎯 Usage

### Development Mode
1. **Start server**: `npm run dev:npm`
2. **Visit**: `http://localhost:3000/experiences/test123`
3. **Test features**: Fetch facts, test access denied

### Production Mode
1. **Switch component**: Change import to `FactFinderServer`
2. **Deploy**: Deploy to your hosting platform
3. **Install**: Use Whop installation link

## 📁 Components

- **`FactFinderDev.tsx`**: Development version with simulated auth
- **`FactFinderServer.tsx`**: Production version with real Whop auth
- **`FactFinderClient.tsx`**: Client-side UI component

## 🎨 Features

### Authentication
- Server-side Whop SDK authentication
- Paying member access control
- Graceful access denied handling

### UI/UX
- Single-page centered layout
- Loading states with spinners
- Error handling with user-friendly messages
- Responsive TailwindCSS design

### API Integration
- Fetches from uselessfacts.jsph.pl
- Handles loading and error states
- Clean state management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Manual Deployment
1. Build: `npm run build`
2. Start: `npm start`
3. Configure environment variables

## 📱 Testing

### Standalone Test
Open `test-factfinder.html` in your browser.

### Development Test
Visit `http://localhost:3000/experiences/test123`

### Production Test
Install in Whop and access through tools section.

## 🔧 Customization

- **Change API**: Update fetch URL
- **Modify Styling**: Update TailwindCSS classes
- **Add Features**: Extend component functionality
- **Change Access Control**: Modify subscription logic

## 📚 Resources

- [Whop Documentation](https://dev.whop.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🎉 Ready to Use!

Your FactFinder app is fully functional and ready to provide daily fun facts to paying Whop members! 🎉

---

**FactFinder** - Your daily dose of fun facts! 🎉