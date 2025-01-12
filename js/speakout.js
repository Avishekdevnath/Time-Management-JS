const startBtn = document.getElementById('start-speakout');
const stopBtn = document.getElementById('stop-speakout');
const intervalInput = document.getElementById('speakout-interval'); // Input for interval in minutes

let speakoutInterval;

function startSpeakout() {
    const intervalMinutes = parseInt(intervalInput.value);
    if (!intervalMinutes || intervalMinutes <= 0) {
        alert('Please enter a valid interval in minutes.');
        return;
    }

    speakTime(); // Speak the time immediately
    speakoutInterval = setInterval(() => {
        speakTime();
    }, intervalMinutes * 60000); // Convert minutes to milliseconds

    startBtn.disabled = true;
    stopBtn.style.display = 'inline-block';
}

function stopSpeakout() {
    clearInterval(speakoutInterval);
    startBtn.disabled = false;
    stopBtn.style.display = 'none';
}

function speakTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    const message = `The current time is ${formattedTime}.`;
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

// Event listeners
startBtn.addEventListener('click', startSpeakout);
stopBtn.addEventListener('click', stopSpeakout);
