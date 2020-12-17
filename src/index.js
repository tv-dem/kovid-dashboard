// Test import of a JavaScript function
// import { example } from './js/example';

// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of styles
import './styles/index.scss';
import Graph from './js/components/graph/Graph';
import Slider from './js/components/slider/Slider';

// Usage class Graph
const graph = new Graph('.diagram').render();
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
