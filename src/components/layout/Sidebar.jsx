/**
 * Sidebar Component
 * Cyber-Industrial Navigation
 */

import { Home, Activity, Settings, BarChart3, Bell, Database, Cpu, X } from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = ({ currentView = 'dashboard', onViewChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'MONITOR', icon: Home },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
    { id: 'history', label: 'HISTORY', icon: Database },
    { id: 'alerts', label: 'ALERTS', icon: Bell },
    { id: 'settings', label: 'SYSTEM', icon: Settings },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface/95 border-r border-white/5 flex flex-col backdrop-blur-xl transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo/Brand */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50 shadow-neon-blue">
            <Cpu size={24} className="text-primary animate-pulse-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wider">AIR.GUARD</h1>
            <p className="text-[10px] text-primary font-mono tracking-[0.2em]">SYSTEM V3.0</p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden
                ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_currentColor]" />
              )}
              <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-mono text-sm tracking-wider">{item.label}</span>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          );
        })}
      </nav>

      {/* Status Indicator */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-surface-highlight/50 rounded-lg p-3 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-success shadow-neon-green animate-pulse" />
            <span className="text-xs font-mono text-slate-400">SYSTEM ONLINE</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-success w-[98%] shadow-[0_0_10px_currentColor]" />
          </div>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  currentView: PropTypes.string,
  onViewChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
