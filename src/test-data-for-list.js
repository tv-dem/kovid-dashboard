const getRandomNumber = (n) => Math.floor(Math.random() * n);
const generateDataArr = () => [...Array(180)].map(() => getRandomNumber(180));

const date = new Date();
const dateArr = () => [...Array(180)].map(() => {
  const day = date.getDate() + 1;
  date.setDate(day);
  return date.toLocaleDateString('en-US');
});

export const dataObj = {
  'Daily Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 170, 0)',
  },
  'Daily Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
  'Cumulative Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 255, 255)',
  },
  'Log Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Cases on 100.000': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
  'Cumulative Deaths on 100.00': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 170, 0)',
  },
};

export const data = ['Daily Cases', 'Daily Deaths', 'Cumulative Cases', 'Cumulative Deaths', 'Log Cases', 'Cumulative Cases on 100.000', 'Cumulative Deaths on 100.00'];
