import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MetricCard from './PixelDashboard/MetricCard';
import TerminalLog from './PixelDashboard/TerminalLog';
import PixelChart from './PixelDashboard/PixelChart';
import StatusMonitor from './PixelDashboard/StatusMonitor';
import DataTable from './PixelDashboard/DataTable';
import '../styles/PixelDashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for demonstration
  const trafficData = [
    { name: '00:00', value: 400, users: 240, requests: 1240 },
    { name: '04:00', value: 300, users: 139, requests: 980 },
    { name: '08:00', value: 600, users: 680, requests: 1890 },
    { name: '12:00', value: 800, users: 890, requests: 2340 },
    { name: '16:00', value: 750, users: 820, requests: 2180 },
    { name: '20:00', value: 650, users: 720, requests: 1950 },
    { name: '23:59', value: 450, users: 430, requests: 1100 }
  ];

  const revenueData = [
    { name: 'Jan', value: 4000, profit: 2400 },
    { name: 'Feb', value: 3000, profit: 1398 },
    { name: 'Mar', value: 9800, profit: 5200 },
    { name: 'Apr', value: 3908, profit: 2100 },
    { name: 'May', value: 4800, profit: 2800 },
    { name: 'Jun', value: 3800, profit: 2500 }
  ];

  const systemData = [
    { name: 'CPU', value: 85 },
    { name: 'Memory', value: 62 },
    { name: 'Disk', value: 43 },
    { name: 'Network', value: 78 }
  ];

  return (
    <div className="pixel-dashboard">
      {/* Header */}
      <motion.div 
        className="pixel-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="pixel-title">DEEPTERM ANALYTICS</h1>
        <div className="pixel-subtitle">
          Real-time Data Analytics & System Monitoring Platform
        </div>
        <div style={{ 
          fontSize: '10px', 
          color: 'var(--pixel-text-dim)', 
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span>
            <span className={`pixel-status ${isOnline ? 'online' : 'offline'}`}></span>
            System Status: {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
          <span>Last Update: {currentTime.toLocaleTimeString()}</span>
          <span>Uptime: 99.7%</span>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        className="pixel-grid-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <MetricCard
          title="Active Users"
          value="2,847"
          change="+12.5%"
          changeType="positive"
          icon="👥"
          color="accent"
        />
        <MetricCard
          title="Total Revenue"
          value="$45.2K"
          change="+8.3%"
          changeType="positive"
          icon="💰"
          color="info"
        />
        <MetricCard
          title="System Load"
          value="78.5%"
          change="+5.2%"
          changeType="negative"
          icon="⚡"
          color="warning"
        />
        <MetricCard
          title="API Calls"
          value="1.2M"
          change="+15.7%"
          changeType="positive"
          icon="🔌"
          color="secondary"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="pixel-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <PixelChart
          type="line"
          title="Real-time Traffic"
          data={trafficData}
          dataKey="value"
          xKey="name"
          color="var(--pixel-accent)"
          height={250}
        />
        
        <PixelChart
          type="area"
          title="Revenue Analytics"
          data={revenueData}
          dataKey="value"
          xKey="name"
          color="var(--pixel-info)"
          height={250}
        />
      </motion.div>

      {/* Second row of charts */}
      <motion.div 
        className="pixel-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <PixelChart
          type="bar"
          title="System Resources"
          data={systemData}
          dataKey="value"
          xKey="name"
          color="var(--pixel-warning)"
          height={200}
        />
        
        <PixelChart
          type="pie"
          title="Data Distribution"
          data={[
            { name: 'Users', value: 45 },
            { name: 'Sessions', value: 30 },
            { name: 'API', value: 15 },
            { name: 'Cache', value: 10 }
          ]}
          dataKey="value"
          xKey="name"
          height={200}
        />
      </motion.div>

      {/* Monitoring Section */}
      <motion.div 
        className="pixel-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div style={{ gridColumn: '1 / -1' }}>
          <StatusMonitor />
        </div>
      </motion.div>

      {/* Logs and Data Table */}
      <motion.div 
        className="pixel-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <TerminalLog />
        
        <DataTable
          title="Recent Activity Log"
          maxRows={8}
        />
      </motion.div>

      {/* Additional Real-time Metrics */}
      <motion.div 
        className="pixel-grid-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="pixel-container">
          <div className="pixel-chart-title">Performance Metrics</div>
          <div style={{ marginTop: '16px', fontSize: '10px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px' 
            }}>
              <span>Response Time</span>
              <span style={{ color: 'var(--pixel-accent)' }}>125ms</span>
            </div>
            <div className="pixel-progress">
              <div 
                className="pixel-progress-bar" 
                style={{ width: '75%' }}
              ></div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              marginTop: '16px' 
            }}>
              <span>Throughput</span>
              <span style={{ color: 'var(--pixel-info)' }}>1,247 req/s</span>
            </div>
            <div className="pixel-progress">
              <div 
                className="pixel-progress-bar" 
                style={{ width: '90%' }}
              ></div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              marginTop: '16px' 
            }}>
              <span>Error Rate</span>
              <span style={{ color: 'var(--pixel-warning)' }}>0.2%</span>
            </div>
            <div className="pixel-progress">
              <div 
                className="pixel-progress-bar" 
                style={{ width: '5%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="pixel-container">
          <div className="pixel-chart-title">Network Status</div>
          <div style={{ marginTop: '16px', fontSize: '10px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '8px 0',
              borderBottom: '1px solid var(--pixel-border)' 
            }}>
              <span>Bandwidth</span>
              <span style={{ color: 'var(--pixel-accent)' }}>850 Mbps</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '8px 0',
              borderBottom: '1px solid var(--pixel-border)' 
            }}>
              <span>Latency</span>
              <span style={{ color: 'var(--pixel-info)' }}>12ms</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '8px 0',
              borderBottom: '1px solid var(--pixel-border)' 
            }}>
              <span>Packet Loss</span>
              <span style={{ color: 'var(--pixel-accent)' }}>0.01%</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '8px 0' 
            }}>
              <span>Connections</span>
              <span style={{ color: 'var(--pixel-secondary)' }}>1,847</span>
            </div>
          </div>
        </div>

        <div className="pixel-container">
          <div className="pixel-chart-title">Quick Actions</div>
          <div style={{ 
            marginTop: '16px', 
            display: 'grid', 
            gap: '8px' 
          }}>
            <button className="pixel-button">Refresh Data</button>
            <button className="pixel-button">Export Report</button>
            <button className="pixel-button">System Health</button>
            <button className="pixel-button">Alert Config</button>
            <button className="pixel-button">User Management</button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        style={{
          marginTop: '40px',
          padding: '16px',
          borderTop: '2px solid var(--pixel-border)',
          textAlign: 'center',
          fontSize: '8px',
          color: 'var(--pixel-text-dim)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div>DEEPTERM ANALYTICS v2.1.0 | Real-time Analytics Platform</div>
        <div style={{ marginTop: '4px' }}>
          © 2024 DeepTerm Analytics. Pixel Dashboard Theme Active.
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
