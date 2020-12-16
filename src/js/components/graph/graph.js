import '../../../styles/graph.scss';
import Chart from 'chart.js';
import UI from '../UI/UI';
import Slider from '../slider/Slider';

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function addZero(n) {
  return parseInt(n, 10) < 10 ? `0${n}` : n;
}

const date = new Date();
const dateArr = () => [...Array(50)].map((item) => {
  let day = date.getDate() + 1;
  date.setDate(day);
  return date.toLocaleDateString('en-US');
});

const generateDataArr = () => [...Array(50)].map((item) => getRandomNumber(50));

const dataObj = {
  'Daily Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
  },
  'Daily Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
  },
  'Cumulative Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
  },
  'Cumulative Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
  },
  'Log Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
  }
};

export default class Graph extends UI {
  constructor(parentSelector) {
    super();
    this.parent = document.querySelector(parentSelector);
  }

  getData() {
    console.log('Give me some data...');
  }

  addScrollbar(dataLabels) {
    new Slider('.diagram', 1, 2).init(dataLabels);
    document.querySelector('.scroll__track').addEventListener('click', this.clickSliderItemHandler);
  }

  init(labelName = 'Daily Cases') {
    this.chartContainer = super.render(this.parent, 'div', null, ['class', 'chart__container']);
    this.canvas = super.render(this.chartContainer, 'canvas', null, ['id', 'chart']);

    const ctx = this.canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      // type: 'bar',
      type: dataObj[labelName].type,
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        // labels: ["2012-02-02", "2012-02-03", "2012-02-04", "2012-02-05", "2012-02-06", "2012-02-07", "2012-02-08", "2012-02-09", "2012-02-10", "2012-02-11", "2012-02-12", "2012-02-13", "2012-02-14", "2012-02-15", "2012-02-16", "2012-02-17", "2012-02-18", "2012-02-19", "2012-02-20", "2012-02-21"],
        // labels: dateArr(),
        labels: dataObj[labelName].labels,
        datasets: [{
          label: labelName,
          // data: [[5, 6], [-3, -6]],
          // data: [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }],
          // data: [{
          //   x: new Date(),
          //   y: 1
          // }, {
          //   t: new Date(),
          //   y: 10
          // }],
          // data: [12, 19, 3, 5, 2, 7, 10, 17, 13, 10, 12, 19, 3, 5, 2, 7, 10, 17, 13, 10],
          // data: [...Array(50)].map((item) => getRandomNumber(50)),
          data: dataObj[labelName].data,
          backgroundColor: 'rgb(255, 170, 0)',
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          hoverBackgroundColor: 'rgb(255, 255, 255)',
          hoverBorderColor: 'rgb(255, 170, 0)',
          hoverBorderWidth: 2,
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 'flex',
          maxBarThickness: 10,
          borderColor: 'rgb(255, 170, 0, 0.7)',
          // [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 1
        }]
      },
      options: {

        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'rgb(189, 189, 189',
            // fontSize: '10',
          }
        },
        tooltips: {
          intersect: true,
          backgroundColor: 'rgba(255, 255, 255, .9)',
          titleFontColor: 'rgb(0, 0, 0)',
          titleAlign: 'center',
          bodyFontColor: 'rgb(0, 0, 0)',
          yPadding: 2,
          caretPadding: 10,
          borderColor: 'rgb(255, 170, 0)',
          borderWidth: 1,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            gridLines: {
              color: '#9e9e9e',
              borderDash: [2, 5],
            },
            ticks: {
              beginAtZero: true,
              fontColor: '#9e9e9e',
            }
          }],
          xAxes: [{
            type: 'time',
            bounds: 'ticks',
            // distribution: 'linear',
            gridLines: {
              color: '#9e9e9e',
              borderDash: [2, 5],
              offsetGridLines: true,
            },
            time: {
              unit: 'month',
              unitStepSize: 0.5,
              tooltipFormat: "MM-DD-YYYY",
              displayFormats: {
                month: "MMMM",
              },
            },
            ticks: {
              source: 'data',
              fontColor: '#9e9e9e',
              // min: 0,
              // max: 90,
              // stepSize: 1
            },
            scaleLabel: {
              display: false,
              labelString: "Time in Days",
              fontColor: "red",
            }
          }]
        }
      }
    });

    myChart.update();

    // example
    const data = ['Daily Cases', 'Daily Deaths', 'Cumulative Cases', 'Cumulative Deaths', 'Log Cases'];
    this.addScrollbar(data);

    // Нужно ли будет снимать здесь обработчик?
    window.addEventListener('resize', () => {
      console.log('resize');
      myChart.resize();
    });
  }

  clickSliderItemHandler({ target }) {
    // логично в этом методе обрабатывать переключение графиков (слайдов), но тогда будет циклическая зависимость
    const menuItems = document.querySelectorAll('.scroll__track div');
    menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
    target.classList.add('active');
    // здесь ошибка, не могу так использовать метод.
    this.init(target.textContent);
  }

  render() {
    console.log('render work');
    this.init();

    // this.parent.insertAdjacentElement('beforeend', );
  }
}