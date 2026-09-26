import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, SplitSquareHorizontal, Settings, MessageSquare, Scale } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', href: '/upload', icon: FileText },
    { name: 'Compare', href: '/compare', icon: SplitSquareHorizontal },
    { name: 'Ask LawLens', href: '/dashboard', icon: MessageSquare }, // Mock link
    { name: 'Settings', href: '/dashboard', icon: Settings }, // Mock link
  ];

  return (
    <div className="flex h-screen bg-brand-offwhite">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col" aria-label="Sidebar Navigation">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Scale className="h-8 w-8 text-brand-electric mr-2" aria-hidden="true" />
          <span className="text-xl font-bold text-brand-navy tracking-tight">LawLens AI</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Main Menu">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href) && item.href !== '/dashboard' || location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  isActive ? 'bg-brand-electric/10 text-brand-electric' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:ring-2 focus:ring-brand-electric focus:outline-none'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-brand-electric' : 'text-slate-400 group-hover:text-slate-500',
                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center text-white font-medium text-sm" aria-hidden="true">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-brand-navy">Jane Doe</p>
              <p className="text-xs text-slate-500">Demo User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-brand-offwhite p-8" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
