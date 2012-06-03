(function () {
  var glyphList = document.getElementsByTagName('glyph');
  var ol = document.createElement('ol');

  for( var i = 0; i < glyphList.length; i++) {
    var li = document.createElement('li');
    var div = document.createElement('div');
    li.innerText = glyphList[i].getAttribute("glyph-name");
    div.className = 'glyph';    
    div.innerText = glyphList[i].getAttribute("unicode");
    li.appendChild(div);
    ol.appendChild(li);
  }
  document.body.appendChild(ol);
})();
