/* eslint-disable no-unused-expressions */
import UI from '../UI/UI';
import '../../../styles/_statisticsView.scss';

export default class StatisticsView extends UI {
  constructor() {
    super();
    this.nameCountry = null;
    this.res = {};
    this.resPopulation = {};
    this.isCountry = false;
    this.isOneDay = false;
    this.isHundredK = false;
    this.dataStatistics = null;
    this.dataStatisticsCountries = null;
    this.dataPopulation = null;

    this.parent = null;
    this.dataForModal = null;
    this.parentSelector = null;
    this.worldContent = null;
    this.allContent = null;
    this.absoluteContent = null;
    this.confirmedContent = null;
    this.deathsContent = null;
    this.recoveredContent = null;
    this.globalCases = null;
    this.worldRight = null;
  }

  static renderInfromStatistic(parent, innerHTML) {
    const css = innerHTML.toLowerCase().replace(/:/g, '');
    const inf = UI.renderElement(parent, 'div', null, ['class', `informStatistics_${css}`]);
    UI.renderElement(inf, 'div', innerHTML, ['class', `informStatistics_${css}_title`]);
    return UI.renderElement(inf, 'div', '1', ['class', `informStatistics_${css}_content`]);
  }

  renderFirstBtn(parent) {
    const btnOptions = UI.renderElement(parent, 'div', null, ['class', 'btn_options']);
    const all = UI.renderElement(btnOptions, 'div', null, ['class', 'all']);
    const allBtnFist = UI.renderElement(all, 'div', null, ['class', 'all_btn btn']);
    UI.renderElement(allBtnFist, 'img', null, ['src', './public/arrow-left.svg']);
    this.allContent = UI.renderElement(all, 'div', 'In all', ['class', 'all_content']);
    const allBtnSecond = UI.renderElement(all, 'div', null, ['class', 'all_btn btn']);
    UI.renderElement(allBtnSecond, 'img', null, ['src', './public/arrow-right.svg']);
  }

  renderSecondBtn(parent) {
    const btnOptions = UI.renderElement(parent, 'div', null, ['class', 'absolute']);
    const allBtnFist = UI.renderElement(btnOptions, 'div', null, ['class', 'absolute_btn btn']);
    UI.renderElement(allBtnFist, 'img', null, ['src', './public/arrow-left.svg']);
    this.absoluteContent = UI.renderElement(btnOptions, 'div', 'Absolute', ['class', 'absolute_content']);
    const allBtnSecond = UI.renderElement(btnOptions, 'div', null, ['class', 'absolute_btn btn']);
    UI.renderElement(allBtnSecond, 'img', null, ['src', './public/arrow-right.svg']);
  }

  renderComponent() {
    this.parent = document.querySelector(this.parent);
    const statisticChange = UI.renderElement(this.parent, 'div', null, ['class', 'statistic--change']);
    const statisticChangeType = UI.renderElement(statisticChange, 'div', null, ['class', 'statistic--change_type']);
    UI.renderElement(statisticChangeType, 'div', null, ['class', 'world_left']);
    this.worldContent = UI.renderElement(statisticChangeType, 'div', 'World', ['class', 'world_content']);
    this.worldRight = UI.renderElement(statisticChangeType, 'div', null, ['class', 'world_right']);
    const informStatistics = UI.renderElement(this.parent, 'div', null, ['class', 'informStatistics']);
    this.confirmedContent = StatisticsView.renderInfromStatistic(informStatistics, 'Confirmed:');
    this.deathsContent = StatisticsView.renderInfromStatistic(informStatistics, 'Deaths:');
    this.recoveredContent = StatisticsView.renderInfromStatistic(informStatistics, 'Recovered:');
    this.renderFirstBtn(this.parent);
    this.renderSecondBtn(this.parent);
  }

  setNewValue(dataStatistics, dataPopulation) {
    this.population = 7856655781;
    this.Country = dataStatistics.Country;
    this.NewConfirmed = dataStatistics.NewConfirmed;
    this.TotalConfirmed = dataStatistics.TotalConfirmed;
    this.NewDeaths = dataStatistics.NewDeaths;
    this.TotalDeaths = dataStatistics.TotalDeaths;
    this.NewRecovered = dataStatistics.NewRecovered;
    this.TotalRecovered = dataStatistics.TotalRecovered;

    if (dataPopulation) {
      this.population = dataPopulation.population;
      this.flag = dataPopulation.flag;
      this.name = dataPopulation.name;
    }
  }

  setCountry(data) {
    let dataTemp = '';

    if (typeof (data) === 'string') {
      dataTemp = data === 'GL' ? 'DK' : data;
      this.res = this.dataStatisticsCountries.find(({ CountryCode }) => CountryCode === dataTemp);
    } else {
      this.res = data;
    }

    if (!this.res) {
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

      return;
    }

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
    this.isCountry = true;

    this.setNewValue(this.res, this.resPopulation);
    // this.updateDataForModalWindow({
    //   dataStatistics: this.res,
    //   dataPopulation: this.resPopulation,
    // });

    this.renderStatistic();
  }

  clickBtn() {
    const allBtn = document.querySelectorAll('.all_btn');
    const absoluteBtn = document.querySelectorAll('.absolute_btn');
    const imgWorldBtn = this.worldRight;

    allBtn.forEach((el) => {
      el.addEventListener('click', () => {
        this.isOneDay = !this.isOneDay;
        this.Country
          ? this.setNewValue(this.res, this.resPopulation)
          : this.setNewValue(this.dataStatistics);
        this.renderStatistic();
      });
    });

    absoluteBtn.forEach((e) => {
      e.addEventListener('click', () => {
        this.isHundredK = !this.isHundredK;
        this.Country
          ? this.setNewValue(this.res, this.resPopulation)
          : this.setNewValue(this.dataStatistics);
        this.renderStatistic();
      });
    });
    imgWorldBtn.addEventListener('click', () => {
      this.isCountry = false;
      this.setNewValue(this.dataStatistics);
      this.renderStatistic();
    });
  }

  renderStatistic() {
    const globalCases = document.querySelector('.global_cases');

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
    this.confirmedContent.innerHTML = contentConfirmed;
    this.deathsContent.innerHTML = contentDeaths;
    this.recoveredContent.innerHTML = contentRecovered;
    globalCases.innerHTML = `Global Cases ${this.dataStatistics.TotalConfirmed}`;
    this.worldContent.innerHTML = styleTitle;
    this.allContent.innerHTML = contentAll;
    this.absoluteContent.innerHTML = contentAbsolute;
    this.worldRight.innerHTML = rightWorld;
  }

  init(parent, input) {
    this.dataForModal = input;
    this.parentSelector = parent;
    this.parent = parent;

    this.setNewValue(input.dataStatistics, input.dataPopulation);
    this.dataStatistics = input.dataStatistics;
    this.dataStatisticsCountries = input.dataStatisticsCountries;
    this.dataPopulation = input.dataPopulation;
    this.renderComponent();
    this.renderStatistic();
    this.clickBtn();

    this.setParamsForBtnFullScreen(parent, 'js-statistic');
    this.setModalWindowComponent(StatisticsView);
    this.updateDataForModalWindow(this.dataForModal);
    this.renderBtnFullScreen();
  }
}
