function helloWorldBox () {
  var box = el(document.body, 'div', 'hello-box');
  box.innerHTML = "Hello, World!";
  box.style.border = "1px solid red";
  box.style.width = "15em";
  box.style.padding = "1em";
  box.style.textAlign = "center";
  box.style.margin = 'auto';
}