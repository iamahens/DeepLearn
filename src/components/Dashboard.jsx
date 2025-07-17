import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Modal component for name input
const NameModal = ({ open, onSubmit }) => {
  const [input, setInput] = useState("");
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
        padding: 32,
        minWidth: 340,
        maxWidth: '90vw',
        textAlign: 'center',
        position: 'relative',
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 16 }}>Welcome!</h2>
        <div style={{ fontSize: 18, marginBottom: 16 }}>What should we call you?</div>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your name..."
          style={{
            width: '100%',
            fontSize: 18,
            padding: '10px 12px',
            border: '2px solid #888',
            borderRadius: 4,
            marginBottom: 24,
            fontFamily: 'inherit',
          }}
          onKeyDown={e => { if (e.key === 'Enter' && input.trim()) onSubmit(input.trim()); }}
        />
        <button
          style={{
            width: '100%',
            background: '#a58cf5',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            border: 'none',
            borderRadius: 6,
            padding: '12px 0',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            opacity: input.trim() ? 1 : 0.6,
            transition: 'background 0.2s',
          }}
          disabled={!input.trim()}
          onClick={() => input.trim() && onSubmit(input.trim())}
        >Continue</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Name modal logic
  const [name, setName] = useState(() => localStorage.getItem('dtp_username') || "");
  const [showModal, setShowModal] = useState(!localStorage.getItem('dtp_username'));

  const handleNameSubmit = (val) => {
    setName(val);
    localStorage.setItem('dtp_username', val);
    setShowModal(false);
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  // Read stats from localStorage
  const [studyStreak, setStudyStreak] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(600); // You can adjust this as needed
  const [currentGoal, setCurrentGoal] = useState(120); // You can adjust this as needed

  // Helper to get today's date key
  const getTodayKey = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  };

  // Helper to get week range (Sunday to Saturday)
  const getWeekKeys = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const weekKeys = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - dayOfWeek + i);
      weekKeys.push(d.toISOString().slice(0, 10));
    }
    return weekKeys;
  };

  // Load stats from localStorage
  useEffect(() => {
    // Today's study time
    const todayKey = getTodayKey();
    setTotalStudyTime(parseInt(localStorage.getItem(`studytime_${todayKey}`) || '0', 10));
    // Today's sessions
    setCompletedSessions(parseInt(localStorage.getItem(`sessions_${todayKey}`) || '0', 10));
    // Current streak
    setStudyStreak(parseInt(localStorage.getItem('current_streak') || '0', 10));
    // Best streak
    setBestStreak(parseInt(localStorage.getItem('best_streak') || '0', 10));
    // Weekly progress (sum of studytime for this week)
    const weekKeys = getWeekKeys();
    let weekTotal = 0;
    for (const key of weekKeys) {
      weekTotal += parseInt(localStorage.getItem(`studytime_${key}`) || '0', 10);
    }
    setWeeklyProgress(weekTotal);
  }, [currentTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const progressPercentage = Math.min((totalStudyTime / currentGoal) * 100, 100);
  const weeklyProgressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  const navigate = useNavigate();

  // Handler for Pomodoro actions
  const handlePomodoroAction = (action) => {
    localStorage.setItem('pomodoro_action', action);
    navigate('/pomodora');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffe5d0 0%, #ffe9c7 100%);
          font-family: 'Press Start 2P', cursive, monospace;
          color: #ecf0f1;
          padding: 20px;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(145deg, #845ec2 0%, #845ec2 100%);
          border: 4px solid #845ec2;
          border-radius: 0;
          box-shadow: 
            0 4px 0 #845ec2,
            0 8px 0 #845ec2;
        }

        .dashboard-title {
          font-size: 24px;
          font-weight: bold;
          color: #f39c12;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          font-size: 12px;
          color: #bdc3c7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .main-stats-section {
          max-width: 1400px;
          margin: 0 auto 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          border: 6px solid #000;
          border-radius: 0;
          padding: 24px 16px;
          text-align: center;
          box-shadow: 6px 6px 0 #000;
          font-family: 'Press Start 2P', cursive, monospace;
          transition: transform 0.3s cubic-bezier(0.4, 0.2, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .stat-card:hover {
          transform: scale(1.035) translateY(-5px);
          box-shadow: 10px 12px 0 #000;
          z-index: 2;
        }
        .stat-card.stat-white {
          background: #fff;
        }
        .stat-card.stat-yellow {
          background: #ffc72c;
        }
        .stat-card.stat-teal {
          background: #1ed6b5;
        }
        .stat-card.stat-orange {
          background: #ff6a00;
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 8px;
          filter: none;
        }

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #111;
          margin-bottom: 0;
          line-height: 1.1;
          font-family: 'Press Start 2P', cursive, monospace;
          text-shadow: 2px 2px 0 #f7b731;
        }

        .stat-label {
          font-size: 14px;
          color: #111;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          font-family: 'Press Start 2P', cursive, monospace;
          text-shadow: 2px 2px 0 #f7b731;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .left-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dashboard-card {
          background: linear-gradient(145deg, #845ec2 0%, #845ec2 100%);
          border: 4px solid #845ec2;
          border-radius: 0;
          padding: 20px;
          box-shadow: 
            0 4px 0 #845ec2,
            0 8px 0 #845ec2,
            0 12px 20px rgba(132, 94, 194, 0.4);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 0 #845ec2,
            0 16px 0 #845ec2,
            0 20px 30px rgba(132, 94, 194, 0.5);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 3px solid #845ec2;
        }

        .card-icon {
          font-size: 24px;
          filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.3));
        }

        .card-title {
          font-size: 14px;
          font-weight: bold;
          color: #f39c12;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
        }

        .progress-bar {
          width: 100%;
          height: 20px;
          background: #845ec2;
          border: 2.4px solid #FADF63;
          border-radius: 0;
          overflow: hidden;
          position: relative;
          margin: 16px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
          transition: width 0.5s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-text {
          font-size: 10px;
          color: #ecf0f1;
          text-align: center;
          margin-top: 8px;
        }

        .clock-display {
          font-size: 28px;
          font-weight: bold;
          color: #f39c12;
          text-align: center;
          margin: 16px 0;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
          font-family: 'Courier New', monospace;
        }

        .streak-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 16px 0;
        }

        .streak-icon {
          font-size: 24px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .achievement-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 8px;
          background: linear-gradient(145deg, #27ae60 0%, #229954 100%);
          border: 2px solid #2ecc71;
          border-radius: 0;
          font-size: 10px;
        }

        .achievement-icon {
          font-size: 16px;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 16px;
        }

        .action-btn {
          padding: 12px 16px;
          border: 3px solid #95a5a6;
          border-radius: 0;
          background: linear-gradient(145deg, #3498db 0%, #2980b9 100%);
          color: white;
          font-family: inherit;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 
            3px 3px 0 #7f8c8d,
            6px 6px 0 #6c7b7d;
        }

        .action-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            5px 5px 0 #7f8c8d,
            8px 8px 0 #6c7b7d;
        }

        .action-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 
            1px 1px 0 #7f8c8d,
            2px 2px 0 #6c7b7d;
        }

        .recent-activity {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          margin-bottom: 8px;
          background: #fff;
          border: 2px solid #845ec2;
          border-radius: 0;
          font-size: 10px;
          color: #111;
        }

        .activity-icon {
          font-size: 14px;
        }

        .activity-time {
          color: #bdc3c7;
          font-size: 8px;
        }

        .pixel-border {
          position: relative;
        }

        .pixel-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #e74c3c, #f39c12, #f1c40f, #2ecc71, #845ec2, #9b59b6);
          background-size: 400% 400%;
          animation: borderGlow 3s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @media (max-width: 1200px) {
          .main-stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .main-stats-section {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .dashboard-card {
            padding: 16px;
          }
          
          .card-title {
            font-size: 12px;
          }
          
          .stat-value {
            font-size: 20px;
          }
          
          .clock-display {
            font-size: 24px;
          }
          
          .dashboard-title {
            font-size: 20px;
          }
        }

        .calendar-card {
          background: #FFD36B !important;
          border: 3px solid #111;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          box-shadow: 2px 2px 0 #000;
          padding-top: 0;
        }
        .calendar-card .card-header {
          background: #FFD36B;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          padding: 18px 32px 10px 32px;
          border-bottom: 2px solid #111;
          margin-bottom: 0;
          display: flex;
          align-items: center;
        }
        .calendar-card .card-title {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 24px;
          color: #111;
          font-weight: bold;
          margin-left: 12px;
        }
        .calendar-wrapper {
          background: #ffe5d0;
          border-radius: 0 0 8px 8px;
          padding: 24px 16px 8px 16px;
          font-family: 'Press Start 2P', cursive, monospace;
        }
        .calendar-table {
          width: 100%;
          border-collapse: collapse;
          background: #ffe5d0;
        }
        .calendar-table th, .calendar-table td {
          border: 2px solid #111;
          text-align: center;
          font-size: 12px;
          font-family: 'Press Start 2P', cursive, monospace;
          height: 36px;
          width: 36px;
          letter-spacing: 1px;
        }
        .calendar-table th {
          background: #fff3d6;
          color: #111;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 10px;
        }
        .calendar-table td {
          background: #fff;
          color: #111;
          font-weight: bold;
          font-size: 12px;
          transition: color 0.2s;
        }
        .calendar-table td:not(.inactive):not(.calendar-today):hover {
          color: rgb(167, 204, 237);
          cursor: pointer;
        }
        .calendar-table td.calendar-today {
          border: 3px solid #ff6a00;
          color: #ff6a00;
          background: #fff;
        }
        .calendar-table td.calendar-selected {
           background: #FADF63 !important;
           color: #111 !important;
           transition: background 0.5s;
         }
         .calendar-table td.calendar-fading.calendar-selected {
           background: #fff !important;
           color: #111 !important;
           transition: background 0.5s;
         }
        .calendar-table td.inactive {
          background: #f3f3f3;
          color: #bbb;
        }
        .calendar-nav-btn {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 14px;
          background: #fff;
          color: #111;
          border: 3px solid #111;
          border-radius: 0;
          padding: 2px 10px;
          cursor: pointer;
          margin: 0 8px;
          transition: background 0.2s;
          box-shadow: 2px 2px 0 #000;
        }
        .calendar-nav-btn:hover {
          background: #ffe5d0;
        }
        .calendar-month-label {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 16px;
          color: #111;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .dashboard-header-progress-merged {
          background: #5ec6e7;
          border: 4px solid #111;
          box-shadow: 6px 6px 0 #000;
          border-radius: 0;
          margin-bottom: 32px;
          padding: 32px 32px 24px 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .dashboard-header-merged-content {
          margin-bottom: 24px;
        }
        .dashboard-title-merged {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 32px;
          color: #f39c12;
          text-shadow: 3px 3px 0 #845ec2;
          margin-bottom: 8px;
        }
        .dashboard-subtitle-merged {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 16px;
          color: #fff;
          margin-bottom: 0;
        }
        .dashboard-progress-merged-content {
          width: 100%;
        }
        .progress-label-merged {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 18px;
          color: #f39c12;
          margin-bottom: 12px;
        }
        .progress-title-merged {
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .progress-bar-merged {
          width: 100%;
          height: 20px;
          background: #845ec2;
          border: 2.4px solid #FADF63;
          border-radius: 0;
          overflow: hidden;
          position: relative;
          margin-bottom: 8px;
        }
        .progress-fill-merged {
          height: 100%;
          background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
          transition: width 0.5s ease;
          position: relative;
        }
        .progress-text-merged {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 14px;
          color: #fff;
          text-align: right;
          margin-top: 0;
        }
        .session-card, .activity-card {
          background: #FFD36B !important;
          border: 3px solid #111;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          box-shadow: 2px 2px 0 #000;
          padding-top: 0;
        }
        .session-card .card-header, .activity-card .card-header {
          background: #FFD36B;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          padding: 18px 32px 10px 32px;
          border-bottom: 2px solid #111;
          margin-bottom: 0;
          display: flex;
          align-items: center;
        }
        .session-card .card-title, .activity-card .card-title {
          font-family: 'Press Start 2P', cursive, monospace;
          font-size: 24px;
          color: #111;
          font-weight: bold;
          margin-left: 12px;
        }
        .session-card-content, .activity-card-content {
          background: #ffe5d0;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          padding: 24px 16px 24px 16px;
        }
        .session-card-content .action-btn {
          background: #fff;
          border: 3px solid #95a5a6;
          color: #111;
        }
        .session-card-content .action-btn:hover {
          background: #f3f3f3;
        }
        .clock-char {
          transition: color 0.2s;
          display: inline-block;
        }
        .clock-char:hover {
          color: #5ec6e7;
          cursor: pointer;
        }
        .dashboard-card.streak-card, .dashboard-card.achievements-card, .dashboard-card.quick-actions-card {
          background: #5ec6e7 !important;
          border: 4px solid #111;
          border-radius: 18px;
          box-shadow: 4px 4px 0 #000;
        }
      `}</style>

      <NameModal open={showModal} onSubmit={handleNameSubmit} />
      <div className="dashboard-container">
        {/* Unified Dashboard Header, Stats, and Weekly Progress */}
        <div className="dashboard-header-progress-merged">
          <div className="dashboard-header-merged-content">
            <h1 className="dashboard-title-merged">{name ? `Welcome, ${name}!` : ''}</h1>
            <p className="dashboard-subtitle-merged">Your Learning Command Center</p>
          </div>
          <div className="dashboard-progress-merged-content">
            <div className="progress-label-merged">
              <span className="card-icon">📈</span>
              <span className="progress-title-merged">WEEKLY PROGRESS</span>
            </div>
            <div className="progress-bar-merged">
              <div 
                className="progress-fill-merged" 
                style={{ width: `${weeklyProgressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-text-merged">
              {formatTime(weeklyProgress)} / {formatTime(weeklyGoal)} ({Math.round(weeklyProgressPercentage)}%)
            </div>
          </div>
          {/* Stats below progress bar */}
          <div className="main-stats-section" style={{ marginTop: 32, marginBottom: 0, justifyContent: 'center' }}>
            <div className="stat-card stat-white">
              <div className="stat-label">Today's Study</div>
              <div className="stat-value">{formatTime(totalStudyTime)}</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-label">Current Streak</div>
              <div className="stat-value">{studyStreak} days</div>
            </div>
            <div className="stat-card stat-teal">
              <div className="stat-label">Best Streak</div>
              <div className="stat-value">{bestStreak} days</div>
            </div>
            <div className="stat-card stat-orange">
              <div className="stat-label">Sessions</div>
              <div className="stat-value">{completedSessions}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="left-column">
            {/* Calendar */}
            <div className="dashboard-card calendar-card">
              <div className="card-header">
                <span className="card-icon">📅</span>
                <h2 className="card-title">Study History</h2>
              </div>
              <Calendar />
            </div>

            {/* Study Session */}
            <div className="session-card">
              <div className="card-header">
                <span className="card-icon">🍅</span>
                <h2 className="card-title">Current Session</h2>
              </div>
              <div className="session-card-content">
                <div className="clock-display">
                  {currentTime.toLocaleTimeString().split('').map((char, idx) => (
                    <span className="clock-char" key={idx}>{char}</span>
                  ))}
                </div>
                <div className="quick-actions">
                  <button className="action-btn" onClick={() => handlePomodoroAction('start')}>Start Pomodoro</button>
                  <button className="action-btn" onClick={() => handlePomodoroAction('break')}>Take Break</button>
                  <button className="action-btn" onClick={() => handlePomodoroAction('end')}>End Session</button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card">
              <div className="card-header">
                <span className="card-icon">📝</span>
                <h2 className="card-title">Recent Activity</h2>
              </div>
              <div className="activity-card-content">
                <ul className="recent-activity">
                  <li className="activity-item">
                    <span className="activity-icon">🍅</span>
                    <span>Completed Pomodoro Session</span>
                    <span className="activity-time">2 min ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-icon">📚</span>
                    <span>Created 5 flashcards</span>
                    <span className="activity-time">15 min ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-icon">🎯</span>
                    <span>Reached daily goal</span>
                    <span className="activity-time">1 hour ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-icon">🏆</span>
                    <span>Earned "Streak Master" badge</span>
                    <span className="activity-time">2 hours ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right-column">
            {/* Study Streak */}
            <div className="dashboard-card streak-card">
              <div className="card-header">
                <span className="card-icon">🔥</span>
                <h2 className="card-title">Study Streak</h2>
              </div>
              <div className="streak-display">
                <span className="streak-icon">🔥</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
                  {studyStreak} Days
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((studyStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {studyStreak}/30 Days Goal
              </div>
            </div>

            {/* Achievements */}
            <div className="dashboard-card achievements-card">
              <div className="card-header">
                <span className="card-icon">🏆</span>
                <h2 className="card-title">Achievements</h2>
              </div>
              <ul className="achievement-list">
                <li className="achievement-item">
                  <span className="achievement-icon">🔥</span>
                  <span>7-Day Streak Master</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">⏱️</span>
                  <span>20+ Hour Learner</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">🎯</span>
                  <span>Goal Crusher</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">📚</span>
                  <span>Flashcard Pro</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card quick-actions-card">
              <div className="card-header">
                <span className="card-icon">⚡</span>
                <h2 className="card-title">Quick Actions</h2>
              </div>
              <div className="quick-actions">
                <button className="action-btn">Start Review</button>
                <button className="action-btn">Create Flashcards</button>
                <button className="action-btn">Study Center</button>
                <button className="action-btn">View Progress</button>
                <button className="action-btn">Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // { day, month, year }
  const [fading, setFading] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null); // clear selection on month change
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null); // clear selection on month change
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate calendar grid
  const calendarRows = [];
  let cells = [];
  // Previous month's days (inactive)
  for (let i = 0; i < firstDay; i++) {
    cells.push(<td key={`empty-start-${i}`} className="inactive"></td>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    const isSelected =
      selectedDate &&
      selectedDate.day === day &&
      selectedDate.month === currentMonth &&
      selectedDate.year === currentYear;
    cells.push(
      <td
        key={day}
        className={
          (isToday ? 'calendar-today ' : '') +
          (isSelected ? ' calendar-selected' : '') +
          (isSelected && fading ? ' calendar-fading' : '')
        }
        onClick={() => {
          if (!isToday) setSelectedDate({ day, month: currentMonth, year: currentYear });
        }}
        style={{ userSelect: 'none' }}
      >
        {day}
      </td>
    );
    if ((cells.length) % 7 === 0 || day === daysInMonth) {
      calendarRows.push(<tr key={`row-${day}`}>{cells}</tr>);
      cells = [];
    }
  }
  // Next month's days (inactive)
  if (cells.length > 0) {
    for (let i = cells.length; i < 7; i++) {
      cells.push(<td key={`empty-end-${i}`} className="inactive"></td>);
    }
    calendarRows.push(<tr key={`row-end`}>{cells}</tr>);
  }

  // Fade out selected date after 3 seconds
  useEffect(() => {
    if (!selectedDate) return;
    setFading(false);
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2500);
    const clearTimer = setTimeout(() => {
      setSelectedDate(null);
      setFading(false);
    }, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(clearTimer);
    };
  }, [selectedDate]);

  return (
    <div className="calendar-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button className="calendar-nav-btn" onClick={handlePrevMonth}>{'<'}</button>
        <span className="calendar-month-label">{monthNames[currentMonth]} {currentYear}</span>
        <button className="calendar-nav-btn" onClick={handleNextMonth}>{'>'}</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarRows}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
