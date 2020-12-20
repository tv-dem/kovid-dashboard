import ymaps from 'ymaps';
import UI from '../UI/UI';

export default class Map extends UI {
  constructor() {
    super();
    this.datalist = null;
    this.data = null;
    this.contextMap = null;
    this.highlightedDistrict = null;
    this.districtBalloon = null;
    this.ymaps = null;
    this.districtCollections = {};
    this.bordersInfo = {};
    this.bordersFeatures = {}; // { код страны: feature от this.ymaps.borders.load }
    this.countryIndexes = {}; // { код страны: индекс страны в yandex geoObjects }
  }

  init(datalist, globalData) {
    this.datalist = datalist;
    this.data = globalData;
    this.initMap();
    this.renderMap();
  }

  updateData(data) {
    this.data = data;
  }

  createYMaps() {
    this.contextMap = new this.ymaps.Map('map', {
      center: [34.41, 0],
      zoom: 2,
      autoFitToViewport: 'always',
      controls: ['zoomControl'],
    });
  }

  createStaticPane(map) {
    return new this.ymaps.pane.StaticPane(map, {
      zIndex: 100,
      css: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
        opacity: '0.5',
      },
    });
  }

  createGeoObjectCollection(color) {
    return new this.ymaps.GeoObjectCollection(null, {
      fillColor: color,
      strokeColor: color,
      strokeOpacity: 0.3,
      fillOpacity: 0.3,
      hintCloseTimeout: 0,
      hintOpenTimeout: 0,
    });
  }

  createDistrictBalloon() {
    this.districtBalloon = new this.ymaps.Balloon(this.contextMap);
  }

  static mouseEnterHandler(event) {
    const district = event.get('target').getParent();
    district.options.set({ fillOpacity: 1 });
  }

  mouseLeaveHandler(event) {
    const district = event.get('target').getParent();
    if (district !== this.highlightedDistrict) {
      district.options.set({ fillOpacity: 0.3 });
    }
  }

  clickHandler(event) {
    const target = event.get('target');
    const district = target.getParent();

    if (this.highlightedDistrict) {
      this.highlightedDistrict.options.set({ fillOpacity: 0.3 });
    }

    this.districtBalloon.open(event.get('coords'), district.properties.districts.join('<br>'));
    district.options.set({ fillOpacity: 1 });
    this.highlightedDistrict = district;
  }

  createDistrictCollections(feature, color) {
    const { name, iso3166: iso } = feature.properties;
    feature.properties.hintContent = name;
    this.districtCollections[iso] = this.createGeoObjectCollection(color);
    this.districtCollections[iso].properties.districts = [];

    this.districtCollections[iso].add(new this.ymaps.GeoObject(feature));
    this.districtCollections[iso].properties.districts.push(name);

    this.districtCollections[iso].events.add('mouseenter',
      (event) => Map.mouseEnterHandler(event));

    this.districtCollections[iso].events.add('mouseleave',
      (event) => this.mouseLeaveHandler(event));

    this.districtCollections[iso].events.add('click',
      (event) => this.clickHandler(event));
  }

  async createBordersInfo() {
    const { features } = await this.ymaps.borders.load('001', {
      lang: 'ru',
      quality: 0,
    });
    this.bordersFeatures = features;
    this.bordersFeatures.forEach((feature) => {
      const { iso3166: iso } = feature.properties;
      this.bordersInfo[iso] = feature;
    });
  }

  updateDistricCollections(iso, color) {
    this.createDistrictCollections(this.bordersInfo[iso], color);
    this.contextMap.geoObjects.set(this.countryIndexes[iso],
      this.districtCollections[iso]);
  }

  async initYandexMap() {
    this.createYMaps();
    const pane = this.createStaticPane(this.contextMap);
    this.contextMap.panes.append('white', pane);
    this.createDistrictBalloon();
    this.districtBalloon.options.setParent(this.contextMap.options);
    await this.createBordersInfo();

    let red = 1;
    this.bordersFeatures.forEach((feature) => {
      red++;
      const color = `rgb(${red + 1}, 0, 0)`;
      this.createDistrictCollections(feature, color);
    });

    const districtList = Object.keys(this.districtCollections);
    districtList.forEach((districtName, index) => {
      this.contextMap.geoObjects.add(this.districtCollections[districtName]);
      this.countryIndexes[districtName] = index;
    });
  }

  async initMap() {
    this.ymaps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=d79b2dc6-c925-42e8-a5be-459618c5977a&lang=ru_RU');
    await this.initYandexMap();

    // Метод для обновления цвета
    this.updateDistricCollections('RU', 'rgb(3, 133, 7)');
  }

  renderMap() {
    console.log(this.data);
  }
}
