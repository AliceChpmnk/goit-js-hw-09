import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer {
    constructor({ input, startBtn, days, hours, minutes, seconds }) {
        this.input = input;
        this.startBtn = startBtn;
        this.intervalID = null;
        this.deadline = new Date();
        this.isActive = false;
        this.timerDays = days;
        this.timerHours = hours;
        this.timerMinutes = minutes;
        this.timerSeconds = seconds;
    }

    start() {
        if (this.isActive) {
                return;
        }
        this.isActive = true;
        this.input.disabled = true;
        this.startBtn.disabled = true;
        this.intervalID = setInterval(() => {
            const diff = this.deadline - Date.now();

            if (diff <= 0) {
                this.stop();
                return;
            }

            const { days, hours, minutes, seconds } = this.convertMs(diff);
            this.timerDays.textContent = this.addLeadingZero(days);
            this.timerHours.textContent = this.addLeadingZero(hours);
            this.timerMinutes.textContent = this.addLeadingZero(minutes);
            this.timerSeconds.textContent = this.addLeadingZero(seconds);
        }, 1000
        );
    }

    stop() {
        clearInterval(this.intervalID);
        this.isActive = false;
        this.input.disabled = false;
        this.startBtn.disabled = false;
    }

    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
    }
    
    addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
}

const refs = {
    datepickr: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    timerEl: document.querySelector(".timer"),
    timerFieldsEl: document.querySelectorAll(".field"),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      checkDate(selectedDates[0]);
  },
};

const timer = new Timer({ input: refs.datepickr, startBtn:refs.startBtn, days: refs.days, hours: refs.hours, minutes: refs.minutes, seconds: refs.seconds });

refs.startBtn.disabled = true;
flatpickr(refs.datepickr, options);

refs.startBtn.addEventListener('click', (() => { timer.start(); }));

refs.timerEl.style.display = "flex";

refs.timerFieldsEl.forEach((el) => {
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    el.style.padding = "30px";
    el.style.fontSize = "30px";
})

function checkDate(date) {
    if ((date - Date.now()) < 0) {
        Notify.failure('Please choose a date in the future');
        return;
    }

    refs.startBtn.disabled = false;
    timer.deadline = date;
}