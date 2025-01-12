const stopwatchDisplay = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('start-stopwatch');
const lapBtn = document.getElementById('lap-stopwatch');
const stopBtn = document.getElementById('stop-stopwatch');
const resetBtn = document.getElementById('reset-stopwatch');
const lapList = document.getElementById('lap-list');

let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval;

function formatTime(ms) {
    const milliseconds = ms % 1000;
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 60000) % 60);
    const hours = Math.floor(ms / 3600000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    toggleButtons('start');
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    toggleButtons('stop');
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    stopwatchDisplay.textContent = '00:00:00.000';
    lapList.innerHTML = '';
    toggleButtons('reset');
}

function lapStopwatch() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapItem);
}

function toggleButtons(state) {
    switch (state) {
        case 'start':
            startBtn.disabled = true;
            lapBtn.disabled = false;
            stopBtn.disabled = false;
            resetBtn.disabled = false;
            break;
        case 'stop':
            startBtn.disabled = false;
            lapBtn.disabled = true;
            stopBtn.disabled = true;
            resetBtn.disabled = false;
            break;
        case 'reset':
            startBtn.disabled = false;
            lapBtn.disabled = true;
            stopBtn.disabled = true;
            resetBtn.disabled = true;
            break;
    }
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initialize stopwatch display
stopwatchDisplay.textContent = '00:00:00.000';
toggleButtons('reset');
