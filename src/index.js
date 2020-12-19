import './styles/index.scss';
import { dataObj, data } from './test-data-for-list';
import Graph from './js/components/graph/graph';
import Slider from './js/components/slider/Slider';
import List from './js/components/List/List';
import Connector from './js/components/connector/Connector';
import { URL_STATISTICS } from './js/components/constants/constants';

const init = async () => {
  const listID = document.querySelector('#country_list');

  const connector = new Connector(URL_STATISTICS);
  const { Countries, Global } = await connector.getStatistics();

  const list = new List(Countries, Global);
  const graph = new Graph('.diagram', dataObj).render();
  const slider = new Slider('.diagram', 1, 2).init(data);

  list.renderComponent(listID);

  const propagateUpdates = (updates) => {
    list.update(updates);
    graph.update(updates);
  };

  list.setCallBack(propagateUpdates);
  graph.setCallBack(propagateUpdates);

  const clickSliderItemHandler = ({ target }) => {
    const menuItems = document.querySelectorAll('.scroll__track div');
    menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
    target.classList.add('active');
    // Для Тани - метод перерисовка графика в зависимости от клика по таблице
    graph.init(target.textContent);
  };

  const btnFullScreen = document.querySelector('.bnt-full-screen__container');
  document.querySelector('.scroll__track').addEventListener('click', (event) => clickSliderItemHandler(event, graph));
  document.querySelector('.diagram').addEventListener('mouseenter', () => btnFullScreen.classList.add('active'));
  document.querySelector('.diagram').addEventListener('mouseleave', () => btnFullScreen.classList.remove('active'));

  window.addEventListener('resize', () => {
    console.log('resize');
    slider.init(data);
  });
};

init();
