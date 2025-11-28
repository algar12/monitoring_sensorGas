/**
 * MainLayout Component
 * Cyber-Industrial Layout Wrapper
 */


import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, isConnected, onSettingsClick, currentView, onViewChange }) => {

  return (
    <div className="min-h-screen bg-background flex overflow-hidden selection:bg-primary/30 selection:text-primary-100">
      {/* Background Grid Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={onViewChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 h-screen">
        {/* Header */}
        <Header
          isConnected={isConnected}
          currentView={currentView}
          onSettingsClick={onSettingsClick}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isConnected: PropTypes.bool.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default MainLayout;
