import { headers } from 'next/headers';
import { WhopAPI } from '@whop/api';

export default async function ExperiencePage({
  params,
}: {
  params: { experienceId: string };
}) {
  let user = null;
  let error = null;

  try {
    // Get headers for authentication
    const headersList = await headers();
    
    // Initialize Whop API
    const whop = new WhopAPI({
      apiKey: process.env.WHOP_APP_SECRET || '',
    });

    // Get authorization header
    const authHeader = headersList.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      
      // Verify user with Whop API
      const response = await fetch('https://api.whop.com/api/v2/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        user = await response.json();
      }
    }
  } catch (err) {
    console.error('Authentication error:', err);
    error = 'Authentication failed';
  }

  return (
    <html>
      <head>
        <title>Fun Fact Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 600px;
            width: 100%;
            text-align: center;
          }
          
          .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .subtitle {
            color: #718096;
            font-size: 1.1rem;
            margin-bottom: 30px;
          }
          
          .user-info {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            font-weight: 500;
          }
          
          .fact-container {
            background: #f7fafc;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          .fact-text {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #2d3748;
            text-align: center;
          }
          
          .loading {
            display: none;
            flex-direction: column;
            align-items: center;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
          }
          
          .btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          .btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          
          .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }
          
          .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 30px;
          }
          
          .stat {
            background: #f7fafc;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          
          .stat-icon {
            font-size: 2rem;
            margin-bottom: 8px;
          }
          
          .stat-label {
            font-size: 0.9rem;
            color: #718096;
            font-weight: 500;
          }
          
          .error {
            background: #fed7d7;
            color: #c53030;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #feb2b2;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 640px) {
            .container {
              padding: 30px 20px;
            }
            
            .title {
              font-size: 2rem;
            }
            
            .stats {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">🎉 Fun Fact Generator</h1>
          <p class="subtitle">Your daily dose of interesting facts!</p>
          
          {user ? (
            <div class="user-info">
              Welcome, {user.name || user.username || 'User'}! (Admin Access)
            </div>
          ) : (
            <div class="error">
              {error || 'Unable to load user information'}
            </div>
          )}
          
          <div class="fact-container">
            <div id="factContent">
              <p class="fact-text">💡 Click below to get a fun fact!</p>
            </div>
            <div class="loading" id="loading">
              <div class="spinner"></div>
              <p>Loading fact...</p>
            </div>
          </div>
          
          <button class="btn" id="factButton" onclick="fetchFact()">
            🎲 Get New Fact
          </button>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-icon">∞</div>
              <div class="stat-label">Facts Available</div>
            </div>
            <div class="stat">
              <div class="stat-icon">✓</div>
              <div class="stat-label">Always Fresh</div>
            </div>
          </div>
        </div>

        <script>
          async function fetchFact() {
            const button = document.getElementById('factButton');
            const factContent = document.getElementById('factContent');
            const loading = document.getElementById('loading');
            
            // Show loading state
            button.disabled = true;
            button.textContent = '⏳ Loading...';
            factContent.style.display = 'none';
            loading.style.display = 'flex';
            
            try {
              const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
              
              if (!response.ok) {
                throw new Error('Failed to fetch fact');
              }
              
              const data = await response.json();
              
              // Show the fact
              factContent.innerHTML = '<p class="fact-text">' + data.text + '</p>';
              factContent.style.display = 'block';
              loading.style.display = 'none';
              
            } catch (error) {
              // Show error
              factContent.innerHTML = '<p class="fact-text">Sorry, could not load a fact right now. Please try again!</p>';
              factContent.style.display = 'block';
              loading.style.display = 'none';
            } finally {
              // Reset button
              button.disabled = false;
              button.textContent = '🎲 Get New Fact';
            }
          }
        </script>
      </body>
    </html>
  );
}