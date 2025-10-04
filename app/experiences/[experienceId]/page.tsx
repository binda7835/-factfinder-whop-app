'use client';

import { useState, useEffect } from 'react';

export default function ExperiencePage() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text);
    } catch (err) {
      setFact('Sorry, could not load a fact right now. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div style={{ 
        padding: '20px', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1>Loading FactFinder...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333', 
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}>
          🎉 Fun Fact Generator
        </h1>
        
        <div style={{ 
          backgroundColor: '#e8f4fd', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #b3d9ff'
        }}>
          <p style={{ margin: 0, color: '#0066cc', textAlign: 'center' }}>
            <strong>Welcome, Muhammad Usman!</strong> (Admin Access)
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '30px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #e9ecef'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }}></div>
              <p style={{ margin: 0, color: '#666' }}>Loading fact...</p>
            </div>
          ) : fact ? (
            <p style={{ 
              textAlign: 'center', 
              fontSize: '18px', 
              lineHeight: '1.6',
              margin: 0,
              color: '#333'
            }}>
              {fact}
            </p>
          ) : (
            <p style={{ 
              textAlign: 'center', 
              color: '#666',
              fontSize: '18px',
              margin: 0
            }}>
              💡 Click below to get a fun fact!
            </p>
          )}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={fetchFact}
            disabled={loading}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? '⏳ Loading...' : '🎲 Get New Fact'}
          </button>
        </div>
        
        <div style={{ 
          marginTop: '30px', 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '24px', 
              margin: '0 0 5px 0',
              color: '#1976d2'
            }}>∞</p>
            <p style={{ 
              margin: 0,
              fontSize: '14px',
              color: '#1565c0'
            }}>Facts Available</p>
          </div>
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '24px', 
              margin: '0 0 5px 0',
              color: '#388e3c'
            }}>✓</p>
            <p style={{ 
              margin: 0,
              fontSize: '14px',
              color: '#2e7d32'
            }}>Always Fresh</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}