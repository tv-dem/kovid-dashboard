import { URL_STATISTICS, URL_FLAGS_POPULATION } from '../constants/constants';
import Connector from '../connector/Connector';
import StatisticsView from './StatisticsView';

const connector = new Connector(URL_STATISTICS);
const populationFlags = new Connector(URL_FLAGS_POPULATION);

const initSt = async () => {
  const { Global, Countries } = await connector.getStatistics();
  const population = await populationFlags.getStatistics();
  const blockStatistics = new StatisticsView(Global, populationFlags[2]);
  blockStatistics.render();
  const allBtn = document.querySelectorAll('.all_btn');
  const absoluteBtn = document.querySelectorAll('.absolute_btn');

  allBtn.forEach((el) => {
    el.addEventListener('click', () => {
      blockStatistics.isOneDay = !blockStatistics.isOneDay;
      blockStatistics.setNewValue(Global, populationFlags[1]);
      blockStatistics.render();
    });
  });

  absoluteBtn.forEach((e) => {
    e.addEventListener('click', () => {
      blockStatistics.isHundredK = !blockStatistics.isHundredK;
      blockStatistics.setNewValue(Global, populationFlags[1]);
      blockStatistics.render();
    });
  });

  function findCountry(nameCountry) {
    return population.find((e) => e.name === nameCountry);
  }
  console.log(findCountry('Latvia'));

  return Global;
};
initSt();

// https://disease.sh/v3/covid-19/historical?lastdays=3
// https://disease.sh/v3/covid-19/historical/all?lastdays=366
