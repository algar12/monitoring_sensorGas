/**
 * Gas Sensor Configuration Constants
 * Centralized configuration for gas thresholds, status, and UI
 */

import { CheckCircle, AlertTriangle, AlertCircle, Flame } from 'lucide-react';

// Firebase Configuration
export const FIREBASE_CONFIG = {
  PATH: 'sensor_gas', // Changed from 'sensor_gas/nilai' to get full object
  UPDATE_INTERVAL: 2000, // ms
};

// Smoke Status
export const SMOKE_STATUS = {
  SAFE: 'safe',
  DETECTED: 'detected',
};

// Smoke UI Config
export const SMOKE_UI_CONFIG = {
  [SMOKE_STATUS.SAFE]: {
    label: 'BEBAS ASAP',
    color: 'text-success-400',
    bgColor: 'bg-success-500/10',
    borderColor: 'border-success-500/20',
    icon: CheckCircle,
  },
  [SMOKE_STATUS.DETECTED]: {
    label: 'ASAP TERDETEKSI',
    color: 'text-danger-400',
    bgColor: 'bg-danger-500/10',
    borderColor: 'border-danger-500/20',
    icon: Flame,
  },
};

// Gas Level Thresholds (PPM)
export const GAS_THRESHOLDS = {
  SAFE_MAX: 300,
  WARNING_MAX: 600,
};

// Status Levels
export const GAS_STATUS = {
  SAFE: 'safe',
  WARNING: 'warning',
  DANGER: 'danger',
  UNKNOWN: 'unknown',
};

// Status Configurations
export const STATUS_CONFIG = {
  [GAS_STATUS.SAFE]: {
    icon: CheckCircle,
    label: 'AMAN',
    description: 'Kualitas udara baik',
    bgColor: 'from-success-500/20 to-success-600/20',
    borderColor: 'border-success-500/50',
    textColor: 'text-success-400',
    iconColor: 'text-success-500',
    glowClass: 'shadow-[0_0_20px_rgba(34,197,94,0.3),0_0_40px_rgba(34,197,94,0.1)]',
    range: '< 300 PPM',
  },
  [GAS_STATUS.WARNING]: {
    icon: AlertTriangle,
    label: 'WASPADA',
    description: 'Tingkat gas mulai meningkat',
    bgColor: 'from-warning-500/20 to-warning-600/20',
    borderColor: 'border-warning-500/50',
    textColor: 'text-warning-400',
    iconColor: 'text-warning-500',
    glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.3),0_0_40px_rgba(245,158,11,0.1)]',
    range: '100-300 PPM',
    alertTitle: '⚠️ Peringatan',
    alertMessage: 'Tingkat gas mulai meningkat. Mohon perhatikan kondisi area.',
  },
  [GAS_STATUS.DANGER]: {
    icon: AlertCircle,
    label: 'BAHAYA',
    description: 'Tingkat gas sangat tinggi',
    bgColor: 'from-danger-500/20 to-danger-600/20',
    borderColor: 'border-danger-500/50',
    textColor: 'text-danger-400',
    iconColor: 'text-danger-500',
    glowClass: 'animate-pulse-danger',
    range: '> 300 PPM',
    alertTitle: '⚠️ PERINGATAN BAHAYA!',
    alertMessage: 'Tingkat gas sangat tinggi! Segera evakuasi dan periksa area.',
  },
  [GAS_STATUS.UNKNOWN]: {
    icon: Flame,
    label: 'TIDAK DIKETAHUI',
    description: 'Menunggu data sensor',
    bgColor: 'from-gray-500/20 to-gray-600/20',
    borderColor: 'border-gray-500/50',
    textColor: 'text-gray-400',
    iconColor: 'text-gray-500',
    glowClass: '',
    range: '-',
  },
};

// Chart Configuration
export const CHART_CONFIG = {
  MAX_HISTORY_POINTS: 20,
  ANIMATION_DURATION: 750,
  GRID_COLOR: 'rgba(255, 255, 255, 0.1)',
  LINE_COLOR: 'rgba(14, 165, 233, 1)',
  GRADIENT_START: 'rgba(14, 165, 233, 0.3)',
  GRADIENT_END: 'rgba(14, 165, 233, 0)',
  POINT_COLOR: '#0ea5e9',
  MAX_TICKS: 8,
};

// UI Constants
export const UI_CONFIG = {
  METER_MAX_VALUE: 1024,
  UPDATE_ANIMATION_DURATION: 300,
};
