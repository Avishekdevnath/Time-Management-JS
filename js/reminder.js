const addReminderBtn = document.getElementById('add-reminder');
const reminderInput = document.getElementById('reminder-input');
const reminderTimeInput = document.getElementById('reminder-time');
const reminderList = document.getElementById('reminder-list');
const alarmSound = new Audio('../assets/alarm.mp3'); // Path to your alarm sound
alarmSound.loop = true; // Enable looping for the alarm sound

let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

function addReminder() {
    const reminderText = reminderInput.value.trim();
    const reminderTime = reminderTimeInput.value;

    if (!reminderText || !reminderTime) {
        alert('Please enter both a reminder and a time.');
        return;
    }

    const reminder = {
        text: reminderText,
        time: new Date(reminderTime).getTime(),
    };

    reminders.push(reminder);
    saveReminders();
    displayReminders();
    reminderInput.value = '';
    reminderTimeInput.value = '';
}

function displayReminders() {
    reminderList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${reminder.text} - ${new Date(reminder.time).toLocaleString()}</span>
            <button onclick="removeReminder(${index})">Remove</button>
        `;
        reminderList.appendChild(listItem);
    });
}

function removeReminder(index) {
    reminders.splice(index, 1);
    saveReminders();
    displayReminders();
}

function saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function checkReminders() {
    const now = Date.now();
    reminders.forEach((reminder, index) => {
        if (reminder.time <= now) {
            playAlarmSound(reminder.text);
            reminders.splice(index, 1);
            saveReminders();
            displayReminders();
        }
    });
}

function playAlarmSound(reminderText) {
    alarmSound.play().catch((error) => {
        console.error('Error playing sound:', error);
    });
    const stopSoundBtn = document.createElement('button');
    stopSoundBtn.textContent = 'Stop Sound';
    stopSoundBtn.id = 'stop-sound';
    stopSoundBtn.style.marginTop = '10px';
    stopSoundBtn.addEventListener('click', stopAlarmSound);
    document.body.appendChild(stopSoundBtn);

    const successMessage = document.createElement('p');
    successMessage.textContent = `Reminder: ${reminderText}`;
    successMessage.style.color = 'green';
    document.querySelector('main').appendChild(successMessage);
}

function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset playback position
    const stopSoundBtn = document.getElementById('stop-sound');
    if (stopSoundBtn) stopSoundBtn.remove(); // Remove the Stop Sound button
}

// Check reminders every minute
setInterval(checkReminders, 60000);

addReminderBtn.addEventListener('click', addReminder);

// Display reminders on page load
displayReminders();
