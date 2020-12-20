export default class StatisticsView {
    isCountry = false;
    isOneDay = false;
    isHundredK = false;
    constructor(dataStatistics, dataPopulation) {
        this.setNewValue(dataStatistics, dataPopulation);
    }

    setNewValue(dataStatistics, dataPopulation) {
        this.Country = dataStatistics.Country; //
        this.NewConfirmed = dataStatistics.NewConfirmed; //случаи заражения за последние отчетные сутки
        this.TotalConfirmed = dataStatistics.TotalConfirmed;//общее количество зараженных
        this.NewDeaths = dataStatistics.NewDeaths;//количество умерших за последние отчетные сутки
        this.TotalDeaths = dataStatistics.TotalDeaths;//общее количество умерших
        this.NewRecovered = dataStatistics.NewRecovered;//количество выздоровевших за последние отчетные сутки
        this.TotalRecovered = dataStatistics.TotalRecovered;// общее количество выздоровевших

        if (dataPopulation === undefined) this.population = 7855350180;
        else {
            this.population = dataPopulation.population;
            this.flag = dataPopulation.flag;
            this.name = dataPopulation.name;
        }
    };

    // getHundredK() {
    //     let contentConfirmed = '';
    //     let contentDeaths = '';
    //     let contentRecovered = '';
    //     contentConfirmed = this.NewConfirmed / (this.population / 100000);
    //     contentDeaths = this.NewDeaths / (this.population / 100000);
    //     contentRecovered = this.NewRecovered / (this.population / 100000);
    // }



    render() {
        let worldContent = document.querySelector('.world_content');
        let allContent = document.querySelector('.all_content');
        let absoluteContent = document.querySelector('.absolute_content');

        let confirmedContent = document.querySelector('.informStatistics_confirmed_content');
        let deathsContent = document.querySelector('.informStatistics_deaths_content');
        let recoveredContent = document.querySelector('.informStatistics_recovered_content');
        let globalCases = document.querySelector('.global_cases');
        let contentConfirmed = '';
        let contentDeaths = '';
        let contentRecovered = '';
        let contentAll = '';
        let contentAbsolute = '';
        let styleTitle = '';


        if (this.isHundredK) contentAbsolute = '100K';
        else contentAbsolute = 'Absolute';
      

        if (this.isCountry) styleTitle = `${this.Country} <img src="${this.flag}" alt="flag" width="40px" height="30px" class ="imgFlag">`;
        else styleTitle = 'World';
        //`<img src="../../../public/arrow-left.svg" alt="flag" width="20px">`;
        //
        

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
    }


}