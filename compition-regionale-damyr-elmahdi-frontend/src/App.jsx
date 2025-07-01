import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Dashboard component (protected content)
const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <h2>Competition Regionale Dashboard</h2>
        <p>This is your protected dashboard content.</p>
        
        {/* Add your competition-related components here */}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}

export default App;