(function () {
  if (typeof srcRoot == 'undefined') { return; }
  var fn = 'G';
  var xml = srcRoot + '/' + fn + '.xml';
  var container = document.getElementById(xml);
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';

  var svg = container.getElementsByTagName('svg')[0];
  svg.style.display = 'block';
  svg.style.border = '1px solid';
  var glyphList = svg.getElementsByTagName('glyph');
  for (var i = 0; i < glyphList.length; i++) {
    console.log(glyphList[i].getAttribute('d'));
  }
})();
