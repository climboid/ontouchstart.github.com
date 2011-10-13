function el(parent, tag, id, className) {
  var element = document.createElement(tag);
  if(id) element.id = id;
  if(className) element.className = className;
  parent.appendChild(element);
  return element;
}