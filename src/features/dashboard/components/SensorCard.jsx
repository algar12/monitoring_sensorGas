/**
 * SensorCard Component
 * Cyber-Industrial Sensor Data Card
 */

import PropTypes from 'prop-types';
import { MapPin, Activity, Thermometer, Droplets, AlertCircle, Cpu } from 'lucide-react';
import { getGasStatus } from '../../../utils/gasUtils';

const SensorCard = ({ sensor, sensorId, isSelected, onClick }) => {
  const { info, current } = sensor;
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  // Handle case where current data might not exist yet
  const gasValue = current?.gas || 0;
  const smoke = current?.smoke || false;
  const temperature = current?.temperature || 0;
  const humidity = current?.humidity || 0;
  const lastUpdate = current?.lastUpdate || 0;

  const status = getGasStatus(gasValue);
  const isOnline = lastUpdate > now - 60000; // Online if updated in last minute



  return (
    <div
      onClick={onClick}
      className={`
        cyber-card p-5 cursor-pointer group
        ${isSelected ? 'ring-1 ring-primary shadow-neon-blue bg-surface/90' : 'hover:bg-surface/80'}
        ${smoke ? 'animate-pulse-danger border-danger' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-surface-highlight border border-white/5 ${isSelected ? 'text-primary' : 'text-slate-400'}`}>
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {info?.name || `SENSOR-${sensorId}`}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono mt-0.5">
              <MapPin size={10} />
              {info?.location || 'UNKNOWN_LOC'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`
          px-2 py-1 rounded text-[10px] font-bold font-mono flex items-center gap-1.5 border
          ${isOnline ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'}
        `}>
          <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-success shadow-neon-green animate-pulse' : 'bg-danger'}`} />
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </div>
      </div>

      {/* Gas Level Display */}
      <div className="mb-6 relative overflow-hidden rounded-lg bg-surface-highlight/30 border border-white/5 p-4">
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className={`text-4xl font-bold font-mono tracking-tighter ${status === 'safe' ? 'text-white' : status === 'warning' ? 'text-warning' : 'text-danger'}`}>
            {gasValue}
          </span>
          <span className="text-xs font-mono text-slate-500">PPM</span>
        </div>

        <div className={`text-xs font-bold tracking-widest uppercase ${status === 'safe' ? 'text-success' : status === 'warning' ? 'text-warning' : 'text-danger'}`}>
          STATUS: {status}
        </div>

        {/* Background Bar Graph Effect */}
        <div className="absolute bottom-0 right-0 w-24 h-12 flex items-end gap-1 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-2 rounded-t-sm ${status === 'safe' ? 'bg-success' : status === 'warning' ? 'bg-warning' : 'bg-danger'}`}
              style={{ height: `${(i * 13 + 40) % 60 + 20}%` }}
            />
          ))}
        </div>
      </div>

      {/* Smoke Alert */}
      {smoke && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/50 flex items-center gap-3 animate-pulse">
          <AlertCircle size={18} className="text-danger" />
          <span className="text-xs font-bold text-danger tracking-widest">SMOKE DETECTED</span>
        </div>
      )}

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-highlight/30 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Thermometer size={14} />
            <span className="text-[10px] uppercase tracking-wider">TEMP</span>
          </div>
          <div className="text-sm font-mono font-bold text-white">{temperature}°C</div>
        </div>

        <div className="bg-surface-highlight/30 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Droplets size={14} />
            <span className="text-[10px] uppercase tracking-wider">HUMID</span>
          </div>
          <div className="text-sm font-mono font-bold text-white">{humidity}%</div>
        </div>
      </div>

      {/* Last Update */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>LAST_UPDATE</span>
        <span>
          {lastUpdate > 0 ? (
            <>{Math.floor((now - lastUpdate) / 1000)}s AGO</>
          ) : (
            <>NO DATA</>
          )}
        </span>
      </div>
    </div>
  );
};

SensorCard.propTypes = {
  sensor: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      location: PropTypes.string,
      status: PropTypes.string,
    }),
    current: PropTypes.shape({
      gas: PropTypes.number,
      smoke: PropTypes.bool,
      temperature: PropTypes.number,
      humidity: PropTypes.number,
      lastUpdate: PropTypes.number,
    }),
  }).isRequired,
  sensorId: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SensorCard;
