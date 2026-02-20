import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import StudentPortal from './pages/StudentPortal'
import AlumniPortal from './pages/AlumniPortal'
import Analytics from './pages/Analytics'
import PlacementBot from './pages/PlacementBot'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Admin Only */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Protected Routes - Student Only */}
        <Route 
          path="/student-portal" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentPortal />} />
        </Route>

        {/* Protected Routes - Alumni Only */}
        <Route 
          path="/alumni-portal" 
          element={
            <ProtectedRoute allowedRoles={['alumni']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AlumniPortal />} />
        </Route>

        {/* Protected Routes - Admin & Alumni */}
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'alumni']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Analytics />} />
        </Route>

        {/* Protected Routes - All Roles */}
        <Route 
          path="/placement-bot" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'student', 'alumni']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PlacementBot />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
