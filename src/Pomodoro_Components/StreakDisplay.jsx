// src/components/StreakDisplay.jsx
import React, { useEffect, useState } from "react";
import { updateStreak } from "../Pomodoro_Components/utils/StreakUtils";

const StreakDisplay = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(updateStreak());
  }, []);

  return (
    <div>
      <p>🔥 {streak}-day streak</p>
    </div>
  );
};

export default StreakDisplay;
