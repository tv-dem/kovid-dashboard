import '../../styles/graph.scss';
import UI from '../components/UI/UI';
import clickTogglerFullScreen from '../utils/clickTogglerFullScreen';

export default class CreateBtnFullScreen extends UI {
  constructor(parentSelector) {
    super();
    this.parent = document.querySelector(parentSelector);
  }

  init() {
    this.btnFullScreenContainer = super.render(this.parent, 'div', null, ['class', 'bnt-full-screen__container']);
    this.btnFullScreen = super.render(this.btnFullScreenContainer, 'div', null);
    //Handle click open/close full screen
    // this.btnFullScreenContainer.addEventListener('click', () => clickTogglerFullScreen(this.parent.innerHTML));
  }

  render() {
    this.init();
  }
}
