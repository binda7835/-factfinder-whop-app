export default function ExperiencePage() {
  return (
    <html>
      <head>
        <title>Fun Fact Generator</title>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .title {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5rem;
          }
          .welcome {
            background-color: #e8f4fd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #b3d9ff;
            text-align: center;
            color: #0066cc;
          }
          .fact-box {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #e9ecef;
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
          }
          .button {
            display: block;
            margin: 0 auto;
            padding: 15px 30px;
            font-size: 18px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.2s;
          }
          .button:hover {
            background-color: #0056b3;
            transform: translateY(-1px);
          }
          .button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
            transform: none;
          }
          .stats {
            margin-top: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .stat-box {
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .stat-box.blue {
            background-color: #e3f2fd;
            color: #1976d2;
          }
          .stat-box.green {
            background-color: #e8f5e8;
            color: #388e3c;
          }
          .stat-number {
            font-size: 24px;
            margin: 0 0 5px 0;
            font-weight: bold;
          }
          .stat-label {
            margin: 0;
            font-size: 14px;
          }
          .loading {
            display: none;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">🎉 Fun Fact Generator</h1>
          
          <div class="welcome">
            <strong>Welcome, Muhammad Usman!</strong> (Admin Access)
          </div>
          
          <div class="fact-box" id="factBox">
            <p id="factText">💡 Click below to get a fun fact!</p>
            <div class="loading" id="loading">
              <div class="spinner"></div>
              <p>Loading fact...</p>
            </div>
          </div>
          
          <button class="button" id="factButton" onclick="fetchFact()">
            🎲 Get New Fact
          </button>
          
          <div class="stats">
            <div class="stat-box blue">
              <p class="stat-number">∞</p>
              <p class="stat-label">Facts Available</p>
            </div>
            <div class="stat-box green">
              <p class="stat-number">✓</p>
              <p class="stat-label">Always Fresh</p>
            </div>
          </div>
        </div>

        <script>
          async function fetchFact() {
            const button = document.getElementById('factButton');
            const factText = document.getElementById('factText');
            const loading = document.getElementById('loading');
            
            // Show loading state
            button.disabled = true;
            button.textContent = '⏳ Loading...';
            factText.style.display = 'none';
            loading.style.display = 'block';
            
            try {
              const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
              const data = await response.json();
              
              // Show the fact
              factText.textContent = data.text;
              factText.style.display = 'block';
              loading.style.display = 'none';
              
            } catch (error) {
              // Show error
              factText.textContent = 'Sorry, could not load a fact right now. Please try again!';
              factText.style.display = 'block';
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