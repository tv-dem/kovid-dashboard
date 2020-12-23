/* eslint-disable no-unused-expressions */
/* eslint import/no-cycle: [0] */
import '../../../styles/_statisticsView.scss';
import { Emitter } from '../../../index';

export default class StatisticsView {
  constructor(
    isCountry = false,
    isOneDay = false,
    isHundredK = false,
  ) {
    this.nameCountry = null;
    this.res = {};
    this.resPopulation = {};
    this.isCountry = isCountry;
    this.isOneDay = isOneDay;
    this.isHundredK = isHundredK;
    this.dataStatistics = null;
    this.dataStatisticsCountries = null;
    this.dataPopulation = null;
  }

  setNewValue(dataStatistics, dataPopulation) {
    this.Country = dataStatistics.Country; //
    this.NewConfirmed = dataStatistics.NewConfirmed; // случаи заражения за последние отчетные сутки
    this.TotalConfirmed = dataStatistics.TotalConfirmed;// общее количество зараженных
    this.NewDeaths = dataStatistics.NewDeaths;// количество умерших за последние отчетные сутки
    this.TotalDeaths = dataStatistics.TotalDeaths;// общее количество умерших
    this.NewRecovered = dataStatistics.NewRecovered;// количество выздоровевших за отчетные сутки
    this.TotalRecovered = dataStatistics.TotalRecovered;// общее количество выздоровевших

    if (dataPopulation === undefined) {
      this.population = 7856655781;
    } else {
      this.population = dataPopulation.population;
      this.flag = dataPopulation.flag;
      this.name = dataPopulation.name;
    }
  }

  setCountry(data) {
    let dataTemp = '';
    if (typeof (data) === 'string') {
      if (data === 'GL') {
        dataTemp = 'DK';
      } else {
        dataTemp = data;
      }
      this.res = this.dataStatisticsCountries.find(({ CountryCode }) => CountryCode === dataTemp);
    } else {
      this.res = data;
    }
    if (this.res === undefined) {
      this.res = {
        Country: 'no info',
        NewConfirmed: 'no info',
        TotalConfirmed: 'no info',
        NewDeaths: 'no info',
        TotalDeaths: 'no info',
        NewRecovered: 'no info',
        TotalRecovered: 'no info',
      };
      this.resPopulation = {
        population: 0,
        flag: '../../../public/noneFlag.png',
      };
      this.Country = this.res.Country;
    } else {
      if (this.Country === 'United Kingdom') {
        this.Country = 'United Kingdom of Great Britain and Northern Ireland';
      }
      if (this.Country === 'Korea (South)') {
        this.Country = 'Korea (Republic of)';
      }

      this.Country = this.res.Country;
      this.resPopulation = this.dataPopulation.find(({ name }) => name === this.Country);
      this.population = this.resPopulation.population;
      this.flag = this.resPopulation.flag;
    }
    this.isCountry = true;
    this.setNewValue(this.res, this.resPopulation);
    this.render();
  }

  clickBtn() {
    const allBtn = document.querySelectorAll('.all_btn');
    const absoluteBtn = document.querySelectorAll('.absolute_btn');
    const imgWorldBtn = document.querySelector('.world_right');

    allBtn.forEach((el) => {
      el.addEventListener('click', () => {
        this.isOneDay = !this.isOneDay;
        this.Country
          ? this.setNewValue(this.res, this.resPopulation)
          : this.setNewValue(this.dataStatistics);
        this.render();
      });
    });

    absoluteBtn.forEach((e) => {
      e.addEventListener('click', () => {
        this.isHundredK = !this.isHundredK;
        this.Country
          ? this.setNewValue(this.res, this.resPopulation)
          : this.setNewValue(this.dataStatistics);
        this.render();
      });
    });
    imgWorldBtn.addEventListener('click', () => {
      Emitter.emit('chooseWholeWorld', 'all');
      this.isCountry = false;
      this.setNewValue(this.dataStatistics);
      this.render();
    });
  }

  render() {
    const worldContent = document.querySelector('.world_content');
    const allContent = document.querySelector('.all_content');
    const absoluteContent = document.querySelector('.absolute_content');
    const confirmedContent = document.querySelector('.informStatistics_confirmed_content');
    const deathsContent = document.querySelector('.informStatistics_deaths_content');
    const recoveredContent = document.querySelector('.informStatistics_recovered_content');
    const globalCases = document.querySelector('.global_cases');
    const worldRight = document.querySelector('.world_right');

    let contentConfirmed = '';
    let contentDeaths = '';
    let contentRecovered = '';
    let contentAll = '';
    let contentAbsolute = '';
    let styleTitle = '';
    let rightWorld = '';

    if (this.isHundredK) contentAbsolute = '100K';
    else contentAbsolute = 'Absolute';

    if (this.isCountry) {
      styleTitle = `${this.Country} <img src="${this.flag}" alt="" width="40px" height="30px" class ="imgFlag">`;
      rightWorld = '<img src="../../../public/world2.png" alt="flag" width="45px" height="35px" class ="imgWorld imgWorld_link">';
    } else styleTitle = 'World <img src="../../../public/world2.png" alt="flag" width="45px" height="35px" class ="imgWorld">';

    if (this.isOneDay && !this.isHundredK) {
      contentConfirmed = this.NewConfirmed;
      contentDeaths = this.NewDeaths;
      contentRecovered = this.NewRecovered;
      contentAll = 'Last day';
    }

    if (!this.isOneDay && !this.isHundredK) {
      contentConfirmed = this.TotalConfirmed;
      contentDeaths = this.TotalDeaths;
      contentRecovered = this.TotalRecovered;
      contentAll = 'In all';
    }

    if (this.isOneDay && this.isHundredK) {
      contentConfirmed = Math.ceil(this.NewConfirmed / (this.population / 100000));
      contentDeaths = Math.ceil(this.NewDeaths / (this.population / 100000));
      contentRecovered = Math.ceil(this.NewRecovered / (this.population / 100000));
      if (this.Country === 'no info') {
        contentConfirmed = 'no info';
        contentDeaths = 'no info';
        contentRecovered = 'no info';
      }
      contentAll = 'Last day';
    }

    if (!this.isOneDay && this.isHundredK) {
      contentConfirmed = Math.ceil(this.TotalConfirmed / (this.population / 100000));
      contentDeaths = Math.ceil(this.TotalDeaths / (this.population / 100000));
      contentRecovered = Math.ceil(this.TotalRecovered / (this.population / 100000));
      if (this.Country === 'no info') {
        contentConfirmed = 'no info';
        contentDeaths = 'no info';
        contentRecovered = 'no info';
      }
      contentAll = 'In all';
    }
    //
    confirmedContent.innerHTML = contentConfirmed;
    deathsContent.innerHTML = contentDeaths;
    recoveredContent.innerHTML = contentRecovered;
    globalCases.innerHTML = `Global Cases ${this.dataStatistics.TotalConfirmed}`;
    worldContent.innerHTML = styleTitle;
    allContent.innerHTML = contentAll;
    absoluteContent.innerHTML = contentAbsolute;
    worldRight.innerHTML = rightWorld;
  }

  init(dataStatistics, dataStatisticsCountries, dataPopulation) {
    this.setNewValue(dataStatistics, dataPopulation);
    this.dataStatistics = dataStatistics;
    this.dataStatisticsCountries = dataStatisticsCountries;
    this.dataPopulation = dataPopulation;
    this.render();
    this.clickBtn();
  }
}
