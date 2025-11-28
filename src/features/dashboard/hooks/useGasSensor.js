/**
 * Custom Hook: useGasSensor
 * Manages Firebase real-time gas sensor data subscription
 */

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../config/firebase';
import { FIREBASE_CONFIG } from '../../../config/gasConfig';
import { getGasStatus } from '../../../utils/gasUtils';

/**
 * Hook for managing gas sensor data from Firebase
 * @returns {object} Sensor data and connection state
 */
const useGasSensor = () => {
  const [gasValue, setGasValue] = useState(0);
  const [smokeValue, setSmokeValue] = useState(0);
  const [status, setStatus] = useState('unknown');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create Firebase reference
    const gasRef = ref(database, FIREBASE_CONFIG.PATH);

    // Subscribe to real-time updates
    const unsubscribe = onValue(
      gasRef,
      (snapshot) => {
        const value = snapshot.val();

        if (value !== null) {
          // Handle both old format (number) and new format (object)
          const gasVal = typeof value === 'object' ? value.nilai : value;
          const smokeVal = typeof value === 'object' ? value.asap : 0;

          setGasValue(gasVal);
          setStatus(getGasStatus(gasVal));
          setSmokeValue(smokeVal);
          setLastUpdate(Date.now());
          setIsConnected(true);
          setError(null);
        }
      },
      (err) => {
        console.error('Error reading from Firebase:', err);
        setIsConnected(false);
        setError(err.message);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    gasValue,
    smokeValue,
    isSmokeDetected: smokeValue === 1,
    status,
    lastUpdate,
    isConnected,
    error,
  };
};

export default useGasSensor;
