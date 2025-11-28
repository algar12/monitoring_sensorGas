/**
 * Data filtering utilities
 * Functions to filter historical data by date range
 */

/**
 * Filter historical data by date range
 * QUICK FIX: For real-time rolling data, always show all available data
 * Date range selection is for UI/UX only until persistent storage is implemented
 *
 * @param {Array} data - Historical data array
 * @param {Date} startDate - Start date for filter (currently ignored)
 * @param {Date} endDate - End date for filter (currently ignored)
 * @returns {Array} All available data
 */
export const filterDataByDateRange = (data, _startDate, _endDate) => {
  // Quick fix: Always return all available data
  // The rolling history from useGasHistory is already limited to recent data
  if (!data || data.length === 0) return [];

  // Return all data - date filtering disabled for real-time rolling history
  return data;
};

/**
 * Get date range label for display
 */
export const getDateRangeLabel = (startDate, endDate, preset) => {
  // Show preset labels but note that all data is shown
  if (preset === 'all') return 'Semua Data Tersedia';
  if (preset === '24h') return 'Data Real-time (24 Jam)';
  if (preset === '7d') return 'Data Real-time (7 Hari)';
  if (preset === '30d') return 'Data Real-time (30 Hari)';
  if (preset === '90d') return 'Data Real-time (90 Hari)';

  // Custom range
  return 'Data Real-time';
};
