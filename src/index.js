import './styles/index.scss';

// import './js/components/statisticsView/statisticsBlock';
import StatisticsView from './js/components/statisticsView/StatisticsView';

import List from './js/components/List/List';

import Connector from './js/components/connector/Connector';
import { URL_STATISTICS, URL_FLAGS_POPULATION } from './js/components/constants/constants';

const init = async () => {
  const data = await Connector.getStatistics(URL_STATISTICS);
  const list = new List(data.Countries, data.Global);
  list.renderComponent(document.querySelector('#country_list'));
  const dataPopulation = await Connector.getStatistics(URL_FLAGS_POPULATION);

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
  let nameCountry = '';
  let res = {};
  let resPopulation = {};

  // function clickCountry(el) {
  //   blockStatistics.isCountry = true;
  //   nameCountry = el.currentTarget.textContent.replace(/[0-9]/g, '');
  //   console.log(nameCountry);
  //   return population.find(({name}) => name === nameCountry);
  //   res = data.Countries.find((base) => base.Country === nameCountry);
  //   resPopulation = dataPopulation.find((base) => base.name === nameCountry);
  //   blockStatistics.setNewValue(res, resPopulation);
  //   blockStatistics.render();
  // }
  const listLi = document.querySelectorAll('.list__li');
  listLi.forEach((e) => {
    e.addEventListener('click', (el)=>{
      blockStatistics.isCountry = true;
      nameCountry = el.currentTarget.textContent.replace(/[0-9]/g, '');
     // return population.find(({name}) => name === nameCountry);
      res = data.Countries.find(({Country}) => Country === nameCountry);
      resPopulation = dataPopulation.find(({name}) => name === nameCountry);
      blockStatistics.setNewValue(res, resPopulation);
      blockStatistics.render();
    });
  });

  allBtn.forEach((el) => {
    el.addEventListener('click', () => {
      blockStatistics.isOneDay = !blockStatistics.isOneDay;
      if (!blockStatistics.Country) {
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
      if (!blockStatistics.Country) {
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
