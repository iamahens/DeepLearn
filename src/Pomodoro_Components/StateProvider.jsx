import React, { createContext, useEffect, useState } from 'react'
export const StateContext = createContext();

const StateProvider = ({ children }) => {

  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds 
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [longBreakTime, setLongBreakTime] = useState(15 * 60); // 15 minutes in seconds

  const [initTime, setInitTime] = useState(0); // Initial time for the timer
  // State for active tag, progress, time, and isActive
  const [activeTag, setActiveTag] = useState(0);
  const [progress, setProgress] = useState(25);
  const [time, setTime] = useState(500);
  const [isActive, setIsActive] = useState(false);

  const [completedSessions, setCompletedSessions] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Increase cycle every time 4 sessions are completed
    if (completedSessions > 0 && completedSessions % 4 === 0) {
      setCycle(prev => prev + 1);
    }
  }, [completedSessions]);




  useEffect(() => {

    switch (activeTag) {


      case 0: // Work
        setTime(workTime);
        setInitTime(workTime);
        break;

      case 1: // Short Break
        setTime(shortBreakTime);
        setInitTime(shortBreakTime);
        break;

      case 2: // Long Break
        setTime(longBreakTime);
        setInitTime(longBreakTime);
        break;
    }
  }, [activeTag, workTime, shortBreakTime, longBreakTime]);
  return (
    <StateContext.Provider value={{ activeTag, setActiveTag, progress, setProgress, time, setTime, isActive, setIsActive, initTime, setInitTime, workTime, setWorkTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, completedSessions, setCompletedSessions, cycle, setCycle }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
