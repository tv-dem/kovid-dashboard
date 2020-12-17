export default class StatisticsView {
    isCountry = false;
    isOneDay=false;
    isHundredK=false;
    constructor(objStatistics, objFlags) {
this.setNewValue(objStatistics, objFlags);
   }
   
    setNewValue(objStatistics, objFlags) {
        this.Country = objStatistics.Country; //
        this.NewConfirmed = objStatistics.NewConfirmed; //случаи заражения за последние отчетные сутки
        this.TotalConfirmed = objStatistics.TotalConfirmed;//общее количество зараженных
        this.NewDeaths = objStatistics.NewDeaths;//количество умерших за последние отчетные сутки
        this.TotalDeaths = objStatistics.TotalDeaths;//общее количество умерших
        this.NewRecovered = objStatistics.NewRecovered;//количество выздоровевших за последние отчетные сутки
        this.TotalRecovered = objStatistics.TotalRecovered;// общее количество выздоровевших
        
        if (objFlags === undefined) this.population = 999;
        else {
        this.population = objFlags.population;
        this.flag = objFlags.flag;
        this.name = objFlags.name;
    }
    }

   

    oneHundredK() {
        //  this.NewConfirmed100K;
    }

    render() {
        let worldContent = document.querySelector('.world_content');
        let allContent = document.querySelector('.all_content');

        let confirmedContent = document.querySelector('.informStatistics_confirmed_content');
        let deathsContent = document.querySelector('.informStatistics_deaths_content');
        let recoveredContent = document.querySelector('.informStatistics_recovered_content');

        let globalCases = document.querySelector('.global_cases');




        let styleTitle = 'world';

        if (this.isCountry) styleTitle = 'country';
        else styleTitle = 'world';

        //
        let contentConfirmed = '';
        let contentDeaths = '';
        let contentRecovered = '';
        let contentAll = '';

        if (this.isOneDay) {
            contentConfirmed = this.NewConfirmed;
            contentDeaths = this.NewDeaths;
            contentRecovered = this.NewRecovered;
            contentAll = 'Last day';

        } else {
            contentConfirmed =  this.TotalConfirmed;
            contentDeaths =  this.TotalDeaths;
            contentRecovered =  this.TotalRecovered;
            contentAll = 'In all';

        }
        //
        confirmedContent.innerHTML = contentConfirmed;
        deathsContent.innerHTML = contentDeaths;
        recoveredContent.innerHTML = contentRecovered;
        globalCases.innerHTML = `Global Cases ${this.TotalConfirmed}`;
        worldContent.innerHTML = styleTitle;
        allContent.innerHTML = contentAll;


    }
        

}