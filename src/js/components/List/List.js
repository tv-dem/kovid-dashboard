import UI from '../UI/UI';
import './_list.scss';

export default class List extends UI {
  constructor(dataList, globalData, cb) {
    super();
    this.globalData = globalData;
    this.data = dataList.sort((a, b) => List.sortDescending(a, b, 'TotalConfirmed'));
    this.activeData = this.data;
    this.activeType = 'Confirmed';
    this.totalOrNew = 'Total';
    this.isOnHudredCount = false;
    this.sortState = 'countend';
    this.btnSortOnClick.bind(this);
    this.cb = cb;
  }

  setCallBack(cb) {
    this.cb = cb;
  }

  // eslint-disable-next-line class-methods-use-this
  update(date) {
    console.log('Component List, date: ', date);
  }

  static sortDescending(a, b, param) {
    return a[param] < b[param] ? 1 : -1;
  }

  static sortAscending(a, b, param) {
    return a[param] > b[param] ? 1 : -1;
  }

  liOnclickHandler(currentTarget) {
    if (this.actvieList && this.actvieList !== currentTarget) {
      this.actvieList.classList.remove('list__li_active');
    }
    this.actvieList = currentTarget;
    this.actvieList.classList.toggle('list__li_active');
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
    this.activeData.sort((a, b) => ((this.sortState === 'country')
      ? List.sortAscending(a, b, 'Country')
      : List.sortDescending(a, b, this.totalOrNew + this.activeType)));
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
    this.activeData.sort((a, b) => ((this.sortState === 'country')
      ? List.sortAscending(a, b, 'Country')
      : List.sortDescending(a, b, this.totalOrNew + this.activeType)));
    this.clearList();
    this.renderList(this.listParent);

    this.cb(target.textContent);
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
    this.render(inputWrapper, 'img', null, ['src', '../../../../public/pupa.svg'], ['class', 'list__keyboard']);
    const sortWrapper = this.render(this.parent, 'div', null, ['class', 'list__sort-wrapper']);
    this.render(sortWrapper, 'span', 'sort by:', ['class', 'list__sort-by']);
    const btnCountend = this.render(sortWrapper, 'button', 'countend', ['class', 'list__button']);
    const btnCountry = this.render(sortWrapper, 'button', 'country', ['class', 'list__button']);
    const typeBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__type-btn-wrapper']);
    const illCases = this.render(typeBtnWrapper, 'button', 'ill', ['class', 'list__button']);
    this.render(typeBtnWrapper, 'button', 'recovery', ['class', 'list__button']);
    this.render(typeBtnWrapper, 'button', 'death', ['class', 'list__button']);
    const CasesBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__cases-btn-wrapper']);
    this.render(CasesBtnWrapper, 'button', 'last Day', ['class', 'list__button']);
    const generalCases = this.render(CasesBtnWrapper, 'button', 'general', ['class', 'list__button']);
    this.render(CasesBtnWrapper, 'button', 'on 100 people in general', ['class', 'list__button']);
    this.render(CasesBtnWrapper, 'button', 'on 100 people on last day', ['class', 'list__button']);
    illCases.classList.add('list__button_active');
    generalCases.classList.add('list__button_active');
    btnCountend.classList.add('list__button_active');
    const wrapper = this.render(this.parent, 'div', null, ['class', 'list__wrapper']);
    const ul = this.render(wrapper, 'ul', null, ['class', 'list__ul']);
    this.renderList(ul);

    this.enabledBtn = btnCountend;
    this.typeCases = illCases;
    this.countCases = generalCases;

    input.addEventListener('input', ({ target }) => {
      this.activeData = this.data.filter((el) => el.Country.toLowerCase().includes(target.value));
      this.clearList();
      this.renderList(this.listParent);
    });

    btnCountend.addEventListener('click', (e) => {
      this.btnSortOnClick(e, List.sortDescending, this.totalOrNew + this.activeType);
    });

    btnCountry.addEventListener('click', (e) => {
      this.btnSortOnClick(e, List.sortAscending, 'Country');
    });

    typeBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) {
        this.btnTypeOnClick(target);
      }
    });

    CasesBtnWrapper.addEventListener('click', ({ target }) => {
      if (target.classList.contains('list__button')) {
        this.btnCasesOnClick(target);
      }
    });
  }

  renderList(listParent) {
    this.listParent = listParent;
    this.activeData.forEach((item, index) => {
      const li = this.render(this.listParent, 'li', null, ['class', 'list__li'], ['data-index', index]);
      this.render(li, 'span', String(item[this.totalOrNew + this.activeType]));
      this.render(li, 'span', String(item.Country));
      this.render(li, 'img', null, ['src', `https://www.countryflags.io/${item.CountryCode}/shiny/64.png`]);
      li.addEventListener('click', ({ currentTarget }) => this.liOnclickHandler(currentTarget));
    });
  }
}
