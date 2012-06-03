(function () {
  var svg = document.getElementsByTagName('svg')[0];
  function gia(size) {
    var div = document.createElement('div');
    div.style.fontSize = size + 'px';
    div.style.fontFamily = 'Gia';
    div.innerHTML = "Gia";
    document.body.appendChild(div);
  }

  for (var i = 0; i < 512; i++) {
    gia(i)
  }


})();
