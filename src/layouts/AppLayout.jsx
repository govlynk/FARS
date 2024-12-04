import { Routes, Route, Navigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Sidebar from '../components/navigation/Sidebar';
import Dashboard from '../pages/Dashboard';
import Regulations from '../pages/Regulations';
import Compliance from '../pages/Compliance';
import Documents from '../pages/Documents';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import { useAuth } from '../contexts/AuthContext';

function AppLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <ProSidebarProvider>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/regulations" element={<Regulations />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ProSidebarProvider>
  );
}

export default AppLayout;