'use client';

import { useState } from 'react';

/**
 * Simple FactFinder Component
 * 
 * This is a simplified version that should work reliably in all environments
 */
export default function FactFinderSimple() {
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchFact = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      setFact(data.text);
    } catch (err) {
      setError('Could not load fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        margin: '0 16px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        padding: '32px',
        border: '1px solid #e2e8f0'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '8px'
          }}>
            🎉 Fun Fact Generator
          </h1>
          <p style={{ color: '#718096' }}>
            Your daily dose of interesting facts!
          </p>
        </div>

        {/* User Welcome */}
        <div style={{
          backgroundColor: '#f0fff4',
          border: '1px solid #9ae6b4',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#22543d', margin: 0 }}>
            <strong>Welcome, Muhammad Usman!</strong>
            <br />
            <span style={{ fontSize: '14px' }}>Access Level: admin</span>
          </p>
        </div>

        {/* Fact Display Box */}
        <div style={{
          backgroundColor: '#f7fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid #e2e8f0',
                borderTop: '3px solid #4299e1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 8px'
              }}></div>
              <p style={{ color: '#718096', margin: 0 }}>Fetching fact...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#e53e3e', marginBottom: '8px' }}>{error}</p>
              <button
                onClick={fetchFact}
                style={{
                  fontSize: '14px',
                  color: '#4299e1',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Try again
              </button>
            </div>
          ) : fact ? (
            <p style={{
              color: '#2d3748',
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '1.6',
              margin: 0
            }}>
              {fact}
            </p>
          ) : (
            <p style={{
              color: '#a0aec0',
              textAlign: 'center',
              fontSize: '18px',
              margin: 0
            }}>
              💡 Click below to get a fun fact!
            </p>
          )}
        </div>

        {/* Get New Fact Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={fetchFact}
            disabled={loading}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: loading ? '#a0aec0' : '#4299e1',
              fontSize: '16px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#3182ce';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#4299e1';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? '⏳ Loading...' : '🎲 Get New Fact'}
          </button>
        </div>

        {/* Fun Stats */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#ebf8ff',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#2b6cb0',
                margin: '0 0 4px 0'
              }}>∞</p>
              <p style={{
                fontSize: '12px',
                color: '#2c5282',
                margin: 0
              }}>Facts Available</p>
            </div>
            <div style={{
              backgroundColor: '#f0fff4',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#38a169',
                margin: '0 0 4px 0'
              }}>✓</p>
              <p style={{
                fontSize: '12px',
                color: '#22543d',
                margin: 0
              }}>Always Fresh</p>
            </div>
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
