/**
 * useMultiSensor Hook
 * Manages multiple gas sensors from Firebase
 */

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../config/firebase';

/**
 * Hook to fetch and manage multiple sensors
 * @returns {Object} { sensors, loading, error, selectedSensor, setSelectedSensor }
 */
const useMultiSensor = () => {
  const [sensors, setSensors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState('main'); // Default sensor

  useEffect(() => {
    // Listen to sensors node in Firebase
    const sensorsRef = ref(database, 'sensors');

    const unsubscribe = onValue(
      sensorsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSensors(data);

          // If selected sensor doesn't exist, select first available
          if (!data[selectedSensor]) {
            const firstSensor = Object.keys(data)[0];
            setSelectedSensor(firstSensor);
          }
        } else {
          // No sensors found, use backward compatibility with root data
          setSensors({
            main: {
              info: {
                id: 'main',
                name: 'Gas Sensor - Main',
                location: 'Default Location',
                status: 'active',
              },
            },
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching sensors:', err);
        setError(err.message);
        setLoading(false);

        // Fallback to single sensor mode
        setSensors({
          main: {
            info: {
              id: 'main',
              name: 'Gas Sensor - Main',
              location: 'Default Location',
              status: 'active',
            },
          },
        });
      }
    );

    return () => unsubscribe();
  }, [selectedSensor]);

  return {
    sensors,
    loading,
    error,
    selectedSensor,
    setSelectedSensor,
    sensorCount: Object.keys(sensors).length,
  };
};

export default useMultiSensor;
