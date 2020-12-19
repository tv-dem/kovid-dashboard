import UI from '../UI/UI';

export default class Map extends UI {
  constructor() {
    super();
    this.datalist = null;
    this.data = null;
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

  initMap() {
    let myMap;

    function init() {
      // Создание карты.
      myMap = new ymaps.Map('map', {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [34.41, 0],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 2,
        autoFitToViewport: 'always',
        controls: ['zoomControl'],

      });

      const pane = new ymaps.pane.StaticPane(myMap, {
        zIndex: 100,
        css: {
          width: '100%', height: '100%', backgroundColor: '#f7f7f7', opacity: '0.5',
        },
      });
      myMap.panes.append('white', pane);

      const districtBalloon = new ymaps.Balloon(myMap);
      districtBalloon.options.setParent(myMap.options);
      // Загрузим регионы.
      ymaps.borders.load('001', {
        lang: 'ru',
        quality: 0,
      }).then((result) => {
        console.log('1', result);

        // Создадим объект, в котором будут храниться коллекции с нашими регионами.
        const districtCollections = {};
        // Для каждого федерального округа создадим коллекцию.
        let i = 1;
        result.features.forEach((feature) => {
          i++;
          // var iso = feature.properties.iso3166;
          districtCollections[feature.properties.iso3166] = new ymaps.GeoObjectCollection(null, {
            fillColor: `rgb(${i + 1}, 100, 0)`,
            strokeColor: `rgb(${i + 1}, 100, 0)`,
            strokeOpacity: 0.3,
            fillOpacity: 0.3,
            hintCloseTimeout: 0,
            hintOpenTimeout: 0,
          });
          // Создадим свойство в коллекции, которое позже наполним названиями субъектов РФ.
          districtCollections[feature.properties.iso3166].properties.districts = [];
        });

        console.log('2', districtCollections);

        result.features.forEach((feature) => {
          const iso = feature.properties.iso3166;
          const { name } = feature.properties;
          // var district = feature.districtByIso[iso];
          // debugger;
          // console.log(iso, name);
          //  Для каждого субъекта РФ зададим подсказку
          feature.properties.hintContent = name;
          //  Добавим субъект РФ в соответствующую коллекцию.
          districtCollections[iso].add(new ymaps.GeoObject(feature));
          //  Добавим имя субъекта РФ в массив.
          districtCollections[iso].properties.districts.push(name);
        });
        console.log('333', districtCollections);
        // console.log('444', ttt);

        // Создадим переменную, в которую будем сохранять выделенный в данный момент федеральный округ.
        let highlightedDistrict;
        for (const districtName in districtCollections) {
          // Добавим коллекцию на карту.
          myMap.geoObjects.add(districtCollections[districtName]);

          // При наведении курсора мыши будем выделять федеральный округ.
          districtCollections[districtName].events.add('mouseenter', (event) => {
            const district = event.get('target').getParent();
            district.options.set({ fillOpacity: 1 });
          });

          // При выводе курсора за пределы объекта вернем опции по умолчанию.
          districtCollections[districtName].events.add('mouseleave', (event) => {
            const district = event.get('target').getParent();
            if (district !== highlightedDistrict) {
              district.options.set({ fillOpacity: 0.3 });
            }
          });
          // Подпишемся на событие клика.
          districtCollections[districtName].events.add('click', (event) => {
            const target = event.get('target');
            const district = target.getParent();
            // Если на карте выделен федеральный округ, то мы снимаем с него выделение.
            if (highlightedDistrict) {
              highlightedDistrict.options.set({ fillOpacity: 0.3 });
            }
            // Откроем балун в точке клика. В балуне будут перечислены регионы того федерального округа,
            // по которому кликнул пользователь.
            districtBalloon.open(event.get('coords'), district.properties.districts.join('<br>'));
            // Выделим федеральный округ.
            district.options.set({ fillOpacity: 1 });
            // Сохраним ссылку на выделенный федеральный округ.
            highlightedDistrict = district;
          });
        }
      });
    }

    ymaps.ready(init);
  }

  renderMap() {
    console.log(this.data);
  }
}
