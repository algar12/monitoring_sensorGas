/**
 * HistoryChart Component - Futuristic Glass Edition
 */

import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Lazy load the Line component
const LazyLine = lazy(() => import('react-chartjs-2').then((module) => ({ default: module.Line })));

const HistoryChart = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#8B5CF6',
        bodyColor: '#fff',
        borderColor: '#8B5CF6',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: { family: 'Outfit', weight: 'bold' },
        bodyFont: { family: 'Outfit' },
        callbacks: {
          label: function (context) {
            return `LEVEL: ${context.parsed.y} PPM`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#888',
          font: { family: 'Outfit', size: 10 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#888',
          font: { family: 'Outfit', size: 10 },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
  };

  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: 'Gas Level',
        data: data.map((item) => item.value),
        fill: true,
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
          gradient.addColorStop(0, '#8B5CF6');
          gradient.addColorStop(0.5, '#EC4899');
          gradient.addColorStop(1, '#3B82F6');
          return gradient;
        },
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
          gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.2)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          return gradient;
        },
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#EC4899',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="h-full w-full">
      {data.length > 0 ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <LazyLine options={chartOptions} data={chartData} aria-label="Gas sensor history chart" />
        </Suspense>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 font-mono text-xs">
          <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="gradient-text-blue">INITIALIZING SENSORS...</p>
        </div>
      )}
    </div>
  );
};

HistoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HistoryChart;
