export default function TestPage() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🧪 Test Page
      </h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        If you can see this page, your deployment is working!
      </p>
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p><strong>Deployment Status:</strong> ✅ Working</p>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
