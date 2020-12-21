import {
  Map, List, Graph, StatisticsView,
} from '../../index';

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
      default:
        break;
    }
  }

  chooseListCountryHandler(data) {
    this.Map.chooseCountry(data);
    this.Graph.chooseCountry(data);
    this.StatisticsView.chooseCountry(data);
  }

  chooseMapCountryHandler(data) {
    this.List.chooseCountry(data);
    this.Graph.chooseCountry(data);
    this.StatisticsView.chooseCountry(data);
  }
}

const Emitter = new EventEmitter(Map, List, Graph, StatisticsView);

export default Emitter;