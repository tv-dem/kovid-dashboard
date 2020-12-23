/* eslint import/no-cycle: [0] */
import UI from '../UI/UI';
import keyboardLink from '../virtual-keyboard/index';
import './_list.scss';
import { Emitter } from '../../../index';

export default class List extends UI {
  constructor() {
    super();
    this.data = null;
    this.activeData = null;
    this.activeType = 'Confirmed';
    this.totalOrNew = 'Total';
    this.isOnHudredCount = false;
    this.sortState = 'countend';
    this.dataForModal = null;
    this.parentSelector = null;

    // this.btnSortOnClick.bind(this);
    this.sortByPopulation.bind(this);
  }

  init(parent, input, population) {
    this.dataForModal = input;
    this.parentSelector = parent;

    this.parent = document.querySelector(parent);
    this.globalData = input.Global;
    this.data = input.Countries.sort((a, b) => this.sortDescending(a, b, 'TotalConfirmed'));

    this.population = population;
    this.activeData = this.data;
    this.renderComponent();

    this.setParamsForBtnFullScreen(parent, 'js-list');
    this.setModalWindowComponent(List);
    this.updateDataForModalWindow(this.dataForModal);
    this.renderBtnFullScreen();
  }

  /* eslint max-len: ["error", { "code": 140 }] */
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["sortDescending", "sortAscending"] }] */
  sortDescending(a, b, param) {
    return a[param] < b[param] ? 1 : -1;
  }

  sortAscending(a, b, param) {
    return a[param] > b[param] ? 1 : -1;
  }

  sortByPopulation(a, b, param) {
    return this.recountPeople(a[param], a) < this.recountPeople(b[param], b) ? 1 : -1;
  }

  liOnclickHandler(currentTarget) {
    if (this.actvieList
      && this.actvieList !== currentTarget) this.actvieList.classList.remove('list__li_active');
    this.actvieList = currentTarget;
    this.actvieList.classList.add('list__li_active');
    const itemIndex = Number(currentTarget.dataset.index);
    Emitter.emit('chooseListCountry', this.activeData[itemIndex]);
  }
  chooseCountry(d) {
    let data = d;
    if (data === 'GL') {
      data = 'DK';
    }
    this.activeData = this.data.filter(({ CountryCode }) => CountryCode === data);
    this.clearList();
    this.renderList(this.listParent);
  }

  btnSortOnClick({ target }, callback, param) {
    this.sortState = param === 'Country' ? 'country' : 'counted';
    this.activeData.sort((a, b) => callback.apply(this, [a, b, param]));
    this.clearList();
    this.renderList(this.listParent);
    this.enabledBtn.classList.remove('list__button_active');
    this.enabledBtn = target;
    target.classList.add('list__button_active');
  }

  btnTypeOnClick(target) {
    this.typeCases.classList.remove('list__button_active');
    this.typeCases = target;
    switch (target.textContent) {
      case 'ill':
        this.activeType = 'Confirmed';
        break;
      case 'recovery':
        this.activeType = 'Recovered';
        break;
      case 'death':
        this.activeType = 'Deaths';
        break;
      default:
        break;
    }
    this.typeCases.classList.add('list__button_active');
    let callback = this.isOnHudredCount ? this.sortByPopulation : this.sortDescending;
    if (this.sortState === 'country') {
      callback = this.sortAscending;
    }
    this.btnSortOnClick({
      target: this.enabledBtn,
    }, callback, this.sortState === 'country' ? 'Country' : this.totalOrNew + this.activeType);
    // this.activeData.sort((a, b) => {
    //   if (this.sortState === 'country') {
    //     return this.sortAscending(a, b, 'Country');
    //   }
    //   return !this.isOnHudredCount ? this.sortDescending(a, b, this.totalOrNew + this.activeType) :
    //     this.recountPeople(a, b, this.totalOrNew + this.activeType);
    // });
    // this.clearList();
    // this.renderList(this.listParent);
  }

  btnCasesOnClick(target) {
    this.countCases.classList.remove('list__button_active');
    this.countCases = target;
    this.countCases.classList.add('list__button_active');

    switch (target.textContent) {
      case 'last Day':
        this.totalOrNew = 'New';
        this.isOnHudredCount = false;
        break;
      case 'general':
        this.totalOrNew = 'Total';
        this.isOnHudredCount = false;
        break;
      case 'on 100 people in general':
        this.totalOrNew = 'Total';
        this.isOnHudredCount = true;
        break;
      case 'on 100 people on last day':
        this.totalOrNew = 'New';
        this.isOnHudredCount = true;
        break;
      default:
        break;
    }
    let callback = this.isOnHudredCount ? this.sortByPopulation : this.sortDescending;
    if (this.sortState === 'country') {
      callback = this.sortAscending;
    }
    this.btnSortOnClick({
      target: this.enabledBtn,
    }, callback, this.sortState === 'country' ? 'Country' : this.totalOrNew + this.activeType);
  }

  clearList() {
    while (this.listParent.hasChildNodes()) {
      this.listParent.firstChild.remove();
    }
  }

  renderComponent() {
    // this.parent = parent;
    const inputWrapper = UI.renderElement(this.parent, 'div', null, ['class', 'list__input-wrapper']);
    const input = UI.renderElement(inputWrapper, 'input', null, ['class', 'list__input']);

    this.kb = keyboardLink(input);
    this.kb.render(document.body);
    const img = UI.renderElement(inputWrapper, 'img', null, ['src', '../../../../public/pupa.svg'], ['class', 'list__keyboard']);
    img.addEventListener('click', () => {
      this.kb.hideView();
    });
    this.kb.board.addEventListener('click', (e) => this.onKeyboardClick(e, input, this.kb));
    input.addEventListener('input', ({ target }) => {
      this.activeData = this.data.filter((el) => el.Country.toLowerCase().includes(target.value.toLowerCase()));
      this.clearList();
      this.renderList(this.listParent);
    });

    const sortWrapper = UI.renderElement(this.parent, 'div', null, ['class', 'list__sort-wrapper']);

    UI.renderElement(sortWrapper, 'span', 'sort by:', ['class', 'list__sort-by']);
    const btnCountend = UI.renderElement(sortWrapper, 'button', 'countend', ['class', 'list__button']);
    const btnCountry = UI.renderElement(sortWrapper, 'button', 'country', ['class', 'list__button']);

    const cb = this.isOnHudredCount ? this.sortByPopulation : this.sortDescending;
    btnCountend.addEventListener('click', (e) => { this.btnSortOnClick(e, cb, this.totalOrNew + this.activeType); });
    btnCountry.addEventListener('click', (e) => { this.btnSortOnClick(e, this.sortAscending, 'Country'); });

    const typeBtnWrapper = UI.renderElement(this.parent, 'div', null, ['class', 'list__type-btn-wrapper']);
    const illCases = UI.renderElement(typeBtnWrapper, 'button', 'ill', ['class', 'list__button']);

    UI.renderElement(typeBtnWrapper, 'button', 'recovery', ['class', 'list__button']);
    UI.renderElement(typeBtnWrapper, 'button', 'death', ['class', 'list__button']);

    typeBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) this.btnTypeOnClick(target);
    });

    const CasesBtnWrapper = UI.renderElement(this.parent, 'div', null, ['class', 'list__cases-btn-wrapper']);

    UI.renderElement(CasesBtnWrapper, 'button', 'last Day', ['class', 'list__button']);
    const generalCases = UI.renderElement(CasesBtnWrapper, 'button', 'general', ['class', 'list__button']);
    UI.renderElement(CasesBtnWrapper, 'button', 'on 100 people in general', ['class', 'list__button']);
    UI.renderElement(CasesBtnWrapper, 'button', 'on 100 people on last day', ['class', 'list__button']);

    CasesBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) this.btnCasesOnClick(target);
    });

    illCases.classList.add('list__button_active');
    generalCases.classList.add('list__button_active');
    btnCountend.classList.add('list__button_active');

    this.enabledBtn = btnCountend;
    this.typeCases = illCases;
    this.countCases = generalCases;

    const wrapper = UI.renderElement(this.parent, 'div', null, ['class', 'list__wrapper']);
    const ul = UI.renderElement(wrapper, 'ul', null, ['class', 'list__ul']);

    this.renderList(ul);
  }

  recountPeople(count, { CountryCode }) {
    if (!this.isOnHudredCount) {
      return count;
    }
    const { population } = this.population.find(({ alpha2Code }) => CountryCode === alpha2Code);
    return Math.ceil((count / population) * 100000);
  }

  onKeyboardClick({ target }, input, kb) {
    if (!target.classList.contains('button')) return;
    if (target.textContent === 'enter') {
      kb.hideView();
      return;
    }
    this.activeData = this.data.filter((el) => el.Country.toLowerCase().includes(input.value));
    this.clearList();
    this.renderList(this.listParent);
  }

  renderList(listParent) {
    if (this.actvieList) this.actvieList.classList.add('list__li_active');
    this.listParent = listParent;
    this.activeData.forEach((item, index) => {
      const li = UI.renderElement(this.listParent, 'li', null, ['class', 'list__li'], ['data-index', index]);
      UI.renderElement(li, 'span', this.recountPeople(item[this.totalOrNew + this.activeType], item));
      UI.renderElement(li, 'span', item.Country);
      const img = UI.renderElement(li, 'img', null, ['src', `https://www.countryflags.io/${item.CountryCode}/shiny/64.png`]);
      img.addEventListener('click', () => {
        document.querySelector('.show-kbd').classList.toggle('show-kbd_active');
        this.kb.container.classList.toggle('keyboard_active');
      });

      li.addEventListener('click', ({ currentTarget }) => this.liOnclickHandler(currentTarget));
    });
  }
}
