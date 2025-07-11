# Pixelated Analytics Dashboard

A retro-themed analytics dashboard inspired by deepterm.tech with a complete pixel art aesthetic. This dashboard provides real-time data visualization, system monitoring, and analytics in a nostalgic 8-bit terminal style.

## 🎮 Features

### Visual Design
- **Retro Pixel Aesthetic**: Complete pixelated theme with 8-bit inspired fonts and graphics
- **Terminal-style Interface**: Command-line inspired design with retro green/cyan color scheme
- **Animated Elements**: Smooth animations with CSS keyframes and Framer Motion
- **Responsive Layout**: Grid-based responsive design that works on all screen sizes

### Dashboard Components

#### 1. **MetricCard** 
- Displays key performance indicators (KPIs)
- Animated hover effects and color-coded status
- Change indicators (positive/negative trends)
- Customizable icons and colors

#### 2. **TerminalLog**
- Real-time streaming logs in terminal style
- Color-coded log levels (success, warning, error, info)
- Auto-scrolling with animated cursor
- Simulates actual system logs

#### 3. **PixelChart**
- Multiple chart types: Line, Area, Bar, and Pie charts
- Built with Recharts library
- Pixelated tooltip styling
- Customizable colors matching the retro theme

#### 4. **StatusMonitor**
- Real-time system status indicators
- Service uptime and latency monitoring
- Color-coded status lights (online/offline/warning)
- Live timestamp updates

#### 5. **DataTable**
- Paginated data display
- Sortable columns
- Color-coded status indicators
- Pixel-styled buttons and navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
The dashboard is already integrated into the existing React application. Simply navigate to `/dashboard` route to view it.

### Running the Dashboard
```bash
npm run dev
```

Then navigate to `http://localhost:5173/dashboard` to see the pixelated analytics dashboard.

## 🎨 Theme Customization

The dashboard uses CSS custom properties for easy theme customization:

```css
:root {
  --pixel-bg-primary: #0a0a0a;      /* Main background */
  --pixel-bg-secondary: #1a1a1a;    /* Container background */
  --pixel-accent: #00ff00;          /* Primary accent (green) */
  --pixel-accent-secondary: #ff00ff; /* Secondary accent (magenta) */
  --pixel-warning: #ffff00;         /* Warning color (yellow) */
  --pixel-danger: #ff0000;          /* Danger color (red) */
  --pixel-info: #00ffff;            /* Info color (cyan) */
  --pixel-text: #ffffff;            /* Main text color */
  --pixel-text-dim: #888888;        /* Dimmed text */
  --pixel-border: #333333;          /* Border color */
}
```

## 📊 Data Sources

The dashboard includes mock data for demonstration:

- **User Analytics**: Active users, revenue, system load, API calls
- **Traffic Data**: Real-time traffic patterns and user sessions
- **System Metrics**: CPU, memory, disk, and network usage
- **Service Status**: Database, API gateway, cache server status
- **Activity Logs**: Recent system events and user actions

## 🔧 Component Usage

### Basic MetricCard Example
```jsx
<MetricCard
  title="Active Users"
  value="2,847"
  change="+12.5%"
  changeType="positive"
  icon="👥"
  color="accent"
/>
```

### Chart Component Example
```jsx
<PixelChart
  type="line"
  title="Real-time Traffic"
  data={trafficData}
  dataKey="value"
  xKey="name"
  color="var(--pixel-accent)"
  height={250}
/>
```

### Terminal Log Example
```jsx
<TerminalLog 
  logs={[
    { type: 'success', message: 'System online', timestamp: '12:01:23' },
    { type: 'warning', message: 'High CPU usage', timestamp: '12:01:24' }
  ]} 
/>
```

## 🎯 Key Features

### Real-time Updates
- Live timestamps and status indicators
- Auto-refreshing data (simulated)
- Streaming terminal logs
- Dynamic progress bars

### Interactive Elements
- Hover effects on metric cards
- Clickable buttons with pixel styling
- Sortable table columns
- Paginated data views

### Performance Optimized
- Lazy loading of chart components
- Efficient re-rendering with React hooks
- CSS animations for smooth performance
- Responsive grid layouts

## 🌟 Visual Effects

### Animations
- **Glow Effect**: Animated text glow on the main title
- **Slide-in**: Staggered component animations on load
- **Progress Scanning**: Animated progress bar scanning effect
- **Cursor Blink**: Blinking cursor in terminal logs

### Styling Features
- **Pixelated Scrollbars**: Custom scrollbar styling
- **Retro Buttons**: 3D-style pixelated buttons
- **Status Indicators**: Glowing status dots
- **Hover Transforms**: Scale and glow effects on interaction

## 📱 Responsive Design

The dashboard is fully responsive with:
- Desktop: 4-column grid layout
- Tablet: 2-column grid layout  
- Mobile: Single column layout
- Flexible chart containers
- Adaptive font sizes

## 🔮 Future Enhancements

Potential improvements and additions:
- WebSocket integration for real-time data
- Dark/light theme toggle
- Additional chart types (radar, heatmap)
- Sound effects for authentic retro experience
- Export functionality for reports
- User customizable dashboard layouts
- Integration with actual analytics APIs

## 📄 File Structure

```
src/
├── components/
│   ├── Dashboard.jsx              # Main dashboard component
│   └── PixelDashboard/
│       ├── MetricCard.jsx         # KPI metric cards
│       ├── TerminalLog.jsx        # Terminal-style logs
│       ├── PixelChart.jsx         # Chart components
│       ├── StatusMonitor.jsx      # System status monitor
│       ├── DataTable.jsx          # Data table component
│       └── index.js               # Component exports
└── styles/
    └── PixelDashboard.css         # Complete pixel theme CSS
```

## 🎮 Inspiration

This dashboard was inspired by:
- Classic terminal interfaces and command-line tools
- Retro gaming aesthetics and pixel art
- Modern analytics platforms like deepterm.tech
- Cyberpunk and sci-fi terminal UIs
- 80s/90s computer interfaces

## 📝 License

This project is part of the larger application and follows the same licensing terms.