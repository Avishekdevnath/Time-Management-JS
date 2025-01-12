const alarmTimeInput = document.getElementById('alarm-time');
const alarmDescriptionInput = document.getElementById('alarm-description'); // Added input for alarm description
const setAlarmBtn = document.getElementById('set-alarm');
const stopAlarmBtn = document.getElementById('stop-alarm');
const alarmList = document.getElementById('alarm-list');
const alarmSound = new Audio('../assets/alarm.mp3'); // Path to your alarm sound
alarmSound.loop = true; // Loop the alarm sound

let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

displayAlarms();

// Set a new alarm
function setAlarm() {
    const alarmTime = alarmTimeInput.value;
    const alarmDescription = alarmDescriptionInput.value.trim() || 'No description';

    if (!alarmTime) {
        alert('Please select a valid time for the alarm.');
        return;
    }

    const alarm = {
        time: alarmTime,
        description: alarmDescription,
        id: Date.now(),
    };

    alarms.push(alarm);
    saveAlarms();
    displayAlarms();
    alarmTimeInput.value = '';
    alarmDescriptionInput.value = ''; // Clear description input
}

// Display all alarms
function displayAlarms() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${alarm.time}</strong> - ${alarm.description}
            <button onclick="removeAlarm(${alarm.id})">Remove</button>
        `;
        alarmList.appendChild(listItem);
    });
}

// Remove an alarm
function removeAlarm(id) {
    alarms = alarms.filter((alarm) => alarm.id !== id);
    saveAlarms();
    displayAlarms();
}

// Save alarms to localStorage
function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Check for alarms every second
function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
    ).padStart(2, '0')}`;

    alarms.forEach((alarm) => {
        if (alarm.time === currentTime) {
            playAlarm(alarm.description);
            alarms = alarms.filter((a) => a.id !== alarm.id); // Remove the triggered alarm
            saveAlarms();
            displayAlarms();
        }
    });
}

// Play the alarm sound
function playAlarm(description) {
    alarmSound.play();
    stopAlarmBtn.style.display = 'inline-block';

    const successMessage = document.createElement('p');
    successMessage.textContent = `Alarm: ${description}`;
    successMessage.style.color = 'green';
    document.querySelector('main').appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Stop the alarm sound
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    stopAlarmBtn.style.display = 'none';
}

// Event listeners
setAlarmBtn.addEventListener('click', setAlarm);
stopAlarmBtn.addEventListener('click', stopAlarm);

// Check alarms every second
setInterval(checkAlarms, 1000);
