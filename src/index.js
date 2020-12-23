import './styles/index.scss';
import Connector from './js/components/connector/Connector';
import Map from './js/components/map/Map';
import Graph from './js/components/graph/graph';
import Slider from './js/components/slider/Slider';
import List from './js/components/List/List';
import StatisticsView from './js/components/statisticsView/StatisticsView';
import EventEmitter from './js/utils/EventEmitter';
import {
  URL_STATISTICS,
  URL_FLAGS_POPULATION,
  URL_POPULATIONS,
  sliderItemKeys,
} from './js/components/constants/constants';

import mapperDataForChart from './js/utils/mapDataForChart';

export const map = new Map();
export const graph = new Graph();
export const list = new List();
export const statistics = new StatisticsView();
export const Emitter = new EventEmitter(map, list, graph, statistics);

export const getDataForChart = async (country) => {
  const { dataDaily, countPopulation } = await Connector.getDataforChart(country);
  const data = mapperDataForChart(dataDaily, countPopulation, country);

  return data;
};

const main = async () => {
  const data = await Connector.getData(URL_STATISTICS);
  const population = await Connector.getData(URL_POPULATIONS);
  const populationFlags = await Connector.getData(URL_FLAGS_POPULATION);

  const dataForChart = await getDataForChart('all');

  map.init(data, population);
  graph.init('.diagram', dataForChart);
  list.init(data.Countries, data.Global);
  statistics.init(data.Global, data.Countries, populationFlags);

  const slider = new Slider('.diagram', 1, 2).init(sliderItemKeys);
  list.renderComponent(document.querySelector('#country_list'));

  window.addEventListener('resize', () => {
    slider.init(sliderItemKeys);
  });
};

main();

document.querySelector('.author:nth-of-type(2)').addEventListener('click', () => new Audio('../public/meow.mp3').play());
