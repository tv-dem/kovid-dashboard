import moment from 'moment';

export default function mapperDataForChart(dataDaily, countPopulation, countryId) {
  const dataOptionsForChart = {
    'Daily Cases': {
      labels: [],
      data: [],
      type: 'bar',
      color: 'rgb(255, 170, 0)',
    },
    'Daily Deaths': {
      labels: [],
      data: [],
      type: 'bar',
      color: 'rgb(255, 255, 255)',
    },
    'Recovered Cases': {
      labels: [],
      data: [],
      type: 'line',
      color: 'rgb(255, 170, 0)',
    },
    'Cumulative Cases on 100.000': {
      labels: [],
      data: [],
      type: 'line',
      color: 'rgb(255, 255, 255)',
    },
    'Cumulative Deaths on 100.000': {
      labels: [],
      data: [],
      type: 'line',
      color: 'rgb(255, 170, 0)',
    },
    'Cumulative Recovered on 100.000': {
      labels: [],
      data: [],
      type: 'bar',
      color: 'rgb(255, 255, 255)',
    },
  };

  const dataKeyDaily = ['Daily Cases', 'Daily Deaths', 'Recovered Cases'];
  const dataKeyResponse = ['cases', 'deaths', 'recovered', 'Daily Cases', 'Daily Deaths', 'Recovered Cases'];
  dataKeyDaily.forEach((dataKey, i) => {
    const responseDataDaily = (countryId === 'all')
      ? dataDaily[dataKeyResponse[i]]
      : dataDaily.timeline[dataKeyResponse[i]];

    dataOptionsForChart[dataKey].labels = Object.keys(responseDataDaily)
      .map((dateValue) => moment(dateValue, 'MM-DD-YY'));
    const dataValuesForChart = Object.values(responseDataDaily);

    const mappedDataValuesForChart = [];
    for (let j = dataValuesForChart.length - 1; j >= 0; j -= 1) {
      if (j === 0) {
        mappedDataValuesForChart.push(dataValuesForChart[j]);
      } else {
        mappedDataValuesForChart.push(Math.abs(dataValuesForChart[j] - dataValuesForChart[j - 1]));
      }
    }
    dataOptionsForChart[dataKey].data = mappedDataValuesForChart.reverse();
    dataOptionsForChart[dataKey].country = dataDaily.country || 'The Whole World';
  });

  const dataKeyPercetage = ['Cumulative Cases on 100.000', 'Cumulative Deaths on 100.000', 'Cumulative Recovered on 100.000'];
  const startToAccessToDataObjPropertiesInPercent = 3;
  dataKeyPercetage.forEach((dataKey, i) => {
    /* eslint max-len: ["error", { "code": 135 }] */
    dataOptionsForChart[dataKey].labels = dataOptionsForChart[dataKeyResponse[i + startToAccessToDataObjPropertiesInPercent]].labels;
    dataOptionsForChart[dataKey].data = (dataOptionsForChart[dataKeyResponse[i + startToAccessToDataObjPropertiesInPercent]].data)
      .map((dataValue) => {
        const denominatorForPropertiesInPercent = countryId === 'all'
          ? countPopulation.reduce((acc, current) => acc + current.population, 0)
          : countPopulation.population;
        return Math.trunc((dataValue * 100000) / denominatorForPropertiesInPercent);
      });
    dataOptionsForChart[dataKey].country = dataOptionsForChart[dataKeyResponse[i + startToAccessToDataObjPropertiesInPercent]].country;
  });

  return dataOptionsForChart;
}
