let StartTime;
let timerInterval;
let running = false;
let lapTimes = [];

function StartStop(){
    if(!running){
        StartTimer();
        document.getElementById('Start_Stop').textContent='Stop';
        document.getElementById('Start_Stop').classList.add('stop');
        document.getElementById('Lap_Reset').textContent='Lap';
    }
    else{
        StopTimer();
        document.getElementById('Start_Stop').textContent='Start';
        document.getElementById('Start_Stop').classList.remove('stop');
        document.getElementById('Lap_Reset').textContent='Reset';
    }
    running=!running;
}

function StartTimer(){
    if(!running){
        if(StartTime===undefined){
            StartTime = Date.now();
        }
        else{
            let currentTime = Date.now();
            let pausedTime = currentTime-StartTime;
            StartTime = currentTime - pausedTime;
        }
        timerInterval = setInterval(updateTimer, 10);
    }
}

function StopTimer(){
    clearInterval(timerInterval);
}

function updateTimer(){
    let elapsedTime = Date.now() - StartTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById('timer').textContent = formattedTime;
}

function formatTime(milliseconds){
    let date = new Date(milliseconds);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

function resetTimer() {
    StopTimer();
    StartTime = undefined;
    lapTimes = [];
    document.getElementById('timer').textContent = '00:00:00.000'; // Reset timer display
    document.getElementById('lap_items').innerHTML = ''; // Clear lap times display
  }
function LapReset() {
    if (running) {
      addLap();
    } else {
      resetTimer();
    }
  }

  function addLap() {
    let elapsedTime = Date.now() - StartTime;
    let formattedTime = formatTime(elapsedTime);
    lapTimes.push(elapsedTime);
    let lapList = document.getElementById('lap_items');
    let newItem = document.createElement('li');
    newItem.textContent = formattedTime;
    lapList.prepend(newItem);
  }