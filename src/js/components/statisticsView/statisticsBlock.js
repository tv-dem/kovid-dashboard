import {URL_STATISTICS, URL_FLAGS_POPULATION} from '../constants/constants';
import Connector from '../connector/Connector';
import StatisticsView from '../statisticsView/StatisticsView';

let b = new Connector(URL_STATISTICS);
let m = new Connector(URL_FLAGS_POPULATION);


const initSt = async()=> {
const {Global, Countries}  = await b.getStatistics();
const mmm = await m.getStatistics();
let blockStatistics = new StatisticsView(Global, mmm[2]);
blockStatistics.render();
let allBtn=document.querySelectorAll(".all_btn");

allBtn.forEach((el) => {
            el.addEventListener('click', () => {
                
                blockStatistics.isOneDay=!blockStatistics.isOneDay;
                blockStatistics.setNewValue(Global, mmm[1]);
                blockStatistics.render();

            });
        });
//
// function findCountry(nameCountry){
// return Countries.find(e=> e.Country===nameCountry);
// }
// console.log(findCountry('Latvia'));
//
return Global;
}
initSt();

//https://disease.sh/v3/covid-19/historical?lastdays=3
//https://disease.sh/v3/covid-19/historical/all?lastdays=366