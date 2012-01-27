document.getElementById('code').onclick = function () {
  this.style.display = 'none';
  eval(top.window.CoffeeScript.compile(this.innerText));
}