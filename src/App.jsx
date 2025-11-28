import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Assessment from './features/Onboarding/Assessment';
import Dashboard from './features/Dashboard/Dashboard';
import Layout from './components/Layout';

// Placeholder components

const Onboarding = ({ onComplete }) => (
  <Assessment onComplete={onComplete} />
);

function App() {
  // Simple state to check if onboarding is done (mocked for now)
  const [isOnboarded, setIsOnboarded] = React.useState(false);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={isOnboarded ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />}
          />
          <Route path="/onboarding" element={<Onboarding onComplete={() => setIsOnboarded(true)} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<div className="container"><h1>Stats</h1></div>} />
          <Route path="/profile" element={<div className="container"><h1>Profile</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
