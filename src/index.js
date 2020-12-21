import './styles/index.scss';

// import './js/components/statisticsView/statisticsBlock';
import StatisticsView from './js/components/statisticsView/StatisticsView';

import List from './js/components/List/List';

import Connector from './js/components/connector/Connector';
import { URL_STATISTICS, URL_FLAGS_POPULATION } from './js/components/constants/constants';

const init = async () => {
  const data = await Connector.getStatistics(URL_STATISTICS);
  const dataPopulation = await Connector.getStatistics(URL_FLAGS_POPULATION);
  const list = new List(data.Countries, data.Global);
  list.renderComponent(document.querySelector('#country_list'));

  // StatisticsView
  const blockStatistics = new StatisticsView(data.Global);
  blockStatistics.init();


};

init();
