// Test import of a JavaScript function
// import { example } from './js/example';

// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of styles
import './styles/index.scss';
import Graph from './js/components/graph/Graph';
import Slider from './js/components/slider/Slider';


function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function addZero(n) {
  return parseInt(n, 10) < 10 ? `0${n}` : n;
}

const date = new Date();
const dateArr = () => [...Array(90)].map((item) => {
  let day = date.getDate() + 1;
  date.setDate(day);
  return date.toLocaleDateString('en-US');
});

const generateDataArr = () => [...Array(90)].map((item) => getRandomNumber(90));

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
document.querySelector('.diagram').addEventListener('mouseenter', () => document.querySelector('.bnt-full-screen__container').style.display = 'flex');
document.querySelector('.diagram').addEventListener('mouseleave', () => document.querySelector('.bnt-full-screen__container').style.display = 'none');

// Appending to the DOM
// const logo = document.createElement('img');
// logo.src = webpackLogo;

/// /const heading = document.createElement('h1');
// heading.textContent = example();

// const app = document.querySelector('#root');
// app.append(logo, heading);

const a = 1;
console.log(a);
