/**
 * SettingsModal Component
 * Modal for configuring gas thresholds and notification settings
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Settings, AlertTriangle, Bell, RotateCcw, Save } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, onSave, onReset }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local settings when prop changes
  useState(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleThresholdChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    setLocalSettings((prev) => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [key]: numValue,
      },
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (key, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(localSettings);
    setHasChanges(false);
    onClose();
  };

  const handleReset = () => {
    if (confirm('Reset semua pengaturan ke default?')) {
      onReset();
      setHasChanges(false);
    }
  };

  if (!isOpen) return null;

  const { thresholds, notifications } = localSettings;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="sticky top-0 glass-strong p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold gradient-text">Pengaturan Dashboard</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Threshold Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-amber-400" />
              <h3 className="text-lg font-bold gradient-text-blue">Batas Ambang Gas (PPM)</h3>
            </div>

            <div className="space-y-4">
              {/* Safe Max */}
              <div className="glass-strong p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Batas Aman (Safe Max)</label>
                  <span className="text-lg font-bold gradient-text-teal">
                    {thresholds.safeMax} PPM
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={thresholds.safeMax}
                  onChange={(e) => handleThresholdChange('safeMax', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-teal"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50</span>
                  <span>500</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Gas di bawah nilai ini dianggap aman</p>
              </div>

              {/* Warning Max */}
              <div className="glass-strong p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Batas Waspada (Warning Max)
                  </label>
                  <span className="text-lg font-bold text-amber-400">
                    {thresholds.warningMax} PPM
                  </span>
                </div>
                <input
                  type="range"
                  min={thresholds.safeMax + 50}
                  max="1000"
                  step="10"
                  value={thresholds.warningMax}
                  onChange={(e) => handleThresholdChange('warningMax', e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-amber"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{thresholds.safeMax + 50}</span>
                  <span>1000</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Gas di atas nilai ini dianggap berbahaya
                </p>
              </div>

              {/* Preview */}
              <div className="glass-strong p-4 rounded-xl border border-blue-500/30">
                <div className="text-xs font-bold text-blue-300 mb-2">📊 Preview Zona:</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-gray-300">Aman: 0 - {thresholds.safeMax} PPM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-gray-300">
                      Waspada: {thresholds.safeMax + 1} - {thresholds.warningMax} PPM
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-300">Bahaya: &gt; {thresholds.warningMax} PPM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-purple-400" />
              <h3 className="text-lg font-bold gradient-text-blue">Pengaturan Notifikasi</h3>
            </div>

            <div className="space-y-3">
              {/* Enable Notifications */}
              <div className="glass-strong p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-300">Aktifkan Notifikasi</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Kirim notifikasi saat gas mencapai level bahaya
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.enabled}
                    onChange={(e) => handleNotificationChange('enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Cooldown Period */}
              <div className="glass-strong p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Cooldown Period</label>
                  <span className="text-sm font-bold text-purple-400">
                    {notifications.cooldown / 60000} menit
                  </span>
                </div>
                <input
                  type="range"
                  min="60000"
                  max="600000"
                  step="60000"
                  value={notifications.cooldown}
                  onChange={(e) => handleNotificationChange('cooldown', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-purple"
                  disabled={!notifications.enabled}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 min</span>
                  <span>10 min</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Jeda waktu antar notifikasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-strong p-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong hover-lift transition-all text-gray-300"
          >
            <RotateCcw size={16} />
            Reset Default
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg glass-strong hover-lift transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
                hasChanges
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover-lift'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={16} />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SettingsModal;
