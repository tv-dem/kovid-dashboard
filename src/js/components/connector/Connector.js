// export const URL_STATISTICS = 'https://api.covid19api.com/summary';
// import { URL_STATISTICS} from '../constants/constants';

export default class Connector {
  constructor(url) {
    this.url = url;
  }

  async getStatistics() {
    try {
      const resultTemp = await fetch(this.url);
      const result = await resultTemp.json();
      console.log(result);
      return result;
    } catch (err) {
      alert(err);
    }
  }
}
// module.exports = Connector;
// result.Countries[i].CountryCode
// https://www.countryflags.io/be/shiny/64.png

// "Countries": По конкретной стране:

// "Country": "Afghanistan", === страна
// "CountryCode": "AF",  ===     код страны (необходим для получения флага)
// "Slug": "afghanistan",
// "NewConfirmed": 113, === случаи заражения за последние отчетные сутки
// "TotalConfirmed": 48229, === общее количество зараженных
// "NewDeaths": 11, === количество умерших за последние отчетные сутки
// "TotalDeaths": 1956, === общее количество умерших
// "NewRecovered": 59, === количество выздоровевших за последние отчетные сутки
// "TotalRecovered": 38200, === общее количество выздоровевших

// "Global": В МИРЕ:

//     "NewConfirmed" === случаи заражения за последние отчетные сутки
//     "TotalConfirmed" === общее количество зараженных
//     "NewDeaths" === количество умерших за последние отчетные сутки
// "TotalDeaths" === общее количество умерших
// "NewRecovered" === количество выздоровевших за последние отчетные сутки
// "TotalRecovered" === общее количество выздоровевших;
