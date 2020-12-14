import '../../../styles/graph.scss';
import Chart from 'chart.js';
import UI from '../UI/UI';
import Slider from '../slider/Slider';


export default class Graph extends UI {
  constructor(parentSelector) {
    super();
    this.parent = document.querySelector(parentSelector);
  }

  addScrollbar(dataLabels) {
    // this.scrollContainer = super.render(this.parent, 'div', null, ['class', 'scroll__container']);
    // this.scrollLeftArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__left-arrow']);
    // this.leftArrow = super.render(this.scrollLeftArrow, 'img', null, ['src', ''], ['alt', '']);
    // this.scrollNav = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__nav']);
    // this.scrollTrack = super.render(this.scrollNav, 'div', null, ['class', 'scroll__track']);
    // dataLabels.forEach((labelName) => super.render(this.scrollTrack, 'div', labelName));
    // this.scrollRightArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__right-arrow']);
    // this.rightArrow = super.render(this.scrollRightArrow, 'img', null, ['src', ''], ['alt', '']);

    new Slider('.diagram', 1, 3).init(dataLabels);
  }

  init() {
    this.chartContainer = super.render(this.parent, 'div', null, ['class', 'chart__container']);
    this.canvas = super.render(this.chartContainer, 'canvas', null, ['id', 'chart']);

    const ctx = this.canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    myChart.update();

    // example
    const data = ['life', 'death', 'all', 'test', 'test', 'test'];
    this.addScrollbar(data);
  }

  render() {
    console.log('render work');
    this.init();
    // this.parent.insertAdjacentElement('beforeend', );
  }
}