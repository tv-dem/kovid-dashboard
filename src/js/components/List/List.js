import UI from '../UI/UI';
import  './_list.scss'

class List extends UI{
    constructor(dataList){
        super()
        this.data = dataList.sort((a, b) => this.sortDescending(a,b,'totalDeaths'));
        this.activeData = this.data;
        this.btnOnClick.bind(this)
    }

    sortDescending(a, b, param){
        return a[param] < b[param] ? 1 : -1;
    }
    sortAscending(a, b, param){
        return a[param] > b[param] ? 1 : -1;
    }

    liOnclickHandler(currentTarget){
        if (this.actvieList &&
            this.actvieList !== currentTarget)
            this.actvieList.classList.remove('list__li_active');
        this.actvieList = currentTarget;
        this.actvieList.classList.toggle('list__li_active');
    }

    btnOnClick({target}, callback, param){
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
            this.activeData = this.data.filter(el => el.country.toLowerCase().includes(target.value));
            this.clearList()
            this.renderList(this.listParent)
        })

        const sortWrapper = this.render(this.parent, 'div', null, ['class', 'list__sort-wrapper']);
        const wrapper = this.render(this.parent, 'div', null, ['class', "list__wrapper"])

        this.render(sortWrapper, 'span', 'sort by:', ['class', 'list__sort-by'])
        const btnCountend = this.render(sortWrapper, 'button', 'countend', ['class', 'list__button'])
        const btnCountry = this.render(sortWrapper, 'button', 'country', ['class', 'list__button'])

        this.enabledBtn = btnCountend;
        this.enabledBtn.classList.add('list__button_active');

        btnCountend.addEventListener('click', (e) => {this.btnOnClick(e, this.sortDescending, 'totalDeaths')})
        btnCountry.addEventListener('click', (e) => {this.btnOnClick(e, this.sortAscending,'country')})

        const description = this.render(wrapper,
            'span',
            'Cases by<br>Country/Region/Sovereignty',
            ['class', "list__description"])

        const ul = this.render(wrapper, 'ul', null,['class', "list__ul"])

        this.renderList(ul);
    }

    renderList(listParent){
        this.listParent = listParent;


        this.activeData.forEach((item) => {
            const li = this.render(this.listParent, 'li',null, ['class', 'list__li']);
            this.render(li, 'span', item.totalDeaths);
            this.render(li, 'span', item.country);
            li.addEventListener('click', ({currentTarget}) => this.liOnclickHandler(currentTarget))
        })

    }
}

const list = new List([
    {
        country: 'aaafdff',
        totalDeaths: 53432
    },
    {
        country: 'afafdff',
        totalDeaths: 123423
    },
    {
        country: 'baafdff',
        totalDeaths: 4234234
    },
    {
        country: 'Asaafdff',
        totalDeaths: 4234234
    },
    {
        country: 'afafdff',
        totalDeaths: 3234324
    },
    {
        country: 'Baafdff',
        totalDeaths: 234234
    },
    {
        country: 'baafdff',
        totalDeaths: 4234234
    },
    {
        country: 'Asaafdff',
        totalDeaths: 4234234
    },
    {
        country: 'afafdff',
        totalDeaths: 3234324
    },
    {
        country: 'Baafdff',
        totalDeaths: 234234
    },
    {
        country: 'baafdff',
        totalDeaths: 4234234
    },
    {
        country: 'Asaafdff',
        totalDeaths: 4234234
    },
    {
        country: 'afafdff',
        totalDeaths: 3234324
    },
    {
        country: 'Baafdff',
        totalDeaths: 234234
    }
]);

list.renderComponent(document.querySelector('#country_list'));
