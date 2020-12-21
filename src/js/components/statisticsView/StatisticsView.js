export default class StatisticsView {

    constructor(
        dataStatistics,
        dataPopulation,
        isCountry = false,
        isOneDay = false,
        isHundredK = false
    ) {
        this.nameCountry = null;
        this.res = {};
        this.resPopulation = {};
        this.setNewValue(dataStatistics, dataPopulation);
        this.isCountry = isCountry;
        this.isOneDay = isOneDay;
        this.isHundredK = isHundredK;
        this.dataStatistics = dataStatistics;
        this.dataPopulation = dataPopulation;
    }

    setNewValue(dataStatistics, dataPopulation) {

        this.Country = dataStatistics.Country; //
        this.NewConfirmed = dataStatistics.NewConfirmed; //случаи заражения за последние отчетные сутки
        this.TotalConfirmed = dataStatistics.TotalConfirmed;//общее количество зараженных
        this.NewDeaths = dataStatistics.NewDeaths;//количество умерших за последние отчетные сутки
        this.TotalDeaths = dataStatistics.TotalDeaths;//общее количество умерших
        this.NewRecovered = dataStatistics.NewRecovered;//количество выздоровевших за последние отчетные сутки
        this.TotalRecovered = dataStatistics.TotalRecovered;// общее количество выздоровевших

        if (dataPopulation === undefined) {
            this.population = 7855350180;
        } else {
            this.population = dataPopulation.population;
            this.flag = dataPopulation.flag;
            this.name = dataPopulation.name;
        }


    };

    setCountry(country) { // название страны, а не код страны
        this.isCountry = true;
        this.nameCountry = country.textContent.replace(/[0-9]/g, '');
        this.res = this.dataStatistics.Countries.find(({ Country }) => Country === this.nameCountry);
        this.resPopulation = this.dataPopulation.find(({ name }) => name === this.nameCountry);
        this.setNewValue(this.res, this.resPopulation);
        this.render();
    }

    clickBtn() {
        const allBtn = document.querySelectorAll('.all_btn');
        const absoluteBtn = document.querySelectorAll('.absolute_btn');
        const imgWorldBtn = document.querySelector('.world_right');

        allBtn.forEach((el) => {
            el.addEventListener('click', () => {
                this.isOneDay = !this.isOneDay;
                this.Country ? this.setNewValue(this.res) : this.setNewValue(this.dataStatistics);
                this.render();
            });
        });

        absoluteBtn.forEach((e) => {
            e.addEventListener('click', () => {
                this.isHundredK = !this.isHundredK;
                this.Country ? this.setNewValue(this.res) : this.setNewValue(this.dataStatistics);
                this.render();
            });
        });
        imgWorldBtn.addEventListener('click', () => {
          this.isCountry = false;
          this.setNewValue(this.dataStatistics);
          this.render();
        });
    };

    render() {
        const worldContent = document.querySelector('.world_content'),
            allContent = document.querySelector('.all_content'),
            absoluteContent = document.querySelector('.absolute_content'),
            confirmedContent = document.querySelector('.informStatistics_confirmed_content'),
            deathsContent = document.querySelector('.informStatistics_deaths_content'),
            recoveredContent = document.querySelector('.informStatistics_recovered_content'),
            globalCases = document.querySelector('.global_cases'),
            worldRight = document.querySelector('.world_right');


        let contentConfirmed = '',
            contentDeaths = '',
            contentRecovered = '',
            contentAll = '',
            contentAbsolute = '',
            styleTitle = '',
            rightWorld = '';

        if (this.isHundredK) contentAbsolute = '100K';
        else contentAbsolute = 'Absolute';


        if (this.isCountry) {
            styleTitle = `${this.Country} <img src="${this.flag}" alt="flag" width="40px" height="30px" class ="imgFlag">`;
            rightWorld = `<img src="https://raw.githubusercontent.com/SovanMarat/game_img/main/3/world2.png" alt="flag" width="45px" height="35px" class ="imgWorld imgWorld_link">`;
        }
        else styleTitle = `World <img src="https://raw.githubusercontent.com/SovanMarat/game_img/main/3/world2.png" alt="flag" width="45px" height="35px" class ="imgWorld">`;
        //`<img src="../../../public/arrow-left.svg" alt="flag" width="20px">`;
        //https://raw.githubusercontent.com/SovanMarat/game_img/1c1ff271f56ffc75a294597a16c666b4f91a03a7/3/arrow-left.svg


        if (this.isOneDay && !this.isHundredK) {
            contentConfirmed = this.NewConfirmed;
            contentDeaths = this.NewDeaths;
            contentRecovered = this.NewRecovered;
            contentAll = `Last day`;
        }

        if (!this.isOneDay && !this.isHundredK) {
            contentConfirmed = this.TotalConfirmed;
            contentDeaths = this.TotalDeaths;
            contentRecovered = this.TotalRecovered;
            contentAll = 'In all';
        }

        if (this.isOneDay && this.isHundredK) {
            contentConfirmed = Math.ceil(this.NewConfirmed / (this.population / 100000));
            contentDeaths = Math.ceil(this.NewDeaths / (this.population / 100000));
            contentRecovered = Math.ceil(this.NewRecovered / (this.population / 100000));
            contentAll = 'Last day';
        }

        if (!this.isOneDay && this.isHundredK) {
            contentConfirmed = Math.ceil(this.TotalConfirmed / (this.population / 100000));
            contentDeaths = Math.ceil(this.TotalDeaths / (this.population / 100000));
            contentRecovered = Math.ceil(this.TotalRecovered / (this.population / 100000));
            contentAll = 'In all';
        }
        //
        confirmedContent.innerHTML = contentConfirmed;
        deathsContent.innerHTML = contentDeaths;
        recoveredContent.innerHTML = contentRecovered;
        globalCases.innerHTML = `Global Cases ${this.TotalConfirmed}`;
        worldContent.innerHTML = styleTitle;
        allContent.innerHTML = contentAll;
        absoluteContent.innerHTML = contentAbsolute;
        worldRight.innerHTML = rightWorld;


    }

    init(){
        this.render();
        this.clickBtn();
    }
}