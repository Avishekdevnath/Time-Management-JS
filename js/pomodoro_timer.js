// Pomodoro Timer Implementation
const startBtn = document.getElementById('start-pomodoro');
const pauseBtn = document.getElementById('pause-pomodoro');
const resetBtn = document.getElementById('reset-pomodoro');
const setBtn = document.getElementById('set-pomodoro');
const stopSoundBtn = document.getElementById('stop-sound'); // Stop sound button
const timerDisplay = document.getElementById('pomodoro-timer');
const durationInput = document.getElementById('pomodoro-duration');
const taskInput = document.getElementById('pomodoro-task');
const successMessage = document.createElement('p'); // Success message element
successMessage.id = 'success-message';
const alarmSound = new Audio('../assets/alarm.mp3'); // Path to your alarm sound

let pomodoroInterval;
let duration = 25 * 60 * 1000; // Default 25 minutes in milliseconds
let timeLeft = duration;
let isPaused = false;
let isRunning = false;
let currentTask = '';
let startTime;

// Enable looping for the alarm sound
alarmSound.loop = true;

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(timeLeft % 1000).padStart(3, '0');
    timerDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function setPomodoro() {
    const customMinutes = parseInt(durationInput.value);
    currentTask = taskInput.value.trim();

    if (customMinutes && customMinutes > 0 && customMinutes <= 60) {
        duration = customMinutes * 60 * 1000;
        timeLeft = duration;
        updateTimerDisplay();
        if (currentTask) {
            const taskDisplay = document.getElementById('current-task');
            taskDisplay.textContent = `${currentTask}`;
            taskDisplay.style.display = 'block';
        } else {
            document.getElementById('current-task').style.display = 'none';
        }
        successMessage.style.display = 'none'; // Hide success message on new set
    } else {
        alert('Please enter a valid number between 1 and 60.');
    }
}

function startPomodoro() {
    if (isRunning) return;
    isPaused = false;
    isRunning = true;
    startTime = Date.now();

    pomodoroInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        timeLeft = duration - elapsed;

        if (timeLeft > 0) {
            updateTimerDisplay();
        } else {
            clearInterval(pomodoroInterval);
            isRunning = false;
            timeLeft = 0;
            updateTimerDisplay();
            playAlarmSound(); // Play the alarm sound
            showSuccessMessage();
        }
    }, 10);
}

function playAlarmSound() {
    alarmSound.play().catch((error) => {
        console.error('Error playing sound:', error);
    });
    stopSoundBtn.style.display = 'inline-block'; // Show the Stop Sound button
}

function showSuccessMessage() {
    successMessage.innerHTML = `Pomodoro session ended!<br/>${currentTask ? 'Task: ' + currentTask : ''}`;

    successMessage.style.color = 'green';
    document.querySelector('.pomodoro-timer-display').appendChild(successMessage);
    successMessage.style.display = 'block';
}

function pausePomodoro() {
    if (!isRunning) return;
    isPaused = true;
    isRunning = false;
    clearInterval(pomodoroInterval);
    duration = timeLeft;
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    timeLeft = 25 * 60 * 1000;
    durationInput.value = '';
    taskInput.value = '';
    updateTimerDisplay();
    isPaused = false;
    isRunning = false;
    currentTask = '';
    document.getElementById('current-task').style.display = 'none';
    stopAlarmSound(); // Stop sound if playing
    successMessage.style.display = 'none'; // Hide success message on reset
}

function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset playback position
    stopSoundBtn.style.display = 'none'; // Hide the Stop Sound button
}

setBtn.addEventListener('click', setPomodoro);
startBtn.addEventListener('click', startPomodoro);
pauseBtn.addEventListener('click', pausePomodoro);
resetBtn.addEventListener('click', resetPomodoro);
stopSoundBtn.addEventListener('click', stopAlarmSound); // Add event listener for Stop Sound button

// Initialize the timer display
updateTimerDisplay();
