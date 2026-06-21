import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  Trophy, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Placeholder components for the admin routes
import DashboardOverview from './pages/DashboardOverview';
import ProjectsAdmin from './pages/ProjectsAdmin';
import SkillsAdmin from './pages/SkillsAdmin';
import ExperienceAdmin from './pages/ExperienceAdmin';
import AchievementsAdmin from './pages/AchievementsAdmin';
import MessagesAdmin from './pages/MessagesAdmin';
import SettingsAdmin from './pages/SettingsAdmin';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Skills', href: '/admin/skills', icon: Code2 },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Achievements', href: '/admin/achievements', icon: Trophy },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // TODO: Clear token and local storage
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-background text-textMain font-sans">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Vijay.Admin
          </Link>
          <button className="lg:hidden text-textSecondary hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-textSecondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-textSecondary'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Topbar */}
        <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-4 lg:px-8 z-30">
          <button 
            className="lg:hidden text-textSecondary hover:text-white p-2 -ml-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-4">
              {/* User Menu / Avatar */}
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                V
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/projects/*" element={<ProjectsAdmin />} />
              <Route path="/skills/*" element={<SkillsAdmin />} />
              <Route path="/experience/*" element={<ExperienceAdmin />} />
              <Route path="/achievements/*" element={<AchievementsAdmin />} />
              <Route path="/messages/*" element={<MessagesAdmin />} />
              <Route path="/settings/*" element={<SettingsAdmin />} />
            </Routes>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
