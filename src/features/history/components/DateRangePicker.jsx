/**
 * DateRangePicker Component
 * Allows users to select date ranges for filtering historical data
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Clock } from 'lucide-react';
import { format, subDays, subHours, startOfDay, endOfDay } from 'date-fns';

const DateRangePicker = ({ onDateChange, initialRange = '24h' }) => {
  const [selectedPreset, setSelectedPreset] = useState(initialRange);
  const [showCustom, setShowCustom] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const presets = {
    '24h': { label: '24 Jam', hours: 24 },
    '7d': { label: '7 Hari', days: 7 },
    '30d': { label: '30 Hari', days: 30 },
    '90d': { label: '90 Hari', days: 90 },
    all: { label: 'Semua Data', all: true },
    custom: { label: 'Custom', custom: true },
  };

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setShowCustom(presetKey === 'custom');

    if (presetKey === 'custom') {
      return; // Wait for user to select custom dates
    }

    const end = new Date();
    let start;

    if (presetKey === 'all') {
      start = new Date(0); // Unix epoch
    } else if (presets[presetKey].hours) {
      start = subHours(end, presets[presetKey].hours);
    } else if (presets[presetKey].days) {
      start = subDays(end, presets[presetKey].days);
    }

    onDateChange(start, end, presetKey);
  };

  const handleCustomApply = () => {
    if (!customStart || !customEnd) {
      alert('Silakan pilih tanggal mulai dan akhir');
      return;
    }

    const start = startOfDay(new Date(customStart));
    const end = endOfDay(new Date(customEnd));

    if (start > end) {
      alert('Tanggal mulai harus sebelum tanggal akhir');
      return;
    }

    onDateChange(start, end, 'custom');
  };

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-bold gradient-text-blue">
        <Calendar size={16} />
        Filter Periode
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => handlePresetChange(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPreset === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'glass-strong hover-lift text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom Date Inputs */}
      {showCustom && (
        <div className="space-y-3 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Tanggal Mulai</label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full glass-strong p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Tanggal Akhir</label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
                className="w-full glass-strong p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={handleCustomApply}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-lg text-sm font-bold hover-lift"
          >
            <Clock size={14} className="inline mr-2" />
            Terapkan Filter
          </button>
        </div>
      )}
    </div>
  );
};

DateRangePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  initialRange: PropTypes.string,
};

export default DateRangePicker;
