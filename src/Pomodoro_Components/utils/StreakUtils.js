// src/utils/streakUtils.js
export const updateStreak = () => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const lastDate = localStorage.getItem("lastFocusDate");
  let streak = parseInt(localStorage.getItem("focusStreak")) || 0;

  if (lastDate === today) return streak;
  if (lastDate === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem("focusStreak", streak);
  localStorage.setItem("lastFocusDate", today);

  return streak;
};
