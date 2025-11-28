/**
 * SensorSelector Component
 * Dropdown to select active sensor
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Layers, CheckCircle } from 'lucide-react';

const SensorSelector = ({ sensors, selectedSensor, onSensorSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sensorEntries = Object.entries(sensors);
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  const selectedSensorData = sensors[selectedSensor];
  const selectedName = selectedSensorData?.info?.name || selectedSensor;

  return (
    <div className="relative">
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-strong px-4 py-2 rounded-lg flex items-center gap-2 hover-lift transition-all min-w-[200px]"
      >
        <Layers size={18} className="text-purple-400" />
        <span className="flex-1 text-left text-sm truncate">{selectedName}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute right-0 mt-2 glass-card rounded-xl shadow-2xl z-50 min-w-[250px] max-h-[400px] overflow-y-auto border border-white/10">
            {sensorEntries.map(([sensorId, sensor]) => {
              const isSelected = sensorId === selectedSensor;
              const sensorName = sensor?.info?.name || sensorId;
              const sensorLocation = sensor?.info?.location || 'Unknown';
              const isOnline = sensor?.current?.lastUpdate > now - 60000;

              return (
                <button
                  key={sensorId}
                  onClick={() => {
                    onSensorSelect(sensorId);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 flex items-start gap-3 transition-all text-left
                    ${isSelected ? 'bg-purple-500/20' : 'hover:bg-white/10'}
                  `}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{sensorName}</span>
                      {isSelected && <CheckCircle size={14} className="text-purple-400" />}
                    </div>
                    <div className="text-xs text-gray-400">{sensorLocation}</div>
                    <div className={`text-xs mt-1 ${isOnline ? 'text-teal-400' : 'text-red-400'}`}>
                      {isOnline ? '● Online' : '● Offline'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

SensorSelector.propTypes = {
  sensors: PropTypes.object.isRequired,
  selectedSensor: PropTypes.string.isRequired,
  onSensorSelect: PropTypes.func.isRequired,
};

export default SensorSelector;
