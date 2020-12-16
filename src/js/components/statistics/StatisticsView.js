export default class StatisticsView {
    isCountry = false;
    constructor(objStatistics, objFlags) {
this.setNewValue(objStatistics, objFlags);
   }
    setNewValue(objStatistics, objFlags) {
        
        this.NewConfirmed = objStatistics.NewConfirmed; //случаи заражения за последние отчетные сутки
        this.TotalConfirmed = objStatistics.TotalConfirmed;//общее количество зараженных
        this.NewDeaths = objStatistics.NewDeaths;//количество умерших за последние отчетные сутки
        this.TotalDeaths = objStatistics.TotalDeaths;//общее количество умерших
        this.NewRecovered = objStatistics.NewRecovered;//количество выздоровевших за последние отчетные сутки
        this.TotalRecovered = objStatistics.TotalRecovered;// общее количество выздоровевших
        
        if (objFlags === undefined) this.population = 999;
        else {
        this.population = objFlags.population;
        this.flag = objFlags.flag;
        this.name = objFlags.name;
    }
    }


    oneHundredK() {
        //  this.NewConfirmed100K;
    }

    render() {
        let st = document.querySelector('.statistic');
        const styleTitle = 'world';
        if (this.isCountry) {
            styleTitle = 'country';
        }

        const viewStr = `<div class="statistic" id="statistic">
        <div class="statistic--change_type ">
        <div class="statistic--change_type-world ${styleTitle}">
        World
        </div>
        
        <div class="statistic--change_type-country ${styleTitle}">
        Country
        </div>
        </div>
      <div> количество зараженных ${this.TotalConfirmed}</div>
      <div> количество умерших ${this.TotalDeaths}</div>
      <div> количество выздоровевших ${this.TotalRecovered}</div>
      
    
        <div class="test1">
          ${this.population}
          </div>
          <div class="test2">
          <img src="${this.flag}" width="100px">
          </div>
        </div>
        
        <form>
  <p>Period:</p>
    <div>
    <input type="radio" id="period1"
     name="period" value="all_period" checked>
    <label for="period1">all period</label>

    <input type="radio" id="period2"
     name="period" value="last_day">
    <label for="period2">last day</label>
  </div>
</form>

        <form>
  <p> Absolute or 100K:</p>
    <div>
    <input type="radio" id="absolute1"
     name="absolute" value="absolute" checked>
    <label for="absolute1">Absolute</label>

    <input type="radio" id="absolute2"
     name="absolute" value="100K">
    <label for="absolute2">100K</label>
  </div>
</form>
        `
        st.innerHTML = viewStr;

      //  return viewStr;
    }

    checkPeriod() {
        let checkPeriod=document.getElementsByName('period');

        for (let i=0;i<checkPeriod.length; i++) {
            if (checkPeriod[i].checked) {
              alert('Выбран '+i+' radiobutton');
            }
          }

        }

        

}

// import {URL_STATISTICS, URL_FLAGS_POPULATION} from './js/components/constants/constants';
// import Connector2 from './js/components/connector/Connector';
// import StatisticsView from './js/components/statistics/StatisticsView';

// let b = new Connector2(URL_STATISTICS);
// let m = new Connector2(URL_FLAGS_POPULATION);


// const initSt = async()=> {

// const allStatistics = await b.getStatistics();
// const {Global, Countries} = allStatistics; 


// const mmm = await m.getStatistics();
// // let testTest = document.querySelector('.test');
// let blockStatistics = new StatisticsView(Global, mmm[2]);
// blockStatistics.render();

// // console.log(mmm);
// let checkPeriod=document.getElementsByName('period');

//         checkPeriod.forEach((el) => {
//             el.addEventListener('click', () => {
//                 blockStatistics.checkPeriod();
//                 blockStatistics.setNewValue(Global, mmm[1]);
//                 blockStatistics.render();
//             });
//         });
// //
// function findCountryIndex(nameCountry){

//     return Countries.find(e=> e.Country===nameCountry);
// }

// console.log(findCountryIndex('Latvia'));
// //
// return Global;
// }
// initSt();