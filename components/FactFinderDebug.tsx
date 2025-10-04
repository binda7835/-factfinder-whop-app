'use client';

import { useState, useEffect } from 'react';

export default function FactFinderDebug() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState('Component loaded');

  useEffect(() => {
    setDebug('Component mounted and ready');
  }, []);

  const fetchFact = async () => {
    setLoading(true);
    setDebug('Fetching fact...');
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text);
      setDebug('Fact loaded successfully');
    } catch (err) {
      setFact('Sorry, could not load a fact right now. Please try again!');
      setDebug('Error loading fact: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🎉 Fun Fact Generator
      </h1>
      
      <div style={{ 
        backgroundColor: '#e8f4fd', 
        padding: '10px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        fontSize: '12px',
        color: '#0066cc'
      }}>
        Debug: {debug}
      </div>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {loading ? (
          <p>Loading fact...</p>
        ) : fact ? (
          <p style={{ textAlign: 'center', fontSize: '16px' }}>{fact}</p>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>
            💡 Click below to get a fun fact!
          </p>
        )}
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={fetchFact}
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : '🎲 Get New Fact'}
        </button>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center', 
        color: '#666',
        fontSize: '14px'
      }}>
        Welcome, Muhammad Usman! (Admin Access)
      </div>
    </div>
  );
}
