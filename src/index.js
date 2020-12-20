// Test import of a JavaScript function
// import { example } from './js/example';

// Test import of an asset
// import webpackLogo from './images/webpack-logo.svg';

// Test import of styles
import './styles/index.scss';

import List from './js/components/List/List';
import Connector from './js/components/connector/Connector';
import { URL_STATISTICS } from './js/components/constants/constants';
import kb from './js/components/keyboard/js/script';

const ttt = async () => {
  const connector = new Connector(URL_STATISTICS);
  const data = await connector.getStatistics();
  const list = new List(data.Countries, data.Global, kb);
  list.renderComponent(document.querySelector('#country_list'));
};

ttt();

// Appending to the DOM
// const logo = document.createElement('img');
// logo.src = webpackLogo;

/// /const heading = document.createElement('h1');
// heading.textContent = example();

// const app = document.querySelector('#root');
// app.append(logo, heading);

const a = 1;
console.log(a);
