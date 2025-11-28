/**
 * Export Data Utilities
 * Functions to export sensor data to CSV, Excel, and PDF formats
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export data to CSV format
 */
export const exportToCSV = (data, filename = 'gas_sensor_data') => {
  // Prepare data for export
  const exportData = data.map((item) => ({
    Timestamp: item.time,
    'Gas Level (PPM)': item.value,
    Status: item.status || getStatusFromValue(item.value),
    'Smoke Detected': item.smoke ? 'Yes' : 'No',
  }));

  const csv = Papa.unparse(exportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}_${getDateString()}.csv`);
};

/**
 * Export data to Excel format
 */
export const exportToExcel = (data, filename = 'gas_sensor_data') => {
  // Prepare data for export
  const exportData = data.map((item) => ({
    Timestamp: item.time,
    'Gas Level (PPM)': item.value,
    Status: item.status || getStatusFromValue(item.value),
    'Smoke Detected': item.smoke ? 'Yes' : 'No',
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();

  // Set column widths
  worksheet['!cols'] = [
    { wch: 20 }, // Timestamp
    { wch: 15 }, // Gas Level
    { wch: 12 }, // Status
    { wch: 15 }, // Smoke
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Gas Sensor Data');
  XLSX.writeFile(workbook, `${filename}_${getDateString()}.xlsx`);
};

/**
 * Export data to PDF format
 */
export const exportToPDF = (data, filename = 'gas_sensor_data', sensorInfo = {}) => {
  const doc = new jsPDF();

  // Header with gradient effect (simulated with color)
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('Gas Sensor Report', 14, 20);

  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(230, 230, 230);
  doc.text(
    `Generated: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`,
    14,
    28
  );

  if (sensorInfo.name) {
    doc.text(`Sensor: ${sensorInfo.name}`, 14, 34);
  }

  // Statistics Box
  doc.setFillColor(245, 245, 250);
  doc.roundedRect(14, 45, 182, 30, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);

  const stats = calculateStatistics(data);
  const statsY = 52;
  doc.text(`Total Readings: ${stats.count}`, 20, statsY);
  doc.text(`Average: ${stats.average} PPM`, 70, statsY);
  doc.text(`Max: ${stats.max} PPM`, 120, statsY);
  doc.text(`Min: ${stats.min} PPM`, 160, statsY);

  doc.text(`Safe: ${stats.safeCount}`, 20, statsY + 8);
  doc.text(`Warning: ${stats.warningCount}`, 70, statsY + 8);
  doc.text(`Danger: ${stats.dangerCount}`, 120, statsY + 8);

  // Data Table
  const tableData = data.map((item) => [
    item.time,
    item.value,
    item.status || getStatusFromValue(item.value),
    item.smoke ? 'Yes' : 'No',
  ]);

  doc.autoTable({
    head: [['Timestamp', 'Gas (PPM)', 'Status', 'Smoke']],
    body: tableData,
    startY: 82,
    theme: 'grid',
    headStyles: {
      fillColor: [139, 92, 246],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 255],
    },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 30, halign: 'right' },
      2: { cellWidth: 25, halign: 'center' },
      3: { cellWidth: 25, halign: 'center' },
    },
    didParseCell: function (data) {
      // Color code status column
      if (data.column.index === 2 && data.section === 'body') {
        const status = data.cell.raw;
        if (status === 'danger') {
          data.cell.styles.textColor = [239, 68, 68];
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'warning') {
          data.cell.styles.textColor = [245, 158, 11];
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'safe') {
          data.cell.styles.textColor = [20, 184, 166];
        }
      }
    },
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text('AIR.GUARD System', 14, doc.internal.pageSize.height - 10);
  }

  doc.save(`${filename}_${getDateString()}.pdf`);
};

/**
 * Helper function to download blob
 */
const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

/**
 * Get date string for filename
 */
const getDateString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

/**
 * Get status from gas value
 */
const getStatusFromValue = (value) => {
  if (value < 300) return 'safe';
  if (value < 800) return 'warning';
  return 'danger';
};

/**
 * Calculate statistics from data
 */
const calculateStatistics = (data) => {
  if (!data || data.length === 0) {
    return {
      count: 0,
      average: 0,
      max: 0,
      min: 0,
      safeCount: 0,
      warningCount: 0,
      dangerCount: 0,
    };
  }

  const values = data.map((d) => d.value);
  const sum = values.reduce((a, b) => a + b, 0);

  return {
    count: data.length,
    average: Math.round(sum / data.length),
    max: Math.max(...values),
    min: Math.min(...values),
    safeCount: data.filter((d) => d.value < 300).length,
    warningCount: data.filter((d) => d.value >= 300 && d.value < 800).length,
    dangerCount: data.filter((d) => d.value >= 800).length,
  };
};

export { calculateStatistics };
