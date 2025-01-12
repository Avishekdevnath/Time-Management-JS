const clockDisplay = document.getElementById('digital-clock');
const toggleFormatBtn = document.getElementById('toggle-format');

let is24HourFormat = false;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amPm = '';

    if (!is24HourFormat) {
        amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
    }

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    clockDisplay.innerHTML = `${hours}:${minutes}:${seconds} ${amPm}`;
}

function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    toggleFormatBtn.textContent = is24HourFormat
        ? 'Switch to 12-Hour Format'
        : 'Switch to 24-Hour Format';
}

toggleFormatBtn.addEventListener('click', toggleFormat);
function showDate() {
    const dateDisplay = document.getElementById('date-display');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
}

showDate();
// Update clock every second
setInterval(updateClock, 1000);

// Initialize clock display
updateClock();
