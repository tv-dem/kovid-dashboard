import Connector from '../components/connector/Connector';
import mapperDataForChart from './mapDataForChart';

class EventEmitter {
  constructor(Map, List, Graph, StatisticsView) {
    this.Map = Map;
    this.List = List;
    this.Graph = Graph;
    this.StatisticsView = StatisticsView;
  }

  emit(event, data) {
    switch (event) {
      case 'chooseListCountry':
        this.chooseListCountryHandler(data);
        break;

      case 'chooseMapCountry':
        this.chooseMapCountryHandler(data);
        break;

      case 'chooseWholeWorld':
        this.chooseGraphHandler(data);
        break;

      default:
        break;
    }
  }

  static async updateGraph(country) {
    const { dataDaily, countPopulation } = await Connector.getDataforChart(country);
    const data = mapperDataForChart(dataDaily, countPopulation, country);

    return data;
  }

  chooseListCountryHandler(data) {
    this.Map.selectСountry(data.CountryCode);
    EventEmitter.updateGraph(data.CountryCode).then(
      (result) => this.Graph.chooseCountry(result),
    );

    this.StatisticsView.setCountry(data);
  }

  chooseMapCountryHandler(data) {
    this.List.chooseCountry(data);
    EventEmitter.updateGraph(data).then(
      (result) => this.Graph.chooseCountry(result),
    );
    this.StatisticsView.setCountry(data);
  }

  chooseGraphHandler(data) {
    EventEmitter.updateGraph(data).then(
      (result) => this.Graph.chooseCountry(result),
    );
  }
}

export default EventEmitter;
