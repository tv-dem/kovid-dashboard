import '../../../styles/_graph.scss';
import UI from '../UI/UI';
import { graph } from '../../../index';
import clickSliderItemHandler from '../../utils/clickSliderItemHandler';

export default class Slider extends UI {
  constructor(parentSelector, slidesToScroll = 1, slidesToShow = 3) {
    super();
    this.parent = document.querySelector(parentSelector);
    this.scrollContainer = UI.renderElement(this.parent, 'div', null, ['class', 'scroll__container']);
    this.slidesToScroll = slidesToScroll;
    this.slidesToShow = slidesToShow;
    this.pageCounter = 0;
  }

  init(dataLabels) {
    this.scrollContainer.innerHTML = '';
    this.scrollLeftArrow = UI.renderElement(this.scrollContainer, 'div', null, ['class', 'scroll__left-arrow']);
    this.leftArrow = UI.renderElement(this.scrollLeftArrow, 'img', null, ['src', '../../../../public/arrow-left.svg'], ['alt', 'scroll left arrow']);
    this.scrollNav = UI.renderElement(this.scrollContainer, 'div', null, ['class', 'scroll__nav']);
    this.scrollTrack = UI.renderElement(this.scrollNav, 'div', null, ['class', 'scroll__track']);
    const itemWidth = 100 / this.slidesToShow;

    // Render item with required width
    dataLabels.forEach((labelName) => {
      const sliderItem = UI.renderElement(this.scrollTrack, 'div', labelName);
      sliderItem.style.minWidth = `${itemWidth}%`;
    });
    this.scrollTrack.querySelector('div').classList.add('active');
    this.scrollRightArrow = UI.renderElement(this.scrollContainer, 'div', null, ['class', 'scroll__right-arrow']);
    this.rightArrow = UI.renderElement(this.scrollRightArrow, 'img', null, ['src', '../../../../public/arrow-right.svg'], ['alt', 'scroll right arrow']);

    this.movePosition = this.slidesToScroll * this.scrollTrack.querySelector('div').clientWidth;

    // Handle event
    this.scrollLeftArrow.addEventListener('click', this.clickBtnLeftHandler.bind(this, this.scrollTrack, this.movePosition));
    this.scrollRightArrow.addEventListener('click', this.clickBtnRightHandler.bind(this, this.scrollTrack, this.movePosition, dataLabels.length - this.slidesToShow));

    document.querySelector('.scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));

    return this;
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */
  /* eslint no-useless-return: 0 */
  clickBtnLeftHandler(track, movePosition) {
    if (this.pageCounter > 0) {
      this.pageCounter -= 1;
    }

    track.style.transform = `translateX(${-movePosition * this.pageCounter}px)`;

    if (this.pageCounter === 0) {
      return;
    }
  }

  clickBtnRightHandler(track, movePosition, count) {
    if (this.pageCounter < count) {
      this.pageCounter += 1;
    }

    track.style.transform = `translateX(${-movePosition * this.pageCounter}px)`;

    if (this.pageCounter === count) {
      return;
    }
  }
}
