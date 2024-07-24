let startTime;
let updatedTime;
let difference;
let interval;
let isRunning = false;
let lapCounter = 0;
let lapsContainer = document.getElementById('laps');

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00.000';
    difference = 0;
    isRunning = false;
    lapCounter = 0;
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;

    display.textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds);
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        let lapTime = document.createElement('div');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
