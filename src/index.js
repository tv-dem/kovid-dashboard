// Test import of a JavaScript function
// import { example } from './js/example';

// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of styles
import './styles/index.scss';
import Graph from './js/components/graph/Graph';
import moment from 'moment';
import Slider from './js/components/slider/Slider';
import clickSliderItemHandler from './js/utils/clickSliderItemHandler';
import createFullScreenPopUp from './js/utils/createFullScreenPopUp';
import List from './js/components/List/List';
import Connector from "./js/components/connector/Connector";
import { URL_STATISTICS } from "./js/components/constants/constants";

// const ttt = async () => {
//   const connector = new Connector();
//   const data = await connector.getURL(URL_STATISTICS).getStatistics();
//   console.log(data);
//   const list = new List(data.Countries, data.Global)
//   list.renderComponent(document.querySelector('#country_list'));
// }

// ttt()

const dataObj = {
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

const sliderItemKeys = ['Daily Cases', 'Daily Deaths', 'Recovered Cases', 'Cumulative Cases on 100.000', 'Cumulative Deaths on 100.000', 'Cumulative Recovered on 100.000'];
let fullScreenSlider = null;

const getDataChart = async (countryId = 'US') => {
  const diseaseURL = `https://disease.sh/v3/covid-19/historical/${countryId}?lastdays=365`;
  const populationURL = `https://restcountries.eu/rest/v2/${'alpha/' + countryId}?fields=name;population`;
  const connector = new Connector();
  // Get data daily
  const dataDaily = await connector.getURL(diseaseURL).getStatistics();

  //Get population
  const countPopulation = await connector.getURL(populationURL).getStatistics();

  // Pass data to dataObj
  const dataKeyDaily = ['Daily Cases', 'Daily Deaths', 'Recovered Cases'];
  const dataKeyResponse = ['cases', 'deaths', 'recovered', 'Daily Cases', 'Daily Deaths', 'Recovered Cases'];
  dataKeyDaily.forEach((dataKey, i) => {
    dataObj[dataKey].labels = Object.keys(dataDaily.timeline[dataKeyResponse[i]])
      .map((dateValue) => moment(dateValue, 'MM-DD-YY'));
    dataObj[dataKey].data = Object.values(dataDaily.timeline[dataKeyResponse[i]]);
    dataObj[dataKey].country = dataDaily.country;
  });

  const dataKeyPercetage = ['Cumulative Cases on 100.000', 'Cumulative Deaths on 100.000', 'Cumulative Recovered on 100.000'];
  dataKeyPercetage.forEach((dataKey, i) => {
    dataObj[dataKey].labels = dataObj[dataKeyResponse[i + 3]].labels;
    dataObj[dataKey].data = (dataObj[dataKeyResponse[i + 3]].data)
      .map((dataValue) => Math.trunc((dataValue * 100000) / countPopulation.population));
    dataObj[dataKey].country = dataObj[dataKeyResponse[i + 3]].country;
  });

  // Usage class Graph
  const graph = new Graph('.diagram', dataObj).render();
  const slider = new Slider('.diagram', 1, 2).init(sliderItemKeys);

  // Handle click slider item
  document.querySelector('.scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));

  const btnFullScreen = document.querySelector('.js-graph');

  // Handle move in/out graph
  document.querySelector('.diagram').addEventListener('mouseenter', () => btnFullScreen.classList.add('active'));
  document.querySelector('.diagram').addEventListener('mouseleave', () => btnFullScreen.classList.remove('active'));

  //Handle click open full screen
  btnFullScreen.addEventListener('click', () => {
    createFullScreenPopUp();
    const graph = new Graph('.modal', dataObj).render();
    fullScreenSlider = new Slider('.modal', 1, 2).init(sliderItemKeys);
    document.querySelector('.modal .scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));

    const btnCloseModal = document.querySelector('.modal__container .js-graph');
    btnCloseModal.querySelector('img').src = '../public/close-button.svg';

    // Handle move in/out graph
    document.querySelector('.modal').addEventListener('mouseenter', () => btnCloseModal.classList.add('active'));
    document.querySelector('.modal').addEventListener('mouseleave', () => btnCloseModal.classList.remove('active'));

    // Handle close button
    btnCloseModal.addEventListener('click', () => document.querySelector('.modal__container').remove());
  });

  // Handle resize screen
  window.addEventListener('resize', () => {
    slider.init(sliderItemKeys);
    fullScreenSlider.init(sliderItemKeys);
  });
};

getDataChart('US');
