import React, { useState, useEffect } from 'react';

const StatusMonitor = ({ services = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Default services if none provided
  const defaultServices = [
    { name: 'Database', status: 'online', uptime: '99.9%', latency: '12ms' },
    { name: 'API Gateway', status: 'online', uptime: '99.7%', latency: '8ms' },
    { name: 'Cache Server', status: 'warning', uptime: '95.2%', latency: '45ms' },
    { name: 'Auth Service', status: 'online', uptime: '99.8%', latency: '15ms' },
    { name: 'File Storage', status: 'offline', uptime: '87.1%', latency: 'N/A' },
    { name: 'Analytics', status: 'online', uptime: '98.9%', latency: '22ms' },
    { name: 'Notification', status: 'warning', uptime: '94.5%', latency: '67ms' },
    { name: 'Monitoring', status: 'online', uptime: '99.9%', latency: '5ms' }
  ];

  const serviceData = services.length > 0 ? services : defaultServices;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'var(--pixel-accent)';
      case 'offline': return 'var(--pixel-danger)';
      case 'warning': return 'var(--pixel-warning)';
      default: return 'var(--pixel-text-dim)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'ONLINE';
      case 'offline': return 'OFFLINE';
      case 'warning': return 'WARNING';
      default: return 'UNKNOWN';
    }
  };

  return (
    <div className="pixel-container">
      <div className="pixel-chart-title">
        System Status Monitor
        <div style={{ 
          fontSize: '8px', 
          color: 'var(--pixel-text-dim)', 
          marginTop: '4px' 
        }}>
          Last Updated: {currentTime.toLocaleTimeString()}
        </div>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        {serviceData.map((service, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid var(--pixel-border)',
              fontSize: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div 
                className={`pixel-status ${service.status}`}
                style={{ 
                  backgroundColor: getStatusColor(service.status),
                  borderColor: getStatusColor(service.status)
                }}
              ></div>
              <span style={{ color: 'var(--pixel-text)' }}>
                {service.name}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '8px'
            }}>
              <span style={{ 
                color: getStatusColor(service.status),
                minWidth: '60px'
              }}>
                {getStatusText(service.status)}
              </span>
              
              <span style={{ 
                color: 'var(--pixel-text-dim)',
                minWidth: '50px'
              }}>
                {service.uptime}
              </span>
              
              <span style={{ 
                color: 'var(--pixel-info)',
                minWidth: '40px'
              }}>
                {service.latency}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '16px', 
        padding: '8px',
        background: 'var(--pixel-bg-primary)',
        border: '1px solid var(--pixel-border)',
        fontSize: '8px',
        color: 'var(--pixel-text-dim)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Services: {serviceData.length}</span>
          <span>
            Online: {serviceData.filter(s => s.status === 'online').length}
          </span>
          <span>
            Issues: {serviceData.filter(s => s.status !== 'online').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusMonitor;