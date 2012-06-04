(function () {
  var svg = document.getElementsByTagName('svg')[0];
  svg.style.border = '1px solid';
  for(var i = 0; i < 99; i++) {
    var s = svg.cloneNode(true);
    document.body.appendChild(s);
  }

})();
