/**
 * Custom Hook: useGasHistory
 * Manages rolling history of gas sensor readings for chart display
 */

import { useState, useEffect } from 'react';
import { CHART_CONFIG } from '../../../config/gasConfig';
import { formatChartTime } from '../../../utils/gasUtils';

/**
 * Hook for managing gas sensor history data
 * @param {number} gasValue - Current gas sensor value
 * @returns {array} Array of historical data points
 */
const useGasHistory = (gasValue) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Only add to history if we have a valid value
    if (gasValue !== null && gasValue !== undefined) {
      const now = new Date();
      const timeString = formatChartTime(now);

      // eslint-disable-next-line
      setHistory((prev) => {
        const newHistory = [...prev, { time: timeString, value: gasValue }];
        // Keep only the last N data points
        return newHistory.slice(-CHART_CONFIG.MAX_HISTORY_POINTS);
      });
    }
  }, [gasValue]);

  return history;
};

export default useGasHistory;
