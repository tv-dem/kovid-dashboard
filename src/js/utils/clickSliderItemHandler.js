export default function clickSliderItemHandler({ target }, graph) {
  const menuItems = document.querySelectorAll('.scroll__track div');
  menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
  target.classList.add('active');
  graph.initGraph(target.textContent);
}
