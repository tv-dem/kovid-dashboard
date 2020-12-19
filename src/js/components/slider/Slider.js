import '../../../styles/graph.scss';
import UI from '../UI/UI';

export default class Slider extends UI {
  constructor(parentSelector, slidesToScroll = 1, slidesToShow = 3) {
    super();
    this.parent = document.querySelector(parentSelector);
    this.scrollContainer = super.render(this.parent, 'div', null, ['class', 'scroll__container']);
    this.slidesToScroll = slidesToScroll;
    this.slidesToShow = slidesToShow;
    this.pageCounter = 0;
  }

  init(dataLabels) {
    this.scrollContainer.innerHTML = '';
    this.scrollLeftArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__left-arrow']);
    this.leftArrow = super.render(this.scrollLeftArrow, 'img', null, ['src', '../../../../public/arrow-left.svg'], ['alt', 'scroll left arrow']);
    this.scrollNav = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__nav']);
    this.scrollTrack = super.render(this.scrollNav, 'div', null, ['class', 'scroll__track']);
    const itemWidth = 100 / this.slidesToShow;
    // Render item with required width
    dataLabels.forEach((labelName) => super.render(this.scrollTrack, 'div', labelName).style.minWidth = `${itemWidth}%`);
    this.scrollTrack.querySelector('div').classList.add('active');
    this.scrollRightArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__right-arrow']);
    this.rightArrow = super.render(this.scrollRightArrow, 'img', null, ['src', '../../../../public/arrow-right.svg'], ['alt', 'scroll right arrow']);

    this.movePosition = this.slidesToScroll * this.scrollTrack.querySelector('div').clientWidth;

    // Handle event
    this.scrollLeftArrow.addEventListener('click', this.clickBtnLeftHandler.bind(this, this.scrollTrack, this.movePosition));
    this.scrollRightArrow.addEventListener('click', this.clickBtnRightHandler.bind(this, this.scrollTrack, this.movePosition, dataLabels.length - this.slidesToShow));
    return this;
  }

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
