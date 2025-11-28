/**
 * Navbar Component
 * Cyber-Industrial Top Navigation
 */

import PropTypes from 'prop-types';
import { Wifi, WifiOff, Clock, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = ({ isConnected }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Left Side: System Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            <span className="text-sm font-mono text-slate-400 tracking-wider">SECURE CONNECTION</span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-success shadow-neon-green' : 'bg-danger shadow-neon-red'} animate-pulse`} />
            <span className={`text-xs font-bold tracking-widest ${isConnected ? 'text-success' : 'text-danger'}`}>
              {isConnected ? 'LIVE DATA FEED' : 'FEED DISCONNECTED'}
            </span>
          </div>
        </div>

        {/* Right Side: Clock & Network */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* System Clock */}
          <div className="flex items-center gap-3 bg-surface-highlight/50 px-4 py-1.5 rounded-full border border-white/5">
            <Clock size={14} className="text-primary" />
            <div className="text-xs font-mono">
              <span className="text-slate-400 mr-2">SYS.TIME</span>
              <span className="text-white font-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Connection Badge */}
          <div className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-300
            ${isConnected ? 'bg-success/10 border-success/30 text-success' : 'bg-danger/10 border-danger/30 text-danger'}
          `}>
            {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="text-xs font-bold tracking-wider hidden sm:inline">
              {isConnected ? 'NET.ONLINE' : 'NET.OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      {/* Scanning Line Animation */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
    </nav>
  );
};

Navbar.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default Navbar;
