import '../../../styles/_graph.scss';
import Chart from 'chart.js';
import UI from '../UI/UI';

export default class Graph extends UI {
  constructor(parentSelector, dataObj) {
    super();
    this.parentSelector = null;
    this.parent = null;
    this.chartContainer = null;
    this.data = null;
    this.isModal = false;
  }

  init(parentSelector, dataObj) {
    this.parentSelector = parentSelector;
    this.parent = document.querySelector(parentSelector);
    this.data = dataObj;
    this.chartContainer = UI.renderElement(this.parent, 'div', null, ['class', 'chart__container']);

    this.render();
  }

  chooseCountry(dataObj) {
    this.data = dataObj;
    this.initGraph();
  }

  initGraph(labelName = 'Daily Cases') {
    this.chartContainer.innerHTML = '';
    this.canvas = UI.renderElement(this.chartContainer, 'canvas', null, ['id', 'chart']);

    const ctx = this.canvas.getContext('2d');

    const chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'rgb(189, 189, 189)',
        },
      },
      tooltips: {
        intersect: true,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        titleFontColor: 'rgb(0, 0, 0)',
        titleAlign: 'center',
        bodyFontColor: 'rgb(0, 0, 0)',
        yPadding: 2,
        caretPadding: 10,
        borderColor: this.data[labelName].color,
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
          },
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
            tooltipFormat: 'MM-DD-YYYY',
            displayFormats: {
              month: 'MMMM',
            },
          },
          ticks: {
            min: this.data[labelName].labels[0],
            max: this.data[labelName].labels[this.data[labelName].labels.length - 1],
            fontColor: '#9e9e9e',
          },
          scaleLabel: {
            display: false,
            labelString: 'Time in Days',
            fontColor: 'red',
          },
        }],
      },
    };

    const myChart = new Chart(ctx, {
      type: this.data[labelName].type,
      data: {
        labels: this.data[labelName].labels,
        datasets: [{
          label: `${labelName} ${this.data[labelName].country}`,
          data: this.data[labelName].data,
          fill: false,
          // cubicInterpolationMode: 'monotone',
          borderWidth: labelName === 'bar' ? 1 : 0.5,
          pointRadius: 2,
          pointHoverRadius: 5,
          pointHitRadius: 5,
          backgroundColor: this.data[labelName].color,
          hoverBackgroundColor: '#f1c400',
          hoverBorderColor: this.data[labelName].color,
          hoverBorderWidth: 2,
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 'flex',
          maxBarThickness: 10,
          borderColor: this.data[labelName].color,
        }],
      },
      options: chartOptions,
    });
    myChart.update();

    return this;
  }

  render() {
    this.initGraph();
    this.setParamsForBtnFullScreen(this.parentSelector, 'js-graph');
    this.setModalWindowComponent(Graph);
    this.updateDataForModalWindow(this.data);
    this.renderBtnFullScreen();

    return this;
  }
}
