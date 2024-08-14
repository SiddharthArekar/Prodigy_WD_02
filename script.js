// script.js

let isRunning = false;
let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function updateDisplay() {
    const display = document.getElementById('display');
    const totalMilliseconds = Date.now() - startTime + elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    display.textContent = formattedTime;
}

function startStop() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 1000);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = document.getElementById('display').textContent;
        laps.push(lapTime);
        displayLaps();
    }
}

function displayLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
