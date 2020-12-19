import UI from '../components/UI/UI';

export default function createFullScreenPopUp() {
  const parentElement = document.body;
  const modalContainer = new UI().render(parentElement, 'div', null, ['class', 'modal__container']);
  const modalWindow = new UI().render(modalContainer, 'div', null, ['class', 'modal']);
  const headerContainer = new UI().render(modalWindow, 'div', null, ['class', 'modal__header']);
  const headerLogo = new UI().render(headerContainer, 'div', null, ['class', 'modal__header-logo']);
  const titleText = 'COVID-19 Dashboard by the Center for RSSchool';
  const headerTitle = new UI().render(headerContainer, 'p', titleText, ['class', 'modal__header-title']);
  document.body.style.overflow = 'hidden';
}
