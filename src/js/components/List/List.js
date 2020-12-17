import UI from '../UI/UI';
import  './_list.scss'
import  Connector from './../connector/connector'
import {URL_STATISTICS} from "../constants/constants";



class List extends UI{
    constructor(dataList, globalData){
        super()
        this.globalData = globalData;
        this.data = dataList.sort((a, b) => this.sortDescending(a,b,'TotalConfirmed'));
        this.activeData = this.data;

        // может быть TotalDeaths TotalRecovered TotalConfirmed NewConfirmed NewDeaths NewRecovered определяет какое поле брать для отрисовки  сортировки
        this.activeType = 'TotalConfirmed'
        // флаг для определения делать ли пересчет на 100 человек при отрисовке
        this.isOnHudredCount = false

        this.btnSortOnClick.bind(this)
    }

    sortDescending(a, b, param){
        return a[param] < b[param] ? 1 : -1;
    }
    sortAscending(a, b, param){
        return a[param] > b[param] ? 1 : -1;
    }

    // в этот метод можно будет передать коллбеки, которые выполнятся по нажатию
    liOnclickHandler(currentTarget){
        if (this.actvieList &&
            this.actvieList !== currentTarget)
            this.actvieList.classList.remove('list__li_active');
        this.actvieList = currentTarget;
        this.actvieList.classList.toggle('list__li_active')
        /*
         * получаем данные по стране (currenrItem) + глобальные данные (this.globalData)
         */
        const itemIndex = Number(currentTarget.dataset.index);
        /* пример соержания currentIndex:
            Country: "Italy"
            CountryCode: "IT"
            Date: "2020-12-17T02:32:20Z"
            NewConfirmed: 14839
            NewDeaths: 846
            NewRecovered: 25789
            Premium: {}
            Slug: "italy"
            TotalConfirmed: 1870576
            TotalDeaths: 65857
            TotalRecovered: 1141406
         */
        const currentItem = this.activeData[itemIndex]
        /* пример соержания this.globalData:
            NewConfirmed: 625397
            NewDeaths: 13998
            NewRecovered: 358388
            TotalConfirmed: 73465019
            TotalDeaths: 1635326
            TotalRecovered: 41606907
         */
    }

    btnSortOnClick({target}, callback, param){
        this.activeData.sort((a, b) => callback(a,b,param))
        this.clearList()
        this.renderList(this.listParent)
        this.enabledBtn.classList.remove('list__button_active');
        this.enabledBtn = target;
        target.classList.add('list__button_active');
    }

    clearList(){
        while(this.listParent.hasChildNodes()){
            this.listParent.firstChild.remove()
        }
    }

    renderComponent(parent){
        this.parent = parent;

        const input = this.render(this.parent, 'input', null, ['class', "list__input"])

        input.addEventListener('input', ({target}) => {
            this.activeData = this.data.filter(el => el.Country.toLowerCase().includes(target.value));
            this.clearList()
            this.renderList(this.listParent)
        })

        const sortWrapper = this.render(this.parent, 'div', null, ['class', 'list__sort-wrapper']);

        this.render(sortWrapper, 'span', 'sort by:', ['class', 'list__sort-by'])
        const btnCountend = this.render(sortWrapper, 'button', 'countend', ['class', 'list__button'])
        const btnCountry = this.render(sortWrapper, 'button', 'country', ['class', 'list__button'])

        btnCountend.addEventListener('click', (e) => {this.btnSortOnClick(e, this.sortDescending, 'TotalConfirmed')})
        btnCountry.addEventListener('click', (e) => {this.btnSortOnClick(e, this.sortAscending,'Country')})

        const typeBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__type-btn-wrapper']);
        const illCases  = this.render(typeBtnWrapper, 'button', 'ill', ['class', 'list__button'])
        const recoveryCases  = this.render(typeBtnWrapper, 'button', 'recovery', ['class', 'list__button'])
        const deathCases  = this.render(typeBtnWrapper, 'button', 'death', ['class', 'list__button'])

        const CasesBtnWrapper = this.render(this.parent, 'div', null, ['class', 'list__cases-btn-wrapper']);
        const lastDayCases  = this.render(CasesBtnWrapper, 'button', 'last Day', ['class', 'list__button'])
        const generalCases  = this.render(CasesBtnWrapper, 'button', 'general', ['class', 'list__button'])
        const onHundredGeneralCases  = this.render(CasesBtnWrapper, 'button', 'on 100 people in general', ['class', 'list__button'])
        const onHundredDayCases  = this.render(CasesBtnWrapper, 'button', 'on 100 people on last day', ['class', 'list__button'])

        illCases.classList.add('list__button_active')
        generalCases.classList.add('list__button_active')
        btnCountend.classList.add('list__button_active');

        this.enabledBtn = btnCountend;
        this.typeCases = illCases;
        this.countCases = generalCases;

        const wrapper = this.render(this.parent, 'div', null, ['class', "list__wrapper"])
        const ul = this.render(wrapper, 'ul', null,['class', "list__ul"])

        this.renderList(ul);
    }

    renderList(listParent){
        this.listParent = listParent;

        this.activeData.forEach((item, index) => {
            const li = this.render(this.listParent, 'li',null, ['class', 'list__li'], ['data-index', index]);
            this.render(li, 'span', String(item.TotalConfirmed));
            this.render(li, 'span', String(item.Country));
            this.render(li, 'img', null, ['src', `https://www.countryflags.io/${item.CountryCode}/shiny/64.png`]);
            li.addEventListener('click', ({currentTarget}) => this.liOnclickHandler(currentTarget))
        })

    }
}

let conn = new Connector(URL_STATISTICS)
conn.getStatistics()
    .then((res)=>{
        const list = new List(res.Countries, res.Global)
        list.renderComponent(document.querySelector('#country_list'));
    })
