/**
 * SmokeIndicator Component
 * Displays smoke detection status with clean professional design
 */

import PropTypes from 'prop-types';
import { Flame, Wind } from 'lucide-react';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';

const SmokeIndicator = ({ isDetected }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${isDetected ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
            {isDetected ? (
              <Flame size={24} className="text-red-400" />
            ) : (
              <Wind size={24} className="text-green-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-400">Smoke Detector</h3>
            <Badge variant={isDetected ? 'danger' : 'success'} size="md" dot className="mt-1">
              {isDetected ? 'SMOKE DETECTED' : 'CLEAR'}
            </Badge>
          </div>
        </div>

        {/* Status Indicator */}
        <div
          className={`w-3 h-3 rounded-full ${
            isDetected ? 'bg-red-500 animate-pulse' : 'bg-green-500'
          }`}
        />
      </div>
    </Card>
  );
};

SmokeIndicator.propTypes = {
  isDetected: PropTypes.bool.isRequired,
};

export default SmokeIndicator;
