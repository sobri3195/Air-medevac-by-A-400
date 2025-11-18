import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Plane,
  Users,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Package
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', roles: ['MISSION_COMMANDER', 'FLIGHT_CREW', 'MEDICAL_TEAM_LEADER', 'MEDICAL_STAFF', 'ADMIN'] },
    { icon: Plane, label: 'Missions', path: '/missions', roles: ['MISSION_COMMANDER', 'FLIGHT_CREW', 'MEDICAL_TEAM_LEADER', 'MEDICAL_STAFF', 'ADMIN'] },
    { icon: Users, label: 'Patients', path: '/patients', roles: ['MISSION_COMMANDER', 'MEDICAL_TEAM_LEADER', 'MEDICAL_STAFF', 'ADMIN'] },
    { icon: Activity, label: 'In-Flight Monitor', path: '/monitor', roles: ['MISSION_COMMANDER', 'FLIGHT_CREW', 'MEDICAL_TEAM_LEADER', 'MEDICAL_STAFF'] },
    { icon: Package, label: 'Aircraft & Equipment', path: '/equipment', roles: ['MISSION_COMMANDER', 'FLIGHT_CREW', 'ADMIN'] },
    { icon: BarChart3, label: 'Reports', path: '/reports', roles: ['MISSION_COMMANDER', 'ADMIN'] },
    { icon: Settings, label: 'User Management', path: '/users', roles: ['ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {(sidebarOpen || !isMobile) && (
            <div className={sidebarOpen ? '' : 'hidden lg:block'}>
              <h1 className="text-xl font-bold">A-400 Medevac</h1>
              <p className="text-xs text-blue-200">Mission Control</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors lg:block"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700/50'
                }`}
              >
                <Icon size={20} />
                {(sidebarOpen || !isMobile) && <span className={`text-sm font-medium ${sidebarOpen ? '' : 'hidden lg:inline'}`}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-700">
          {(sidebarOpen || !isMobile) && user && (
            <div className={`mb-3 ${sidebarOpen ? '' : 'hidden lg:block'}`}>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-blue-200">{user.role.replace(/_/g, ' ')}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {(sidebarOpen || !isMobile) && <span className={`text-sm ${sidebarOpen ? '' : 'hidden lg:inline'}`}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-4 flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <Menu size={20} />
              </button>
            )}
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              {filteredMenuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
