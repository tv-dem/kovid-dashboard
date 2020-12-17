import '../../../styles/graph.scss';
import Chart from 'chart.js';
import UI from '../UI/UI';
import CreateBtnFullScreen from '../../utils/createBtnFullScreen';
// import Slider from '../slider/Slider';

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function addZero(n) {
  return parseInt(n, 10) < 10 ? `0${n}` : n;
}

const date = new Date();
const dateArr = () => [...Array(90)].map((item) => {
  let day = date.getDate() + 1;
  date.setDate(day);
  return date.toLocaleDateString('en-US');
});

const generateDataArr = () => [...Array(90)].map((item) => getRandomNumber(90));

const dataObj = {
  'Daily Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 170, 0)',
  },
  'Daily Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
  'Cumulative Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Deaths': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 255, 255)',
  },
  'Log Cases': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'line',
    color: 'rgb(255, 170, 0)',
  },
  'Cumulative Cases on 100.000': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 255, 255)',
  },
  'Cumulative Deaths on 100.00': {
    labels: dateArr(),
    data: generateDataArr(),
    type: 'bar',
    color: 'rgb(255, 170, 0)',
  }
};

export default class Graph extends UI {
  constructor(parentSelector) {
    super();
    this.parent = document.querySelector(parentSelector);
    this.chartContainer = super.render(this.parent, 'div', null, ['class', 'chart__container']);
  }

  getData() {
    console.log('Give me some data...');
  }

  // addScrollbar(dataLabels) {
  //   new Slider('.diagram', 1, 2).init(dataLabels);
  // }

  init(labelName = 'Daily Cases') {
    this.chartContainer.innerHTML = '';
    this.canvas = super.render(this.chartContainer, 'canvas', null, ['id', 'chart']);

    const ctx = this.canvas.getContext('2d');

    const chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'rgb(189, 189, 189)',
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
        borderColor: dataObj[labelName].color,
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
          // distribution: 'series',
          gridLines: {
            color: '#9e9e9e',
            borderDash: [2, 5],
            offsetGridLines: true,
          },
          time: {
            unit: 'month',
            unitStepSize: 1,
            // stepSize: 2,
            // bounds: 'ticks',
            tooltipFormat: "MM-DD-YYYY",
            displayFormats: {
              month: "MMMM",
            },
          },
          ticks: {
            min: dataObj[labelName].labels[0],
            max: dataObj[labelName].labels[dataObj[labelName].labels.length - 1],
            // beginAtZero: true,
            // source: 'data',
            fontColor: '#9e9e9e',
          },
          scaleLabel: {
            display: false,
            labelString: "Time in Days",
            fontColor: "red",
          }
        }]
      }
    };

    const myChart = new Chart(ctx, {
      type: dataObj[labelName].type,
      data: {
        labels: dataObj[labelName].labels,
        datasets: [{
          label: labelName,
          data: dataObj[labelName].data,
          fill: false,
          // lineTension: 0,
          // cubicInterpolationMode: 'monotone',
          borderWidth: labelName === 'bar' ? 1 : 0.5,
          pointRadius: 2,
          pointHoverRadius: 5,
          pointHitRadius: 5,
          backgroundColor: dataObj[labelName].color,
          hoverBackgroundColor: '#f1c400',
          hoverBorderColor: dataObj[labelName].color,
          hoverBorderWidth: 2,
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 'flex',
          maxBarThickness: 10,
          borderColor: dataObj[labelName].color,
        }]
      },
      options: chartOptions,
    });

    myChart.update();

    // Нужно ли будет снимать здесь обработчик?
    window.addEventListener('resize', () => {
      console.log('resize');
      myChart.resize();
    });

    return this;
  }

  render() {
    this.init();
    new CreateBtnFullScreen('.diagram').render();

    return this;
  }
}