import React, { useState, useEffect } from 'react';

const TerminalLog = ({ logs = [] }) => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample logs if none provided
  const defaultLogs = [
    { type: 'success', message: '[OK] System initialization complete', timestamp: '12:01:23' },
    { type: 'info', message: '[INFO] Loading dashboard modules...', timestamp: '12:01:24' },
    { type: 'success', message: '[OK] Database connection established', timestamp: '12:01:25' },
    { type: 'warning', message: '[WARN] High CPU usage detected (85%)', timestamp: '12:01:26' },
    { type: 'info', message: '[INFO] Processing 1,247 data points', timestamp: '12:01:27' },
    { type: 'success', message: '[OK] Analytics engine running', timestamp: '12:01:28' },
    { type: 'error', message: '[ERR] Failed to connect to external API', timestamp: '12:01:29' },
    { type: 'info', message: '[INFO] Retrying connection...', timestamp: '12:01:30' },
    { type: 'success', message: '[OK] Connection restored', timestamp: '12:01:31' },
    { type: 'info', message: '[INFO] Real-time monitoring active', timestamp: '12:01:32' },
  ];

  const logData = logs.length > 0 ? logs : defaultLogs;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < logData.length) {
        setDisplayedLogs(prev => [...prev, logData[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset and start over
        setDisplayedLogs([]);
        setCurrentIndex(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, logData]);

  const getLogPrefix = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return '•';
    }
  };

  return (
    <div className="pixel-container">
      <div className="pixel-chart-title">System Logs</div>
      <div className="pixel-terminal">
        {displayedLogs.map((log, index) => (
          <span key={index} className={`pixel-terminal-line ${log.type}`}>
            [{log.timestamp}] {getLogPrefix(log.type)} {log.message}
          </span>
        ))}
        <span className="pixel-terminal-line">
          <span className="pixel-cursor"></span>
        </span>
      </div>
    </div>
  );
};

export default TerminalLog;