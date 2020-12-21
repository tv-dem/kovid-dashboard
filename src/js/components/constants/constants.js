export const URL_STATISTICS = 'https://api.covid19api.com/summary';
export const dataObj = {
  'Daily Cases': {
    labels: [],
    data: [],
    type: 'bar',
    color: 'rgb(255, 170, 0)',
  },
  'Daily Deaths': {
    labels: [],
    data: [],
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
  'Recovered Cases': {
    labels: [],
    data: [],
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Cases on 100.000': {
    labels: [],
    data: [],
    type: 'line',
    color: 'rgb(255, 255, 255)',
  },
  'Cumulative Deaths on 100.000': {
    labels: [],
    data: [],
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Recovered on 100.000': {
    labels: [],
    data: [],
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
};
export const sliderItemKeys = ['Daily Cases', 'Daily Deaths', 'Recovered Cases', 'Cumulative Cases on 100.000', 'Cumulative Deaths on 100.000', 'Cumulative Recovered on 100.000'];
