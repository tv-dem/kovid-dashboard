import '../../styles/graph.scss';
import UI from '../components/UI/UI';

export default class CreateBtnFullScreen extends UI {
  constructor(parentSelector) {
    super();
    this.parent = document.querySelector(parentSelector);
  }

  init() {
    this.btnFullScreenContainer = super.render(this.parent, 'div', null, ['class', 'bnt-full-screen__container']);
    this.btnFullScreen = super.render(this.btnFullScreenContainer, 'div', null);
  }

  render() {
    this.init();
  }
}
