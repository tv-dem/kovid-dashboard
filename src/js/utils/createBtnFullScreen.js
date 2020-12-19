import '../../styles/graph.scss';
import UI from '../components/UI/UI';

export default class CreateBtnFullScreen extends UI {
  constructor(parentSelector, classValue) {
    super();
    this.parent = document.querySelector(parentSelector);
    this.class = classValue;
  }

  init() {
    this.btnFullScreenContainer = super.render(this.parent, 'div', null, ['class', 'btn-full-screen__container']);
    this.btnFullScreenContainer.classList.add(this.class);
    this.btnFullScreen = super.render(this.btnFullScreenContainer, 'img', null, ['src', '../../../public/full-screen-button.svg'], ['alt', 'button open full screen']);
  }

  render() {
    this.init();
  }
}
