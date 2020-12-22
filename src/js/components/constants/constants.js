export const URL_STATISTICS = 'https://api.covid19api.com/summary';
export const URL_POPULATIONS = 'https://restcountries.eu/rest/v2/all?fields=population;alpha2Code';
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
export const colorCountries = ['rgb(255, 150, 0)', 'rgb(208, 100, 0)', 'rgb(255, 70, 0)', 'rgb(255, 60, 0)', 'rgb(255, 50, 0)', 'rgb(255, 40, 0)', 'rgb(255, 30, 0)', 'rgb(255, 20, 0)', 'rgb(255, 10, 0)', 'rgb(255, 0, 0)'];
export const colorCountriesNew = ['rgb(0, 150, 255)', 'rgb(0, 100, 208)', 'rgb(0, 70, 255)', 'rgb(0, 60, 255)', 'rgb(0, 50, 255)', 'rgb(0, 40, 255)', 'rgb(0, 30, 255)', 'rgb(0, 20, 255)', 'rgb(0, 10, 255)', 'rgb(0, 0, 255)'];
