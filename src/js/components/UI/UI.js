export default class UI {
  // insert your tag with params in beginning of parent tag

  // exapmle:
  // render(parent, "h1", "some text in tag", ["class", "title"], ["id", "main-title"] ...)
  // and if you don`t need some html in tag
  // render(parent, "h1", null, ["class", "title"], ["id", "main-title"] ...)
  render(parent, tagName, innerHtml = null, ...attributes) {
    const element = document.createElement(tagName);
    if (attributes.length) {
      attributes.forEach(([attribute, value]) => {
        element.setAttribute(attribute, value);
      });
    }
    if (innerHtml) {
      element.innerHTML = innerHtml;
    }
    parent.append(element);
    return element;
  }
}
