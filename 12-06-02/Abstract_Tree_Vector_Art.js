(function () {

  function inspect (node, parent) {
    var ol = document.createElement('ol');
    ol.innerText = node;
    parent.appendChild(ol);
    var list = node.childNodes;
    for (var i = 0; i < list.length; i++) {
      var li = document.createElement('li');
      ol.appendChild(li);
      inspect(list[i], li);       
    }
  }

  var svg = document.getElementsByTagName('svg')[0];
  inspect(svg, document.body);
})();
