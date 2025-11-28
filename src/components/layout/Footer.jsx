/**
 * Footer Component - Futuristic Glassmorphism Edition
 * Bottom status bar with glass effect
 */

import { Shield, Radio } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full glass border-t border-white/10 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs font-mono">
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 mb-2 md:mb-0 text-gray-400">
          <Shield size={14} className="text-purple-400" />
          <span>
            &copy; {new Date().getFullYear()} AIR.GUARD SYSTEMS. SECURE CONNECTION ESTABLISHED.
          </span>
        </div>

        {/* Center: Ticker (Simulated) */}
        <div className="hidden md:flex items-center gap-4 tracking-wider">
          <span className="gradient-text-blue animate-pulse">/// MONITORING ACTIVE ///</span>
          <span className="text-teal-400">SENSOR_NODE_01: OK</span>
          <span className="text-purple-400">DATABASE: CONNECTED</span>
        </div>

        {/* Right: Version */}
        <div className="flex items-center gap-2 text-gray-400">
          <Radio size={14} className="text-pink-400" />
          <span>BUILD: 3.0.1-BETA</span>
        </div>
      </div>

      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;
