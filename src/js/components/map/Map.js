/* eslint import/no-cycle: [0] */
import ymaps from 'ymaps';
import UI from '../UI/UI';
import { colorCountries } from '../constants/constants';
import { Emitter } from '../../../index';

export default class Map extends UI {
  constructor() {
    super();
    this.data = null;
    this.dataPopulation = null;
    this.contextMap = null;
    this.highlightedDistrict = null;
    this.districtBalloon = null;
    this.ymaps = null;
    this.isoPopulation = {};
    this.isoTotalConfirmed = {};
    this.isoNewConfirmed = {};
    this.districtCollections = {};
    this.bordersInfo = {};
    this.cord = [];
    this.nameCountryCode = {};
    this.bordersFeatures = {}; // { код страны: feature от this.ymaps.borders.load }
    this.countryIndexes = {}; // { код страны: индекс страны в yandex geoObjects }
  }

  init(data, dataPopulation) {
    this.data = data;
    this.dataPopulation = dataPopulation;
    this.dataPopulation.forEach(({ population, alpha2Code }) => {
      this.isoPopulation[alpha2Code] = population;
    });

    this.data.Countries.forEach(({ CountryCode, TotalConfirmed, NewConfirmed }) => {
      this.isoTotalConfirmed[CountryCode] = TotalConfirmed;
      this.isoNewConfirmed[CountryCode] = NewConfirmed;
    });

    this.initMap();
  }

  updateData(data) {
    this.data = data;
  }

  createYMaps() {
    this.contextMap = new this.ymaps.Map('map', {
      center: [34.41, 0],
      zoom: 2,
      autoFitToViewport: 'always',
      controls: ['zoomControl', 'fullscreenControl'],
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
      strokeOpacity: 0.7,
      fillOpacity: 0.7,
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
      district.options.set({ fillOpacity: 0.7 });
    }
  }

  clickHandler(event) {
    const target = event.get('target');
    const district = target.getParent();

    Emitter.emit('chooseMapCountry', district.properties.iso[0]);

    if (this.highlightedDistrict) {
      this.highlightedDistrict.options.set({ fillOpacity: 0.7 });
    }
    const localIso = district.properties.iso;
    this.isoTotalConfirmed[localIso] = (!this.isoTotalConfirmed[localIso]) ? 'No date' : this.isoTotalConfirmed[localIso];
    this.isoNewConfirmed[localIso] = (!this.isoNewConfirmed[localIso]) ? 'No date' : this.isoNewConfirmed[localIso];
    this.districtBalloon.open(event.get('coords'), this.creatBalloon(localIso));
    district.options.set({ fillOpacity: 1 });
    this.highlightedDistrict = district;
    // this.selectСountry('CN');
  }

  selectСountry(iso) {
    const district = this.districtCollections[iso];
    if (this.highlightedDistrict) {
      this.highlightedDistrict.options.set({ fillOpacity: 0.7 });
    }

    const myGeo = this.ymaps.geocode(this.nameCountryCode[iso]);

    myGeo.then((res) => {
      this.cord = res.geoObjects.get(0).geometry.getCoordinates();

      this.districtBalloon.open(this.cord, this.creatBalloon(iso));
      district.options.set({ fillOpacity: 1 });
      this.highlightedDistrict = district;
    });
  }

  creatHint(name, iso) {
    return `<div class='hint'>
    <div>${name}</div>
    <div>Population</div>
    <div>${this.isoPopulation[iso]}</div>
    <div>TotalConfirmed</div>
    <div>${this.isoTotalConfirmed[iso]}</div>
    <div>NewConfirmed</div>
    <div>${this.isoNewConfirmed[iso]}</div>
  </div>`;
  }

  creatBalloon(iso) {
    return `<div class='hint'>
    <div>${this.nameCountryCode[iso]}</div>
    <div>Population</div>
    <div>${this.isoPopulation[iso]}</div>
    <div>TotalConfirmed</div>
    <div>${this.isoTotalConfirmed[iso]}</div>
    <div>NewConfirmed</div>
    <div>${this.isoNewConfirmed[iso]}</div>
  </div>`;
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  createDistrictCollections(feature, color) {
    const { name, iso3166: iso } = feature.properties;
    this.isoTotalConfirmed[iso] = (!this.isoTotalConfirmed[iso]) ? 'No date' : this.isoTotalConfirmed[iso];
    this.isoNewConfirmed[iso] = (!this.isoNewConfirmed[iso]) ? 'No date' : this.isoNewConfirmed[iso];
    feature.properties.hintContent = this.creatHint(name, iso);
    this.districtCollections[iso] = this.createGeoObjectCollection(color);
    this.districtCollections[iso].properties.districts = [];
    this.districtCollections[iso].properties.iso = [];
    this.nameCountryCode[iso] = name;

    this.districtCollections[iso].add(new this.ymaps.GeoObject(feature));
    this.districtCollections[iso].properties.districts.push(name);
    this.districtCollections[iso].properties.iso.push(iso);

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

    this.bordersFeatures.forEach((feature) => {
      const iso = feature.properties.iso3166;
      let casesThousand = 0;
      if (this.isoTotalConfirmed[iso]) {
        casesThousand = Math.ceil((this.isoTotalConfirmed[iso] / this.isoPopulation[iso]) * 100);
      }
      if (casesThousand > 10) casesThousand = 10;
      if (casesThousand < 1) casesThousand = 1;
      const color = colorCountries[casesThousand - 1];

      this.createDistrictCollections(feature, color);
    });

    const districtList = Object.keys(this.districtCollections);
    districtList.forEach((districtName, index) => {
      this.contextMap.geoObjects.add(this.districtCollections[districtName]);
      this.countryIndexes[districtName] = index;
    });
  }

  initLegend() {
    const ButtonLayout = this.ymaps.templateLayoutFactory.createClass([
      '<div  class="legend_map">',
      '<div class="force">Number of cases</div>',
      '<div class="force_100">over 5000</div>',
      '<div class="force_80">4000 - 3000</div>',
      '<div class="force_60">3000 - 2000</div>',
      '<div class="force_40">1000 - 2000</div>',
      '<div class="force_20">less 1000</div>',
      '</div>',

    ].join(''));

    const button = new this.ymaps.control.Button({
      data: {
        content: '',
        image: '',
        title: '',
      },
      options: {
        layout: ButtonLayout,
      },
    });

    this.contextMap.controls.add(button, {
      float: 'none',
      position: {
        top: 5,
        left: 5,
      },
    });
  }

  async initMap() {
    this.ymaps = await ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=d79b2dc6-c925-42e8-a5be-459618c5977a&lang=ru_RU');
    await this.initYandexMap();
    this.initLegend();
  }
}
