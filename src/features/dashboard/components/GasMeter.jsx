/**
 * GasMeter Component
 * Cyber-Industrial Gauge with Arc Reactor Style
 */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GasMeter = ({ value, maxValue = 1024, status }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Colors based on status
    const colors = {
      safe: { primary: '#10b981', secondary: '#059669' },
      warning: { primary: '#f59e0b', secondary: '#d97706' },
      danger: { primary: '#ef4444', secondary: '#b91c1c' },
      unknown: { primary: '#0ea5e9', secondary: '#0284c7' },
    };
    const activeColor = colors[status] || colors.unknown;

    // Draw Outer Tech Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Rotating Segment Ring
    const time = Date.now() / 2000;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(time);
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.arc(0, 0, 130, 0, Math.PI / 4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.restore();

    // Draw Progress Arc Background
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const totalAngle = endAngle - startAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 20;
    ctx.lineCap = 'butt';
    ctx.stroke();

    // Draw Active Progress Arc
    const percentage = Math.min(Math.max(value / maxValue, 0), 1);
    const currentAngle = startAngle + totalAngle * percentage;

    if (percentage > 0) {
      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = activeColor.primary;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, startAngle, currentAngle);
      const gradient = ctx.createLinearGradient(centerX - 100, centerY, centerX + 100, centerY);
      gradient.addColorStop(0, activeColor.secondary);
      gradient.addColorStop(1, activeColor.primary);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 20;
      ctx.lineCap = 'butt';
      ctx.stroke();

      ctx.shadowBlur = 0;
    }

    // Draw Ticks
    for (let i = 0; i <= 40; i++) {
      const angle = startAngle + totalAngle * (i / 40);
      const isMajor = i % 5 === 0;
      const innerR = 75;
      const outerR = isMajor ? 90 : 82;

      const x1 = centerX + innerR * Math.cos(angle);
      const y1 = centerY + innerR * Math.sin(angle);
      const x2 = centerX + outerR * Math.cos(angle);
      const y2 = centerY + outerR * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.stroke();
    }

    // Animation loop
    const animationId = requestAnimationFrame(() => { });
    return () => cancelAnimationFrame(animationId);
  }, [value, maxValue, status]);

  const statusColors = {
    safe: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <canvas ref={canvasRef} width={320} height={320} className="relative z-10" />

      {/* Center Data */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none pt-4">
        <div className="text-[10px] text-slate-500 tracking-[0.2em] mb-1 font-mono">
          SENSOR_READING
        </div>
        <div className={`text-5xl font-bold font-mono tracking-tighter ${statusColors[status] || 'text-primary'} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
          {value}
        </div>
        <div className="text-xs text-slate-500 mt-1 font-mono">PPM</div>

        <div className={`
            mt-6 px-3 py-1 rounded border text-[10px] font-bold tracking-widest uppercase
            ${status === 'safe' ? 'bg-success/10 border-success/30 text-success' :
            status === 'warning' ? 'bg-warning/10 border-warning/30 text-warning' :
              'bg-danger/10 border-danger/30 text-danger animate-pulse'}
        `}>
          {status}
        </div>
      </div>
    </div>
  );
};

GasMeter.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number,
  status: PropTypes.oneOf(['safe', 'warning', 'danger', 'unknown']).isRequired,
};

export default GasMeter;
