/**
 * Gas Sensor Utility Functions
 * Helper functions for gas sensor data processing
 */

import { GAS_THRESHOLDS, GAS_STATUS, STATUS_CONFIG } from '../config/gasConfig';

/**
 * Get gas status based on value
 * @param {number} value - Gas sensor value
 * @param {object} customThresholds - Optional custom thresholds {safeMax, warningMax}
 * @returns {string} Status: 'safe', 'warning', or 'danger'
 */
export const getGasStatus = (value, customThresholds = null) => {
  const thresholds = customThresholds || {
    safeMax: GAS_THRESHOLDS.SAFE_MAX,
    warningMax: GAS_THRESHOLDS.WARNING_MAX,
  };

  if (value < thresholds.safeMax) {
    return GAS_STATUS.SAFE;
  } else if (value < thresholds.warningMax) {
    return GAS_STATUS.WARNING;
  } else {
    return GAS_STATUS.DANGER;
  }
};

/**
 * Get complete status configuration
 * @param {string} status - Status level ('safe', 'warning', 'danger')
 * @returns {object} Status configuration object
 */
export const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || STATUS_CONFIG[GAS_STATUS.UNKNOWN];
};

/**
 * Format timestamp to Indonesian locale time string
 * @param {number|Date} timestamp - Timestamp or Date object
 * @returns {string} Formatted time string (HH:MM:SS)
 */
export const formatTimestamp = (timestamp) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Format timestamp for chart display (shorter format)
 * @param {Date} date - Date object
 * @returns {string} Formatted time string for chart
 */
export const formatChartTime = (date) => {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Check if gas level requires alert
 * @param {string} status - Gas status
 * @returns {boolean} True if alert should be shown
 */
export const shouldShowAlert = (status) => {
  return status === GAS_STATUS.WARNING || status === GAS_STATUS.DANGER;
};
