// Test import of a JavaScript function
// import { example } from './js/example';

// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of styles
import './styles/index.scss';
import Graph from './js/components/graph/Graph';
import Slider from './js/components/slider/Slider';
// import clickTogglerFullScreen from './js/utils/clickTogglerFullScreen';
import List from './js/components/List/List'
import Connector from "./js/components/connector/Connector";
import { URL_STATISTICS } from "./js/components/constants/constants";

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

const date = new Date();
const dateArr = () => [...Array(180)].map((item) => {
  let day = date.getDate() + 1;
  date.setDate(day);
  return date.toLocaleDateString('en-US');
});

const ttt = async () => {
  const connector = new Connector(URL_STATISTICS);
  const data = await connector.getStatistics();
  const list = new List(data.Countries, data.Global)
  list.renderComponent(document.querySelector('#country_list'));
}

ttt()

const generateDataArr = () => [...Array(180)].map((item) => getRandomNumber(180));

const dataObj = {
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
  }
};

// Usage class Graph
const graph = new Graph('.diagram', dataObj).render();
const data = ['Daily Cases', 'Daily Deaths', 'Cumulative Cases', 'Cumulative Deaths', 'Log Cases', 'Cumulative Cases on 100.000', 'Cumulative Deaths on 100.00'];
const slider = new Slider('.diagram', 1, 2).init(data);
const btnFullScreen = document.querySelector('.bnt-full-screen__container');

// Handle click slider item
const clickSliderItemHandler = ({ target }, graph) => {
  //в этом методе обрабатывать переключение графиков (слайдов)
  const menuItems = document.querySelectorAll('.scroll__track div');
  menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
  target.classList.add('active');
  graph.init(target.textContent); // Для Тани - метод перерисовка графика в зависимости от клика по таблице
};

document.querySelector('.scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));

// Handle move in/out graph
document.querySelector('.diagram').addEventListener('mouseenter', () => btnFullScreen.classList.add('active'));
document.querySelector('.diagram').addEventListener('mouseleave', () => btnFullScreen.classList.remove('active'));

//Handle click open/close full screen
btnFullScreen.addEventListener('click', () => {
  // clickTogglerFullScreen();
  const graph = new Graph('.modal', dataObj).render();
  new Slider('.modal', 1, 2).init(data);
  document.querySelector('.modal .scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));
});

// Handle resize screen
window.addEventListener('resize', () => {
  console.log('resize');
  slider.init(data);
  // slider.replaceWith();
  // myChart.resize();
});
