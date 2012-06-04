(function () {
  var svg = document.getElementsByTagName('svg')[0];
  svg.style.border = '1px solid';
  function randomLetter () {
    var r = Math.random() * 10;
    if (r > 6) {return 'G'};
    if (r > 3) {return 'i'};
    return 'a';
  }
  for(var i = 0; i < 99; i++) {
    var s = svg.cloneNode(true);
    document.body.appendChild(s);
    s.getElementsByTagName('text')[0].firstChild.nodeValue = (randomLetter() + randomLetter() + randomLetter());
  }

})();
