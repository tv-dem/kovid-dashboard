export default class UI {
  constructor() {
    this.parentForBtnFullScreen = null;
    this.classForBtnFullScreen = null;
    this.ModalWindowComponent = null;
    this.modalWindowData = null;
    this.modalWindowStatus = null;
    this.componentFullScreen = null;
    this.Slider = null;
    this.isSliderUsed = null;
  }

  setParamsForBtnFullScreen(parentSelector, classValue) {
    this.parentForBtnFullScreen = document.querySelector(parentSelector);
    this.classForBtnFullScreen = classValue;
  }

  setModalWindowComponent(instance) {
    this.ModalWindowComponent = instance;
  }

  updateDataForModalWindow(data) {
    this.modalWindowData = data;
  }

  setModalWindowStatus() {
    this.modalWindowStatus = true;
  }

  initBtnFullScreen() {
    const btnFullScreenContainer = UI.renderElement(this.parentForBtnFullScreen, 'div', null, ['class', 'btn-full-screen__container']);
    btnFullScreenContainer.classList.add(this.classForBtnFullScreen);
    UI.renderElement(btnFullScreenContainer, 'img', null, ['src', '../../../public/full-screen-button.svg'], ['alt', 'button open full screen']);
  }

  showFullScreenBtn() {
    document.querySelector(`.${this.classForBtnFullScreen}`).classList.add('active');
  }

  hideFullScreenBtn() {
    document.querySelector(`.${this.classForBtnFullScreen}`).classList.remove('active');
  }

  clickSliderItemHandler({ target }) {
    const menuItems = document.querySelectorAll('.scroll__track div');
    menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
    target.classList.add('active');
    this.componentFullScreen.initGraph(target.textContent);
  }

  openModalWindow() {
    UI.createFullScreenPopUp();
    this.componentFullScreen = new this.ModalWindowComponent();
    this.componentFullScreen.setModalWindowStatus();
    this.componentFullScreen.init('.modal', this.modalWindowData);

    if (this.isSliderUsed) {
      const sliderItemKeys = ['Daily Cases', 'Daily Deaths', 'Recovered Cases', 'Cumulative Cases on 100.000', 'Cumulative Deaths on 100.000', 'Cumulative Recovered on 100.000'];
      new this.Slider('.modal', 1, 2).init(sliderItemKeys);
      document.querySelector('.modal .scroll__track')
        .addEventListener('click', (event) => this.clickSliderItemHandler(event));
    }

    const btnCloseModal = document.querySelector(`.modal__container .${this.classForBtnFullScreen}`);
    btnCloseModal.querySelector('img').src = '../public/close-button.svg';
    document.querySelector('.modal').addEventListener('mouseenter', () => btnCloseModal.classList.add('active'));
    document.querySelector('.modal').addEventListener('mouseleave', () => btnCloseModal.classList.remove('active'));
    btnCloseModal.addEventListener('click', () => {
      const modal = document.querySelector('.modal__container');
      while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
      }
      modal.parentNode.removeChild(modal);
    });
  }

  closeModalWindow() {
    document.querySelector(`.${this.classForBtnFullScreen}`).remove('active');
  }

  setHandlers() {
    if (!this.modalWindowStatus) {
      const btnFullScreen = document.querySelector(`.${this.classForBtnFullScreen}`);
      const parent = document.querySelector(this.parentSelector);

      parent.addEventListener('mouseenter', () => this.showFullScreenBtn());
      parent.addEventListener('mouseleave', () => this.hideFullScreenBtn());
      btnFullScreen.addEventListener('click', () => this.openModalWindow());
    }
  }

  renderBtnFullScreen() {
    this.initBtnFullScreen();
    this.setHandlers();
  }

  static createFullScreenPopUp() {
    const parentElement = document.body;
    const modalContainer = UI.renderElement(parentElement, 'div', null, ['class', 'modal__container']);
    const modalWindow = UI.renderElement(modalContainer, 'div', null, ['class', 'modal']);
    const headerContainer = UI.renderElement(modalWindow, 'div', null, ['class', 'modal__header']);
    UI.renderElement(headerContainer, 'div', null, ['class', 'modal__header-logo']);
    const titleText = 'COVID-19 Dashboard by the Center for RSSchool';
    UI.renderElement(headerContainer, 'p', titleText, ['class', 'modal__header-title']);
    document.body.style.overflow = 'hidden';
  }

  static renderElement(parent, tagName, innerHtml = null, ...attributes) {
    const element = document.createElement(tagName);

    if (attributes.length) {
      attributes.forEach(([attribute, value]) => {
        element.setAttribute(attribute, value);
      });
    }

    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    parent.append(element);

    return element;
  }
}
