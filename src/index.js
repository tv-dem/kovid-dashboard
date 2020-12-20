import './styles/index.scss';

// import './js/components/statisticsView/statisticsBlock';
import StatisticsView from './js/components/statisticsView/StatisticsView';

import List from './js/components/List/List';

import Connector from './js/components/connector/Connector';
import { URL_STATISTICS, URL_FLAGS_POPULATION } from './js/components/constants/constants';

const init = async () => {
  const connector = new Connector(URL_STATISTICS);
  const data = await connector.getStatistics();
  const list = new List(data.Countries, data.Global);
  list.renderComponent(document.querySelector('#country_list'));

  const population = new Connector(URL_FLAGS_POPULATION);
  const dataPopulation = await population.getStatistics();

  // StatisticsView
  const blockStatistics = new StatisticsView(data.Global);
  blockStatistics.render();
  const allBtn = document.querySelectorAll('.all_btn');
  const absoluteBtn = document.querySelectorAll('.absolute_btn');
  const imgWorldBtn = document.querySelector('.world_right');
  imgWorldBtn.addEventListener('click', () => {
    blockStatistics.isCountry = false;
    blockStatistics.setNewValue(data.Global);
    blockStatistics.render();
  });

  console.log(blockStatistics);
  let nameCountry = '';
  let res = {};
  let resPopulation = {};

  function clickCountry(el) {
    blockStatistics.isCountry = true;
    nameCountry = el.currentTarget.textContent.replace(/[0-9]/g, '');
    console.log(nameCountry);
    res = data.Countries.find((base) => base.Country === nameCountry);
    resPopulation = dataPopulation.find((base) => base.name === nameCountry);
    blockStatistics.setNewValue(res, resPopulation);
    blockStatistics.render();
  }
  const listLi = document.querySelectorAll('.list__li');
  listLi.forEach((e) => {
    e.addEventListener('click', clickCountry);
  });

  allBtn.forEach((el) => {
    el.addEventListener('click', () => {
      blockStatistics.isOneDay = !blockStatistics.isOneDay;
      if (blockStatistics.Country === undefined) {
        blockStatistics.setNewValue(data.Global);
      } else {
        blockStatistics.setNewValue(res);
      }
      blockStatistics.render();
    });
  });
  absoluteBtn.forEach((e) => {
    e.addEventListener('click', () => {
      blockStatistics.isHundredK = !blockStatistics.isHundredK;
      if (blockStatistics.Country === undefined) {
        blockStatistics.setNewValue(data.Global);
      } else {
        blockStatistics.setNewValue(res);
      }

      blockStatistics.render();
    });
  });
  // end StatisticsView
};

init();
