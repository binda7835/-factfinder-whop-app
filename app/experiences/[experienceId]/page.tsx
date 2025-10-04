export default function ExperiencePage() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1a202c',
          marginBottom: '16px'
        }}>
          🎉 Fun Fact Generator
        </h1>
        
        <p style={{
          color: '#718096',
          fontSize: '1.1rem',
          marginBottom: '32px'
        }}>
          Your daily dose of interesting facts!
        </p>
        
        <div style={{
          backgroundColor: '#e6fffa',
          border: '2px solid #81e6d9',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px'
        }}>
          <p style={{
            color: '#234e52',
            fontWeight: '600',
            margin: 0
          }}>
            Welcome, Muhammad Usman! (Admin Access)
          </p>
        </div>
        
        <div id="factContainer" style={{
          backgroundColor: '#f7fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p id="factText" style={{
            color: '#4a5568',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            margin: 0,
            textAlign: 'center'
          }}>
            💡 Click below to get a fun fact!
          </p>
        </div>
        
        <button 
          id="factButton"
          onClick={() => {
            const button = document.getElementById('factButton');
            const factText = document.getElementById('factText');
            
            button.disabled = true;
            button.textContent = '⏳ Loading...';
            factText.textContent = 'Loading fact...';
            
            fetch('https://uselessfacts.jsph.pl/random.json?language=en')
              .then(response => response.json())
              .then(data => {
                factText.textContent = data.text;
                button.disabled = false;
                button.textContent = '🎲 Get New Fact';
              })
              .catch(error => {
                factText.textContent = 'Sorry, could not load a fact right now. Please try again!';
                button.disabled = false;
                button.textContent = '🎲 Get New Fact';
              });
          }}
          style={{
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            marginBottom: '32px'
          }}
        >
          🎲 Get New Fact
        </button>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: '#ebf8ff',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #bee3f8'
          }}>
            <div style={{
              fontSize: '2rem',
              color: '#2b6cb0',
              marginBottom: '8px'
            }}>∞</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#2c5282',
              fontWeight: '500'
            }}>Facts Available</div>
          </div>
          
          <div style={{
            backgroundColor: '#f0fff4',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #9ae6b4'
          }}>
            <div style={{
              fontSize: '2rem',
              color: '#38a169',
              marginBottom: '8px'
            }}>✓</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#2f855a',
              fontWeight: '500'
            }}>Always Fresh</div>
          </div>
        </div>
      </div>
    </div>
  );
}