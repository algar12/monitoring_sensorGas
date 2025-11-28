/**
 * ExportButton Component
 * Dropdown button for exporting data in multiple formats
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Download, FileText, FileSpreadsheet, FileType } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToPDF } from '../../../utils/exportData';

const ExportButton = ({ data, filename = 'gas_sensor_data', sensorInfo = {} }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async (exportFunction, format) => {
    setExporting(true);
    try {
      await exportFunction(data, filename, sensorInfo);
      console.log(`✅ Data exported as ${format}`);
    } catch (error) {
      console.error(`❌ Failed to export as ${format}:`, error);
    } finally {
      setExporting(false);
      setShowMenu(false);
    }
  };

  const exportOptions = [
    {
      label: 'Export as CSV',
      icon: FileText,
      action: () => handleExport(exportToCSV, 'CSV'),
      description: 'Comma-separated values',
    },
    {
      label: 'Export as Excel',
      icon: FileSpreadsheet,
      action: () => handleExport(exportToExcel, 'Excel'),
      description: 'Microsoft Excel format',
    },
    {
      label: 'Export as PDF',
      icon: FileType,
      action: () => handleExport(exportToPDF, 'PDF'),
      description: 'Portable document format',
    },
  ];

  if (!data || data.length === 0) {
    return (
      <button
        disabled
        className="glass-strong px-4 py-2 rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed"
      >
        <Download size={18} />
        No Data to Export
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
        className="glass-strong px-4 py-2 rounded-lg flex items-center gap-2 hover-lift transition-all"
      >
        <Download size={18} className={exporting ? 'animate-pulse' : ''} />
        {exporting ? 'Exporting...' : 'Export Data'}
        <span className="text-xs text-gray-400 ml-1">({data.length} records)</span>
      </button>

      {showMenu && !exporting && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />

          {/* Menu */}
          <div className="absolute right-0 mt-2 glass-card rounded-xl shadow-2xl z-50 min-w-[250px] overflow-hidden border border-white/10">
            {exportOptions.map(({ label, icon: _Icon, action, description }) => (
              <button
                key={label}
                onClick={action}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/10 transition-all text-left"
              >
                <_Icon size={20} className="mt-0.5 text-purple-400" />
                <div className="flex-1">
                  <div className="font-medium text-white">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ExportButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      status: PropTypes.string,
      smoke: PropTypes.bool,
    })
  ).isRequired,
  filename: PropTypes.string,
  sensorInfo: PropTypes.object,
};

export default ExportButton;
