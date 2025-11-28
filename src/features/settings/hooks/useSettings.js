/**
 * useSettings Hook
 * Manages user settings with localStorage persistence
 */

import { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  thresholds: {
    safeMax: 300, // PPM - below this is safe
    warningMax: 800, // PPM - between safe and this is warning
    // Above warningMax is danger
  },
  notifications: {
    enabled: true,
    cooldown: 300000, // 5 minutes in ms
    sound: false, // Future feature
  },
  ui: {
    theme: 'dark',
    language: 'id',
  },
};

const STORAGE_KEY = 'gas_sensor_settings';

const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings) => {
    try {
      const merged = { ...settings, ...newSettings };
      setSettings(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  };

  // Update specific threshold
  const updateThreshold = (key, value) => {
    const newSettings = {
      ...settings,
      thresholds: {
        ...settings.thresholds,
        [key]: value,
      },
    };
    return saveSettings(newSettings);
  };

  // Update notification settings
  const updateNotifications = (key, value) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    };
    return saveSettings(newSettings);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
  };

  return {
    settings,
    isLoading,
    saveSettings,
    updateThreshold,
    updateNotifications,
    resetToDefaults,
    defaults: DEFAULT_SETTINGS,
  };
};

export default useSettings;
