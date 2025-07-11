import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PixelChart = ({ 
  type = 'line', 
  data = [], 
  title, 
  dataKey, 
  xKey = 'name',
  color = '#00ff00',
  height = 300 
}) => {
  // Default data if none provided
  const defaultData = [
    { name: '00:00', value: 400, users: 240, revenue: 2400 },
    { name: '04:00', value: 300, users: 139, revenue: 2210 },
    { name: '08:00', value: 200, users: 980, revenue: 2290 },
    { name: '12:00', value: 278, users: 390, revenue: 2000 },
    { name: '16:00', value: 189, users: 480, revenue: 2181 },
    { name: '20:00', value: 239, users: 380, revenue: 2500 },
    { name: '23:59', value: 349, users: 430, revenue: 2100 }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  
  const colors = ['#00ff00', '#ff00ff', '#00ffff', '#ffff00', '#ff0000'];

  // Custom tooltip with pixel styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'var(--pixel-bg-secondary)',
          border: '2px solid var(--pixel-accent)',
          padding: '8px',
          fontFamily: 'Press Start 2P, monospace',
          fontSize: '8px',
          color: 'var(--pixel-text)'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '2px 0', color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--pixel-border)" />
            <XAxis 
              dataKey={xKey} 
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <YAxis 
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey || 'value'}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--pixel-border)" />
            <XAxis 
              dataKey={xKey}
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <YAxis 
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey || 'value'} 
              fill={color}
              stroke={color}
              strokeWidth={1}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              dataKey={dataKey || 'value'}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              stroke="var(--pixel-bg-primary)"
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      default: // line chart
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--pixel-border)" />
            <XAxis 
              dataKey={xKey}
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <YAxis 
              axisLine={{ stroke: color }}
              tickLine={{ stroke: color }}
              tick={{ fill: color, fontSize: 8, fontFamily: 'Press Start 2P' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey || 'value'}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="pixel-chart-container">
      {title && <div className="pixel-chart-title">{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default PixelChart;