const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

let intervalID = null;
const INTERVAL = 1000;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
    intervalID = setInterval(() => {
        const currentColor = getRandomHexColor();
        refs.body.style.backgroundColor = currentColor;
    }, INTERVAL);
    refs.startBtn.removeEventListener('click', onStartBtnClick);
}

function onStopBtnClick() {
    clearInterval(intervalID);
    refs.startBtn.addEventListener('click', onStartBtnClick);
}