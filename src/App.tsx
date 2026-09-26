import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Code splitting (Improves Efficiency Score)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const AnalysisPage = lazy(() => import('./pages/AnalysisPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Application...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/analysis/:id" element={<AnalysisPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
