import UI from '../UI/UI';

import keyboardLink from '../virtual-keyboard/index';
import './_list.scss';
// import Emitter from '../../utils/Emitter.js'


export default class List extends UI {
  constructor(dataList, globalData) {
    super();
    this.globalData = globalData;

    console.log(dataList, globalData);
    this.data = dataList.sort((a, b) => this.sortDescending(a, b, 'TotalConfirmed'));
    this.activeData = this.data;
    this.activeType = 'Confirmed';
    this.totalOrNew = 'Total';
    this.isOnHudredCount = false;
    this.sortState = 'countend';

    this.btnSortOnClick.bind(this);
  }

  sortDescending(a, b, param) {
    return a[param] < b[param] ? 1 : -1;
  }

  sortAscending(a, b, param) {
    return a[param] > b[param] ? 1 : -1;
  }

  liOnclickHandler(currentTarget) {
    if (this.actvieList
            && this.actvieList !== currentTarget) this.actvieList.classList.remove('list__li_active');
    this.actvieList = currentTarget;
    this.actvieList.classList.toggle('list__li_active');
    // for use Emitter
    // const itemIndex = Number(currentTarget.dataset.index);
    // const { CountryCode } = this.activeData[itemIndex];
    // Emitter.emit('chooseListCountry', CountryCode);
  }

  chooseCountry(data) {
    this.activeData = this.data.filter(({ CountryCode }) => CountryCode === data);
    this.clearList();
    this.renderList(this.listParent);
    this.activeData = this.data;
  }

  btnSortOnClick({ target }, callback, param) {
    this.sortState = param === 'Country' ? 'country' : 'counted';
    this.activeData.sort((a, b) => callback(a, b, param));
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

    this.activeData.sort((a, b) => ((this.sortState === 'country') ? this.sortAscending(a, b, 'Country')
      : this.sortDescending(a, b, this.totalOrNew + this.activeType)));
    this.clearList();
    this.renderList(this.listParent);
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
        this.isOnHudredCount = true;
        break;
      case 'on 100 people on last day':
        this.isOnHudredCount = true;
        break;
      default:
        break;
    }
    this.activeData.sort((a, b) => ((this.sortState === 'country') ? this.sortAscending(a, b, 'Country')

      : this.sortDescending(a, b, this.totalOrNew + this.activeType)));
    this.clearList();
    this.renderList(this.listParent);
  }

  clearList() {
    while (this.listParent.hasChildNodes()) {
      this.listParent.firstChild.remove();
    }
  }

  renderComponent(parent) {
    this.parent = parent;
    const inputWrapper = this.render(this.parent, 'div', null, ['class', 'list__input-wrapper']);
    const input = this.render(inputWrapper, 'input', null, ['class', 'list__input']);

    this.kb = keyboardLink(input);
    this.kb.render(document.body);
    const img = this.render(inputWrapper, 'img', null, ['src', '../../../../public/pupa.svg'], ['class', 'list__keyboard']);
    img.addEventListener('click', () => {
      this.kb.hideView();
    });

    input.addEventListener('input', ({ target }) => {
      this.activeData = this.data.filter((el) => el.Country.toLowerCase().includes(target.value));
      this.clearList();
      this.renderList(this.listParent);
    });

    const sortWrapper = this.render(this.parent, 'div', null, ['class', 'list__sort-wrapper']);

    this.render(sortWrapper, 'span', 'sort by:', ['class', 'list__sort-by']);
    const btnCountend = this.render(sortWrapper, 'button', 'countend', ['class', 'list__button']);
    const btnCountry = this.render(sortWrapper, 'button', 'country', ['class', 'list__button']);

    btnCountend.addEventListener('click', (e) => { this.btnSortOnClick(e, this.sortDescending, this.totalOrNew + this.activeType); });
    btnCountry.addEventListener('click', (e) => { this.btnSortOnClick(e, this.sortAscending, 'Country'); });

    const typeBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__type-btn-wrapper']);
    const illCases = this.render(typeBtnWrapper, 'button', 'ill', ['class', 'list__button']);

    this.render(typeBtnWrapper, 'button', 'recovery', ['class', 'list__button']);
    this.render(typeBtnWrapper, 'button', 'death', ['class', 'list__button']);


    typeBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) this.btnTypeOnClick(target);
    });

    const CasesBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__cases-btn-wrapper']);

    this.render(CasesBtnWrapper, 'button', 'last Day', ['class', 'list__button']);
    const generalCases = this.render(CasesBtnWrapper, 'button', 'general', ['class', 'list__button']);
    this.render(CasesBtnWrapper, 'button', 'on 100 people in general', ['class', 'list__button']);
    this.render(CasesBtnWrapper, 'button', 'on 100 people on last day', ['class', 'list__button']);


    CasesBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) this.btnCasesOnClick(target);
    });

    illCases.classList.add('list__button_active');
    generalCases.classList.add('list__button_active');
    btnCountend.classList.add('list__button_active');

    this.enabledBtn = btnCountend;
    this.typeCases = illCases;
    this.countCases = generalCases;

    const wrapper = this.render(this.parent, 'div', null, ['class', 'list__wrapper']);
    const ul = this.render(wrapper, 'ul', null, ['class', 'list__ul']);

    this.renderList(ul);
  }


  renderList(listParent) {
    this.listParent = listParent;
    this.activeData.forEach((item, index) => {
      const li = this.render(this.listParent, 'li', null, ['class', 'list__li'], ['data-index', index]);
      this.render(li, 'span', String(item[this.totalOrNew + this.activeType]));
      this.render(li, 'span', String(item.Country));

      const img = this.render(li, 'img', null, ['src', `https://www.countryflags.io/${item.CountryCode}/shiny/64.png`]);
      img.addEventListener('click', () => {
        document.querySelector('.show-kbd').classList.toggle('show-kbd_active');
        this.kb.container.classList.toggle('keyboard_active');
      });

      li.addEventListener('click', ({ currentTarget }) => this.liOnclickHandler(currentTarget));
    });
  }
}
