import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = Number(refs.delay.value);
  for (let i = 1; i <= Number(refs.amount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    delay += Number(refs.step.value);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position: position, delay: delay});
      } else {
        reject({position: position, delay: delay});
      }
    }, delay);
  });

  return promise;
}