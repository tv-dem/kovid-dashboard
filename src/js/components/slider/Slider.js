import '../../../styles/graph.scss';
import UI from '../UI/UI';

export default class Slider extends UI {
  constructor(parentSelector, slidesToScroll = 1, slidesToShow = 3) {
    super();
    this.parent = document.querySelector(parentSelector);
    this.slidesToScroll = slidesToScroll;
    this.slidesToShow = slidesToShow;
    this.pageCounter = 0;
  }

  init(dataLabels) {
    this.scrollContainer = super.render(this.parent, 'div', null, ['class', 'scroll__container']);
    this.scrollLeftArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__left-arrow']);
    this.leftArrow = super.render(this.scrollLeftArrow, 'img', null, ['src', ''], ['alt', '']);
    this.scrollNav = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__nav']);
    this.scrollTrack = super.render(this.scrollNav, 'div', null, ['class', 'scroll__track']);
    const itemWidth = 100 / this.slidesToShow;
    // Render item with required width
    dataLabels.forEach((labelName) => super.render(this.scrollTrack, 'div', labelName).style.minWidth = `${itemWidth}%`);
    this.scrollTrack.querySelector('div').classList.add('active');
    this.scrollRightArrow = super.render(this.scrollContainer, 'div', null, ['class', 'scroll__right-arrow']);
    this.rightArrow = super.render(this.scrollRightArrow, 'img', null, ['src', ''], ['alt', '']);
    this.movePosition = this.slidesToScroll * this.scrollTrack.querySelector('div').clientWidth;

    // Handle event
    this.scrollLeftArrow.addEventListener('click', this.clickBtnLeftHandler.bind(this, this.scrollTrack, this.movePosition));
    // Вопрос Андрею: Как правильно снимать события в классе?
    this.scrollRightArrow.addEventListener('click', this.clickBtnRightHandler.bind(this, this.scrollTrack, this.movePosition, dataLabels.length - this.slidesToShow));
  }

  clickBtnLeftHandler(track, movePosition) {
    if (this.pageCounter > 0) {
      this.pageCounter -= 1;
    }

    track.style.transform = `translateX(${-movePosition * this.pageCounter}px)`;
    // const menuItems = track.querySelectorAll('div');
    // menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
    // menuItems[this.pageCounter].classList.add('active');

    if (this.pageCounter === 0) {
      return;
    }
  }

  clickBtnRightHandler(track, movePosition, count) {
    if (this.pageCounter < count) {
      this.pageCounter += 1;
    }

    track.style.transform = `translateX(${-movePosition * this.pageCounter}px)`;
    // const menuItems = track.querySelectorAll('div');
    // menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
    // menuItems[this.pageCounter].classList.add('active');

    if (this.pageCounter === count) {
      return;
    }
  }
}