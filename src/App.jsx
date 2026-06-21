import { Routes, Route } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'

import PortfolioPage from './pages/PortfolioPage'
import AdminLogin from './admin/AdminLogin'
import RequireAuth from './admin/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      } />
    </Routes>
  )
}

export default App
