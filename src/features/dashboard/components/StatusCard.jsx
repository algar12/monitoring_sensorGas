/**
 * StatusCard Component
 * Displays current gas sensor status with clean professional design
 */

import PropTypes from 'prop-types';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import { getStatusConfig } from '../../../utils/gasUtils';

const StatusCard = ({ status, gasValue, lastUpdate }) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  // Map status to badge variant
  const badgeVariant =
    {
      safe: 'success',
      warning: 'warning',
      danger: 'danger',
      unknown: 'default',
    }[status] || 'default';

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Status Sensor</h3>
          <Badge variant={badgeVariant} size="lg" dot>
            {config.label}
          </Badge>
        </div>
        <div
          className={`p-3 rounded-lg ${
            status === 'safe'
              ? 'bg-green-500/10'
              : status === 'warning'
                ? 'bg-yellow-500/10'
                : 'bg-red-500/10'
          }`}
        >
          <Icon size={24} className={config.iconColor} />
        </div>
      </div>

      <div className="space-y-3">
        {/* Gas Value */}
        <div>
          <div className="text-xs text-slate-400 mb-1">Gas Level</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{gasValue}</span>
            <span className="text-sm text-slate-400">PPM</span>
          </div>
        </div>

        {/* Range Info */}
        <div className="pt-3 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Range</div>
          <div className="text-sm text-slate-300">{config.range}</div>
        </div>

        {/* Last Update */}
        {lastUpdate && <div className="text-xs text-slate-500">Updated: {lastUpdate}</div>}
      </div>

      {/* Description */}
      {config.description && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">{config.description}</p>
        </div>
      )}
    </Card>
  );
};

StatusCard.propTypes = {
  status: PropTypes.string.isRequired,
  gasValue: PropTypes.number.isRequired,
  lastUpdate: PropTypes.string,
};

export default StatusCard;
