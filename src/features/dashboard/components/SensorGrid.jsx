/**
 * SensorGrid Component
 * Displays all sensors in a grid layout
 */

import PropTypes from 'prop-types';
import SensorCard from './SensorCard';
import { Layers } from 'lucide-react';

const SensorGrid = ({ sensors, selectedSensor, onSensorSelect }) => {
  const sensorEntries = Object.entries(sensors);

  if (sensorEntries.length === 0) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <Layers size={48} className="mx-auto mb-4 text-gray-600" />
        <h3 className="text-xl font-bold gradient-text mb-2">No Sensors Found</h3>
        <p className="text-gray-400 text-sm">
          No sensors are currently configured. Please add sensors to your Firebase database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Layers size={24} />
          All Sensors ({sensorEntries.length})
        </h2>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sensorEntries.map(([sensorId, sensor]) => (
          <SensorCard
            key={sensorId}
            sensorId={sensorId}
            sensor={sensor}
            isSelected={sensorId === selectedSensor}
            onClick={() => onSensorSelect(sensorId)}
          />
        ))}
      </div>
    </div>
  );
};

SensorGrid.propTypes = {
  sensors: PropTypes.object.isRequired,
  selectedSensor: PropTypes.string,
  onSensorSelect: PropTypes.func.isRequired,
};

export default SensorGrid;
