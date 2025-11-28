/**
 * StatisticsCards Component
 * Cyber-Industrial KPI Tiles
 */

import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Activity, Zap, BarChart2, AlertOctagon } from 'lucide-react';

const StatCard = ({ title, value, unit, icon: _Icon, variant = 'primary', trend }) => {
  const variants = {
    primary: 'text-primary border-primary/20 bg-primary/5',
    success: 'text-success border-success/20 bg-success/5',
    warning: 'text-warning border-warning/20 bg-warning/5',
    danger: 'text-danger border-danger/20 bg-danger/5',
  };



  return (
    <div className={`cyber-card p-4 group hover:bg-surface/80`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg border ${variants[variant].split(' ')[1]} ${variants[variant].split(' ')[2]} group-hover:scale-110 transition-transform duration-300`}>
          <_Icon size={18} className={variants[variant].split(' ')[0]} />
        </div>
        {trend && (
          <div className={`text-[10px] font-mono flex items-center gap-1 px-1.5 py-0.5 rounded border ${trend > 0 ? 'text-danger border-danger/20 bg-danger/5' : 'text-success border-success/20 bg-success/5'}`}>
            {trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="text-xs text-slate-400 font-mono tracking-wide mb-1 uppercase">{title}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white font-mono tracking-tight group-hover:text-glow transition-all">
          {value}
        </span>
        {unit && <span className="text-[10px] text-slate-500 font-mono">{unit}</span>}
      </div>
    </div>
  );
};

const StatisticsCards = ({ stats }) => {
  const {
    count = 0,
    average = 0,
    max = 0,
    min = 0,
    safeCount = 0,
    warningCount = 0,
    dangerCount = 0,
  } = stats || {};

  const safePercentage = count > 0 ? Math.round((safeCount / count) * 100) : 0;
  const warningPercentage = count > 0 ? Math.round((warningCount / count) * 100) : 0;
  const dangerPercentage = count > 0 ? Math.round((dangerCount / count) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Readings"
        value={count}
        icon={Zap}
        variant="primary"
      />

      <StatCard
        title="Avg. Level"
        value={average}
        unit="PPM"
        icon={Activity}
        variant="primary"
      />

      <StatCard
        title="Peak Level"
        value={max}
        unit="PPM"
        icon={TrendingUp}
        variant="danger"
      />

      <StatCard
        title="Min. Level"
        value={min}
        unit="PPM"
        icon={TrendingDown}
        variant="success"
      />

      {/* Status Distribution Bar */}
      <div className="cyber-card p-5 md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart2 size={16} className="text-primary" />
            STATUS DISTRIBUTION
          </h3>
          <div className="flex gap-4 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-success" /> SAFE
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-warning" /> WARNING
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-danger" /> DANGER
            </div>
          </div>
        </div>

        <div className="h-4 w-full bg-surface-highlight rounded-sm overflow-hidden flex relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 w-full h-full flex justify-between px-1 pointer-events-none">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-px h-full bg-background/30" />
            ))}
          </div>

          <div
            className="h-full bg-success transition-all duration-500 relative group"
            style={{ width: `${safePercentage}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {safeCount} ({safePercentage}%)
            </div>
          </div>
          <div
            className="h-full bg-warning transition-all duration-500 relative group"
            style={{ width: `${warningPercentage}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {warningCount} ({warningPercentage}%)
            </div>
          </div>
          <div
            className="h-full bg-danger transition-all duration-500 relative group"
            style={{ width: `${dangerPercentage}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {dangerCount} ({dangerPercentage}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
  trend: PropTypes.number,
};

StatisticsCards.propTypes = {
  stats: PropTypes.shape({
    count: PropTypes.number,
    average: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    safeCount: PropTypes.number,
    warningCount: PropTypes.number,
    dangerCount: PropTypes.number,
  }),
};

export default StatisticsCards;
