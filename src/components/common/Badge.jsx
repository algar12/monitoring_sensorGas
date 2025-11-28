/**
 * Badge Component
 * Status and label badges
 */

import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'default', size = 'md', dot = false, className = '' }) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const variantClasses = {
    default: 'bg-slate-700 text-slate-200',
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
    success: 'bg-green-600/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-500/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-blue-400',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    danger: 'bg-red-400',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  dot: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
