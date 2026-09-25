import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AdminLayout from './admin/AdminLayout';
import PortfolioPage from './pages/PortfolioPage';
import AdminLogin from './admin/AdminLogin';
import RequireAuth from './admin/RequireAuth';
import useVisitorTracker from './hooks/useVisitorTracker';

function App() {
  useVisitorTracker();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
