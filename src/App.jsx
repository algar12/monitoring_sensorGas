/**
 * Main Application Component
 * Gas Sensor IoT Dashboard - Futuristic Glassmorphism Edition
 */

import { useState } from 'react';
import { Activity, Shield, Radio, Settings } from 'lucide-react';

// Custom Hooks
// Custom Hooks
import useGasSensor from './features/dashboard/hooks/useGasSensor';
import useGasHistory from './features/history/hooks/useGasHistory';
import useNotification from './features/settings/hooks/useNotification';
import useMultiSensor from './features/dashboard/hooks/useMultiSensor';
import useSettings from './features/settings/hooks/useSettings';

// Components
import MainLayout from './components/layout/MainLayout';
import Card from './components/common/Card';
import GasMeter from './features/dashboard/components/GasMeter';
import StatusCard from './features/dashboard/components/StatusCard';
import HistoryChart from './features/history/components/HistoryChart';
import AlertBanner from './features/alerts/components/AlertBanner';
import SmokeIndicator from './features/alerts/components/SmokeIndicator';
import ExportButton from './features/history/components/ExportButton';
import StatisticsCards from './features/dashboard/components/StatisticsCards';
import DateRangePicker from './features/history/components/DateRangePicker';
import SensorSelector from './features/settings/components/SensorSelector';
import SensorGrid from './features/dashboard/components/SensorGrid';
import SettingsModal from './features/settings/components/SettingsModal';

// Utils
import { shouldShowAlert, getGasStatus } from './utils/gasUtils';
import { calculateStatistics } from './utils/exportData';
import { filterDataByDateRange, getDateRangeLabel } from './utils/dataFilters';

// Constants
import { GAS_THRESHOLDS, UI_CONFIG } from './config/gasConfig';

function App() {
  // Multi-sensor support
  const { sensors, selectedSensor, setSelectedSensor, sensorCount } = useMultiSensor();

  // View mode: 'single' or 'grid'
  const [viewMode, setViewMode] = useState('single');

  // Settings
  const { settings, saveSettings, resetToDefaults } = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  const {
    gasValue,
    lastUpdate,
    isConnected,
    error,
    isSmokeDetected,
  } = useGasSensor();

  // Calculate status with custom thresholds
  const status = getGasStatus(gasValue, settings.thresholds);

  const history = useGasHistory(gasValue);
  const [showAlert, setShowAlert] = useState(true);


  // Date range filter state - default to 'all' to show all available data
  const [dateRange, setDateRange] = useState({
    start: new Date(0), // Unix epoch - show all data
    end: new Date(),
    preset: 'all',
  });

  // Trigger notifications on danger
  useNotification(gasValue, status, isSmokeDetected);

  // Filter history by date range
  const filteredHistory = filterDataByDateRange(history, dateRange.start, dateRange.end);

  // Calculate statistics from filtered history
  const statistics = calculateStatistics(filteredHistory);

  // Handle date range change
  const handleDateRangeChange = (start, end, preset) => {
    setDateRange({ start, end, preset });
  };

  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <MainLayout
      isConnected={isConnected}
      onSettingsClick={() => setCurrentView('settings')}
      currentView={currentView}
      onViewChange={setCurrentView}
    >
      {/* Settings Modal (Global) */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={saveSettings}
        onReset={resetToDefaults}
      />

      {/* --- DASHBOARD VIEW --- */}
      {currentView === 'dashboard' && (
        <>
          {/* Sensor Selector Bar */}
          {sensorCount > 1 && (
            <div className="mb-6 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-4">
                <SensorSelector
                  sensors={sensors}
                  selectedSensor={selectedSensor}
                  onSensorSelect={setSelectedSensor}
                />
                <div className="text-xs text-slate-400 font-mono">
                  {sensorCount} SENSORS ONLINE
                </div>
              </div>

              <button
                onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
                className="px-4 py-2 rounded-lg bg-surface-highlight hover:bg-white/5 text-sm transition-all flex items-center gap-2 border border-white/10"
              >
                {viewMode === 'single' ? (
                  <>
                    <Shield size={16} className="text-primary" />
                    <span>GRID VIEW</span>
                  </>
                ) : (
                  <>
                    <Activity size={16} className="text-primary" />
                    <span>SINGLE VIEW</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' ? (
            <SensorGrid
              sensors={sensors}
              selectedSensor={selectedSensor}
              onSensorSelect={(sensorId) => {
                setSelectedSensor(sensorId);
                setViewMode('single');
              }}
            />
          ) : (
            /* Single View Dashboard */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="animate-slide-in-left delay-200">
                  <SmokeIndicator isDetected={isSmokeDetected} />
                </div>

                {/* Status Widget moved here for better layout */}
                <div className="animate-slide-in-left delay-300">
                  <StatusCard gasValue={gasValue} status={status} lastUpdate={lastUpdate} />
                </div>
              </aside>

              {/* Main Display */}
              <main className="lg:col-span-6 space-y-6">
                {/* Alert Banner */}
                {showAlert && shouldShowAlert(status) && (
                  <div className="animate-slide-down">
                    <AlertBanner
                      status={status}
                      message={
                        status === 'danger'
                          ? 'CRITICAL GAS LEVELS DETECTED! EVACUATE IMMEDIATELY.'
                          : 'GAS LEVELS RISING. MONITOR SITUATION CLOSELY.'
                      }
                      onClose={() => setShowAlert(false)}
                    />
                  </div>
                )}

                {/* Gas Meter */}
                <div className="animate-fade-in">
                  <Card>
                    {isConnected ? (
                      <GasMeter value={gasValue} maxValue={UI_CONFIG.METER_MAX_VALUE} status={status} />
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 border-4 border-slate-700 border-t-primary rounded-full animate-spin mb-6 mx-auto"></div>
                        <p className="text-slate-400 font-mono text-lg tracking-widest">CONNECTION LOST</p>
                        {error && <p className="text-danger text-xs mt-2 font-mono">{error}</p>}
                      </div>
                    )}
                  </Card>
                </div>
              </main>

              {/* Right Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                {/* Live Chart */}
                <Card>
                  <h3 className="text-xs font-bold text-primary tracking-widest mb-4 flex items-center gap-2 font-mono">
                    <Radio size={14} className="animate-pulse" /> LIVE_DATA_STREAM
                  </h3>
                  <div className="h-[200px] w-full">
                    <HistoryChart data={history} />
                  </div>
                </Card>

                {/* Thresholds Info */}
                <div className="cyber-card p-5 animate-slide-in-right delay-300">
                  <h3 className="text-xs font-bold text-primary tracking-widest mb-4 flex items-center gap-2 font-mono">
                    <Shield size={14} /> SAFETY_PROTOCOLS
                  </h3>
                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between items-center p-2 rounded bg-success/10 border border-success/20">
                      <span className="text-success">SAFE</span>
                      <span className="text-white font-bold">&lt; {GAS_THRESHOLDS.SAFE_MAX} PPM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-warning/10 border border-warning/20">
                      <span className="text-warning">WARNING</span>
                      <span className="text-white font-bold">{GAS_THRESHOLDS.SAFE_MAX}-{GAS_THRESHOLDS.WARNING_MAX} PPM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-danger/10 border border-danger/20">
                      <span className="text-danger">CRITICAL</span>
                      <span className="text-white font-bold">&gt; {GAS_THRESHOLDS.WARNING_MAX} PPM</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </>
      )}

      {/* --- ANALYTICS VIEW --- */}
      {currentView === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Analytics & Reports</h2>
            <ExportButton
              data={filteredHistory}
              filename={`gas-sensor-data-${getDateRangeLabel(dateRange.start, dateRange.end, dateRange.preset)}`}
              sensorInfo={{
                name: 'Gas Sensor - Main',
                dateRange: getDateRangeLabel(dateRange.start, dateRange.end, dateRange.preset),
              }}
            />
          </div>

          <Card>
            <div className="space-y-6">
              {/* Date Range Picker */}
              <DateRangePicker
                onDateChange={handleDateRangeChange}
                initialRange={dateRange.preset}
              />

              {/* Statistics Cards */}
              <StatisticsCards stats={statistics} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Historical Trends</h3>
            <div className="h-[400px] w-full">
              <HistoryChart data={filteredHistory} />
            </div>
          </Card>
        </div>
      )}

      {/* --- HISTORY VIEW --- */}
      {currentView === 'history' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white tracking-tight">Full Data History</h2>
          <Card>
            <div className="h-[600px] w-full">
              <HistoryChart data={history} />
            </div>
          </Card>
        </div>
      )}

      {/* --- ALERTS VIEW --- */}
      {currentView === 'alerts' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white tracking-tight">System Alerts</h2>
          <div className="cyber-card p-8 text-center">
            <Shield size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Active Alerts</h3>
            <p className="text-slate-400">System is running within normal parameters.</p>
          </div>
        </div>
      )}

      {/* --- SETTINGS VIEW --- */}
      {currentView === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white tracking-tight">System Configuration</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full p-4 rounded-lg bg-surface-highlight border border-white/5 hover:bg-white/5 transition-all text-left flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-white">Configure Thresholds</div>
                    <div className="text-sm text-slate-400">Adjust gas safety limits</div>
                  </div>
                  <Settings size={20} className="text-primary group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Sensor Management</h3>
              <SensorSelector
                sensors={sensors}
                selectedSensor={selectedSensor}
                onSensorSelect={setSelectedSensor}
              />
            </Card>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default App;
