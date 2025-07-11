// StudyQuest - Study Management App
class StudyQuestApp {
    constructor() {
        this.currentDate = new Date();
        this.studySessionActive = false;
        this.studySessionStartTime = null;
        this.studySessionPaused = false;
        this.timerInterval = null;
        this.sessionTime = 0;
        
        this.achievements = [
            {
                id: 'first-session',
                title: 'First Steps',
                description: 'Complete your first study session',
                icon: '🌱',
                target: 1,
                type: 'sessions'
            },
            {
                id: 'week-warrior',
                title: 'Week Warrior',
                description: 'Study for 7 consecutive days',
                icon: '⚔️',
                target: 7,
                type: 'streak'
            },
            {
                id: 'study-machine',
                title: 'Study Machine',
                description: 'Complete 10 study sessions',
                icon: '🤖',
                target: 10,
                type: 'sessions'
            },
            {
                id: 'time-master',
                title: 'Time Master',
                description: 'Study for 5 hours total',
                icon: '⏰',
                target: 300,
                type: 'minutes'
            },
            {
                id: 'dedication',
                title: 'Dedication',
                description: 'Maintain a 14-day streak',
                icon: '🔥',
                target: 14,
                type: 'streak'
            },
            {
                id: 'scholar',
                title: 'Scholar',
                description: 'Complete 25 study sessions',
                icon: '🎓',
                target: 25,
                type: 'sessions'
            },
            {
                id: 'marathon',
                title: 'Marathon Learner',
                description: 'Study for 20 hours total',
                icon: '🏃‍♂️',
                target: 1200,
                type: 'minutes'
            },
            {
                id: 'legend',
                title: 'Legend',
                description: 'Maintain a 30-day streak',
                icon: '👑',
                target: 30,
                type: 'streak'
            }
        ];
        
        this.init();
    }
    
    init() {
        // Check if user exists
        const userData = this.getUserData();
        if (!userData.name) {
            this.showWelcomeModal();
        } else {
            this.loadUser();
        }
        
        this.setupEventListeners();
        this.generateCalendar();
        this.renderAchievements();
        this.updateStats();
        this.updateXPDisplay();
    }
    
    setupEventListeners() {
        // Enter key for name input
        document.getElementById('nameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startAdventure();
            }
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            const welcomeModal = document.getElementById('welcomeModal');
            const studyModal = document.getElementById('studyModal');
            if (e.target === welcomeModal) {
                // Don't close welcome modal by clicking outside - force user to enter name
            }
            if (e.target === studyModal) {
                this.closeStudyModal();
            }
        });
    }
    
    getUserData() {
        const defaultData = {
            name: '',
            xp: 0,
            level: 1,
            totalSessions: 0,
            totalMinutes: 0,
            currentStreak: 0,
            bestStreak: 0,
            lastStudyDate: null,
            studyHistory: {},
            achievementsUnlocked: [],
            joinDate: new Date().toISOString()
        };
        
        const saved = localStorage.getItem('studyquest-data');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }
    
    saveUserData(data) {
        localStorage.setItem('studyquest-data', JSON.stringify(data));
    }
    
    showWelcomeModal() {
        document.getElementById('welcomeModal').style.display = 'block';
        document.getElementById('nameInput').focus();
    }
    
    loadUser() {
        const userData = this.getUserData();
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('welcomeMessage').textContent = `Welcome back, ${userData.name}!`;
        this.updateXPDisplay();
        this.updateStats();
    }
    
    calculateLevel(xp) {
        return Math.floor(Math.sqrt(xp / 10)) + 1;
    }
    
    calculateXPForLevel(level) {
        return (level - 1) * (level - 1) * 10;
    }
    
    updateXPDisplay() {
        const userData = this.getUserData();
        const level = this.calculateLevel(userData.xp);
        const currentLevelXP = this.calculateXPForLevel(level);
        const nextLevelXP = this.calculateXPForLevel(level + 1);
        const progressXP = userData.xp - currentLevelXP;
        const neededXP = nextLevelXP - currentLevelXP;
        const progressPercent = (progressXP / neededXP) * 100;
        
        document.getElementById('userLevel').textContent = level;
        document.getElementById('currentXP').textContent = userData.xp;
        document.getElementById('nextLevelXP').textContent = nextLevelXP;
        document.getElementById('xpFill').style.width = progressPercent + '%';
        
        // Update level if changed
        if (level !== userData.level) {
            userData.level = level;
            this.saveUserData(userData);
            this.showLevelUpNotification(level);
        }
    }
    
    showLevelUpNotification(level) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.innerHTML = `🎉 Level Up! You're now level ${level}! 🎉`;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #f39c12, #e67e22);
            color: white;
            padding: 20px;
            border-radius: 15px;
            border: 3px solid white;
            font-family: 'Press Start 2P', monospace;
            font-size: 14px;
            text-align: center;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: bounce 0.6s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    addXP(amount) {
        const userData = this.getUserData();
        userData.xp += amount;
        this.saveUserData(userData);
        this.updateXPDisplay();
    }
    
    generateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Get user data for study history
        const userData = this.getUserData();
        
        // Clear calendar grid
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
            dayElement.textContent = prevMonthDay.getDate();
            calendarGrid.appendChild(dayElement);
        }
        
        // Add days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const studyMinutes = userData.studyHistory[dateKey] || 0;
            
            // Apply study intensity class
            if (studyMinutes === 0) {
                dayElement.classList.add('no-study');
            } else if (studyMinutes < 30) {
                dayElement.classList.add('light-study');
            } else if (studyMinutes < 60) {
                dayElement.classList.add('medium-study');
            } else {
                dayElement.classList.add('heavy-study');
            }
            
            // Mark today
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Add click event for day details
            dayElement.addEventListener('click', () => {
                this.showDayDetails(dateKey, studyMinutes);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add empty cells for days after the last day of the month
        const totalCells = calendarGrid.children.length;
        const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42 cells
        
        for (let i = 1; i <= remainingCells && totalCells + i <= 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.textContent = i;
            calendarGrid.appendChild(dayElement);
        }
    }
    
    showDayDetails(dateKey, studyMinutes) {
        const formattedDate = new Date(dateKey).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const message = studyMinutes > 0 
            ? `${formattedDate}\n\nStudy time: ${studyMinutes} minutes\nGreat job! 🎉`
            : `${formattedDate}\n\nNo study recorded for this day.\nStart studying to build your streak! 💪`;
            
        alert(message);
    }
    
    renderAchievements() {
        const userData = this.getUserData();
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = 'achievement-card';
            
            let currentProgress = 0;
            let progressPercent = 0;
            let isUnlocked = userData.achievementsUnlocked.includes(achievement.id);
            
            // Calculate progress based on achievement type
            switch (achievement.type) {
                case 'sessions':
                    currentProgress = userData.totalSessions;
                    break;
                case 'streak':
                    currentProgress = Math.max(userData.currentStreak, userData.bestStreak);
                    break;
                case 'minutes':
                    currentProgress = userData.totalMinutes;
                    break;
            }
            
            progressPercent = Math.min((currentProgress / achievement.target) * 100, 100);
            
            if (!isUnlocked && progressPercent >= 100) {
                // Unlock achievement
                userData.achievementsUnlocked.push(achievement.id);
                this.saveUserData(userData);
                isUnlocked = true;
                this.showAchievementUnlocked(achievement);
                this.addXP(50); // Bonus XP for achievements
            }
            
            if (!isUnlocked) {
                achievementCard.classList.add('locked');
            }
            
            achievementCard.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-progress">
                    <div class="achievement-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div style="font-size: 8px; color: #ecf0f1; margin-top: 5px;">
                    ${Math.min(currentProgress, achievement.target)}/${achievement.target}
                </div>
            `;
            
            achievementsGrid.appendChild(achievementCard);
        });
    }
    
    showAchievementUnlocked(achievement) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 10px;">${achievement.icon}</div>
            <div style="font-size: 14px; margin-bottom: 5px;">Achievement Unlocked!</div>
            <div style="font-size: 12px;">${achievement.title}</div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #2ecc71, #27ae60);
            color: white;
            padding: 25px;
            border-radius: 15px;
            border: 3px solid white;
            font-family: 'Press Start 2P', monospace;
            text-align: center;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: bounce 0.6s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 4000);
    }
    
    updateStats() {
        const userData = this.getUserData();
        
        // Calculate today's study time
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const todayMinutes = userData.studyHistory[todayKey] || 0;
        
        document.getElementById('todayStudyTime').textContent = `${todayMinutes} min`;
        document.getElementById('currentStreak').textContent = `${userData.currentStreak} days`;
        document.getElementById('bestStreak').textContent = `${userData.bestStreak} days`;
        document.getElementById('totalSessions').textContent = userData.totalSessions;
    }
    
    calculateStreak() {
        const userData = this.getUserData();
        const today = new Date();
        let streak = 0;
        let checkDate = new Date(today);
        
        // Check if studied today, if not start from yesterday
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        if (!userData.studyHistory[todayKey]) {
            checkDate.setDate(checkDate.getDate() - 1);
        }
        
        // Count consecutive days with study sessions
        while (true) {
            const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
            
            if (userData.studyHistory[dateKey] && userData.studyHistory[dateKey] > 0) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    startStudySession() {
        if (this.studySessionActive) {
            alert('Study session already in progress!');
            return;
        }
        
        this.studySessionActive = true;
        this.studySessionStartTime = new Date();
        this.sessionTime = 0;
        this.studySessionPaused = false;
        
        document.getElementById('studyModal').style.display = 'block';
        document.querySelector('.study-btn').classList.add('active');
        
        this.startTimer();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.studySessionPaused) {
                this.sessionTime++;
                this.updateTimerDisplay();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.sessionTime / 60);
        const seconds = this.sessionTime % 60;
        document.getElementById('timerDisplay').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    pauseStudySession() {
        this.studySessionPaused = !this.studySessionPaused;
        const pauseBtn = document.querySelector('.session-controls button');
        pauseBtn.textContent = this.studySessionPaused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    stopStudySession() {
        if (!this.studySessionActive) return;
        
        const sessionMinutes = Math.ceil(this.sessionTime / 60);
        
        if (sessionMinutes < 1) {
            alert('Study for at least 1 minute to count as a session!');
            return;
        }
        
        this.completeStudySession(sessionMinutes);
    }
    
    completeStudySession(minutes = null) {
        if (!this.studySessionActive && minutes === null) {
            // Quick complete button
            const sessionMinutes = parseInt(prompt('How many minutes did you study?', '25'));
            if (!sessionMinutes || sessionMinutes < 1) {
                alert('Please enter a valid number of minutes!');
                return;
            }
            minutes = sessionMinutes;
        } else if (this.studySessionActive) {
            minutes = minutes || Math.ceil(this.sessionTime / 60);
        }
        
        if (minutes < 1) {
            alert('Study session must be at least 1 minute!');
            return;
        }
        
        // Update user data
        const userData = this.getUserData();
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        // Add to study history
        userData.studyHistory[todayKey] = (userData.studyHistory[todayKey] || 0) + minutes;
        userData.totalSessions++;
        userData.totalMinutes += minutes;
        userData.lastStudyDate = todayKey;
        
        // Calculate streak
        userData.currentStreak = this.calculateStreak();
        if (userData.currentStreak > userData.bestStreak) {
            userData.bestStreak = userData.currentStreak;
        }
        
        // Add XP based on minutes studied
        const xpGained = Math.floor(minutes / 5) + 10; // 1 XP per 5 minutes + 10 base XP
        userData.xp += xpGained;
        
        this.saveUserData(userData);
        
        // Reset session state
        this.studySessionActive = false;
        this.studySessionPaused = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Update UI
        this.closeStudyModal();
        this.generateCalendar();
        this.updateStats();
        this.updateXPDisplay();
        this.renderAchievements();
        
        // Show completion message
        this.showSessionComplete(minutes, xpGained);
    }
    
    showSessionComplete(minutes, xpGained) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 10px;">🎉</div>
            <div style="font-size: 14px; margin-bottom: 10px;">Session Complete!</div>
            <div style="font-size: 10px; margin-bottom: 5px;">${minutes} minutes studied</div>
            <div style="font-size: 10px;">+${xpGained} XP gained!</div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #9b59b6, #8e44ad);
            color: white;
            padding: 25px;
            border-radius: 15px;
            border: 3px solid white;
            font-family: 'Press Start 2P', monospace;
            text-align: center;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: bounce 0.6s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
    
    closeStudyModal() {
        document.getElementById('studyModal').style.display = 'none';
        document.querySelector('.study-btn').classList.remove('active');
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.generateCalendar();
    }
    
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.generateCalendar();
    }
    
    logout() {
        if (confirm('Are you sure you want to logout? This will clear all your data!')) {
            localStorage.removeItem('studyquest-data');
            location.reload();
        }
    }
}

// Global functions for HTML onclick events
function startAdventure() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter your name!');
        nameInput.focus();
        return;
    }
    
    if (name.length > 20) {
        alert('Name must be 20 characters or less!');
        nameInput.focus();
        return;
    }
    
    // Save user data
    const userData = app.getUserData();
    userData.name = name;
    app.saveUserData(userData);
    
    // Hide modal and load user
    document.getElementById('welcomeModal').style.display = 'none';
    app.loadUser();
}

function startStudySession() {
    app.startStudySession();
}

function completeStudySession() {
    app.completeStudySession();
}

function pauseStudySession() {
    app.pauseStudySession();
}

function stopStudySession() {
    app.stopStudySession();
}

function previousMonth() {
    app.previousMonth();
}

function nextMonth() {
    app.nextMonth();
}

function logout() {
    app.logout();
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StudyQuestApp();
});