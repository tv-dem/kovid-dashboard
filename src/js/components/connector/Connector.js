export default class Connector {
  static async getDataforChart(countryId = 'all') {
    const diseaseURL = `https://disease.sh/v3/covid-19/historical/${countryId}?lastdays=365`;
    const path = countryId === 'all' ? countryId : `alpha/${countryId}`;
    const populationURL = `https://restcountries.eu/rest/v2/${path}?fields=name;population`;

    const dataDaily = await Connector.getData(diseaseURL);
    const countPopulation = await Connector.getData(populationURL);
    return {
      dataDaily,
      countPopulation,
    };
  }

  static async getData(url) {
    try {
      const data = await fetch(url);
      const result = await data.json();
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
