import { Map, List, Graph, StatisticsView } from '../../index';

class EventEmiiter {
  constructor(Map, List, Graph, StatisticsView) {
    this.Map = Map;
    this.List = List;
    this.Graph = Graph;
    this.StatisticsView = StatisticsView;
  }

  on(event, data) {
    switch (event) {
      case 'chooseMapCountry':
        this.chooseListCountryHandler(data);
        break;

      case 'chooseListCountry':
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

const Emitter = new EventEmiiter(Map, List, Graph, StatisticsView);

export default Emitter;
