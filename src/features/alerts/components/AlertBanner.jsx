/**
 * AlertBanner Component
 * Displays alert messages with clean professional design
 */

import PropTypes from 'prop-types';
import { X, AlertTriangle, AlertCircle } from 'lucide-react';

const AlertBanner = ({ status, message, onClose }) => {
  if (status === 'safe') return null;

  const config = {
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      icon: AlertTriangle,
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: AlertCircle,
    },
  };

  const style = config[status] || config.warning;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 mb-6 animate-fade-in`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`${style.text} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-semibold ${style.text} mb-1`}>
            {status === 'danger' ? '⚠️ PERINGATAN BAHAYA!' : '⚠️ Peringatan'}
          </h4>
          <p className="text-sm text-slate-300">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

AlertBanner.propTypes = {
  status: PropTypes.oneOf(['safe', 'warning', 'danger']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default AlertBanner;
