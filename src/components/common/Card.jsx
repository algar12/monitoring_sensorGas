/**
 * Card Component
 * Clean, professional card container
 */

import PropTypes from 'prop-types';

const Card = ({ children, className = '', padding = 'lg', hover = false, onClick }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-6',
    xl: 'p-8',
  };

  const baseClasses =
    'bg-slate-800 border border-slate-700 rounded-lg shadow-sm transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-md hover:border-slate-600 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
