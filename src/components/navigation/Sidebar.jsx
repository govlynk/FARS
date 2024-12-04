import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  CheckSquare, 
  FileText, 
  BarChart2, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/regulations', icon: <Book />, label: 'Regulations' },
    { path: '/compliance', icon: <CheckSquare />, label: 'Compliance' },
    { path: '/documents', icon: <FileText />, label: 'Documents' },
    { path: '/reports', icon: <BarChart2 />, label: 'Reports' },
    { path: '/settings', icon: <Settings />, label: 'Settings' }
  ];

  return (
    <ProSidebar>
      <div className="sidebar-header">
        <h2>FAR Compliance</h2>
        <div className="user-info">
          <span>{user?.name}</span>
          <span className="role">{user?.role}</span>
        </div>
      </div>
      <Menu>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            icon={item.icon}
            active={location.pathname === item.path}
            component={<Link to={item.path} />}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </ProSidebar>
  );
}

export default Sidebar;