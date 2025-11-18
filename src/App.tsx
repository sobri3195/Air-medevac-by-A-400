import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import MissionDetail from './pages/MissionDetail';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Equipment from './pages/Equipment';
import Monitor from './pages/Monitor';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/missions"
        element={
          <PrivateRoute>
            <Layout>
              <Missions />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/missions/:id"
        element={
          <PrivateRoute>
            <Layout>
              <MissionDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <Layout>
              <Patients />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <PrivateRoute>
            <Layout>
              <PatientDetail />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/equipment"
        element={
          <PrivateRoute>
            <Layout>
              <Equipment />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/monitor"
        element={
          <PrivateRoute>
            <Layout>
              <Monitor />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Layout>
              <Reports />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Layout>
              <UserManagement />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
