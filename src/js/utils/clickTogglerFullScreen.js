import UI from '../components/UI/UI';

export default function clickTogglerFullScreen() {
  console.log('work');
  const parentElement = document.body;
  const modalContainer = new UI().render(parentElement, 'div', null, ['class', 'modal__container']);
  const modalWindow = new UI().render(modalContainer, 'div', null, ['class', 'modal']);
  document.body.style.overflow = 'hidden';
  // modalWindow.innerHTML = data;

  // modalContainer.addEventListener('click', () => {
  //   // parentElement.removeChild(modalContainer);
  //   console.log('close');
  //   document.body.style.overflow = '';
  // });
}
