let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        running = true;
        paused = false;
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
        savedTime = difference;
    }
}

function pause() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
        running = false;
        savedTime = difference;
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    savedTime = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = difference % 1000;

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    if (running || paused) {
        const lapTime = document.createElement('div');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}
