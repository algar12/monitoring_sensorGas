import { useEffect, useRef } from 'react';

const NOTIFICATION_COOLDOWN = 100000; // 5 minutes in milliseconds (5 * 60 * 1000)
const WEBHOOK_URL = 'https://n8n.gopung.my.id/webhook/iot_notif';

/**
 * Hook to trigger n8n webhook notifications
 * @param {number} gasValue - Current gas level
 * @param {string} status - Current status (safe, warning, danger)
 * @param {boolean} isSmokeDetected - Whether smoke is detected
 */
const useNotification = (gasValue, status, isSmokeDetected) => {
    const lastNotificationTimeRef = useRef(0);
    const lastStatusRef = useRef(status);

    const sendNotification = async (data) => {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('✅ Notification sent to n8n:', data);
            } else {
                console.error('❌ Failed to send notification. Status:', response.status);
            }
        } catch (error) {
            console.error('❌ Failed to send notification:', error);
        }
    };

    useEffect(() => {
        const now = Date.now();
        const isCooldownOver = now - lastNotificationTimeRef.current > NOTIFICATION_COOLDOWN;
        const isDanger = status === 'danger' || isSmokeDetected;
        const statusChanged = status !== lastStatusRef.current;

        // Trigger if:
        // 1. It's a DANGER situation OR Smoke is detected
        // 2. AND (Cooldown is over OR Status just changed to DANGER)
        if (isDanger && (isCooldownOver || (statusChanged && status === 'danger'))) {
            const now = new Date();
            const formattedTime = now.toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });

            sendNotification({
                gasValue,
                status,
                isSmokeDetected,
                timestamp: formattedTime,
                timestampISO: now.toISOString(),
            });
            lastNotificationTimeRef.current = Date.now();
        }

        lastStatusRef.current = status;
    }, [gasValue, status, isSmokeDetected]);

    return null; // Hook doesn't need to return anything
};

export default useNotification;
