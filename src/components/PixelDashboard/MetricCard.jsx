import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, change, changeType, icon, color = 'accent' }) => {
  const colorMap = {
    accent: 'var(--pixel-accent)',
    danger: 'var(--pixel-danger)',
    warning: 'var(--pixel-warning)',
    info: 'var(--pixel-info)',
    secondary: 'var(--pixel-accent-secondary)'
  };

  const borderColor = colorMap[color] || colorMap.accent;

  return (
    <motion.div 
      className="pixel-metric-card"
      style={{ borderColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {icon && (
        <div style={{ 
          fontSize: '20px', 
          color: borderColor, 
          marginBottom: '8px' 
        }}>
          {icon}
        </div>
      )}
      
      <span 
        className="pixel-metric-value"
        style={{ color: borderColor }}
      >
        {value}
      </span>
      
      <div className="pixel-metric-label">
        {title}
      </div>
      
      {change && (
        <div className={`pixel-metric-change ${changeType}`}>
          {changeType === 'positive' ? '▲' : '▼'} {change}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;