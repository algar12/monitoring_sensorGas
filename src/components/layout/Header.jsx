/**
 * Header Component
 * Cyber-Industrial Header with Breadcrumbs and Actions
 */

import { Settings as SettingsIcon, ChevronRight, Bell, Search, Menu } from 'lucide-react';
import PropTypes from 'prop-types';

const Header = ({ currentView, onSettingsClick, onMenuToggle }) => {
  const viewTitles = {
    dashboard: 'MISSION CONTROL',
    analytics: 'DATA ANALYTICS',
    history: 'ARCHIVED LOGS',
    alerts: 'ALERT CENTER',
    settings: 'SYSTEM CONFIG',
  };

  return (
    <header className="h-16 lg:h-20 bg-surface/50 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <span className="hidden sm:inline">MAIN</span>
            <ChevronRight size={12} className="hidden sm:block" />
            <span className="text-primary tracking-wider uppercase">{currentView}</span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            {viewTitles[currentView] || 'DASHBOARD'}
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse hidden lg:block" />
          </h2>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Search Bar (Visual Only) */}
        <div className="hidden md:flex items-center bg-surface-highlight/50 rounded-lg border border-white/5 px-3 py-2 w-64 focus-within:border-primary/50 transition-colors">
          <Search size={16} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search logs or sensors..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full font-mono"
            disabled
          />
        </div>

        {/* Notifications */}
        <button className="p-2.5 rounded-lg bg-surface-highlight/50 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-200 relative group border border-white/5">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full shadow-neon-red animate-pulse" />
          <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-200 group relative overflow-hidden"
          title="System Configuration"
        >
          <SettingsIcon size={20} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentView: PropTypes.string.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onMenuToggle: PropTypes.func,
};

export default Header;
